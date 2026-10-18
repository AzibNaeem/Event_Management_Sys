# Event Management System

Made by Azib Naeem (L23-2541)

Web Programming Assignment 2. It is a React app where you can look at real events from the Ticketmaster API, register for them and see your registered events.

There is no backend. Login and registration are only simulated and the data is saved in Local Storage.

## Built with

- React (Vite)
- Redux Toolkit
- React Router
- Ticketmaster Discovery API

## What it does

- Register, login and logout (you stay logged in after refresh)
- See upcoming events, search them and filter by city, category and date
- Open an event to see its details
- Register for an event and cancel it later (you can't register twice)
- My Events page that shows upcoming and completed events
- Every user only sees their own registrations

## How to run

1. Install the packages

   ```
   npm install
   ```

2. Get an API key from https://developer.ticketmaster.com

3. Make a `.env` file in the main folder and put your key in it

   ```
   VITE_TICKETMASTER_API_KEY=your_key_here
   ```

4. Start the app

   ```
   npm run dev
   ```

   and open http://localhost:5173

If you change the `.env` file you have to stop the app and start it again.

## Pages

- `/login` and `/register`
- `/events` all events with search and filters
- `/events/:id` event details and registration
- `/my-events` your registered events (login needed)
