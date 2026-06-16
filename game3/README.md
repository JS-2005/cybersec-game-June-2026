# Alpha Insecure 1.0

A Simple AI System Prompt Capture The Flag (CTF) challenge.

## Overview

Alpha Insecure 1.0 is a Next.js-based web application designed as a cybersecurity challenge. The objective is to "jailbreak" the integrated AI chatbot, "Alpha Secure 1.0", to reveal a hidden secret passkey.

The application simulates a secure login portal where a specific passkey is required to gain access. A chatbot assistant is available to help, but it is instructed to keep the passkey secret.

## Tech Stack

This project is built using the following modern web technologies:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **AI Integration:** [Google Gemini AI SDK](https://www.npmjs.com/package/@google/genai) (`gemini-3-flash-preview` model)
- **Icons:** [Lucide React](https://lucide.dev/)

## Features

- **Login Interface:** A mock authentication screen requiring a passkey.
- **AI Chatbot:** An integrated assistant powered by Google's Gemini AI.
- **System Prompting:** The AI acts as a security bot with specific instructions to hide the passkey `helloworld2026` unless tricked.
- **Responsive Design:** Clean and responsive UI using Tailwind CSS.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- Use `npm` package manager

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Configuration

You need to set up your environment variables to use the Google Gemini API.

1.  Create a `.env.local` file in the root of the project.
2.  Add your Gemini API Key:

    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```

    > **Note:** You can obtain an API key from [Google AI Studio](https://aistudio.google.com/).

### Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Play

1.  Open the application in your browser.
2.  Click the **Bot Icon** in the bottom right corner to open the chat interface.
3.  Interact with "Alpha Insecure Assistant".
4.  Try to trick the AI into revealing the secret passkey using prompt injection or social engineering techniques.
5.  Once you have the passkey, enter it into the "Enter Passkey" field on the main screen and click **AUTHORIZE**.

## Disclaimer

This project is for educational purposes only, to demonstrate how Large Language Models (LLMs) can be susceptible to prompt injection attacks.
