# Rust Best Practices

## Project Structure
```
my_project/
├── Cargo.toml
├── src/
│   ├── main.rs    # Binary entry
│   ├── lib.rs     # Library entry
│   └── modules/
├── tests/         # Integration tests
└── examples/      # Examples

// Module organization
pub mod auth;
pub mod db;
mod utils;

pub use auth::jwt::JwtValidator;
```

## Ownership & Borrowing

```rust
// Move semantics
let s1 = String::from("hello");
let s2 = s1; // s1 moved

// Clone for copy
let s2 = s1.clone();

// Borrowing
let len = calculate_length(&s1);

// Lifetimes
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

struct Excerpt<'a> {
    part: &'a str,
}
```

## Error Handling

```rust
// Result type
fn read_file(path: &str) -> Result<String, io::Error> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

// Custom errors
#[derive(Debug)]
enum AppError {
    Io(io::Error),
    NotFound,
}

// Error propagation with ?
fn process(path: &str) -> Result<Data, AppError> {
    let contents = read_file(path)?;
    let parsed = parse(&contents)?;
    Ok(parsed)
}

// Match handling
match result {
    Ok(v) => println!("Success: {}", v),
    Err(AppError::NotFound) => println!("Not found"),
    Err(e) => eprintln!("Error: {:?}", e),
}
```

## Common Patterns

```rust
// Builder pattern
#[derive(Default)]
struct ConfigBuilder {
    host: Option<String>,
    port: Option<u16>,
}

impl ConfigBuilder {
    fn host(mut self, host: impl Into<String>) -> Self {
        self.host = Some(host.into());
        self
    }
    
    fn build(self) -> Result<Config, &'static str> {
        Ok(Config {
            host: self.host.ok_or("host required")?,
            port: self.port.unwrap_or(8080),
        })
    }
}

// Type state pattern
struct Connection<S> {
    _state: PhantomData<S>,
}

impl Connection<Disconnected> {
    fn connect(self) -> Connection<Connected> {
        Connection { _state: PhantomData }
    }
}
```

## Traits & Generics

```rust
// Trait definition
trait Repository<T> {
    type Error;
    fn find(&self, id: u64) -> Result<T, Self::Error>;
    fn save(&mut self, item: T) -> Result<(), Self::Error>;
}

// Trait bounds
fn process<T: Display + Clone>(item: T) {
    println!("Processing: {}", item);
}

// Where clauses
fn complex<T, U>(t: T, u: U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{
    // Implementation
}
```

## Concurrency

```rust
// Channels
let (tx, rx) = mpsc::channel();
thread::spawn(move || {
    tx.send("Hello").unwrap();
});
let msg = rx.recv().unwrap();

// Arc + Mutex
let counter = Arc::new(Mutex::new(0));
let c = Arc::clone(&counter);
thread::spawn(move || {
    let mut num = c.lock().unwrap();
    *num += 1;
});
```

## Async Programming

```rust
#[tokio::main]
async fn main() {
    let data = fetch_data().await.unwrap();
    println!("Data: {}", data);
}

async fn fetch_data() -> Result<String, Error> {
    let resp = reqwest::get("https://api.example.com").await?;
    resp.text().await
}
```

## Testing

```rust
#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_add() {
        assert_eq!(add(2, 2), 4);
    }
    
    #[test]
    #[should_panic(expected = "divide by zero")]
    fn test_panic() {
        divide(10, 0);
    }
}

// tests/integration.rs
#[test]
fn test_api() {
    assert!(my_crate::public_fn().is_ok());
}
```

## Performance

```rust
// Use iterators
let sum: i32 = numbers.iter()
    .filter(|&&x| x > 0)
    .map(|&x| x * 2)
    .sum();

// Avoid allocations
fn process(data: &[u8]) -> &[u8] {
    &data[1..data.len()-1] // Use slices
}

// Use &str over String when possible
fn greet(name: &str) { // Not String
    println!("Hello, {}", name);
}
```

## Best Practices

### Do's
✅ Use clippy & rustfmt
✅ Handle all Results
✅ Prefer borrowing
✅ Use iterators
✅ Document public APIs

### Don'ts
❌ No unwrap() in production
❌ Avoid cloning
❌ Don't ignore warnings
❌ No global mutable state

## Common Idioms

```rust
// Option/Result combinators
let value = Some(5)
    .map(|x| x * 2)
    .filter(|&x| x > 5)
    .unwrap_or(0);

// if let for pattern matching
if let Some(value) = optional {
    println!("Got: {}", value);
}

// Derive common traits
#[derive(Debug, Clone, PartialEq, Eq)]
struct Point { x: i32, y: i32 }
```