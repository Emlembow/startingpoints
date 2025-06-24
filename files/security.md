# Security Development Rules

## Authentication Best Practices

### Password Security
- Use bcrypt, scrypt, or Argon2 for hashing
- Implement proper salt rounds (min 10 for bcrypt)
- Never store plain text passwords
- Enforce strong password policies
- Implement password history
- Use secure password reset flows
- Rate limit login attempts
- Implement account lockout mechanisms

### Multi-Factor Authentication (MFA)
- Support TOTP (Time-based One-Time Password)
- Implement backup codes
- Use SMS as last resort (SIM swapping risk)
- Support hardware tokens (FIDO2/WebAuthn)
- Provide recovery mechanisms
- Log MFA events
- Allow users to manage devices
- Implement risk-based authentication

### Session Management
- Use secure, httpOnly, sameSite cookies
- Implement proper session expiration
- Regenerate session IDs after login
- Invalidate sessions on logout
- Implement idle timeout
- Use secure session storage
- Monitor concurrent sessions
- Implement "remember me" securely

### JWT Best Practices
- Use short expiration times
- Implement refresh token rotation
- Store sensitive data server-side
- Use strong signing algorithms (RS256)
- Validate all claims
- Implement proper revocation
- Don't store tokens in localStorage
- Use secure transmission only

## Authorization

### Access Control
- Implement least privilege principle
- Use Role-Based Access Control (RBAC)
- Consider Attribute-Based Access Control (ABAC)
- Validate permissions on every request
- Implement resource-level permissions
- Use policy-based authorization
- Audit authorization decisions
- Implement deny-by-default

### API Security
- Use API keys for service authentication
- Implement rate limiting per user/IP
- Use OAuth 2.0 for third-party access
- Validate all inputs
- Implement request signing
- Use API versioning
- Monitor API usage
- Implement circuit breakers

## Input Validation & Sanitization

### Validation Rules
- Validate on both client and server
- Use whitelist validation
- Check data types and ranges
- Validate file uploads thoroughly
- Limit input sizes
- Use parameterized queries
- Escape output based on context
- Implement content security policies

### SQL Injection Prevention
```sql
-- Never do this
query = "SELECT * FROM users WHERE id = " + userId

-- Always use parameterized queries
query = "SELECT * FROM users WHERE id = ?"
```

### XSS Prevention
- Escape HTML entities
- Use Content Security Policy (CSP)
- Validate URLs
- Sanitize rich text input
- Use templating engines with auto-escaping
- Avoid innerHTML with user data
- Implement strict MIME type checking
- Use X-Content-Type-Options header

## Secure Communication

### HTTPS/TLS
- Use TLS 1.2 minimum
- Implement HSTS (HTTP Strict Transport Security)
- Use secure cipher suites
- Implement certificate pinning for mobile
- Redirect HTTP to HTTPS
- Use secure cookies
- Implement OCSP stapling
- Regular certificate renewal

### Security Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=()
```

## Data Protection

### Encryption at Rest
- Encrypt sensitive data in database
- Use field-level encryption when needed
- Implement key rotation
- Use hardware security modules (HSM)
- Encrypt backups
- Secure key storage
- Implement data masking
- Use transparent data encryption

### Encryption in Transit
- Use TLS for all communications
- Implement end-to-end encryption for sensitive data
- Use VPN for internal communications
- Encrypt API payloads when necessary
- Implement message-level security
- Use secure protocols only
- Monitor for protocol downgrades
- Implement perfect forward secrecy

### Personal Data Protection (GDPR/CCPA)
- Implement data minimization
- Provide data portability
- Implement right to deletion
- Maintain audit logs
- Get explicit consent
- Implement privacy by design
- Regular privacy assessments
- Document data processing

## Infrastructure Security

### Container Security
```dockerfile
# Run as non-root user
FROM node:alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Copy only necessary files
COPY --chown=nodejs:nodejs . .
```

### Kubernetes Security
```yaml
apiVersion: v1
kind: Pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
  - name: app
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
```

### Cloud Security
- Use IAM roles instead of keys
- Implement least privilege
- Enable cloud audit logs
- Use VPC and security groups
- Implement network segmentation
- Regular security assessments
- Use cloud-native security tools
- Implement defense in depth

## Security Monitoring

### Logging & Auditing
- Log authentication events
- Monitor authorization failures
- Track data access
- Log security exceptions
- Implement centralized logging
- Use structured logging
- Protect log integrity
- Regular log analysis

### Intrusion Detection
- Implement rate limiting
- Detect brute force attacks
- Monitor for SQL injection attempts
- Track unusual access patterns
- Use Web Application Firewall (WAF)
- Implement honeypots
- Regular security scans
- Incident response plan

### Security Testing
- Regular penetration testing
- Automated security scanning
- Dependency vulnerability scanning
- Static code analysis
- Dynamic application testing
- Security code reviews
- Bug bounty programs
- Red team exercises

## Secure Development Lifecycle

### Code Security
- Never hardcode secrets
- Use environment variables
- Implement secret rotation
- Regular dependency updates
- Security-focused code reviews
- Use security linters
- Implement git-secrets
- Secure CI/CD pipelines

### Third-Party Dependencies
- Regular vulnerability scanning
- Use lock files
- Monitor security advisories
- Implement Software Bill of Materials (SBOM)
- Vendor security assessment
- License compliance
- Supply chain security
- Regular updates

### Incident Response
- Incident response plan
- Security team contacts
- Escalation procedures
- Communication templates
- Post-mortem process
- Regular drills
- Lessons learned
- Continuous improvement

## OWASP Top 10 Prevention

1. **Injection**: Use parameterized queries
2. **Broken Authentication**: Implement secure session management
3. **Sensitive Data Exposure**: Encrypt sensitive data
4. **XML External Entities**: Disable XML external entity processing
5. **Broken Access Control**: Implement proper authorization
6. **Security Misconfiguration**: Harden all components
7. **XSS**: Validate and escape all inputs
8. **Insecure Deserialization**: Validate serialized objects
9. **Vulnerable Components**: Keep dependencies updated
10. **Insufficient Logging**: Implement comprehensive logging

## Security Best Practices Summary
- Security by design
- Defense in depth
- Least privilege principle
- Regular security updates
- Continuous monitoring
- Incident preparedness
- Security awareness training
- Regular security assessments