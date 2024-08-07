// import { Injectable, Logger } from '@nestjs/common';
// import { google } from 'googleapis';
// import { JWT } from 'google-auth-library';
// import * as fs from 'fs';
// import * as path from 'path';
// import { InjectModel } from '@nestjs/mongoose';
// import { Docs } from '../Models/doc.model';
// import { Model } from 'mongoose';
// import { ValidationException } from '../common/exceptions/validation.exception';
// import { Client ,ClientModel } from '../Models/client.model';
// import { ClientController } from '../controller/clients/clients.controller';
// import { ClientService } from './client.service';
// import { DocType, docTypeModel } from '../Models/docType.model';
// import { DocTypeService } from './docTypes.service';

// @Injectable()
// export class GoogleDriveService{
//   private drive;
//   private auth: JWT;
//   private readonly rootFolderId: string = '1iJFMZKQfhdWCTcW6taWqMZ19M9dpKabp';
//   constructor(@InjectModel('Docs') private readonly docModel: Model<Docs>,private readonly clientService: ClientService,private readonly docTypeService: DocTypeService) {
//     const keyPath = path.join('service-account.json');
//     const keys = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

//     this.auth = new google.auth.JWT(
//       keys.client_email,
//       null,
//       keys.private_key,
//       ['https://www.googleapis.com/auth/drive']
//     );

//     this.drive = google.drive({ version: 'v3', auth: this.auth });
//   }
//   async uploadFile(file: Express.Multer.File, clientId: string, docType:string): Promise<any> {
//     try {
//       const client=await this.clientService.searchClient(clientId);
//       const clientfolderId = await this.getOrCreateFolder(client.firstName,this.rootFolderId);
//       const folderId = await this.getOrCreateFolder(docType,clientfolderId);
//       const response = await this.drive.files.create({
//         requestBody: {
//           name: Buffer.from(file.originalname, 'latin1').toString('utf8'),
//           parents: [folderId],
//         },
//         media: {
//           mimeType: file.mimetype,
//           body: fs.createReadStream(file.path),
//         },
//       });
//       fs.unlinkSync(file.path);
//       const createdDoc = new this.docModel({
//         _id:response.data.id,
//         name:response.data.name,
//         viewLink:await this.generateViewLink(response.data.id),
//         client,
//         status:"uploaded",
//         date:Date.now(),
//         DocType:await this.docTypeService.getDocTypeByName(docType)});
//        await createdDoc.save();  
//       return { fileId: createdDoc._id,viewLink:createdDoc.viewLink }
//     } catch (error) {
//       console.error('Error uploading file:', error.response ? error.response.data : error.message);
//       throw new Error('Failed to upload file');
//     }
//   }
//   async generateViewLink(fileId: string): Promise<string> {
//     try {
//       const response = await this.drive.files.get({
//         fileId: fileId,
//         fields: 'webViewLink',
//       });
//       return response.data.webViewLink;
//     } catch (error) {
//       console.error('Error generating view link:', error.response ? error.response.data : error.message);
//       throw new Error('Failed to generate view link');
//     }
//   }
//   private async getOrCreateFolder(folderName: string,parentFolderId:string): Promise<string> {
//     const query = `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and '${parentFolderId}' in parents`;

//     try {
//       const response = await this.drive.files.list({
//         q: query,
//         fields: 'files(id, name)',
//       });

//       const folder = response.data.files.find((file) => file.name === folderName);
//       if (folder) {
//         return folder.id;
//       } else {
//         const folderMetadata = {
//           name: folderName,
//           mimeType: 'application/vnd.google-apps.folder',
//           parents: [parentFolderId],
//         };

//         const folderResponse = await this.drive.files.create({
//           requestBody: folderMetadata,
//           fields: 'id',
//         });

//         return folderResponse.data.id;
//       }
//     } catch (error) {
//       console.error('Error in folder creation:', error.response ? error.response.data : error.message);
//       throw new Error('Failed to get or create folder');
//     }
//   }

// async getFile(fileId: string): Promise<any> {
//   try {
//     const fileResponse = await this.drive.files.get({
//       fileId: fileId,
//       fields: 'mimeType, name',
//     });

//     const fileStream = await this.drive.files.get({
//       fileId: fileId,
//       alt: 'media',
//     }, {
//       responseType: 'stream'
//     });

//     return {
//       stream: fileStream.data,
//       mimeType: fileResponse.data.mimeType,
//       name: fileResponse.data.name,
//     };
//   } catch (error) {
//     console.error('Error fetching file:', error.response ? error.response.data : error.message);
//     throw new Error('Failed to fetch file');
//   }
// }

//   async getFileDown(fileId: string): Promise<Buffer> {
//     try {
//       const response = await this.drive.files.get(
//         { fileId, alt: 'media' },
//         { responseType: 'arraybuffer' }
//       );
//       return Buffer.from(response.data);
//     } catch (error) {
//       console.error('Error downloading file:', error.response ? error.response.data : error.message);
//       throw new Error('Failed to download file');
//     }
//   }
//    async getLink(clientId:string, fileName:string){
//     const file=await this.docModel.findOne({client:clientId,name:fileName}).select('viewLink -_id').lean().exec();
//     if (!file) {
//       throw new ValidationException('file not found');
//     }
//    return file
//   }
//   async getAllFiles(clientId:string){
//     const file=await this.docModel.find({client:clientId}).exec();
//     if (!file) {
//       throw new ValidationException('there is no files for this client');
//     }
//    return file
//   }
//   async setFilePermissions(fileId: string, userEmail: string): Promise<void> {
//     try {
//       await this.drive.permissions.create({
//         fileId: fileId,
//         requestBody: {
//           role: 'reader',
//           type: 'user',
//           emailAddress: userEmail,
//         },
//       });
//     } catch (error) {
//       console.error('Error setting file permissions:', error.response ? error.response.data : error.message);
//       throw new Error('Failed to set file permissions');
//     }
//   }
//   async deleteFile(fileId: string): Promise<void> {
//     try {
//       await this.drive.files.delete({ fileId });
//       await this.docModel.deleteOne({_id:fileId});
//       console.log(`File with ID ${fileId} deleted successfully.`);
//     } catch (error) {
//       console.error('Error deleting file:', error.response ? error.response.data : error.message);
//       throw new Error('Failed to delete file');
//     }
//   }
// }

import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import * as fs from 'fs';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Docs } from '../Models/doc.model';
import { Model } from 'mongoose';
import { ValidationException } from '../common/exceptions/validation.exception';
import { Client, ClientModel } from '../Models/client.model';
import { ClientController } from '../controller/clients/clients.controller';
import { ClientService } from './client.service';
import { DocType, docTypeModel } from '../Models/docType.model';
import { DocTypeService } from './docTypes.service';

@Injectable()
export class GoogleDriveService {
export class GoogleDriveService {
  private drive;
  private auth: JWT;
  private readonly rootFolderId: string = '1iJFMZKQfhdWCTcW6taWqMZ19M9dpKabp';

  constructor(
    @InjectModel('Docs') private readonly docModel: Model<Docs>,
    private readonly clientService: ClientService,
    private readonly docTypeService: DocTypeService
  ) {
    const serviceAccount = process.env.SERVICE_ACCOUNT;
    if (!serviceAccount) {
      throw new Error('Service account credentials are not set');
    }

    const keys = JSON.parse(serviceAccount);

    this.auth = new google.auth.JWT(
      keys.client_email,
      null,
      keys.private_key,
      ['https://www.googleapis.com/auth/drive']
    );
    this.drive = google.drive({ version: 'v3', auth: this.auth });
  }

  async uploadFile(file: Express.Multer.File, clientId: string, docType: string): Promise<any> {
    try {
      const client = await this.clientService.searchClient(clientId);
      const clientfolderId = await this.getOrCreateFolder(client.firstName, this.rootFolderId);
      const folderId = await this.getOrCreateFolder(docType, clientfolderId);
      const client = await this.clientService.searchClient(clientId);
      const clientfolderId = await this.getOrCreateFolder(client.firstName, this.rootFolderId);
      const folderId = await this.getOrCreateFolder(docType, clientfolderId);
      const response = await this.drive.files.create({
        requestBody: {
          name: Buffer.from(file.originalname, 'latin1').toString('utf8'),
          parents: [folderId],
        },
        media: {
          mimeType: file.mimetype,
          body: fs.createReadStream(file.path),
        },
      });
      fs.unlinkSync(file.path);
      const createdDoc = new this.docModel({
        _id: response.data.id,
        name: response.data.name,
        viewLink: await this.generateViewLink(response.data.id),
        _id: response.data.id,
        name: response.data.name,
        viewLink: await this.generateViewLink(response.data.id),
        client,
        status: "uploaded",
        date: Date.now(),
        DocType: await this.docTypeService.getDocTypeByName(docType),
      });
      await createdDoc.save();
      return { fileId: createdDoc._id, viewLink: createdDoc.viewLink };
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      throw new Error('Failed to upload file');
    }
  }

  async generateViewLink(fileId: string): Promise<string> {
    try {
      const response = await this.drive.files.get({
        fileId: fileId,
        fields: 'webViewLink',
      });
      return response.data.webViewLink;
    } catch (error) {
      console.error('Error generating view link:', error.response ? error.response.data : error.message);
      throw new Error('Failed to generate view link');
    }
  }

  private async getOrCreateFolder(folderName: string, parentFolderId: string): Promise<string> {

  private async getOrCreateFolder(folderName: string, parentFolderId: string): Promise<string> {
    const query = `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and '${parentFolderId}' in parents`;

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
          parents: [parentFolderId],
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

  async getFile(fileId: string): Promise<any> {
    try {
      const fileResponse = await this.drive.files.get({
        fileId: fileId,
        fields: 'mimeType, name',
      });
  async getFile(fileId: string): Promise<any> {
    try {
      const fileResponse = await this.drive.files.get({
        fileId: fileId,
        fields: 'mimeType, name',
      });

      const fileStream = await this.drive.files.get({
        fileId: fileId,
        alt: 'media',
      }, {
        responseType: 'stream'
      });
      const fileStream = await this.drive.files.get({
        fileId: fileId,
        alt: 'media',
      }, {
        responseType: 'stream'
      });

      return {
        stream: fileStream.data,
        mimeType: fileResponse.data.mimeType,
        name: fileResponse.data.name,
      };
  } catch (error) {
    console.error('Error fetching file:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch file');
  }
}

  async getFileDown(fileId: string): Promise<Buffer> {
    try {
      const response = await this.drive.files.get(
        { fileId, alt: 'media' },
        { responseType: 'arraybuffer' }
      );
      return Buffer.from(response.data);
    } catch (error) {
      console.error('Error downloading file:', error.response ? error.response.data : error.message);
      throw new Error('Failed to download file');
    }
  }
  
  async getLink(clientId: string, fileName: string) {
    const file = await this.docModel.findOne({ client: clientId, name: fileName }).select('viewLink -_id').lean().exec();
    if (!file) {
      throw new ValidationException('file not found');
    }
    return file;
  }

  async getAllFiles(clientId: string) {
    const file = await this.docModel.find({ client: clientId }).exec();
    if (!file) {
      throw new ValidationException('there is no files for this client');
    }
    return file;
  }

  async setFilePermissions(fileId: string, userEmail: string): Promise<void> {
    try {
      await this.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'user',
          emailAddress: userEmail,
        },
      });
    } catch (error) {
      console.error('Error setting file permissions:', error.response ? error.response.data : error.message);
      throw new Error('Failed to set file permissions');
    }
  }

  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.drive.files.delete({ fileId });
      await this.docModel.deleteOne({ _id: fileId });
      console.log(`File with ID ${fileId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting file:', error.response ? error.response.data : error.message);
      throw new Error('Failed to delete file');
    }
  }
}
