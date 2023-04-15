import { visit } from "unist-util-visit";

const wpm = 225;

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("content:file:afterParse", (file) => {
    if (file._extension == "md") {
      file.title_lowercase = file.title.toLowerCase();
      file.wordCount = 0;
      visit(
        file.body,
        (n: any) => n.type === "text",
        (node) => {
          const len = node.value.trim().split(/\s+/).length;
          file.wordCount += len;
        }
      );
      file.minutes = Math.ceil(file.wordCount / wpm);
      file.reading = `${file.minutes} min read`;

      if (file.date) {
        file.dateText = new Date(file.date).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        });
      }
    }
  });
});
