import { NextApiRequest, NextApiResponse } from 'next';
import { createWriteStream } from 'fs';
import { join } from 'path';
import PDFDocument from 'pdfkit';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { text } = req.body;

        // Create a new PDF document
        const doc = new PDFDocument();
        const filePath = join(process.cwd(), 'public', 'report.pdf');
        const stream = createWriteStream(filePath);
        doc.pipe(stream);

        // Add a logo image to the top of the PDF
        const logoPath = join(process.cwd(), 'public', 'logo.png'); // Replace with your actual logo path
        const imageWidth = 70; // Desired image width
        const imageHeight = 70; // Desired image height

        // Calculate x position to center the image horizontally
        const x = (doc.page.width - imageWidth) / 2;
        // Set y position to a small margin from the top
        const y = 20; // Adjust this value for desired margin from the top

        doc.image(logoPath, x, y, {
            width: imageWidth, // Set the width of the image
            height: imageHeight, // Set the height of the image
        });

        // Add a little space between the image and the text
        doc.moveDown(3); // Adjust the value to set space between the image and text

        // Add text to the PDF
        doc.fontSize(12).font('Helvetica').text(text, {
            align: 'left',
        });

        doc.end();

        // Wait for PDF to be written
        stream.on('finish', () => {
            res.status(200).json({ url: '/report.pdf' });
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
