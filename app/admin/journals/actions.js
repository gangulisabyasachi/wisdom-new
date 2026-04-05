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

    const pubDate = formData.get('published_date');
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
      volume: Number(formData.get('volume')),
      issue: Number(formData.get('issue')),
      page: formData.get('page'),
      pdf_path: pdfPath,
      published_date: pubDate ? new Date(pubDate) : new Date(),
      status: 'published'
    };

    console.log("[Create Action] 📝 Data Prepared:", newJournalData.topic);

    const created = await Journal.create(newJournalData);
    console.log("[Create Action] ✅ Record Saved:", created._id);

    revalidatePath('/admin/journals');
    
    return { success: true, id: created._id.toString() };
  } catch (error) {
    console.error("[Create Action] ❌ ERROR:", error);
    return { 
      success: false, 
      error: error.name + ": " + error.message 
    };
  }
}

/**
 * DELETE JOURNAL ACTION
 */
export async function deleteJournal(id) {
  try {
    await connectDB();
    
    // 🔍 Find the record first to get the PDF path
    const journal = await Journal.findById(id);
    if (!journal) {
      return { success: false, error: "Journal not found" };
    }

    const pdfPath = journal.pdf_path;
    
    // 🗑️ Delete from Database
    await Journal.findByIdAndDelete(id);

    // 📂 Delete from Filesystem if exists
    if (pdfPath && pdfPath.startsWith('/uploads/')) {
      try {
        const { join } = await import('path');
        const { unlink } = await import('fs/promises');
        const fullDiskPath = join(process.cwd(), 'public', pdfPath);
        
        await unlink(fullDiskPath);
        console.log(`[Delete Action] ✅ File Deleted: ${fullDiskPath}`);
      } catch (fileErr) {
        console.error("[Delete Action] ⚠️ Database deleted but file cleanup failed:", fileErr.message);
        // We still return success: true because the DB record IS gone.
      }
    }

    revalidatePath('/admin/journals');
    return { success: true };
  } catch (error) {
    console.error("Delete Failed:", error);
    return { success: false, error: error.message };
  }
}
