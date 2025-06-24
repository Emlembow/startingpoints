# Database Development Rules

## Database Design Principles
- Normalize to 3NF minimum, denormalize for performance
- Use proper data types for each field
- Implement referential integrity
- Design for scalability from the start
- Document schema and relationships
- Use consistent naming conventions
- Plan for data growth
- Consider read/write patterns

## Schema Design
- Use singular table names (user, not users)
- Use snake_case for table and column names
- Primary keys: use 'id' or 'table_name_id'
- Add created_at and updated_at timestamps
- Use UUIDs for distributed systems
- Implement soft deletes when needed
- Version schema changes
- Document column purposes

## Indexing Strategy
- Index foreign keys
- Index columns used in WHERE clauses
- Create composite indexes for multi-column queries
- Monitor index usage
- Remove unused indexes
- Consider partial indexes
- Use unique indexes for constraints
- Balance write vs read performance

## Query Optimization
- Use EXPLAIN to analyze queries
- Avoid N+1 query problems
- Use joins instead of subqueries when possible
- Limit result sets with pagination
- Use prepared statements
- Cache frequently accessed data
- Batch operations when possible
- Monitor slow query logs

## Relationships & Constraints
- Define foreign key constraints
- Use CASCADE operations carefully
- Implement CHECK constraints
- Use UNIQUE constraints appropriately
- Document relationship cardinality
- Handle orphaned records
- Use junction tables for many-to-many
- Enforce business rules at DB level

## Prisma Best Practices
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([email])
}
```

- Use proper field types and modifiers
- Define relations explicitly
- Use @map for custom table/column names
- Implement proper migrations workflow
- Use prisma generate after schema changes
- Handle migrations in CI/CD
- Use seed scripts for development
- Type-safe queries with Prisma Client

## Supabase Integration
- Enable Row Level Security (RLS)
- Write comprehensive RLS policies
- Use Supabase Auth for authentication
- Implement proper role-based access
- Use database functions for complex logic
- Enable realtime for live updates
- Configure connection pooling
- Monitor database metrics

## Transactions
- Use transactions for data consistency
- Keep transactions short
- Handle deadlocks gracefully
- Use appropriate isolation levels
- Implement retry logic
- Log transaction failures
- Test rollback scenarios
- Monitor transaction performance

## Data Migrations
- Never modify existing migrations
- Test migrations on copy of production
- Include rollback scripts
- Version control all migrations
- Document breaking changes
- Run migrations in transactions
- Backup before major migrations
- Automate migration process

## Security Best Practices
- Use parameterized queries
- Implement least privilege principle
- Encrypt sensitive data
- Use SSL/TLS connections
- Audit database access
- Rotate credentials regularly
- Implement data masking
- Regular security audits

## Performance Monitoring
- Track query execution times
- Monitor connection pool usage
- Set up alerts for slow queries
- Analyze query patterns
- Monitor disk usage
- Track table growth
- Implement query result caching
- Regular performance reviews

## Backup & Recovery
- Automate regular backups
- Test restore procedures
- Implement point-in-time recovery
- Store backups securely
- Document recovery procedures
- Monitor backup success
- Implement disaster recovery plan
- Regular recovery drills

## Connection Management
- Use connection pooling
- Configure pool size appropriately
- Handle connection failures
- Implement retry logic
- Monitor connection health
- Close connections properly
- Use read replicas for scaling
- Implement connection timeouts

## NoSQL Considerations
- Design for query patterns
- Denormalize when appropriate
- Use embedded documents wisely
- Implement data consistency patterns
- Plan sharding strategy
- Monitor document size
- Use appropriate indexes
- Handle eventual consistency

## Caching Strategy
- Cache at appropriate layers
- Implement cache invalidation
- Use Redis for session data
- Cache computed values
- Set appropriate TTLs
- Monitor cache hit rates
- Implement cache warming
- Handle cache failures

## Data Integrity
- Implement data validation
- Use database constraints
- Handle concurrent updates
- Implement audit trails
- Version important data
- Use checksums for critical data
- Regular data consistency checks
- Document data quality rules

## API Design for Database
- Use database views for complex queries
- Implement stored procedures carefully
- Create materialized views for performance
- Use triggers sparingly
- Document database functions
- Version database API changes
- Test database functions
- Monitor function performance

## Development Workflow
- Use migrations for all changes
- Separate dev/test/prod databases
- Seed development databases
- Use feature flags for schema changes
- Test with production-like data
- Document schema changes
- Peer review migrations
- Automate database setup

## Best Practices Summary
- Design before implementing
- Optimize based on metrics
- Security first approach
- Document everything
- Test thoroughly
- Monitor continuously
- Plan for scale
- Keep learning new patterns