import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import ShopMain from "./components/ShopMain";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header onMenuClick={() => setSidebarOpen((isOpen) => !isOpen)} />
        <Sidebar open={sidebarOpen} />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/shop/*" element={<ShopMain />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
