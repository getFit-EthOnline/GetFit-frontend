import { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';
import cloudinary from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (stream: Readable) => {
    return new Promise<string>((resolve, reject) => {
        const cloudinaryUploadStream = cloudinary.v2.uploader.upload_stream(
            { resource_type: 'raw', public_id: 'report' }, // Adjust public_id as needed
            (error, result) => {
                if (error) return reject(error);
                resolve(result?.secure_url || '');
            }
        );
        stream.pipe(cloudinaryUploadStream);
    });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { text } = req.body;

        // Create a new PDF document
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', async () => {
            const pdfBuffer = Buffer.concat(buffers);
            try {
                const url = await uploadToCloudinary(Readable.from(pdfBuffer));
                res.status(200).json({ url });
            } catch (error) {
                console.error('Error uploading to Cloudinary:', error);
                res.status(500).json({ message: 'Error uploading PDF' });
            }
        });

        // Add text to the PDF
        doc.fontSize(12).text(text, {
            align: 'left',
        });
        doc.end();
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
