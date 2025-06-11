# Natural Language Task Manager with AI

A modern, enterprise-grade task management application that understands natural language and leverages AI for intelligent task organization.

## Features

### 🎯 Natural Language Input
- Add tasks using everyday language
- Automatic parsing of dates, times, and priorities
- Smart context detection
- Category extraction from hashtags

### 🤖 AI-Powered Features
- Intelligent task grouping using Google's Gemini AI
- Smart priority detection
- Context-aware task organization
- Group confidence scoring

### 💅 Modern UI
- Clean, minimalist design
- Priority-based color coding
- Responsive layout
- Interactive task completion
- Beautiful transitions and animations

### 🎨 Priority Levels
- P1: Urgent/Critical (Red)
- P2: Important (Orange)
- P3: Normal (Yellow)
- P4: Optional (Green)

## Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd task-manager
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_APP_NAME="Natural Language Task Manager"
GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Examples

### Adding Tasks
Simply type your task in natural language:
- "High priority meeting with John tomorrow at 2pm"
- "Submit quarterly report by Friday #work"
- "Buy groceries this weekend P4"

### Task Properties
- **Priority**: Automatically detected from keywords (urgent, important, etc.)
- **Due Date/Time**: Parsed from natural language
- **Categories**: Added using hashtags (#work, #personal, etc.)

### AI Features
- Tasks are automatically grouped based on context and similarity
- Each group comes with a confidence score
- Smart priority suggestions based on task content

## Development

### Project Structure
```
task-manager/
├── src/
│   ├── app/
│   │   └── page.tsx       # Main application page
│   ├── components/
│   │   ├── TaskInput.tsx  # Natural language input component
│   │   ├── TaskList.tsx   # Task display component
│   │   └── TaskGroups.tsx # AI-powered grouping component
│   ├── lib/
│   │   ├── taskParser.ts  # Natural language processing
│   │   └── geminiService.ts # AI service integration
│   └── types/
│       └── task.ts        # TypeScript interfaces
├── public/
└── tests/
```

### Testing
Run the test suite:
```bash
npm test
# or
yarn test
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.
