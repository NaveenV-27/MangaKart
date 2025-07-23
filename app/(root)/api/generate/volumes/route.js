import { NextResponse } from 'next/server';
import db from "@/lib/db";

export async function POST(req) {
  try {
    const { manga_id } = await req.json();

    if (!manga_id) {
      return Response.json({ error: 'manga_id is required' }, { status: 400 });
    }

    const result = await db.query(
      'SELECT * FROM volumes WHERE manga_id = $1 ORDER BY volume_number desc',
      [manga_id]
    );

    if (result.rows.length === 0) {
      console.log('No data of volumes found');
      
      return Response.json({ error: 'No data of volumes found' }, { status: 404 });
    }

    return Response.json({ volumes: result.rows });
  } catch (err) {
    console.error('Error fetching manga details:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
