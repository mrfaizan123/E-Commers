import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Home />  {/* Yahan Home page render ho raha hai */}
      </main>
       <Footer />
    </div>
  );
}

export default App;