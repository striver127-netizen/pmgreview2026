import crypto from "crypto"

// PHP and Node must use the SAME key.
// Ensure this key is 32 bytes for aes-256-cbc.
const SECRET_KEY = process.env.ENCRYPTION_KEY
const ALGORITHM = "aes-256-cbc"

/**
 * Decrypts data encrypted by PHP's openssl_encrypt (AES-256-CBC).
 *
 * PHP Usage expectation:
 * $iv = openssl_random_pseudo_bytes(16);
 * $encrypted = openssl_encrypt($data, 'aes-256-cbc', $key, 0, $iv);
 * $payload = base64_encode($iv . $encrypted); // Prepend IV
 *
 * @param encryptedPayload Base64 encoded string containing IV (16 bytes) + Ciphertext
 */
export function decryptCommon(encryptedPayload: string): string {
    try {
        // 1. Decode base64
        const buffer = Buffer.from(encryptedPayload, "base64")

        // 2. Extract IV (first 16 bytes) and Ciphertext
        const iv = buffer.subarray(0, 16)
        const encryptedText = buffer.subarray(16)

        // 3. Decrypt
        if (!SECRET_KEY) {
            throw new Error("ENCRYPTION_KEY is not defined")
        }
        const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv)
        let decrypted = decipher.update(encryptedText)
        decrypted = Buffer.concat([decrypted, decipher.final()])

        return decrypted.toString("utf8")
    } catch (error) {
        console.error("Decryption failed:", error)
        return ""
    }
}
