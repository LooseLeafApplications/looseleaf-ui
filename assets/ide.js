/**
 * LooseLeaf UI - Live REPL Engine
 * Listens to the editor pane and compiles an iframe preview in real-time.
 */

const editor = document.getElementById("html-editor");
const frame = document.getElementById("preview-frame");

function updatePreview() {
  const userHTML = editor.value;

  // Construct the master HTML document to inject into the iframe
  const frameContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="assets/00-harmonics.css">
        <link rel="stylesheet" href="assets/01-primitives.css">
        <link rel="stylesheet" href="assets/02-atoms.css">
        <link rel="stylesheet" href="assets/03-organisms.css">
        <link rel="stylesheet" href="assets/sandbox.css">
        <style>
          /* Give the iframe body some breathing room */
          body { padding: 2rem; }
        </style>
      </head>
      <body>
        ${userHTML}
      </body>
    </html>
  `;

  // Access the iframe's internal document
  const frameDoc = frame.contentDocument || frame.contentWindow.document;

  // Open, wipe, write, and close to trigger a fresh render
  frameDoc.open();
  frameDoc.write(frameContent);
  frameDoc.close();
}

// Attach listener to re-compile on every keystroke
editor.addEventListener("input", updatePreview);

// Run the compiler immediately on load to render the default textarea code
document.addEventListener("DOMContentLoaded", updatePreview);
