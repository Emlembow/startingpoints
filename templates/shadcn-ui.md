# shadcn/ui Best Practices

## Setup
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button dialog form
```

```
src/
├── components/ui/    # shadcn components
├── lib/utils.ts      # cn utility
└── styles/globals.css # CSS variables
```

## Component Customization

```typescript
// Using cn utility
import { cn } from "@/lib/utils"

export function Button({ className, variant = "default", ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center rounded-md text-sm",
        {
          "bg-primary hover:bg-primary/90": variant === "default",
          "bg-destructive hover:bg-destructive/90": variant === "destructive",
          "border hover:bg-accent": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}
```

```typescript
// Extending with loading state
import { Button as BaseButton } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function Button({ loading, children, disabled, ...props }) {
  return (
    <BaseButton disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </BaseButton>
  )
}
```

## Theming

```css
/* CSS Variables */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

```typescript
// Theme Provider
const ThemeContext = createContext({})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("system")
  
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    
    const activeTheme = theme === "system" 
      ? matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      : theme
    
    root.classList.add(activeTheme)
  }, [theme])
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

## Forms

```typescript
// React Hook Form + Zod
const schema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
})

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  })
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## Compound Components

```typescript
// Dialog pattern
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogBody />
  </DialogContent>
</Dialog>

// Sheet pattern
<Sheet>
  <SheetTrigger asChild>
    <Button>Open</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

## Accessibility

```typescript
// Accessible patterns
<Button aria-label="User menu">
  <Avatar />
</Button>

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" aria-label="Options">
      <MoreVertical />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// Skip navigation
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to content
</a>
```

## Performance

```typescript
// Code splitting
const HeavyComponent = lazy(() => import("./heavy"))

<Suspense fallback={<Skeleton />}>
  <HeavyComponent />
</Suspense>

// Memoization
const ExpensiveList = memo(({ items }) => {
  const sorted = useMemo(
    () => items.sort((a, b) => a.name.localeCompare(b.name)),
    [items]
  )
  return <List items={sorted} />
})
```

## Best Practices

### Do's
✅ Use cn utility for classes
✅ Extend, don't modify
✅ Follow a11y guidelines
✅ Use CSS variables
✅ Integrate with forms
✅ Keep composable

### Don'ts
❌ No direct modifications
❌ No inline styles
❌ Don't skip keyboard nav
❌ Avoid complexity

## Common Patterns

```typescript
// Data tables
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Toast notifications
const { toast } = useToast()

toast({
  title: "Success",
  description: "Operation completed",
})
```