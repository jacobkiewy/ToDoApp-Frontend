import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';

export class CryptoHelper {

  encrypted(encode: string) {
    const cryptoEncode = CryptoJS.AES.encrypt(encode, 'Secret Passphrase');
    return cryptoEncode.toString();
  }
  decrypted(encoded: string) {
    try {
      const cryptoDecrypted = CryptoJS.AES.decrypt(
        encoded,
        'Secret Passphrase'
      );
      return cryptoDecrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.log("catch e girdi")
      localStorage.removeItem('token');
      window.location.reload()
    }
    const cryptoDecrypted = CryptoJS.AES.decrypt(
      encoded,
      'Secret Passphrase'
    );
    return cryptoDecrypted.toString(CryptoJS.enc.Utf8);
  }
}
