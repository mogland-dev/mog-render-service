# @mogland-dev/mog-render-service

Markdown & Djot Render Service for Mog Core

## Features

- [x] Render Markdown to HTML
- [x] Render Djot to HTML
- [ ] Short Codes Support
- [x] [Text Macros Support](./src/functions/macros.md)

## Events

You can refer to the content of [events.yaml](./events.yaml), create a new `events.yaml` file in the Mog Core running directory, and then add the corresponding events in it.

- `render.markdown.to.html` - Render Markdown to HTML
  - Method: `POST`
  - Body: YOUR MARKDOWN TEXT
- `render.djot.to.html` - Render Djot to HTML
  - Method: `POST`
  - Body: YOUR DJOT TEXT
- `render.from.server` - Render Text from Server
  - Method: `GET`
  - Query: `id` - The ID of the post or page
  - Query: `type` - The type of the post or page, `post` or `page`

## License

This project is licensed under the AGPLv3 license, and the secondary creation or derivative project using this project must also be open source.

## Author

mog-render-service © Wibus, Released under the AGPL-3.0 License. 

> [Personal Website](http://iucky.cn/) · [Blog](https://blog.iucky.cn/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)