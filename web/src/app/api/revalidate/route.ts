import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { submitIndexNowUrls } from '@/lib/seo/indexnow';

type WebhookPayload = {
  _type?: string;
  slug?: { current?: string };
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true,
    );

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 });
    }

    const indexNowPaths = new Set<string>(['/', '/projects', '/blog']);

    if (body?._type === 'project') {
      revalidateTag('project', 'max');
      revalidatePath('/projects');
      revalidatePath('/');
      if (body.slug?.current) {
        revalidateTag(`project:${body.slug.current}`, 'max');
        revalidatePath(`/projects/${body.slug.current}`);
        indexNowPaths.add(`/projects/${body.slug.current}`);
      }
    }

    if (body?._type === 'post') {
      revalidateTag('post', 'max');
      revalidatePath('/blog');
      if (body.slug?.current) {
        revalidateTag(`post:${body.slug.current}`, 'max');
        revalidatePath(`/blog/${body.slug.current}`);
        indexNowPaths.add(`/blog/${body.slug.current}`);
      }
    }

    try {
      await submitIndexNowUrls([...indexNowPaths]);
    } catch (error) {
      console.error('IndexNow submission failed:', error);
    }

    return Response.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
