import { connectDB } from '../../../../lib/db';
import Announcement from '../../../../lib/models/Announcement';
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
    await Announcement.findByIdAndDelete(id);
  }

  return NextResponse.redirect(new URL('/admin/announcements', req.url));
}
