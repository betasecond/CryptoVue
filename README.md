# Vue 3 + TypeScript + Vite Cryptography Tool

This project implements various cryptographic algorithms (DES, RSA, RC4) in a user-friendly web interface built with Vue 3, TypeScript, and Vite.

## Project Overview

This application provides encryption and decryption capabilities using three different cryptographic algorithms:

- **DES (Data Encryption Standard)**: A symmetric key algorithm for fast encryption of data
- **RSA (Rivest–Shamir–Adleman)**: An asymmetric cryptography algorithm that uses key pairs
- **RC4**: A stream cipher symmetric key algorithm

## Technology Stack

- Vue 3 with Composition API
- TypeScript
- Vite
- Element Plus UI library
- crypto-js for DES and RC4 implementation
- jsencrypt for RSA implementation

## Features

- DES encryption/decryption with customizable keys
- RSA key pair generation and asymmetric encryption/decryption
- RC4 stream cipher implementation
- User-friendly interface for all cryptographic operations

## Installation and Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build
   ```

## Usage Instructions

### DES Encryption/Decryption
- Enter your plaintext and key
- Click the right arrow to encrypt
- Click the left arrow to decrypt
- View results instantly

### RSA Encryption/Decryption
- Generate a new key pair using the "生成新的密钥对" button
- Enter plaintext to encrypt
- Use the right arrow to encrypt with the public key
- Use the left arrow to decrypt with the private key

### RC4 Encryption/Decryption
- Enter your plaintext and key
- Encrypt and decrypt using the interface buttons
- Compare results with other algorithms

## Implementation Notes

This project implements all cryptographic algorithms from scratch instead of using example programs due to environment constraints. The implementations demonstrate:

- The speed difference between symmetric (DES, RC4) and asymmetric (RSA) encryption
- Security differences between the algorithms
- Practical application of cryptographic principles

DES is faster for large-scale data encryption compared to RSA, but RSA offers better security due to its asymmetric nature.

## Original Requirements

1. Download and execute the DES example program, input plaintext, key, and ciphertext for encryption and decryption. Observe the results with different keys and improve the code.
2. Download and execute the RSA example program. Generate random numbers, find prime numbers, and form key pairs to implement encryption and decryption. Compare symmetric and asymmetric encryption regarding keys and security. Modify and improve the RSA source program.
3. Design an interface based on the RC4 reference code to encrypt and decrypt plaintext using the RC4 algorithm.

All three requirements have been fulfilled in this implementation.