# PostgreSQL Best Practices

## Database Design

### Naming Conventions
```sql
-- Tables: plural, snake_case
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes: table_column_idx
CREATE INDEX customers_email_idx ON customers(email);

-- Foreign keys: fk_table_reference
ALTER TABLE orders 
ADD CONSTRAINT fk_orders_customer 
FOREIGN KEY (customer_id) REFERENCES customers(id);
```

### Data Types and Constraints
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    sku VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active' 
        CHECK (status IN ('active', 'inactive', 'discontinued')),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Domain for reusable constraints
CREATE DOMAIN email AS VARCHAR(255)
    CHECK (VALUE ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
```

## Query Optimization

### Indexing Strategies
```sql
-- B-tree index for equality and range queries
CREATE INDEX orders_created_at_idx ON orders(created_at);

-- Partial index for specific conditions
CREATE INDEX active_products_idx ON products(name) 
WHERE status = 'active';

-- Composite index for multiple columns
CREATE INDEX orders_customer_date_idx ON orders(customer_id, created_at DESC);

-- GIN index for JSONB
CREATE INDEX products_metadata_idx ON products USING GIN(metadata);

-- Full-text search
CREATE INDEX products_search_idx ON products 
USING GIN(to_tsvector('english', name || ' ' || COALESCE(description, '')));
```

### Query Performance
```sql
-- Use EXPLAIN ANALYZE
EXPLAIN (ANALYZE, BUFFERS) 
SELECT c.*, COUNT(o.id) as order_count
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE c.created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY c.id;

-- Avoid SELECT *
-- Bad
SELECT * FROM customers;

-- Good
SELECT id, first_name, last_name, email 
FROM customers;

-- Use CTEs for readability
WITH recent_orders AS (
    SELECT customer_id, COUNT(*) as order_count
    FROM orders
    WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY customer_id
)
SELECT c.*, COALESCE(ro.order_count, 0) as recent_order_count
FROM customers c
LEFT JOIN recent_orders ro ON c.id = ro.customer_id;
```

## Functions and Procedures

### PL/pgSQL Functions
```sql
-- Function with proper error handling
CREATE OR REPLACE FUNCTION calculate_order_total(p_order_id INTEGER)
RETURNS DECIMAL(10, 2)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
    v_total DECIMAL(10, 2);
BEGIN
    SELECT SUM(oi.quantity * p.price)
    INTO STRICT v_total
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = p_order_id;
    
    RETURN v_total;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE EXCEPTION 'Order % not found', p_order_id;
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error calculating order total: %', SQLERRM;
END;
$$;

-- Trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
```

## Transaction Management

### Proper Transaction Handling
```sql
-- Explicit transaction with savepoint
BEGIN;

-- Insert customer
INSERT INTO customers (first_name, last_name, email)
VALUES ('John', 'Doe', 'john@example.com')
RETURNING id INTO v_customer_id;

SAVEPOINT customer_created;

-- Try to insert order
BEGIN
    INSERT INTO orders (customer_id, total)
    VALUES (v_customer_id, 100.00);
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK TO customer_created;
        RAISE NOTICE 'Order creation failed: %', SQLERRM;
END;

COMMIT;
```

## Security Best Practices

### SQL Injection Prevention
```sql
-- Use parameterized queries
-- In application code:
PREPARE stmt AS 
SELECT * FROM users WHERE email = $1 AND status = $2;
EXECUTE stmt('user@example.com', 'active');

-- For dynamic SQL in functions
CREATE OR REPLACE FUNCTION get_table_data(p_table_name TEXT)
RETURNS TABLE(data JSONB)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Validate table name
    IF p_table_name !~ '^[a-zA-Z_][a-zA-Z0-9_]*$' THEN
        RAISE EXCEPTION 'Invalid table name';
    END IF;
    
    -- Use quote_ident for identifiers
    RETURN QUERY EXECUTE format(
        'SELECT to_jsonb(t) FROM %I t',
        p_table_name
    );
END;
$$;
```

### Role-Based Access Control
```sql
-- Create roles
CREATE ROLE app_read;
CREATE ROLE app_write;
CREATE ROLE app_admin;

-- Grant permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_read;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_write;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_admin;

-- Create users with roles
CREATE USER app_user WITH PASSWORD 'secure_password';
GRANT app_write TO app_user;

-- Row-level security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY customer_isolation ON customers
FOR ALL
TO app_user
USING (tenant_id = current_setting('app.tenant_id')::INTEGER);
```

## Performance Monitoring

### Query Analysis
```sql
-- Find slow queries
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    max_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Table statistics
SELECT 
    schemaname,
    tablename,
    n_live_tup,
    n_dead_tup,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;

-- Index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan;
```

## Backup and Recovery

### Backup Strategies
```bash
# Full backup
pg_dump -h localhost -U postgres -d mydb -f backup.sql

# Compressed backup
pg_dump -h localhost -U postgres -d mydb -Fc -f backup.dump

# Backup specific schemas
pg_dump -h localhost -U postgres -d mydb -n public -n app_schema -f backup.sql

# Point-in-time recovery setup
# In postgresql.conf:
archive_mode = on
archive_command = 'cp %p /backup/archive/%f'
```

## Best Practices Summary

### Do's
- ✅ Use appropriate data types
- ✅ Create indexes on frequently queried columns
- ✅ Use prepared statements
- ✅ Implement proper constraints
- ✅ Regular VACUUM and ANALYZE
- ✅ Monitor query performance

### Don'ts
- ❌ Don't use SELECT *
- ❌ Avoid unnecessary indexes
- ❌ Don't ignore NULL handling
- ❌ Avoid long-running transactions
- ❌ Don't skip backups