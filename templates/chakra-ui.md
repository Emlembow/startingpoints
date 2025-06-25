# Chakra UI Best Practices

## Setup
```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

```tsx
<ChakraProvider theme={theme}>
  {/* Your app */}
</ChakraProvider>
```

## Theme Configuration

```typescript
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#e4f2ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'brand.500',
          _hover: { bg: 'brand.600' },
        },
      },
    },
  },
});
```

## Layout Components

```tsx
// Container
<Container maxW="container.xl" px={{ base: 4, md: 8 }}>
  <Box>Content</Box>
</Container>

// Flex
<Flex direction={{ base: 'column', md: 'row' }} gap={4}>
  <Box flex="1">Left</Box>
  <Box flex="2">Right</Box>
</Flex>

// Grid
<Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
  <GridItem>Item</GridItem>
</Grid>
```

## Style Props

```tsx
// Basic styling
<Box bg="gray.100" p={4} borderRadius="md" _hover={{ boxShadow: 'lg' }}>
  <Text fontSize="lg" fontWeight="bold">Content</Text>
</Box>

// Responsive
<Box
  fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
  p={{ base: 2, md: 4, lg: 6 }}
/>
```

## Custom Components

```tsx
// Compound component
export const Card = ({ children, ...props }) => (
  <Box borderWidth="1px" borderRadius="lg" {...props}>
    {children}
  </Box>
);

Card.Header = ({ children, ...props }) => (
  <Box p={4} borderBottomWidth="1px" {...props}>{children}</Box>
);

Card.Body = ({ children, ...props }) => (
  <Box p={4} {...props}>{children}</Box>
);

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

## Hooks

```tsx
// Modal control
const { isOpen, onOpen, onClose } = useDisclosure();

// Color mode
const { colorMode, toggleColorMode } = useColorMode();

// Responsive values
const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

// Toast
const toast = useToast();
toast({
  title: 'Success',
  status: 'success',
  duration: 3000,
});
```

## Accessibility

```tsx
// Accessible form
<FormControl isRequired isInvalid={!!errors.email}>
  <FormLabel>Email</FormLabel>
  <Input aria-describedby="email-helper" />
  <FormHelperText id="email-helper">We'll never share your email.</FormHelperText>
  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
</FormControl>

// Skip nav
<SkipNavLink>Skip to content</SkipNavLink>
<SkipNavContent />
```

## Performance

```tsx
// Code splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Spinner />}>
  <HeavyComponent />
</Suspense>

// Memoization
const ExpensiveComponent = memo(({ data }) => (
  <Box>{/* content */}</Box>
));
```

## Dark Mode

```tsx
// Adaptive colors
const bg = useColorModeValue('white', 'gray.800');
const color = useColorModeValue('gray.800', 'white');

<Box bg={bg} color={color}>
  Themed content
</Box>

// Toggle button
<IconButton
  icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
  onClick={toggleColorMode}
/>
```

## Forms

```tsx
// With React Hook Form
const { register, handleSubmit, formState: { errors } } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <Stack spacing={4}>
    <FormControl isInvalid={errors.name}>
      <FormLabel>Name</FormLabel>
      <Input {...register('name', { required: 'Required' })} />
      <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
    </FormControl>
    <Button type="submit">Submit</Button>
  </Stack>
</form>
```

## Best Practices

### Do's
✅ Use style props
✅ Extend theme
✅ Follow a11y guidelines
✅ Use layout components
✅ Leverage hooks
✅ Responsive design

### Don'ts
❌ No inline styles
❌ No hardcoded values
❌ Don't mutate theme
❌ Avoid deep nesting
❌ Support color modes

## Common Patterns

```tsx
// Responsive array syntax
p={[2, 4, 6, 8]}  // mobile, tablet, desktop, wide

// Pseudo props
_hover={{ bg: 'gray.100' }}
_focus={{ ring: 2 }}
_active={{ transform: 'scale(0.98)' }}

// Semantic tokens
color="chakra-body-text"
bg="chakra-body-bg"
```