import { NextResponse } from 'next/server'


export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const PDFParser = require('pdf2json')
        // Initialize pdf2json in text mode (1)
        const pdfParser = new PDFParser(null as any, 1)

        return new Promise<NextResponse>((resolve, reject) => {
            pdfParser.on("pdfParser_dataError", (errData: any) => {
                console.error("PDF Parsing Error:", errData.parserError)
                resolve(NextResponse.json({ error: 'Failed to parse PDF file.', details: errData.parserError?.message }, { status: 500 }))
            });

            pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
                const text = pdfParser.getRawTextContent()
                resolve(NextResponse.json({ text }))
            });

            pdfParser.parseBuffer(buffer)
        })

    } catch (error: any) {
        console.error('Error parsing PDF:', error)
        return NextResponse.json({ error: 'Failed to parse PDF file.', details: error.message, stack: error.stack }, { status: 500 })
    }
}
