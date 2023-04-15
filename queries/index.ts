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
    const rx = /#[A-Za-z0-9_äÄöÖüÜß]+/g;
    const searchText = search.toLowerCase();

    const tags = searchText.match(rx)?.map((s) => s.slice(1));

    const words = searchText
      .split(rx)
      .map((s) => s.trim())
      .filter((s) => s !== "");

    query.where({
      title_lowercase: { $contains: words },
      ...(tags ? { tags: { $in: tags } } : {}),
    });
  }

  const response = await query.find();

  const list = response.slice(0, limit - 1);
  const next = response.slice(limit - 1);

  return { list, next };
}
