# Git Workflow & Version Control Rules

## Gitflow Workflow

### Main Branches
- **main/master**: Production-ready code only
  - Never commit directly
  - Only merge from release/* and hotfix/*
  - Tag with version after each merge
  - Protected branch with strict rules

- **develop**: Integration branch for features
  - Latest development changes
  - Source for feature branches
  - Never commit directly
  - Merge feature branches here

### Supporting Branches
- **feature/***: New features
  - Branch from: develop
  - Merge to: develop
  - Naming: `feature/[issue-id]-description`
  - Example: `feature/123-user-authentication`
  - Delete after merge

- **release/***: Prepare production releases
  - Branch from: develop
  - Merge to: main AND develop
  - Naming: `release/vX.Y.Z`
  - Only fixes and release tasks
  - No new features

- **hotfix/***: Emergency production fixes
  - Branch from: main
  - Merge to: main AND develop
  - Naming: `hotfix/vX.Y.Z`
  - Urgent fixes only
  - Delete after merge

## Commit Message Convention

### Format
```
type(scope): subject

[optional body]

[optional footer(s)]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Formatting (no code change)
- **refactor**: Code restructuring
- **perf**: Performance improvements
- **test**: Adding/updating tests
- **build**: Build system changes
- **ci**: CI configuration changes
- **chore**: Other changes
- **revert**: Revert previous commit

### Examples
```
feat(auth): add OAuth2 integration

fix(api): handle null response in user endpoint

docs(readme): update installation instructions

refactor(utils): simplify date formatting logic
```

## Semantic Versioning
- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (0.X.0): New features (backward compatible)
- **PATCH** (0.0.X): Bug fixes (backward compatible)
- Pre-release: X.Y.Z-alpha.1, X.Y.Z-beta.2
- Build metadata: X.Y.Z+20130313144700

## Branch Protection Rules
- Require pull request reviews (min 1-2)
- Require status checks to pass
- Require branches to be up to date
- Dismiss stale reviews
- Require code owner reviews
- No force pushes allowed
- No branch deletion
- Include administrators

## Pull Request Guidelines

### Before Creating PR
- Update branch with latest develop/main
- Run all tests locally
- Check code formatting
- Update documentation
- Self-review changes
- Ensure single logical change

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.logs or debug code
```

### Code Review Process
- Respond to feedback promptly
- Keep discussions professional
- Focus on code, not person
- Suggest improvements
- Approve when satisfied
- Squash commits if needed

## Git Best Practices

### Committing
- Commit early and often
- Make atomic commits
- Write meaningful messages
- Don't commit broken code
- Avoid large binary files
- Use .gitignore properly
- Sign commits when required
- Keep history clean

### Branching
- Keep branches short-lived
- One feature per branch
- Update frequently from base
- Use descriptive names
- Clean up old branches
- Avoid deep branch nesting
- Test before merging
- Use fast-forward when possible

### Merging Strategies
- **Feature → Develop**: Squash and merge
- **Release → Main**: Create merge commit
- **Hotfix → Main**: Create merge commit
- **Back-merges**: Create merge commit
- Resolve conflicts carefully
- Test after merging
- Update related issues
- Notify team of major merges

## Release Process
1. Create release branch from develop
2. Update version numbers
3. Update changelog
4. Fix release-specific issues
5. Create PR to main
6. Get required approvals
7. Merge to main
8. Tag release with version
9. Create GitHub release
10. Merge back to develop
11. Delete release branch
12. Deploy to production

## Hotfix Process
1. Create hotfix branch from main
2. Fix critical issue
3. Update patch version
4. Test thoroughly
5. Create PR to main
6. Get emergency approval
7. Merge to main
8. Tag hotfix version
9. Deploy immediately
10. Merge back to develop
11. Delete hotfix branch
12. Document incident

## Git Commands Reference

### Daily Workflow
```bash
git fetch origin
git checkout -b feature/new-feature origin/develop
git add -p  # Stage changes interactively
git commit -m "feat: add new feature"
git push -u origin feature/new-feature
```

### Keeping Updated
```bash
git checkout develop
git pull origin develop
git checkout feature/branch
git rebase develop  # or merge
```

### Cleaning Up
```bash
git branch -d feature/completed
git remote prune origin
git gc --aggressive
```

## Team Conventions
- Agree on workflow rules
- Document exceptions
- Use consistent naming
- Automate where possible
- Regular branch cleanup
- Monitor repo health
- Train new members
- Review and adapt process