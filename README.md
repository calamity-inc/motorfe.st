# Motorfest

An interactive web application for managing and tracking motorsport events with real-time notifications.

## Features

### Event Scheduling
- View upcoming racing events with detailed information
- See event locations and participating vehicles
- Time-based event listings with automatic updates

### Interactive UI
- Responsive design that works on both mobile and desktop
- User-friendly interface with accessible components
- Rich visual indicators for different event types

### Notification System
- Set reminders for upcoming events
- Get notified before an event starts
- Customizable notification timing (0, 1, 5, 10, 15, or 20 minutes before event)
- Notifications persist even when browser is closed
- Service worker ensures notifications are delivered at the right time

## Using the Notification System

### Setting Up a Notification

1. Navigate to the Grand Races page
2. Find an event you want to be reminded about
3. Click the "Remind me" or notification button next to the event
4. In the notification dialog:
   - Select how many minutes before the event you want to be notified
   - Click "Set Reminder"
5. Allow notifications when prompted by your browser (first-time only)

### Managing Notifications

- Notifications are automatically removed after they are triggered
- The system will remember your notifications even if you close the browser
- When a notification triggers, you'll see an alert with:
  - Event location
  - Participating vehicles
  - Time until the event begins

### Browser Permissions

To use notifications, you must grant permission:

1. When setting your first notification, the browser will display a permission prompt
2. Click "Allow" to enable notifications
3. If you accidentally denied permissions, you can reset them in your browser settings:
   - Chrome: Site Settings > Notifications
   - Firefox: Site Permissions > Notifications
   - Safari: Preferences > Websites > Notifications

## Technical Requirements

- Modern browser with Web Notifications API support
- Service Workers enabled (required for background notifications)
- JavaScript enabled
- Compatible browsers: Chrome, Firefox, Edge, Safari (14+), Opera

## Development

The application uses:
- Next.js for frontend framework
- Service workers for background notification handling
- Local storage for persisting notification data
- Web Notifications API for displaying notifications

### Service Worker Registration

The application automatically registers a service worker on startup that handles scheduling and displaying notifications at the appropriate time, even when the browser is closed or the tab is inactive.

## Deployment

### Deploying to Vercel

This application can be deployed on Vercel with the following steps:

1. Connect your GitHub repository to Vercel:
   - Create an account on [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Select the repository containing this project

2. Configure the build settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Install Command: `npm install --legacy-peer-deps`
   - Output Directory: `.next`

3. Add the `--legacy-peer-deps` flag:
   - This flag is critical for resolving dependency conflicts in the project
   - Without this flag, the build may fail due to peer dependency issues
   - In Vercel dashboard → Project Settings → General → Build & Development Settings → Install Command

4. Deploy:
   - Click "Deploy" and wait for the build process to complete
   - Vercel will automatically deploy updates when you push to your repository

### Handling Service Workers in Production

When deploying to production, ensure that:
- Service Workers are properly registered in the production build
- The `next.config.js` includes support for service workers
- HTTPS is enabled (required for service workers in production)

## Troubleshooting

If notifications aren't working:

1. Make sure notifications are allowed in your browser
2. Check that you're using a supported browser
3. Ensure your device isn't in "Do Not Disturb" mode
4. For mobile devices, ensure the browser has notification permissions at the OS level
