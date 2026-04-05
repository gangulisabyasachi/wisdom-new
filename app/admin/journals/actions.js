'use server';

import { connectDB } from '../../../lib/db';
import Journal from '../../../lib/models/Journal';
import { revalidatePath } from 'next/cache';

/**
 * CREATE JOURNAL ACTION
 * Final persistence logic for new manuscripts.
 */
export async function createJournal(formData) {
  try {
    await connectDB();
    console.log("[Create Action] 🚀 Creating Manuscript Record");

    const slug = formData.get('slug');
    const pdfFile = formData.get('pdf_file');
    let pdfPath = '';

    // 📂 Robust PDF File Upload
    if (pdfFile && pdfFile.size > 0) {
      try {
        const bytes = await pdfFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const { join } = await import('path');
        const { writeFile, mkdir } = await import('fs/promises');
        
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        const fileName = `${slug || 'manuscript'}-${Date.now()}.pdf`;
        const filePath = join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        
        pdfPath = `/uploads/${fileName}`;
        console.log(`[Create Action] ✅ PDF Persisted: ${pdfPath}`);
      } catch (err) {
        console.error("[Create Action] ❌ PDF Persistence Failed:", err);
      }
    }

    const newJournalData = {
      topic: formData.get('topic'),
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

    const created = await Journal.create(newJournalData);
    revalidatePath('/admin/journals');
    
    return { success: true, id: created._id.toString() };
  } catch (error) {
    console.error("[Create Action] ❌ Global Failure:", error);
    return { success: false, error: error.message };
  }
}

/**
 * DELETE JOURNAL ACTION
 */
export async function deleteJournal(id) {
  try {
    await connectDB();
    await Journal.findByIdAndDelete(id);
    revalidatePath('/admin/journals');
    return { success: true };
  } catch (error) {
    console.error("Delete Failed:", error);
    return { success: false, error: error.message };
  }
}
