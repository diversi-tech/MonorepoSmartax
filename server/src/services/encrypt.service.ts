
import * as crypto from 'crypto';


const algorithm = 'aes-256-cbc';

export function encrypt(text: string): string {
  const key = crypto.scryptSync(process.env.PRIVATEKEY, 'salt', 32);
  const iv = crypto.randomBytes(16);
  try {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Error during encryption:', error);
    throw error;
  }
}

export function decrypt(text: string): string {
  const [ivHex, encrypted] = text.split(':');
  const ivBuffer = Buffer.from(ivHex, 'hex');
  const key = crypto.scryptSync(process.env.PRIVATEKEY, 'salt', 32);

  try {
    const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Error during decryption:', error);
    throw error;
  }
}


// import * as crypto from 'crypto';

// const algorithm = 'aes-256-cbc';
// const key = Buffer.from(process.env.PRIVATEKEY, 'hex'); // 32 bytes key
// const iv = crypto.randomBytes(16);
// console.log(`Key: ${key.toString('hex')}`);
// console.log(`IV: ${iv.toString('hex')}`);
// export function encrypt(text: string): string {
//   console.log(`Encrypting text: ${text}`);
//   const cipher = crypto.createCipheriv(algorithm, key, iv);
//   console.log(`Cipher created: ${cipher}`);
//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   console.log(`Encrypted text: ${encrypted}`);
//   return `${iv.toString('hex')}:${encrypted}`;
// }

// export function decrypt(text: string): string {
//   let [ivHex, encrypted] = text.split(':');
//   let iv = Buffer.from(ivHex, 'hex');
//   let decipher = crypto.createDecipheriv(algorithm, key, iv);
//   let decrypted = decipher.update(encrypted, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }
