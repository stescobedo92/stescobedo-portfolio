import { getCollection } from 'astro:content';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export async function GET({ url }) {
  const searchParams = new URL(url).searchParams;
  const start = parseInt(searchParams.get('start') || '0');
  const end = parseInt(searchParams.get('end') || '9');

  const posts = await getCollection('blog');
  const filteredPosts = posts.filter((post: any) => {
    const body = post.body ?? '';
    const description = post.data?.description ?? '';
    return (typeof body === 'string' && body.trim().length > 0) || (typeof description === 'string' && description.trim().length > 0);
  });
  const sortedPosts = filteredPosts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(start, end);

  const html = sortedPosts.map(post => `
    <article class="group">
      <div class="bg-gray-50 dark:bg-dark-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span class="bg-${post.data.categoryColor}-100 dark:bg-${post.data.categoryColor}-900/30 text-${post.data.categoryColor}-600 dark:text-${post.data.categoryColor}-400 text-sm font-medium px-2.5 py-0.5 rounded-full">
              ${post.data.category}
            </span>
            <span class="text-gray-500 dark:text-gray-400 text-sm">
              ${format(post.data.pubDate, "d 'de' MMMM, yyyy", { locale: es })}
            </span>
          </div>
          <h3 class="font-bold text-xl group-hover:text-primary-500 transition-colors">
            ${post.data.title}
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            ${post.data.description}
          </p>
          <div class="flex items-center justify-between">
            <a href="/blog/${post.slug}" class="inline-flex items-center text-primary-500 hover:text-primary-600">
              Leer más
              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </a>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              ${post.data.readingTime} min de lectura
            </span>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  return new Response(JSON.stringify({ html }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}