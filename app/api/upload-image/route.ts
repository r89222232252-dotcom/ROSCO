import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        resolve(NextResponse.json({ error: 'Form parse error' }, { status: 400 }));
        return;
      }
      const file = files.image;
      if (!file) {
        resolve(NextResponse.json({ error: 'No file uploaded' }, { status: 400 }));
        return;
      }
      try {
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: 'portfolio',
        });
        resolve(NextResponse.json({ url: result.secure_url }));
      } catch (error) {
        resolve(NextResponse.json({ error: 'Cloudinary upload error' }, { status: 500 }));
      }
    });
  });
}
