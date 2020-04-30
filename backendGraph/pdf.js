const PDFDocument = require('pdfkit');
const fs = require('fs');
// Create a document
const doc = new PDFDocument;

module.exports = {
    pdf: function (args) {
        // Pipe its output somewhere, like to a file or HTTP response
        // See below for browser usage
        doc.pipe(res);

        // Embed a font, set the font size, and render some text
        doc.text('Some text with an embedded font!', 100, 100);

        // Draw a triangle
        doc.save()
            .moveTo(100, 150)
            .lineTo(100, 250)
            .lineTo(200, 250)
            .fill("#FF3300");

        // Finalize PDF file
        doc.end();
    }
}
