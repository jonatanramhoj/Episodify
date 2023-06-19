# Episodify TV-Episode Management Application

Episodify is a TV-Episode management application that allows users to Create, Read, Update, and Delete (CRUD) TV episodes through a fully responsive user interface. It provides features such as a landing page with a list of episodes, episode details page, search with auto suggestions, real-time updates and feedback, and works seamlessly on both desktop and mobile devices.

![episodify-screenshots](https://github.com/jonatanramhoj/episodify/assets/3789167/f6b52c85-33bb-4920-a265-78bf377458c9)

## Features

- Landing page with a comprehensive list of episodes
- Episode details page showcasing specific episode information
- Search functionality with auto-suggestions for quick episode discovery
- Create, update, and delete episodes to manage your collection
- Real-time updates and feedback to keep your TV-episode data up-to-date
- Fully responsive UI for a seamless experience across desktop and mobile platforms

## Tech Stack

Episodify is built using the following technologies:

- Framework: Next.js
- Deployment: Vercel
- Styling: Tailwind CSS
- Backend: AWS AppSync + OMDb
- API: GraphQL
- State management: Apollo Client
- Animations: Framer Motion

## Prerequisites

To run the Episodify project locally, ensure that you have the following prerequisites installed:

- Node.js
- npm (Node Package Manager)

## Getting Started

Follow the steps below to set up and run Episodify locally:

1. Clone the repository:

```
git clone git@github.com:jonatanramhoj/episodify.git
```

2. Change to the project directory:

```
cd episodify
```

3. Install the dependencies:

```
npm install
```

4. Create an `.env.local` file in the root directory of the project with the following variables:

```
NEXT_PUBLIC_GRAPHQL_API=<YOUR_GRAPHQL_API_ENDPOINT>
NEXT_PUBLIC_API_KEY=<YOUR_API_KEY>
NEXT_PUBLIC_OMDB_API_KEY=<YOUR_OMDB_API_KEY>
```

Replace `<YOUR_GRAPHQL_API_ENDPOINT>`, `<YOUR_API_KEY>`, and `<YOUR_OMDB_API_KEY>` with your respective values.

5. Start the local development server:

```
npm run dev
```

6. Open your browser and visit `http://localhost:3000` to see the Episodify application in action.

## Demo

Check out the live demo of Episodify at [https://episodify.vercel.app/](https://episodify.vercel.app/).
