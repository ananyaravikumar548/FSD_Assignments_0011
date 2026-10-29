import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import HodDesk from "./components/HodDesk";
import Programs from "./components/Programs";
import Faculty from "./components/Faculty";
import Laboratories from "./components/Laboratories";
import Research from "./components/Research";
import Placements from "./components/Placements";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import Downloads from "./components/Downloads";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import InquiryModal from "./components/InquiryModal";
import "./App.css";

function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");

  const handleProgramSelect = (programTitle) => {
    setSelectedProgram(programTitle);
    setInquiryModalOpen(true);
  };

  const handleEventRegister = (eventTitle) => {
    setSelectedProgram(`Event Registration: ${eventTitle}`);
    setInquiryModalOpen(true);
  };

  return (
    <div className="rv-app-root">
      {/* Top Navbar */}
      <Navbar onOpenInquiry={() => setInquiryModalOpen(true)} />

      {/* Main Single-Page Sections */}
      <main id="main-content">
        <Hero onOpenInquiry={() => setInquiryModalOpen(true)} />
        <About />
        <HodDesk onOpenInquiry={() => setInquiryModalOpen(true)} />
        <Programs onSelectProgramForInquiry={handleProgramSelect} />
        <Faculty onOpenInquiry={() => setInquiryModalOpen(true)} />
        <Laboratories />
        <Research />
        <Placements onOpenInquiry={() => setInquiryModalOpen(true)} />
        <Gallery />
        <Events onRegisterEvent={handleEventRegister} />
        <Downloads />
        <Contact
          prefilledProgram={selectedProgram}
          onResetPrefill={() => setSelectedProgram("")}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fast Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultProgram={selectedProgram}
      />

      {/* Floating Quick Apply Action Button */}
      <button
        type="button"
        className="rv-floating-apply"
        onClick={() => setInquiryModalOpen(true)}
        aria-label="Quick Admissions Inquiry"
      >
        <span className="rv-fa-icon">🎓</span>
        <span className="rv-fa-text">Admissions 2026</span>
      </button>
    </div>
  );
}

export default App;
