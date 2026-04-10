import { connectDB } from '@/lib/db';
import Journal from '@/lib/models/Journal';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    await connectDB();
    const journal = await Journal.findById(id).lean();
    if (!journal) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(journal);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
