# Slack Clone - Full Stack App

A fully functional Slack clone built using Vite, React, JavaScript, CSS, and Supabase. This project utilizes the power of Supabase's backend capabilities, including row-level security, serverless functions, and authentication, along with the lightning-fast build and development experience provided by Vite.

## Features

- Real-time messaging
- Multiple channels support
- Direct messaging between users
- User authentication and authorization
- Responsive design for various devices
- Row-level security for data protection
- Serverless functions for efficient performance
- Vite for fast development and building

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v12+)
- NPM or Yarn
- Supabase account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/slack-clone.git
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up Supabase:

   - Create a new project on [Supabase](https://supabase.io/)
   - Set up the database schema (refer to `schema.sql` file)
   - Enable authentication providers (e.g., Google, GitHub)
   - Set up row-level security policies

4. Create a `.env` file in the root folder and add your Supabase credentials:

   ```
   VITE_SUPABASE_URL=<your_supabase_url>
   VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
   ```

5. Start the development server:

   ```
   npm run dev
   ```

   The app should now be running on `http://localhost:3000`.

## Deployment

To deploy the Slack clone, you can use any platform that supports hosting static files or a Node.js app, such as Vercel, Netlify, or Heroku.

For example, to deploy with Vercel:

1. Install [Vercel CLI](https://vercel.com/download):

   ```
   npm i -g vercel
   ```

2. Run the deployment command:

   ```
   vercel
   ```

   Follow the prompts to complete the deployment.

## Contributing

Contributions are always welcome! Please read the [contributing guidelines](CONTRIBUTING.md) before making any changes.

## License

This project is licensed under the [MIT License](LICENSE).
