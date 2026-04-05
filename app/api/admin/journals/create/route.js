import { connectDB } from '../../../../../lib/db';
import Journal from '../../../../../lib/models/Journal';
import { verifySession } from '../../../../../lib/session';
import { redirect } from 'next/navigation';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(req) {
  const session = await verifySession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const formData = await req.formData();
    await connectDB();

    const topic = formData.get('topic');
    const slug = formData.get('slug');
    const pdfFile = formData.get('pdf_file');
    let pdfPath = '';

    // 📂 Handle PDF File Upload
    if (pdfFile && pdfFile.size > 0) {
      const bytes = await pdfFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });

      const fileName = `${slug || 'manuscript'}-${Date.now()}.pdf`;
      const path = join(uploadDir, fileName);
      await writeFile(path, buffer);
      
      pdfPath = `/uploads/${fileName}`;
    }

    const newJournalData = {
      topic,
      authors: formData.get('authors'),
      affiliations: formData.get('affiliations'),
      abstract: formData.get('abstract'),
      body: formData.get('body'),
      citation: formData.get('citation'),
      keywords: formData.get('keywords'),
      doi: formData.get('doi'),
      slug,
      volume: formData.get('volume'),
      issue: formData.get('issue'),
      page: formData.get('page'),
      pdf_path: pdfPath,
      published_date: formData.get('published_date') ? new Date(formData.get('published_date')) : null,
      status: 'published'
    };

    await Journal.create(newJournalData);
  } catch (err) {
    console.error("Journal Creation Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }

  // Redirect after success
  return Response.redirect(new URL('/admin/journals', req.url));
}
