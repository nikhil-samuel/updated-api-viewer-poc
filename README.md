# API Viewer POC

A proof of concept for an API Viewer to monitor claims submissions from BGLA.

## 🔍 Overview

This application provides a simple interface to view API requests and responses for claim submissions. It's designed to help monitor and debug API interactions with the claims system.

## ✨ New Features

This version includes the following improvements:

1. **Authentication System**
   - Login page with simple authentication
   - Logout functionality via the avatar icon
   - Protected routes that redirect to login

2. **Fixed Amount Display**
   - Amounts no longer change randomly when clicking on rows
   - Each claim has a fixed, predefined amount stored in the data

3. **Simplified UI**
   - Focus on claims in a queue format
   - Easy access to API details

## 🚀 Getting Started

1. Clone this repository
2. Install dependencies
   ```
   npm install
   ```
3. Run the development server
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Usage

1. Log in with any username and password
2. View the claims queue
3. Click on any claim to view detailed API request and response information
4. Click the avatar in the sidebar to log out

## 🏗️ Technical Details

This application is built with:

- Next.js 14
- React 18
- Tailwind CSS

## 🔒 Authentication

The authentication in this POC is client-side only using localStorage. In a production environment, you would implement proper authentication with a backend service.

## 📊 Data

The application uses mock data to simulate API requests and responses. In a production environment, this would be replaced with real API calls to your backend services.
