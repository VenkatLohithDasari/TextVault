import CryptoJS from 'crypto-js';

export const encryptContent = async (content: string, password: string): Promise<string> => {
    return CryptoJS.AES.encrypt(content, password).toString();
}

export const hashPassword = async (password: string): Promise<string> => {
    return CryptoJS.SHA256(password).toString();
}

export const decryptContent = (content: string, password: string): string => {
    const decryptedText = CryptoJS.AES.decrypt(content, password).toString(CryptoJS.enc.Utf8);
    console.log(decryptedText);
    return decryptedText;
};