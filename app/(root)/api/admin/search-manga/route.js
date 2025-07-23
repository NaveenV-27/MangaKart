import db from '@/lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';

  try {
    const result = await db.query(
      `SELECT id, title FROM manga WHERE LOWER(title) LIKE LOWER($1) LIMIT 10`,
      [`%${query}%`]
    );
    return Response.json({ manga: result.rows });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to search manga' }, { status: 500 });
  }
}
 