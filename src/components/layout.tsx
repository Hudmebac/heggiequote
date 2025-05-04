import React, { ReactNode } from 'react';
import CategorySelect from './category-select';
import ThemeToggle from './theme-toggle';
import { Category } from '@/lib/quotes';

interface LayoutProps {
  children: ReactNode;
  selectedCategory: Category; // Add prop for selected category
  setSelectedCategory: (category: Category) => void; // Add prop for setting category
}


const Layout: React.FC<LayoutProps> = ({ children, selectedCategory, setSelectedCategory}) => {


  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Updated header to use card background for better theme integration */}
      <header className="w-full py-4 px-6 border-b bg-card flex items-center justify-center">
        <div className='w-full flex items-center justify-between px-8 max-w-7xl'>
          {/* Main title now styled via globals.css */}
          <h1 className="text-4xl font-bold">Daily Stand Up Quote</h1>
          {/* Use props passed from parent (page.tsx) */}
          <CategorySelect selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <ThemeToggle/>
        </div>
      </header>
      <main className="flex-grow p-4 fade-in flex flex-col items-center justify-center w-full px-8">{children}</main>
      {/* Footer styling handled by globals.css */}
      <footer className="w-full py-4 border-t bg-card flex justify-center items-center px-4">
        <p>© 2025 Creations by Craig Heggie</p>
      </footer>
    </div>
  );
};

export default Layout;
