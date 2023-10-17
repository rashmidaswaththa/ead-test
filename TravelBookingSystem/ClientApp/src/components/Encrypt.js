import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key'; // Replace with your secret key

// Encrypt data
export const encrypt = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encryptedData;
};

// Decrypt data
export const decrypt = (encryptedData) => {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedData;
};