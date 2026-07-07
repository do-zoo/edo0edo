import type {
  PostBySlugQueryResult,
  PostsQueryResult,
  ProjectBySlugQueryResult,
  ProjectsQueryResult,
} from '../../../sanity.types';

export type ProjectListItem = ProjectsQueryResult[number];
export type Project = NonNullable<ProjectBySlugQueryResult>;
export type PostListItem = PostsQueryResult[number];
export type Post = NonNullable<PostBySlugQueryResult>;
