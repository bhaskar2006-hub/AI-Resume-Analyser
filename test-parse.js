const fs = require('fs');

async function testParse() {
    try {
        const formData = new FormData();
        // Use a small dummy text file since it handles both or just create an empty PDF.
        // Let's create a minimal PDF
        const pdfContent = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n188\n%%EOF');

        fs.writeFileSync('test.pdf', pdfContent);

        const file = new Blob([pdfContent], { type: 'application/pdf' });
        formData.append('file', file, 'test.pdf');

        const res = await fetch('http://localhost:3000/api/parse-pdf', {
            method: 'POST',
            body: formData
        });

        const text = await res.text();
        console.log('HTTP Status:', res.status);
        console.log('Response:', text);
    } catch (err) {
        console.error('Fetch Error:', err);
    }
}

testParse();
