# Auth Callback

This project demonstrates a minimal setup using Next.js and Auth.js to showcase the behavior of authentication callbacks after signing in. The key focus is on how the application handles the redirect after the user signs in, specifically how it always uses the last callback stored in the cookie.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Issues](#issues)
- [License](#license)

## Installation

To get started with the project, clone the repository and install the dependencies:

```
git clone https://github.com/dr15/auth-callback.git
cd auth-callback
npm install
```

## Usage

To run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

This project utilizes Next.js for the frontend framework and Auth.js for handling authentication. Here is a brief overview of the flow:

1. **User Navigation**: As the user navigates through the application.
2. **User Sign Out**: When the user signs out, the last visited page URL remains is stored in a cookie.
3. **Accessing Protected Page**: If the user tries to access a protected page while signed out, they are redirected to the sign-in page.
4. **Post Sign-In Redirect**: After signing in, instead of being redirected to the originally requested page, the user is redirected to the last page stored in the cookie (the last page they visited before signing out).

## Issues

- **Incorrect Redirect**: The primary issue demonstrated by this project is that users do not get redirected to the originally requested page after signing in if they were signed out. Instead, they are redirected to the last page stored in the cookie.

## License

This project is licensed under the MIT License.
