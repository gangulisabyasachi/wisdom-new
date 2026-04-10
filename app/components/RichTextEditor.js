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
    <div className="word-editor-environment" style={{ 
      background: '#f1f5f9', 
      borderRadius: '12px', 
      border: '1px solid #cbd5e1', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
    }}>
      {/* MS Word Dynamic Ribbon */}
      <div className="editor-ribbon" style={{ 
        background: '#ffffff', 
        padding: '12px 20px', 
        borderBottom: '1px solid #e2e8f0', 
        display: 'flex', 
        gap: '6px', 
        flexWrap: 'wrap', 
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        
        {/* Style selection group */}
        <select onChange={(e) => execCmd('formatBlock', e.target.value)} defaultValue="P" className="ribbon-select" title="Text Style">
          <option value="P">Normal Text</option>
          <option value="H1">HEADING 1 (16px)</option>
          <option value="H2">HEADING 2 (14px)</option>
          <option value="H3">HEADING 3 (12px)</option>
          <option value="BLOCKQUOTE">Scholarly Quote</option>
        </select>
        
        <div className="ribbon-divider"></div>

        <div className="ribbon-btn-group">
          <button type="button" onClick={() => execCmd('bold')} className="ribbon-btn" title="Bold (Ctrl+B)"><b>B</b></button>
          <button type="button" onClick={() => execCmd('italic')} className="ribbon-btn" title="Italic (Ctrl+I)"><i>I</i></button>
          <button type="button" onClick={() => execCmd('underline')} className="ribbon-btn" title="Underline (Ctrl+U)"><u>U</u></button>
        </div>

        <div className="ribbon-divider"></div>

        <div className="ribbon-btn-group">
          <button type="button" onClick={() => execCmd('insertUnorderedList')} className="ribbon-btn" title="Bullet Points">•</button>
          <button type="button" onClick={() => execCmd('insertOrderedList')} className="ribbon-btn" title="Numbered List">1.</button>
        </div>
        
        <div className="ribbon-divider"></div>

        <div className="ribbon-btn-group">
          <button type="button" onClick={() => {
              const url = prompt('Enter Citation/Link URL:');
              if (url) execCmd('createLink', url);
          }} className="ribbon-btn" title="Insert Hyperlink">🔗</button>
          <button type="button" onClick={() => execCmd('unlink')} className="ribbon-btn" title="Remove Link">⌿</button>
        </div>

        <div className="ribbon-divider"></div>

        <button type="button" onClick={() => execCmd('removeFormat')} className="ribbon-btn ribbon-btn-danger" title="Standardize Formatting">⌫ Clear</button>
      </div>

      {/* The "Page" Canvas */}
      <div className="editor-page-scroller" style={{ 
        padding: '40px 20px', 
        maxHeight: '650px', 
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div className="editor-paper-sheet" style={{
            background: '#ffffff',
            width: '100%',
            maxWidth: '850px',
            minHeight: '1100px', /* Mimic A4 aspect */
            padding: '60px 80px', /* Generous manuscript margins */
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            borderRadius: '2px',
            position: 'relative'
        }}>
          <div 
            ref={editorRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={handleInput}
            onBlur={handleInput}
            className="editor-content-area"
            style={{ 
                outline: 'none', 
                minHeight: '1000px',
                color: '#1e293b'
            }}
            dangerouslySetInnerHTML={{ __html: initialValue }}
          />
        </div>
      </div>
      
      {/* Hidden bridge to Server Actions */}
      <input type="hidden" name={name} ref={hiddenInputRef} defaultValue={initialValue} />
      
      <style jsx>{`
        .ribbon-btn-group {
          display: flex;
          background: #f8fafc;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          padding: 2px;
        }
        .ribbon-btn {
          background: transparent; 
          border: none;
          border-radius: 4px; 
          padding: 6px 14px; 
          cursor: pointer; 
          color: #475569; 
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .ribbon-btn:hover { 
          background: #e2e8f0; 
          color: #0f172a;
        }
        .ribbon-btn-danger {
          color: var(--accent);
          border: 1px solid #fee2e2;
          background: #fef2f2;
        }
        .ribbon-btn-danger:hover {
          background: #fee2e2;
          color: var(--accent-hover);
        }
        .ribbon-select { 
          padding: 8px 12px; 
          border: 1px solid #e2e8f0; 
          border-radius: 6px; 
          background: #f8fafc; 
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #475569;
          outline: none;
        }
        .ribbon-select:hover {
          border-color: #cbd5e1;
          color: #1e293b;
        }
        .ribbon-divider {
          width: 1px; 
          height: 24px; 
          background: #e2e8f0; 
          margin: 0 4px;
        }
        .editor-page-scroller::-webkit-scrollbar {
          width: 8px;
        }
        .editor-page-scroller::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .editor-page-scroller::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
