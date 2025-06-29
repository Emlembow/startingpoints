# Supabase Security Rules Template

## ⚠️ DON'Ts

- **Ship with default settings** - they're wide open
- **Trust frontend validation** - it's easily bypassed
- **Expose API keys or user lists**
- **Allow unauthenticated database access**

## ✅ DOs

- **Enable Row Level Security (RLS) on all tables**
- **Default deny, then grant minimal permissions**
- **Validate every request server-side**
- **Check user auth and permissions for each operation**
- **Test by trying to access/modify other users' data**

## 🚀 Before Launch Checklist

- [ ] RLS policies configured
- [ ] All endpoints require authentication
- [ ] Server-side validation implemented
- [ ] Security testing completed (unauthorized access attempts)

## Example RLS Policies

### Basic User Data Protection
```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can only view their own profile
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);
```

### Team-based Access
```sql
-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Users can view documents in their team
CREATE POLICY "Team members can view documents" 
ON documents FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM team_members 
    WHERE team_members.team_id = documents.team_id 
    AND team_members.user_id = auth.uid()
  )
);
```

### Public Read, Authenticated Write
```sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "Public can read published posts" 
ON posts FOR SELECT 
USING (published = true);

-- Only authenticated users can create posts
CREATE POLICY "Authenticated users can create posts" 
ON posts FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Users can only update their own posts
CREATE POLICY "Users can update own posts" 
ON posts FOR UPDATE 
USING (auth.uid() = author_id);
```

## Edge Function Security

```typescript
// Always verify authentication
export async function handler(req: Request) {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  );

  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Validate request data
  const body = await req.json();
  if (!isValidInput(body)) {
    return new Response('Invalid input', { status: 400 });
  }

  // Proceed with authorized operation
  // ...
}
```

## Storage Security Rules

```typescript
// Example storage policies
const storagePolicies = {
  // Users can upload to their own folder
  'user-uploads': {
    insert: `auth.uid() = storage.foldername[1]`,
    select: `auth.uid() = storage.foldername[1]`,
    update: `auth.uid() = storage.foldername[1]`,
    delete: `auth.uid() = storage.foldername[1]`,
  },
  
  // Public read, authenticated write
  'public-assets': {
    select: `true`, // Anyone can read
    insert: `auth.uid() IS NOT NULL`, // Authenticated users can upload
    update: `false`, // No updates allowed
    delete: `auth.uid() = storage.owner`, // Only owner can delete
  }
};
```

## Testing Security

```bash
# Test unauthorized access
curl -X GET 'https://YOUR_PROJECT.supabase.co/rest/v1/profiles' \
  -H "apikey: YOUR_ANON_KEY"
# Should return empty or error

# Test with invalid JWT
curl -X GET 'https://YOUR_PROJECT.supabase.co/rest/v1/profiles' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer INVALID_TOKEN"
# Should return 401

# Test accessing other user's data
# Login as user A, try to access user B's data
# Should be blocked by RLS
```

## Environment Variables

```env
# Never commit these to version control
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key # Keep this extra secure!
```

## Additional Security Tips

1. **Rate Limiting**: Implement rate limiting on Edge Functions
2. **Input Sanitization**: Always sanitize user inputs before database operations
3. **Audit Logs**: Enable audit logs for sensitive operations
4. **Regular Reviews**: Periodically review and update RLS policies
5. **Least Privilege**: Grant only the minimum necessary permissions
6. **Secure Defaults**: New tables should have RLS enabled by default
7. **Testing**: Include security tests in your CI/CD pipeline