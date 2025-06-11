# Natural Language Task Manager

A modern, AI-powered task management application that understands natural language input and intelligently organizes your tasks.

🔗 **Live Demo**: [https://enterprise-grade-to-do-list.vercel.app/](https://enterprise-grade-to-do-list.vercel.app/)

## Features

### 🗣️ Natural Language Input
- Add tasks using natural language
- AI understands context, dates, and priorities
- Automatic priority detection (P1-P4)
- Smart date parsing

### 🤖 AI-Powered Task Organization
- Intelligent task grouping
- Pattern recognition
- Context-aware categorization
- Priority-based sorting

### 🎯 Smart Features
- Automatic priority assignment based on context
- Task relationship detection
- Temporal grouping
- Category suggestions

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd enterprise-grade-to-do-list
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Examples

Add tasks using natural language:
- "High priority meeting with John tomorrow at 2pm"
- "Review UI mockups by end of day"
- "P1 Fix login bug in production ASAP"

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini AI
- **Deployment**: Vercel

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
