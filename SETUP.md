# GovChime - Federal Contracting Intelligence Platform

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd govchime

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── components/          # React components
│   ├── dashboard/      # Dashboard page
│   ├── spending/       # Spending analysis
│   ├── awards/         # Contract awards
│   ├── chatter/        # Real-time feed
│   └── learning/       # Learning center
├── hooks/              # Custom React hooks
├── services/           # API services
├── data/              # Mock data
└── types/             # TypeScript types
```

### Features
✅ Interactive Dashboard with spending carousel
✅ Advanced Contract Filtering System  
✅ Real-time Contract Activity Feed
✅ Comprehensive Spending Analysis Charts
✅ Learning Center with AI ChatBot
✅ Dark Mode Support
✅ Responsive Design

### Tech Stack
- **React 18** + **TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Recharts** for data visualization
- **React Router** for navigation

### Development Notes
- The app uses mock data for demonstration
- Real API integration points are marked in `src/services/`
- All components are fully responsive and dark-mode compatible

## 🔧 Configuration
Environment variables can be added to `.env.local`:
```
VITE_API_BASE_URL=your-api-url
VITE_SAM_GOV_API_KEY=your-api-key
```

## 🚢 Deployment
The project is ready for deployment on Vercel, Netlify, or any static hosting service.

Run `npm run build` to create the production build in the `dist/` folder.
