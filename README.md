# GovChime - Federal Contracting Intelligence Platform

🇺🇸 **Making government contracting simple for small businesses**

## Overview

GovChime is a comprehensive federal contracting intelligence platform that aggregates contracts, provides spending analytics, and offers educational resources to help small businesses navigate government procurement opportunities.

## Features

- **Federal Contracts Browser** - Browse and analyze federal contracting opportunities
- **Interactive Analytics** - Deep insights into spending patterns and trends
- **Chatter Wall** - Real-time contract activity and transparency feed
- **Learning Center** - Comprehensive guides and tutorials
- **Set-Aside Intelligence** - Specialized tools for minority-owned businesses

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **Icons**: Lucide React
- **Data Sources**: SAM.gov API, USA Spending API, FPDS API

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd govchime-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── awards/         # Contract awards and NAICS
│   ├── chatter/        # Real-time activity feed
│   ├── dashboard/      # Main dashboard
│   ├── learning/       # Educational content
│   ├── spending/       # Analytics and charts
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript definitions
└── data/               # Mock data and constants
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Team Setup

See [SETUP.md](./SETUP.md) for detailed team setup instructions.

## License

MIT License - see LICENSE file for details

## Contact

For questions or support, please open an issue on GitHub.

---

*Built with ❤️ for small businesses navigating federal contracting*
