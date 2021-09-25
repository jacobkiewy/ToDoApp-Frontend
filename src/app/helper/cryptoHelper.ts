import * as CryptoJS from 'crypto-js';

export class CryptoHelper {
  encrypted(encode: string) {
    const cryptoEncode = CryptoJS.AES.encrypt(encode, 'Secret Passphrase');
    const urlEncode = encodeURIComponent(cryptoEncode.toString())
    return urlEncode;
  }
  decrypted(encoded: string) {
    const decodeUrl = decodeURIComponent(encoded)
    const cryptoDecrypted = CryptoJS.AES.decrypt(decodeUrl, 'Secret Passphrase');
    return cryptoDecrypted.toString(CryptoJS.enc.Utf8);
  }
}
