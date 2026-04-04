import { connectDB } from '../../../../lib/db';
import Journal from '../../../../lib/models/Journal';
import { verifySession } from '../../../../lib/session';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  const formData = await req.formData();
  const id = formData.get('id');

  if (id) {
    await connectDB();
    await Journal.findByIdAndDelete(id);
  }

  return NextResponse.redirect(new URL('/admin/journals', req.url));
}
