'use client';
import { useRef } from 'react';

export default function RichTextEditor({ name, initialValue = '', onChange }) {
  const editorRef = useRef(null);
  const hiddenInputRef = useRef(null);

  const execCmd = (cmd, arg = null) => {
    document.execCommand(cmd, false, arg);
    editorRef.current.focus();
    handleInput();
  };

  // Completely bypass React State to prevent React from aggressively 
  // overriding the contentEditable DOM node on every single keystroke.
  const handleInput = () => {
    if (editorRef.current && hiddenInputRef.current) {
      hiddenInputRef.current.value = editorRef.current.innerHTML;
    }
  };

  return (
    <div className="custom-editor-wrapper" style={{ border: '2px solid var(--admin-border)', borderRadius: '10px', overflow: 'hidden', background: 'white' }}>
      <div className="editor-toolbar" style={{ background: '#f8fafc', padding: '10px 15px', borderBottom: '2px solid var(--admin-border)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        
        <select onChange={(e) => execCmd('formatBlock', e.target.value)} defaultValue="P" className="toolbar-select">
          <option value="P">Paragraph (Normal)</option>
          <option value="H1">Heading 1</option>
          <option value="H2">Heading 2</option>
          <option value="H3">Heading 3</option>
          <option value="BLOCKQUOTE">Quote</option>
        </select>
        
        <div style={{ width: '1px', background: '#ccc', margin: '0 5px' }}></div>

        <button type="button" onClick={() => execCmd('bold')} className="toolbar-btn" title="Bold"><b>B</b></button>
        <button type="button" onClick={() => execCmd('italic')} className="toolbar-btn" title="Italic"><i>I</i></button>
        <button type="button" onClick={() => execCmd('underline')} className="toolbar-btn" title="Underline"><u>U</u></button>
        
        <div style={{ width: '1px', background: '#ccc', margin: '0 5px' }}></div>

        <button type="button" onClick={() => execCmd('insertUnorderedList')} className="toolbar-btn">• List</button>
        <button type="button" onClick={() => execCmd('insertOrderedList')} className="toolbar-btn">1. List</button>
        
        <div style={{ width: '1px', background: '#ccc', margin: '0 5px' }}></div>

        <button type="button" onClick={() => {
            const url = prompt('Enter link URL (e.g., https://google.com):');
            if (url) execCmd('createLink', url);
        }} className="toolbar-btn">🌐 Link</button>
        <button type="button" onClick={() => execCmd('unlink')} className="toolbar-btn">Unlink</button>
      </div>

      <div 
        ref={editorRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={handleInput}
        onBlur={handleInput}
        className="editor-content-area"
        style={{ minHeight: '350px', padding: '1.5rem', outline: 'none', lineHeight: '1.6', fontSize: '1rem', color: '#333' }}
        dangerouslySetInnerHTML={{ __html: initialValue }}
      />
      
      {/* Hidden DOM input bridges the pure JS textarea payload directly to the Next.js Server Action form securely */}
      <input type="hidden" name={name} ref={hiddenInputRef} defaultValue={initialValue} />
      
      <style jsx>{`
        .toolbar-btn {
          background: white; 
          border: 1px solid #cbd5e1; 
          border-radius: 6px; 
          padding: 6px 12px; 
          cursor: pointer; 
          color: #333; 
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .toolbar-btn:hover { 
          background: #e2e8f0; 
          border-color: #94a3b8;
        }
        .toolbar-select { 
          padding: 6px 10px; 
          border: 1px solid #cbd5e1; 
          border-radius: 6px; 
          background: white; 
          cursor: pointer;
          font-family: inherit;
        }
        .editor-content-area {
            font-family: 'Outfit', sans-serif;
        }
        .editor-content-area:focus {
            background: #fdfdfd;
        }
      `}</style>
    </div>
  );
}
