import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.PASSWORD, // your password
      },
    });
  }

  // Create a random password from numbers only and 4 characters long
  generatePassword(length: number) {
    const charset = '0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  async sendMail(body: any) {
    const { to, email } = body;

    // Create a random password from numbers only and 4 characters long
    const validPassword = this.generatePassword(4);

    const fileContent = fs.readFileSync(
      '../MonorepoSmartax/server/src/services/mail/mail.service.ts',
      'utf8'
    );

    // הוספת הסיסמה האקראית למייל
    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: 'Forgot Password ❓- Smartax',
      text: `Password to verify email address. Your password is: ${validPassword}`,
      // html:m
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);

      // החזרת הסיסמה בתגובה של הפונקציה
      return { success: true, password: validPassword, email: to };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }
}

// pack
{
  //   "name": "@monorepo-smartax/source",
  //   "homepage": "https://monoreposmartax-fronted.onrender.com",
  //   "version": "0.0.0",
  //   "license": "MIT",
  //   "scripts": {
  //     "clean": "nx run-many --target=clean --all",
  //     "start:all": "concurrently \"nx serve front\" \"nx serve server\" \"nx serve api-gateway\" \"nx serve timesheet\"",
  //     "build:front": "npx nx build front --prod",
  //     "start": "npx serve -s dist/apps/front -l $PORT",
  //     "start:server": "node dist//server/main.js",
  //     "build:server": "npx nx build server --prod",
  //     "test:e2e": "nx test server-e2e --verbose",
  //     "test": "nx test"
  //   },
  //   "private": true,
  //   "dependencies": {
  //     "@angular/animations": "18.0.0",
  //     "@angular/common": "18.0.0",
  //     "@angular/compiler": "18.0.0",
  //     "@angular/core": "18.0.0",
  //     "@angular/forms": "18.0.0",
  //     "@angular/platform-browser": "18.0.0",
  //     "@angular/platform-browser-dynamic": "18.0.0",
  //     "@angular/router": "18.0.0",
  //     "@fullcalendar/angular": "6.1.14",
  //     "@fullcalendar/core": "6.1.14",
  //     "@fullcalendar/daygrid": "6.1.14",
  //     "@fullcalendar/interaction": "6.1.14",
  //     "@nestjs/common": "10.3.10",
  //     "@nestjs/config": "3.2.3",
  //     "@nestjs/core": "10.0.2",
  //     "@nestjs/jwt": "10.2.0",
  //     "@nestjs/microservices": "^10.3.10",
  //     "@nestjs/mongoose": "10.0.10",
  //     "@nestjs/platform-express": "10.3.10",
  //     "@nestjs/platform-fastify": "10.3.10",
  //     "@nestjs/platform-socket.io": "10.3.10",
  //     "@nestjs/schedule": "^4.1.0",
  //     "@nestjs/serve-static": "4.0.2",
  //     "@nestjs/swagger": "7.4.0",
  //     "@nrwl/cli": "^16.6.0",
  //     "@nrwl/jest": "19.5.1",
  //     "@nrwl/node": "19.5.1",
  //     "@nx/angular": "19.4.1",
  //     "@types/gapi.client.calendar": "3.0.12",
  //     "@types/google.accounts": "0.0.14",
  //     "@types/mongoose-sequence": "3.0.11",
  //     "ajv-keywords": "5.1.0",
  //     "axios": "1.6.0",
  //     "bcryptjs": "2.4.3",
  //     "boolbase": "1.0.0",
  //     "bootstrap": "4.6.2",
  //     "build": "^0.1.4",
  //     "chart.js": "4.4.3",
  //     "class-transformer": "0.5.1",
  //     "class-validator": "0.14.1",
  //     "core-js": "3.37.1",
  //     "cron": "^3.1.7",
  //     "crypto-js": "4.2.0",
  //     "dotenv": "16.4.5",
  //     "emailjs-com": "3.2.0",
  //     "exceljs": "4.4.0",
  //     "fastify-sentry": "1.4.0",
  //     "file-saver": "2.0.5",
  //     "gapi-script": "1.2.0",
  //     "google-auth-library": "9.11.0",
  //     "googleapis": "140.0.1",
  //     "jquery": "3.7.1",
  //     "jsonwebtoken": "9.0.2",
  //     "jwt-decode": "^3.1.2",
  //     "mongodb": "5.9.2",
  //     "mongoose": "8.4.4",
  //     "multer": "1.4.5-lts.1",
  //     "nest-logger": "^7.0.0",
  //     "nodemailer": "6.9.14",
  //     "pino": "9.2.0",
  //     "popper.js": "1.16.1",
  //     "primeflex": "3.3.1",
  //     "primeicons": "7.0.0",
  //     "primeng": "17.18.3",
  //     "quill": "2.0.2",
  //     "quill-better-table": "1.2.10",
  //     "quill-delta-to-html": "0.12.1",
  //     "reflect-metadata": "0.1.13",
  //     "rxjs": "^7.4.0",
  //     "socket.io": "4.7.5",
  //     "socket.io-client": "^4.7.5",
  //     "swagger-ui-express": "5.0.1",
  //     "sweetalert2": "11.6.13",
  //     "tslib": "^2.3.0",
  //     "typeorm": "0.3.20",
  //     "xlsx": "0.18.5",
  //     "zone.js": "0.14.7"
  //   },
  //   "devDependencies": {
  //     "@angular-devkit/build-angular": "18.1.0",
  //     "@angular-devkit/core": "18.0.0",
  //     "@angular-devkit/schematics": "18.0.0",
  //     "@angular-eslint/eslint-plugin": "18.0.0",
  //     "@angular-eslint/eslint-plugin-template": "18.0.0",
  //     "@angular-eslint/template-parser": "18.0.0",
  //     "@angular/cli": "18.0.7",
  //     "@angular/compiler-cli": "18.0.0",
  //     "@angular/language-service": "18.0.0",
  //     "@nestjs/schematics": "10.0.1",
  //     "@nestjs/testing": "^10.0.2",
  //     "@nrwl/angular": "19.4.1",
  //     "@nrwl/nest": "19.5.1",
  //     "@nrwl/workspace": "19.4.1",
  //     "@nx/eslint": "19.3.2",
  //     "@nx/eslint-plugin": "^19.3.2",
  //     "@nx/jest": "19.4.0",
  //     "@nx/js": "19.4.0",
  //     "@nx/nest": "19.4.0",
  //     "@nx/node": "19.4.0",
  //     "@nx/web": "19.4.0",
  //     "@nx/webpack": "19.4.0",
  //     "@nx/workspace": "19.3.2",
  //     "@schematics/angular": "18.0.0",
  //     "@swc-node/register": "1.9.1",
  //     "@swc/core": "1.5.7",
  //     "@swc/helpers": "0.5.11",
  //     "@types/babel__core": "7.20.5",
  //     "@types/bcryptjs": "2.4.6",
  //     "@types/crypto-js": "4.2.2",
  //     "@types/file-saver": "2.0.7",
  //     "@types/fullcalendar": "3.8.0",
  //     "@types/gapi": "0.0.47",
  //     "@types/gapi.auth2": "0.0.60",
  //     "@types/gapi.client": "1.0.8",
  //     "@types/jasmine": "5.1.0",
  //     "@types/jest": "^29.4.0",
  //     "@types/jsonwebtoken": "9.0.6",
  //     "@types/multer": "1.4.11",
  //     "@types/node": "18.19.41",
  //     "@types/supertest": "^6.0.2",
  //     "@types/uuid": "10.0.0",
  //     "@typescript-eslint/eslint-plugin": "7.3.0",
  //     "@typescript-eslint/parser": "7.3.0",
  //     "@typescript-eslint/utils": "8.0.0-alpha.28",
  //     "concurrently": "8.0.1",
  //     "eslint": "8.57.0",
  //     "eslint-config-prettier": "9.0.0",
  //     "jasmine-core": "5.1.0",
  //     "jest": "^29.7.0",
  //     "jest-environment-jsdom": "29.7.0",
  //     "jest-environment-node": "29.7.0",
  //     "jest-preset-angular": "14.2.0",
  //     "karma": "6.4.0",
  //     "karma-chrome-launcher": "3.2.0",
  //     "karma-coverage": "2.2.0",
  //     "karma-jasmine": "5.1.0",
  //     "karma-jasmine-html-reporter": "2.1.0",
  //     "npm-run-all": "^4.1.5",
  //     "nx": "19.4.1",
  //     "prettier": "2.6.2",
  //     "supertest": "^7.0.0",
  //     "ts-jest": "^29.1.0",
  //     "ts-node": "10.9.1",
  //     "typescript": "5.4.2",
  //     "webpack-cli": "5.1.4"
  //   }
  // }
  