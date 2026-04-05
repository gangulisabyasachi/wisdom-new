/**
 * 🛡️ PDF SERVER POLYFILL
 * This file mocks browser-only DOM classes that pdf.js-dist (via pdf-parse) 
 * expects to find in the global namespace. 
 */

if (typeof global.DOMMatrix === 'undefined') {
  console.log("[Polyfill] Initializing Server-Side DOM Mocks");
  
  global.DOMMatrix = class DOMMatrix {
    constructor() {}
    static fromMatrix() { return new DOMMatrix(); }
  };
  
  global.DOMPoint = class DOMPoint {
    constructor() {}
  };
  
  global.DOMRect = class DOMRect {
    constructor() {}
    static fromRect() { return new DOMRect(); }
  };

  global.Canvas = class Canvas {
    constructor() {}
    getContext() { return { fillRect: () => {}, clearRect: () => {} }; }
  };

  global.Image = class Image {
    constructor() {}
  };

  global.Path2D    = class Path2D    { constructor() {} };
  global.ImageData = class ImageData { constructor() {} };
}

// ⚙️ Disable pdfjs-dist web worker in Node.js server environments.
// This must run before any pdf-parse/pdfjs-dist module is initialized.
try {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  if (pdfjsLib?.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = false;
    console.log("[Polyfill] ✅ pdfjs-dist worker disabled.");
  }
} catch (e) {
  // If pdfjs-dist isn't imported yet, it'll pick up the null Worker below
  if (typeof global.Worker === 'undefined') {
    global.Worker = null;
  }
}
