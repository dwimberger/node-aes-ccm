# node-aes-ccm

256bit AES-CCM module for node.js using OpenSSL

## Installation

`npm install --save https://github.com/dwimberger/node-aes-ccm`

## Requirements

`node-aes-ccm` requires io.js >= 3.0 because we need OpenSSL 1.0.2d or later for AES CCM support.

## encrypt

`encrypt(key, iv, plaintext, aad, authTagLength)`

`key`, `iv`, `plaintext`, and `aad` are all `Buffer` objects. `encrypt` will return an object like the following:

```
{
  cipherText: Buffer,
  authTag: Buffer
}
```

## decrypt

`decrypt(key, iv, ciphertext, aad, authTag)`

`key`, `iv`, `plaintext`, `aad`, and `authTag` are all `Buffer` objects. `decrypt` will return an object like the following:

```
{
  plainText: Buffer,
  authOk: Boolean
}
```

## References

Modeled after [node-aes-gcm](https://github.com/xorbit/node-aes-gcm).
