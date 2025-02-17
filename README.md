This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/danwill89/browser-api)

[![Open in VS Code Dev Containers](https://img.shields.io/static/v1?style=for-the-badge&label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/danwill89/browser-api)

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

## Usage

- Select "Apply for Permit" to navigate to the permit application page.
- Select "Upload License" to begin the license upload process. 
- You will presented with a QR code to scan with your device.
- You will be prompted with a digital credential popup to share your credentials. We have found it only works OpenWallet.
- The shared credentials should be displayed on screen.
- Select "Upload VRC" to begin the VRC upload process. Repeat the same process as with the license.
- Select "Continue to Application".
- You will be taken to the confirmation page where you can review your application details and submit it.

