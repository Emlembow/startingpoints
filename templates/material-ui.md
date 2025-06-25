# Material-UI (MUI) Best Practices

## Project Structure
```
src/
├── components/    # UI components
├── pages/         # Page components  
├── styles/        # Theme & global styles
└── utils/         # Helper functions
```

## Theme Configuration

### Creating a Custom Theme
```javascript
// styles/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

export default theme;
```

### Theme Provider Setup
```javascript
// App.jsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## Styling Approaches

### Using the sx Prop
```javascript
import Box from '@mui/material/Box';

function Component() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        p: 2,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      }}
    >
      Content
    </Box>
  );
}
```

### Styled Components API
```javascript
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2, 4),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
```

### makeStyles Alternative (Emotion)
```javascript
import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';

function Component() {
  const theme = useTheme();
  
  const styles = css`
    background-color: ${theme.palette.primary.main};
    padding: ${theme.spacing(2)};
  `;
  
  return <div css={styles}>Content</div>;
}
```

## Component Patterns

### Form Handling
```javascript
import { TextField, Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('email', { required: 'Email is required' })}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}
```

### Responsive Layout
```javascript
import { Grid, Container } from '@mui/material';

function Layout() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>Content 1</Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>Content 2</Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card>Content 3</Card>
        </Grid>
      </Grid>
    </Container>
  );
}
```

## Common Components

### App Bar with Navigation
```javascript
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
```

### Data Table
```javascript
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function DataTable({ data }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Performance Optimization

### Code Splitting
```javascript
import { lazy, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Bundle Size Optimization
```javascript
// Import only what you need
import Button from '@mui/material/Button';
// Not: import { Button } from '@mui/material';
```

## Accessibility

### ARIA Attributes
```javascript
<IconButton
  aria-label="delete"
  onClick={handleDelete}
>
  <DeleteIcon />
</IconButton>
```

### Keyboard Navigation
```javascript
<List>
  {items.map((item, index) => (
    <ListItem
      button
      key={item.id}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick(item);
      }}
    >
      {item.name}
    </ListItem>
  ))}
</List>
```

## Best Practices

### Do's
✅ Use theme for consistency
✅ Leverage sx prop
✅ Create styled components
✅ Import individually
✅ Follow accessibility
✅ Use Grid for layouts

### Don'ts
❌ No inline styles
❌ No DOM manipulation
❌ Don't mutate theme
❌ Avoid deep nesting