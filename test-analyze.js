const fs = require('fs');

async function testAnalyze() {
    try {
        const res = await fetch('http://localhost:3000/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resumeText: 'Test resume text for testing' })
        });

        const text = await res.text();
        console.log('HTTP Status:', res.status);
        console.log('Response:', text);
    } catch (err) {
        console.error('Fetch Error:', err);
    }
}

testAnalyze();
