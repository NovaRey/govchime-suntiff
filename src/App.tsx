import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import SpendingAnalysis from './components/spending/SpendingAnalysis';
import TestComponent from './TestComponent';
import ContractAwardWall from './components/awards/ContractAwardWall';
import SetAsideIntelligence from './components/setaside/SetAsideIntelligence';
import LearningCenter from './components/learning/LearningCenter';
import ChatterWall from './components/chatter/ChatterWall';
import PasswordProtection from './components/auth/PasswordProtection';
import SignUpPage from './components/auth/SignUpPage';
import { mockSpendingData, mockSetAsideData } from './data/mockData';

// Create a component that includes the routes and will be wrapped by PasswordProtection
const AppRoutes = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route 
            path="/" 
            element={<Dashboard />} 
          />
          <Route 
            path="/test" 
            element={<TestComponent />} 
          />
          <Route 
            path="/spending" 
            element={<SpendingAnalysis spendingData={mockSpendingData} />} 
          />
          <Route 
            path="/awards" 
            element={<ContractAwardWall />} 
          />
          <Route 
            path="/set-aside" 
            element={<SetAsideIntelligence setAsideData={mockSetAsideData} />} 
          />
          <Route 
            path="/learning" 
            element={<LearningCenter />} 
          />
          <Route 
            path="/chatter" 
            element={<ChatterWall />} 
          />
          <Route 
            path="/signup" 
            element={<SignUpPage />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  // Debug: Check if mockData is loaded
  console.log('App: mockSpendingData loaded:', mockSpendingData?.length || 0, 'items');
  console.log('App: mockSetAsideData loaded:', mockSetAsideData?.length || 0, 'items');

  return (
    <ThemeProvider>
      <Router basename="/govchime-suntiff">
        <PasswordProtection>
          <AppRoutes />
        </PasswordProtection>
      </Router>
    </ThemeProvider>
  );
}

export default App;