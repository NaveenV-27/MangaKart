import db from '@/lib/db';

export async function POST(req) {
  const { title, author, description, cover_image_url, chapter_count } = await req.json();

  try {
    await db.query(
      'INSERT INTO manga (title, author, description, cover_image_url, chapter_count) VALUES ($1, $2, $3, $4, $5)',
      [title, author, description, cover_image_url, chapter_count]
    );
    return Response.json({ message: 'Manga added successfully' });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to add manga' }, { status: 500 });
  }
}
