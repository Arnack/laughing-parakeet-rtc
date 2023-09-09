import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const userTable =
      await sql`
        CREATE TABLE Users (
          id SERIAL PRIMARY KEY,
          display_name VARCHAR(255),
          description TEXT,
          education VARCHAR(255),
          email VARCHAR(255),
          languages TEXT,
          photo_url VARCHAR(255),
          price INTEGER,
          price_currency VARCHAR(255),
          services TEXT,
          schedule TEXT
        );
      `;


    return NextResponse.json(
      {
        userTable,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
