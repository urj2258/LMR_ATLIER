
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
        }

        // Validate file size (e.g., 10MB for Cloudinary)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json({ error: 'File too large. Max size is 10MB.' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary using a promise to handle the stream
        const uploadResult: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'lmr_atelier_uploads',
                    resource_type: 'auto',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        return NextResponse.json({
            url: uploadResult.secure_url,
            success: true
        });

    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
