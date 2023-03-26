import { randomUUID } from "crypto";
import { createClient } from "redis";
import { textMacro } from "../functions/macros";
import { Handler, HandlerData } from "../types/handler";
import { generateEventDataToGateway, generatePattern, generateResponse } from "../utils";
import { markdownToHtml } from "./markdownToHtml";

export const textFromServer: Handler = (
  _id,
  data,
  _pattern,
  _isEmitter
) => {
  data = data as HandlerData;
  const pattern =
    data.query.type == "page"
      ? generatePattern("page.get.byid.auth")
      : generatePattern("post.get.auth");
  const client = createClient();
  const subscriber = client.duplicate();
  const publisher = client.duplicate();
  Promise.all([subscriber.connect(), publisher.connect()]);
  publisher.publish(
    pattern,
    generateEventDataToGateway(randomUUID(), data.query.id, pattern, false)
  );
  subscriber.subscribe(`${pattern}.reply`, async (message) => {
    const mes = JSON.parse(message)
    if (!mes.err) {
      let res = ''
      res = textMacro(mes.response.text, {
        title: mes.response.title,
        slug: mes.response.slug,
        created: mes.response.created,
        modified: mes.response.modified,
        tags: mes.response.tags,
        count: mes.response.count,
        category: {
          name: mes.response.category.name,
          slug: mes.response.category.slug,
          description: mes.response.category.description,
          icon: mes.response.category.icon,
        },
        fields: mes.response.fields,
      })
      res = markdownToHtml(mes.id, res, mes.pattern, mes.isEmitter) as string;
      res = generateResponse(_id, res);
      publisher.publish(`${_pattern}.reply`, res);
      return res;
    } else {
      const res = generateResponse(_id, mes.err);
      publisher.publish(`${_pattern}.reply`, res);
      return res;
    }
  });
};
