import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class HashPasswordService {
  constructor() {}

  secretKey = 'kjsrf2540*&^%GYUJner(*&^%gbexs';

  encryptPassword(password: string): string {
    const hash = CryptoJS.HmacSHA256(password, this.secretKey);
    return hash.toString(CryptoJS.enc.Hex);
  }
}
