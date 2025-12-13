import { useState, useEffect } from 'react';
import Navigation from './components/Instruction/Navigation';
import Header from './components/Instruction/Header';
import Step1 from './components/Instruction/Step1';
import Step2 from './components/Instruction/Step2';
import Step3 from './components/Instruction/Step3';
import Step4 from './components/Instruction/Step4';
import Step5 from './components/Instruction/Step5';
import Step6 from './components/Instruction/Step6';
import Step7 from './components/Instruction/Step7';
import Footer from './components/Instruction/Footer';
import './App.css';

const managerNames = {
  287115534: 'Анжела Романова',
  287115542: 'Эльмира Сарова',
  287115546: 'Лилия Новикова',
};

function App() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.content-section');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="app-container">
      <div className="container">
        <Navigation activeSection={activeSection} />
        
        <div className="main-content">
          <Header />
          
          <main>
            <Step1 id="step1" />
            <Step2 id="step2" />
            <Step3 id="step3" />
            <Step4 id="step4" />
            <Step5 id="step5" managerNames={managerNames} />
            <Step6 id="step6" />
            <Step7 id="step7" />
          </main>
          
          <Footer />
        </div>
      </div>

      <button className="back-to-top" onClick={scrollToTop}>
        ↑
      </button>
    </div>
  );
}

export default App;
