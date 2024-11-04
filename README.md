# React State Management: Props vs Context API

## by 39_Virachai

This repository demonstrates two different approaches to managing state updates from deeply nested child components to a parent component in React:

1. Traditional prop drilling
2. Context API

## Problem Statement

Often in React applications, we need to update state in a parent component from a deeply nested child component. This creates two common challenges:

- Passing props through multiple intermediate components that don't need them
- Maintaining clean and manageable code structure

## Solution Comparison

### Approach 1: Prop Drilling

```jsx
// Parent Component
function NoContext() {
  const [propValue, setPropValue] = useState("No Context");
  const handlePropChange = (newValue) => setPropValue(newValue);

  return <Component2 handlePropChange={handlePropChange} />;
}

// Intermediate Components
function Component2({ handlePropChange }) {
  return <Component3 handlePropChange={handlePropChange} />;
}

function Component3({ handlePropChange }) {
  return <Component4 handlePropChange={handlePropChange} />;
}

// Child Component that needs the function
function Component5({ handlePropChange }) {
  return (
    <button onClick={() => handlePropChange("New Value")}>Update Parent</button>
  );
}
```

#### Pros of Prop Drilling:

- Explicit data flow - easy to track where props come from
- No additional setup required
- Better for small component trees
- More predictable behavior

#### Cons of Prop Drilling:

- Props must pass through every intermediate component
- Components become tightly coupled
- Code becomes harder to maintain as the app grows
- Intermediate components receive unnecessary props

### Approach 2: Context API

```jsx
// Create Context
const PropValueContext = createContext();

// Parent Component
function WithContext() {
  const [propValue, setPropValue] = useState("Use Context");
  const handlePropChange = (newValue) => setPropValue(newValue);

  return (
    <PropValueContext.Provider value={{ propValue, handlePropChange }}>
      <Component2 />
    </PropValueContext.Provider>
  );
}

// Intermediate Components (no props needed)
function Component2() {
  return <Component3 />;
}

function Component3() {
  return <Component4 />;
}

// Child Component that needs the function
function Component5() {
  const { handlePropChange } = useContext(PropValueContext);
  return (
    <button onClick={() => handlePropChange("New Value")}>Update Parent</button>
  );
}
```

#### Pros of Context API:

- Eliminates prop drilling
- Cleaner component interfaces
- More maintainable code
- Better for large component trees
- Intermediate components stay simple

#### Cons of Context API:

- Slightly more setup required
- Can make component reuse more difficult
- Might be overkill for small applications
- Less explicit data flow

## When to Use Each Approach

### Use Prop Drilling When:

- You have a shallow component tree (2-3 levels)
- The data flow should be explicit
- You want to maintain high component reusability
- You're building a small application

### Use Context API When:

- You have a deep component tree (4+ levels)
- Many components need the same data
- Prop drilling becomes unmanageable
- You want to avoid "prop pollution" in intermediate components

## Best Practices

1. **Start Simple**: Begin with prop drilling and only introduce Context when needed
2. **Context Scope**: Keep Context providers as close as possible to where they're needed
3. **Documentation**: Document Context usage and maintain a clear provider hierarchy
4. **Performance**: Remember that Context triggers re-renders for all consuming components
5. **Modularization**: Split different concerns into separate Contexts

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Compare the two implementations in:
   - `src/NoContext.jsx`
   - `src/ToUseContext.jsx`

## Conclusion

Both prop drilling and Context API have their place in React applications. The choice between them depends on your specific use case, component tree depth, and maintainability requirements. This example demonstrates how to implement both approaches effectively.
