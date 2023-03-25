# Text Macros

Text macros are a simple template system that allows you to inject dynamic content into your text. The basic syntax for a text macro is `[[expression]]`. The expression can be a variable or a function call. The macro processor will replace the expression with the result of the evaluation.

## Variables

You can reference a variable using `$variableName`. The variable name can contain letters, numbers, and underscores. The macro processor will replace the variable with the value of the corresponding variable in the context object.

Example: `[[ $title ]]` will be replaced with the value of `context.title`.

## Functions

You can call a function using `#functionName(args)`. The function name can contain letters, numbers, and underscores. The macro processor will replace the expression with the result of the function call.

### Built-in functions

#### `#if`

> **Info**: WIP.

The `if` function takes a condition and two values. If the condition is true, it returns the first value. Otherwise, it returns the second value.

Syntax: `#if(condition, trueValue, falseValue)`

Example: `[[ #if(isPublished, "Published", "Not published") ]]`

#### `#join`

> **Info**: WIP.

The `join` function takes an array and a separator and returns a string that concatenates the elements of the array separated by the separator.

Syntax: `#join(array, separator)`

Example: `[[ #join(tags, ", ") ]]`

### Custom functions

You can define your own functions by adding them to the functions object in the context object.

Example:

```js
const context = {
  functions: {
    double: (value) => value * 2
  }
};
```

Syntax: `#functionName(args)`

Example: `[[ #double($value) ]]`

## JavaScript expressions

You can also use JavaScript expressions in your text macros by enclosing them in parentheses.

Example: `[[ #(2 + 2) ]]`