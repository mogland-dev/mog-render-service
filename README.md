# @mogland-dev/mog-render-service

Markdown & Djot Render Service for Mog Core

## Features

- [x] Render Markdown to HTML
- [x] Render Djot to HTML
- [ ] ShortCode Support
- [ ] Text Macro Support

## Events

You can refer to the content of [events.yaml](./events.yaml), create a new `events.yaml` file in the Mog Core running directory, and then add the corresponding events in it.

- `render.markdown.to.html` - Render Markdown to HTML
- `render.djot.to.html` - Render Djot to HTML

## Text Macros

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

### Syntax

## Compare to Mix Space Macro Service

```bash
# iMac
textMacro (Mog) x 346 ops/sec ±3.08% (76 runs sampled) 🌟
textMacro (Mix) x 144 ops/sec ±3.84% (73 runs sampled)
Fastest is textMacro (Mog)

# MacBook
textMacro (Mog) x 765 ops/sec ±4.65% (64 runs sampled) 🌟
textMacro (Mix) x 350 ops/sec ±3.82% (72 runs sampled)
Fastest is textMacro (Mog)
```


<details>
<summary>

#### iMac System Info

</summary>

```
  System:
    OS: macOS 13.0
    CPU: (4) x64 Intel(R) Core(TM) i5-7600K CPU @ 3.80GHz
    Memory: 1.13 GB / 24.00 GB
    Shell: 5.8.1 - /bin/zsh
  Binaries:
    Node: 18.12.1 - /usr/local/opt/node@18/bin/node
    Yarn: 1.22.19 - /usr/local/bin/yarn
    npm: 8.19.3 - /usr/local/bin/npm
```
  
</details>

<details>
<summary>

#### MacBook System Info

</summary>

```
  System:
    OS: macOS 13.2.1
    CPU: (8) arm64 Apple M1
    Memory: 723.80 MB / 16.00 GB
    Shell: 5.8.1 - /bin/zsh
  Binaries:
    Node: 19.3.0 - /opt/homebrew/bin/node
    Yarn: 1.22.19 - /opt/homebrew/bin/yarn
    npm: 9.2.0 - /opt/homebrew/bin/npm
```

</details>

## License

This project is licensed under the AGPLv3 license, and the secondary creation or derivative project using this project must also be open source.

## Author

mog-render-service © Wibus, Released under the AGPL-3.0 License. 

> [Personal Website](http://iucky.cn/) · [Blog](https://blog.iucky.cn/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)