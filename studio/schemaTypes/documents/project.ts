import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'liveUrl', type: 'url' }),
    defineField({ name: 'githubUrl', type: 'url' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: { select: { title: 'title', media: 'coverImage' } },
});
