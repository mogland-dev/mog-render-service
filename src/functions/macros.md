# Text Macros

Text macros are a simple template system that allows you to inject dynamic content into your text. The basic syntax for a text macro is `[[expression]]`. The expression can be a variable or a function call. The macro processor will replace the expression with the result of the evaluation.

Text macros are a powerful tool that can save you a lot of time when creating documents. They allow you to define reusable pieces of text that can be inserted into your document by using a simple syntax.

Using text macros is easy. Here's how you can get started:

### Example

For example, I have a paragraph, but there are something is dynamic, so I want to use a macro to replace it.

```markdown
<span class="text blur">My First Blog Post</span> was created on Sat, 25 Mar 2023 15:26:37 GMT. 
```

In this example, the text `My First Blog Post` and the date `Sat, 25 Mar 2023 15:26:37 GMT` are dynamic, so I want to use a macro to replace them.

```markdown
[[ #blur($title) ]] was created on [[ #dayjs($created).format("MMMMDD, YYYY") ]]. 
```

## Compare to Mix Space Macro Service

```bash
textMacro (Mog) x 690 ops/sec ±3.88% (71 runs sampled) 🌟
textMacro (Mix) x 512 ops/sec ±4.49% (73 runs sampled)
Fastest is textMacro (Mog). 1.35x faster
```

## Variables

You can reference a variable using `$variableName`. The variable name can contain letters, numbers, and underscores. The macro processor will replace the variable with the value of the corresponding variable in the context object.

Example: `[[ $title ]]` will be replaced with the value of article's `title`.

### Available variables

- `$title` - The title of the post or page.
- `$slug` - The slug of the post or page.
- `$created` - The creation date of the post or page.
- `$modified` - The modification date of the post or page.
- `$tags` - The tags of the post or page.
- `$count` - The count of the post or page.
  - `read` - The read count of the post or page.
  - `like` - The like count of the post or page.
- `$category` - The category of the post or page.
  - `name` - The name of the category of the post or page.
  - `slug` - The slug of the category of the post or page.
  - `description` - The description of the category of the post or page.
  - `icon` - The icon of the category of the post or page.
- `$fields` - The fields of the post or page.

## Functions

You can call a function using `#functionName(args)`. The function name can contain letters, numbers, and underscores. The macro processor will replace the expression with the result of the function call.

### Built-in Modules

#### `#dayjs`

> **Info**: WIP.

The `dayjs` module provides a set of functions for working with dates and times.

Syntax: `#dayjs(args)`

Example: `[[ #dayjs($created).format("MMMMDD, YYYY") ]]`

### Built-in functions

#### `#if`

The `if` function takes a condition and two values. If the condition is true, it returns the first value. Otherwise, it returns the second value.

Syntax: `#if(condition, trueValue, falseValue)`

Example: `[[ #if(isPublished, "Published", "Not published") ]]`

#### `#join`

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