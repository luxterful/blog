export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("content:file:afterParse", (file) => {
    if (file._extension == "md") {
      file.title_lowercase = file.title.toLowerCase();
      file.reading = file.readingTime.text;
      if (file.date) {
        file.dateText = new Date(file.date).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        });
      }
    }
    console.log("content:file:beforeParse called", file);
  });
});
