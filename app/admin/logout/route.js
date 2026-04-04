import { deleteSession } from '../../../lib/session';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await deleteSession();
  return NextResponse.redirect(new URL('/admin/login', req.url));
}
