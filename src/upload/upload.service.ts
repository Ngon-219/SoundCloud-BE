import { Injectable } from '@nestjs/common';
import { UploadFileDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { v2 } from 'cloudinary';
import * as multer from 'multer';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
    });
  }

  async create(file: Express.Multer.File, folder: string) {
    // console.log('File received:', file);  
    if (!file) {
      throw new Error('No file provided');
    }
  
    const filename = new Date().getTime() + '-' + file.originalname;
  
    try {
      const streamifier = require('streamifier');
      const fileStream = streamifier.createReadStream(file.buffer);
  
      const uploadPromise : any = new Promise((resolve, reject) => {
        const uploadStream = v2.uploader.upload_stream({
          resource_type: 'auto',
          public_id: filename.toString(),
          folder: folder,
          overwrite: true,
          invalidate: true,
        }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        
        fileStream.pipe(uploadStream);
      });
  
      const uploadResult = await uploadPromise;
      // console.log('Upload result:', uploadResult);
      
      return {
        message: 'File uploaded successfully',
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }
  }


  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
