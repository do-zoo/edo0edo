export const projectsQuery = `*[_type == "project"] | order(publishedAt desc) {
  _id, title, slug, description, coverImage, tags, liveUrl, githubUrl, featured, publishedAt
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id, title, slug, description, coverImage, tags, liveUrl, githubUrl, featured, publishedAt, body
}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(publishedAt desc)[0...3] {
  _id, title, slug, description, coverImage, tags, liveUrl, githubUrl, publishedAt
}`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, excerpt, coverImage, tags, publishedAt
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, excerpt, coverImage, tags, publishedAt, body
}`;
