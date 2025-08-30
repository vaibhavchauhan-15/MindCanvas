# MindCanvas

MindCanvas is a modern, web-based application that allows users to create, visualize, and interact with dynamic knowledge maps. It provides an intuitive interface for organizing thoughts, brainstorming ideas, and creating visual representations of complex information.

## 📋 Problem Statement

In today's information-rich world, people struggle to:
- Organize complex ideas and knowledge in an intuitive way 
- Visualize connections between different concepts
- Collaborate on thought processes with others
- Maintain context when working with large amounts of information

MindCanvas solves these challenges by providing a flexible, visual canvas where users can map out their thoughts with various node types and dynamic connections.

## 🌟 Features

### Core Features
- **Interactive Landing Page** - Animated background with smooth transitions
- **Project Dashboard** - Manage multiple knowledge maps with preview thumbnails
- **Infinite Canvas** - Zoom, pan, and navigate large knowledge maps
- **Multiple Node Types** - Notes, tasks, media, and charts
- **Dynamic Connections** - Connect ideas with animated links
- **Real-time Interactions** - Smooth animations and responsive design

### UI/UX Features
- **Glassmorphism Design** - Modern UI with blur effects and transparency
- **Dark/Light Theme** - Automatic theme switching
- **Smooth Animations** - Powered by Framer Motion
- **Responsive Design** - Works on desktop and mobile
- **Accessibility** - Keyboard shortcuts and high contrast support

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## 🏗️ Tech Stack

### Frontend
- **React** - UI library with hooks and functional components
- **Next.js (App Router)** - React framework with file-based routing
- **TypeScript** - Type-safe JavaScript for better development experience
- **TailwindCSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Production-ready motion library for animations
- **React Flow** - Interactive node-based graphs and diagrams
- **shadcn/ui** - Accessible UI components built with Radix UI and Tailwind
- **lucide-icons** - Beautiful & consistent icon set

### State Management
- **Zustand** - Lightweight state management with time-travel history stack
- **Local Storage** - Projects are saved locally in the browser

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **commitlint** - Conventional Commits enforcement
- **Husky** - Git hooks for pre-commit validation
- **PostCSS** - CSS processing with autoprefixer

### Deployment
- **Vercel** - Seamless deployment platform
- **Privacy-friendly analytics** - Simple tracking with Vercel Analytics or Plausible

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router structure
│   ├── page.tsx         # Landing page
│   ├── dashboard/       # Dashboard route
│   └── canvas/          # Canvas workspace route
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── canvas/          # Canvas-specific components
│   └── nodes/           # Different node type components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── store/               # Zustand state management
│   └── index.ts         # Main app store with history
├── styles/              # Global styles and themes
└── types/               # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mindcanvas.git
   cd mindcanvas
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run start` - Starts the production server
- `npm run lint` - Lints the codebase
- `npm run format` - Formats code with Prettier

## 🔮 Roadmap

### Phase 1: Foundation (Current)
- Core UI components and layout
- Basic canvas functionality with node creation
- Simple connections between nodes
- Local storage persistence

### Phase 2: Enhanced Features
- Advanced node types (media, charts, code)
- Improved animations and transitions
- Template library
- Export/import functionality

### Phase 3: Collaboration & AI
- Real-time collaboration
- AI-powered suggestions for connections
- Advanced sharing options
- Analytics and insights

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Framer Motion.
