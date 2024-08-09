
import { Controller, Post, UploadedFile, UseInterceptors, Body, Get, Param, Res, Logger, Put, UseFilters, ValidationPipe, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleDriveService } from '../../services/google-drive.service';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { HttpErrorFilter } from '../../common/filters/http-error.filter';
import { DocType } from 'server/src/Models/docType.model';


@ApiTags('docs')
@Controller('docs')
@UseFilters(HttpErrorFilter) 
@ApiBearerAuth()
export class GoogleDriveController {
  constructor(private readonly googleDriveService: GoogleDriveService) { }
  @Post()
  @ApiOperation({ summary: 'Upload a file' })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    required: true,
    type: 'multipart/form-data',
    schema: { type: 'object', properties: { file: { type: 'string', format: 'binary', }, clientId: { type: 'string', } }, },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
      }
    })
  }))
  async uploadFile(@UploadedFile(new ValidationPipe()) file: Express.Multer.File, @Body('clientId',new ValidationPipe()) clientId: string, @Body('docType',new ValidationPipe())docType:string, @Res() res: Response) {

    console.log(file);
    console.log(clientId);
    
    
    try {
      const response = await this.googleDriveService.uploadFile(file, clientId,docType);
      return res.json(response);
    } catch (error) {
      console.error('Upload failed:', error);
      return res.status(500).json({ error: 'Upload failed' });
    }
  }

  @Get('file/:fileId')
  async getFile(@Param('fileId',new ValidationPipe()) fileId: string, @Res() res: Response) {
    try {
      const { stream, mimeType, name } = await this.googleDriveService.getFile(fileId);
      const encodedFilename = encodeURIComponent(name)
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `inline; filename*=UTF-8''${encodedFilename}`);
      stream.pipe(res);
    } catch (error) {
      console.error('Error fetching file:', error);
      res.status(500).json({ error: 'Failed to fetch file' });
    }
  }

  @Get('filedown/:fileId')
  async downloadFile(@Param('fileId',new ValidationPipe()) fileId: string, @Res() res: Response) {
    try {
      const fileBuffer = await this.googleDriveService.getFileDown(fileId);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename=${fileId}`);
      res.send(fileBuffer);
    } catch (error) {
      console.error('Download failed:', error);
      res.status(500).send('Failed to download file');
    }
  }
  @Get('/link/:clientId/:fileName')
  async getLink(@Param('clientId',new ValidationPipe()) clientId: string, @Param('fileName',new ValidationPipe()) fileName: string, @Res() res: Response) {
    try {
      const response = await this.googleDriveService.getLink(clientId, fileName);
      return res.json(response);
    } catch (error) {
      console.error('get file name failed:', error);
      return res.status(500).json({ error: 'get file name failed' });
    }
  }
  @ApiBody({ schema: { type: 'object', properties: { fileId: { type: 'string', }, email: { type: 'string', } } }, })
  @Put('permission')
  async setPermission(@Body('fileId',new ValidationPipe()) fileId: string, @Body('email',new ValidationPipe()) email: string, @Res() res: Response) {
    try {
      const response = await this.googleDriveService.setFilePermissions(fileId, email);
      return res.json(response);
    } catch (error) {
      console.error('get file name failed:', error);
      return res.status(500).json({ error: 'get file name failed' });
    }
  }
  @Get('files/:clientId')
  async getAllFiles(@Param('clientId',new ValidationPipe()) clientId: string, @Res() res: Response) {
    try {
      const response = await this.googleDriveService.getAllFiles(clientId);
      return res.json(response);
    } catch (error) {
      console.error('get file name failed:', error);
      return res.status(500).json({ error: 'get file name failed' });
    }
  }
  @Delete(':fileId')
  async deleteFile(@Param('fileId') fileId: string) {
    try {
      await this.googleDriveService.deleteFile(fileId);
      return { message: `File with ID ${fileId} deleted successfully.` };
    } catch (error) {
      return { error: 'Failed to delete file', details: error.message };
    }
  }
}
