# WCD Luxury Executive Assistant

A comprehensive CRM and document automation system for World Class Detailing, featuring:

## Features

- **CRM System**: Complete client management with contact details, follow-ups, and notes
- **Document Generation**: Automated quotes, invoices, and estimates with sequential numbering
- **Google Drive Integration**: Seamless file storage and sharing
- **Speech-to-Text**: Voice dictation for efficient data entry
- **Spell Check**: Built-in spell checking for professional communications
- **Email Generation**: AI-powered email templates for client communications
- **Pixel Hive Design**: Modern, sophisticated UI with dark theme

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Pixel Hive Design System
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI, Lucide Icons
- **Speech Recognition**: Web Speech API

## Getting Started

1. Clone the repository
2. Navigate to the app directory: `cd app`
3. Install dependencies: `npm install`
4. Set up environment variables (copy `.env.example` to `.env`)
5. Run database migrations: `npx prisma migrate dev`
6. Start the development server: `npm run dev`

## Environment Variables

Create a `.env` file in the app directory with:

```
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
ABACUSAI_API_KEY=your-abacus-ai-key
```

## Project Structure

```
app/
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                 # Utility functions and configurations
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── scripts/            # Database seeding scripts
```

## License

Private project for World Class Detailing.
