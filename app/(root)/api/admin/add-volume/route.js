import db from '@/lib/db';

export async function POST(req) {
  const { manga_id, volume_number, title, cover, release } = await req.json();

  try {
    await db.query(
      'INSERT INTO volumes (manga_id, volume_number, title, cover_image_url, release_date) VALUES ($1, $2, $3, $4, $5)',
      [manga_id, volume_number, title, cover, release]
    );
    return Response.json({ message: 'Manga added successfully' });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to add manga' }, { status: 500 });
  }
}
