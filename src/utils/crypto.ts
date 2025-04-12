
/**
 * Crypto utilities for encrypting and decrypting data
 * This is a simplified version - in a real app, this would use a proper crypto library
 */

// Helper to convert string to ArrayBuffer
const str2ab = (str: string) => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

// Helper to convert ArrayBuffer to string
const ab2str = (buf: ArrayBuffer) => {
  return String.fromCharCode.apply(null, Array.from(new Uint8Array(buf)));
};

/**
 * Encrypt data using a secret key
 * This is a placeholder for actual encryption
 * In a real app, use proper AES-256 encryption
 */
export const encryptData = async (data: string, key: string): Promise<string> => {
  try {
    // In a real implementation, this would use the Web Crypto API
    // For demo purposes, we're just simulating encryption
    const encrypted = `AES256_ENCRYPTED:${btoa(data)}_KEY:${btoa(key)}`;
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
};

/**
 * Decrypt data using a secret key
 * This is a placeholder for actual decryption
 * In a real app, use proper AES-256 decryption
 */
export const decryptData = async (encryptedData: string, key: string): Promise<string> => {
  try {
    // In a real implementation, this would use the Web Crypto API
    // For demo purposes, we're just simulating decryption
    if (!encryptedData.startsWith("AES256_ENCRYPTED:")) {
      throw new Error("Invalid encrypted data format");
    }
    
    // Parse the encrypted data
    const parts = encryptedData.split("_KEY:");
    if (parts.length !== 2) {
      throw new Error("Invalid encrypted data format");
    }
    
    const encryptedContent = parts[0].replace("AES256_ENCRYPTED:", "");
    const originalKey = atob(parts[1]);
    
    // Check if the key matches
    if (originalKey !== key) {
      throw new Error("Invalid decryption key");
    }
    
    // Decrypt the data
    const decryptedData = atob(encryptedContent);
    return decryptedData;
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt data");
  }
};

/**
 * Generate a random key for AES-256 encryption
 */
export const generateKey = (): string => {
  const length = 32; // 256 bits = 32 bytes
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};
