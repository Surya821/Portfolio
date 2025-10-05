import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ProjectDetail } from "./components/ProjectDetail";

function AppContent() {
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith('/project/');

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <Skills />
            <Projects />
            <Contact />
          </>
        } />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
      {/* Only show Footer, not newsletter for project detail pages */}
      <Footer hideNewsletter={isProjectDetail} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;