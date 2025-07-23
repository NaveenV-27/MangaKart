import { NextResponse } from 'next/server';
import db from "@/lib/db";

export async function GET() {
    try {
        const result = await db.query('SELECT * FROM manga ORDER BY id');
        console.log(result.rows[0].title); 
        return NextResponse.json(result.rows); 
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: 'Failed to fetch manga data' }, { status: 500 });
    }
}


export async function POST(req) {
  try {
    const { title } = await req.json();

    if (!title) {
      return Response.json({ error: 'Title is required' }, { status: 400 });
    }

    const result = await db.query(
      'SELECT * FROM manga WHERE title = $1',
      [title]
    );

    if (result.rows.length === 0) {
      return Response.json({ error: 'Manga not found' }, { status: 404 });
    }

    return Response.json({ manga: result.rows[0] });
  } catch (err) {
    console.error('Error fetching manga details:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function PUT(request) {
    const { title, author, description, cover_image_url, chapter_count } = await request.json();
    try {
        const result = await db.query(
            'INSERT INTO manga (title, author, description, cover_image_url, chapter_count) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, author, description, cover_image_url, chapter_count]
        );
        return NextResponse.json(result.rows[0]); // Return the newly created manga entry
    } catch (error) {
        console.error("Error inserting data:", error);
        return NextResponse.json({ error: 'Failed to insert manga data' }, { status: 500 });
    }
}