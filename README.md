# NestJS Authentication

## Description

Welcome to the **NestJS-Authentication** repository! This project demonstrates how to implement **Authentication** in a **NestJS** application, starting from the basics and progressing to advanced techniques. The repository is structured to showcase various authentication strategies, including **refresh tokens** and **rate limiting**, following best practices for clean and scalable backend development.

## Features

- **Basic Authentication**: Implementation of standard authentication flows (e.g., login).
- **Types of Authentication**: Covers token-based (JWT), session-based authentication and oauth.
- **Advanced Techniques**: 
  - **Refresh Tokens**: To maintain user sessions securely.
  - **Rate Limiting**: Protect your APIs from abuse.

## How to Setup

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone git@github.com:Lakshya-Saini/Nest-Authentication.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
npm run start
```

The app will be running at:  
**http://localhost:3000**

## FAQ

### 1. What is JWT?

JWT (JSON Web Token) is a compact, URL-safe token used for securely transmitting information between parties as a JSON object.

### 2. What is a Refresh Token?

A refresh token is a long-lived token used to obtain a new access token after the previous one expires, providing a seamless user experience.

### 3. How is Rate Limiting Implemented?

Rate limiting is configured using `@nestjs/throttler` to restrict excessive API requests from a single client.

## Resources

- **NestJS Docs**: [https://docs.nestjs.com](https://docs.nestjs.com)
- **JWT Guide**: [https://jwt.io](https://jwt.io)
