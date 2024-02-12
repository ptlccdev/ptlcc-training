'use server'
const secretKey = process.env.ENCRYPTION_SECRET

export const encryptData = async (plainText: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plainText)
    const pwUtf8 = encoder.encode(secretKey)
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8)
    const iv = crypto.getRandomValues(new Uint8Array(12)) // Initialization vector
    const algo = {
        name: 'AES-GCM',
        iv,
    }
    const encrpytKey = await crypto.subtle.importKey(
        'raw',
        pwHash,
        algo,
        false,
        ['encrypt']
    )

    const encrypted = await crypto.subtle.encrypt(algo, encrpytKey, data)

    const ivString = Array.from(new Uint8Array(iv))
        .map(b => String.fromCharCode(b))
        .join('')
    const encryptedString = Array.from(new Uint8Array(encrypted))
        .map(b => String.fromCharCode(b))
        .join('')

    // Encode iv and encrypted data as base64
    const ivBase64 = btoa(ivString)
    const encryptedBase64 = btoa(encryptedString)

    return JSON.stringify({ encrypted: encryptedBase64, iv: ivBase64 })
}

export const decryptData = async (encryptedString: string): Promise<string> => {
    const decoder = new TextDecoder()
    const encoder = new TextEncoder()
    const pwUtf8 = encoder.encode(secretKey)
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8)

    // Parse the encryptedString to extract the base64-encoded encrypted data and IV
    const { encrypted: encryptedBase64, iv: ivBase64 } =
        JSON.parse(encryptedString)

    // Convert base64-encoded encrypted data and IV back to Uint8Array, then to ArrayBuffer
    const encrypted = Uint8Array.from(atob(encryptedBase64), c =>
        c.charCodeAt(0)
    )

    const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0))

    const algo = {
        name: 'AES-GCM',
        iv,
    }
    const decryptKey = await crypto.subtle.importKey(
        'raw',
        pwHash,
        algo,
        false,
        ['decrypt']
    )
    const ptBuffer = await crypto.subtle.decrypt(algo, decryptKey, encrypted)
    return decoder.decode(ptBuffer)
}
