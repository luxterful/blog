import { serverQueryContent } from "#content/server";
import RSS from "rss";

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: "LUXTER BLOG",
    feed_url: "https://blog.luxterful.eu/rss",
    site_url: "https://blog.luxterful.eu",
    language: "de",
  });

  const posts = await serverQueryContent(event, "blog").limit(15).find();

  for (const post of posts) {
    const title = post.title || "";

    const urlInternal = "https://blog.luxterful.eu" + post._path;
    const urlExternal = post.canonical;

    const url = post.external ? urlExternal : urlInternal;
    const date = post.date;
    feed.item({ title, description: title, url, date });
  }

  event.node.res.setHeader("content-type", "text/xml");

  return feed.xml();
});
