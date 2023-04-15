export async function getBlogPosts(
  limit: number,
  search: string,
  skip?: number
) {
  let query = queryContent(`blog`)
    .only([
      "title",
      "image",
      "time",
      "_path",
      "tags",
      "date",
      "reading",
      "dateText",
      "external",
      "canonical",
    ])
    .limit(limit);

  if (skip) {
    query.skip(skip);
  }

  if (search) {
    query.where({
      title_lowercase: { $contains: [search.toLowerCase()] },
    });
  }

  const response = await query.find();

  const list = response.slice(0, limit - 1);
  const next = response.slice(limit - 1);

  return { list, next };
}
