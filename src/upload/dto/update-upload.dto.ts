import { PartialType } from '@nestjs/mapped-types';
import { UploadFileDto } from './create-upload.dto';

export class UpdateUploadDto extends PartialType(UploadFileDto) {}
