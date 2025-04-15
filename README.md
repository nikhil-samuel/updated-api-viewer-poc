# API Viewer POC

A proof of concept for an API Viewer to monitor claims submissions from BGLA.

## 🔍 Overview

This application provides a simple interface to view API requests and responses for claim submissions. It's designed to help monitor and debug API interactions with the claims system.

## ✨ Features

This version includes the following improvements:

1. **Authentication System**
   - Login page with simple authentication
   - Improved logout functionality via the avatar menu
   - Protected routes that redirect to login

2. **Enhanced Navigation**
   - Left sidebar with intuitive navigation icons
   - Active state indicators for the current section
   - Proper tooltips for better usability

3. **Claim Information Display**
   - Shows actual API status codes with color indicators
   - Uses the real request type from the data
   - Fixed amounts that don't change when clicking

4. **Improved UI/UX**
   - Focus on claims in a queue format
   - Easy access to API details
   - Better visual hierarchy and information organization

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
4. Navigate using the left sidebar
5. Click the avatar in the sidebar to access the logout option

## 🏗️ Technical Details

This application is built with:

- Next.js 14
- React 18
- Tailwind CSS

## 🔒 Authentication

The authentication in this POC is client-side only using localStorage. In a production environment, you would implement proper authentication with a backend service.

## 📊 Data

The application uses mock data to simulate API requests and responses. In a production environment, this would be replaced with real API calls to your backend services.
