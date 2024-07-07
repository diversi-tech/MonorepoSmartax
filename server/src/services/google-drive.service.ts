
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GoogleDriveService {
  private drive;
  private auth: JWT;
  private readonly parentFolderId: string = '1iJFMZKQfhdWCTcW6taWqMZ19M9dpKabp';

  constructor() {
    const keyPath = path.join('service-account.json');
    const keys = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

    this.auth = new google.auth.JWT(
      keys.client_email,
      null,
      keys.private_key,
      ['https://www.googleapis.com/auth/drive']
    );

    this.drive = google.drive({ version: 'v3', auth: this.auth });
  }

  async uploadFile(file: Express.Multer.File, clientName: string): Promise<any> {
    try {
      const folderId = await this.getOrCreateFolder(clientName);
      const response = await this.drive.files.create({
        requestBody: {
          name: file.originalname,
          parents: [folderId],
        },
        media: {
          mimeType: file.mimetype,
          body: fs.createReadStream(file.path),
        },
      });
      fs.unlinkSync(file.path);
      return response.data;

    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      throw new Error('Failed to upload file');
    }
  }

  private async getOrCreateFolder(folderName: string): Promise<string> {
    const query = `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and '${this.parentFolderId}' in parents`;

    try {
      const response = await this.drive.files.list({
        q: query,
        fields: 'files(id, name)',
      });

      const folder = response.data.files.find((file) => file.name === folderName);

      if (folder) {
        return folder.id;
      } else {
        const folderMetadata = {
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [this.parentFolderId],
        };

        const folderResponse = await this.drive.files.create({
          requestBody: folderMetadata,
          fields: 'id',
        });

        return folderResponse.data.id;
      }
    } catch (error) {
      console.error('Error in folder creation:', error.response ? error.response.data : error.message);
      throw new Error('Failed to get or create folder');
    }
  }
}
