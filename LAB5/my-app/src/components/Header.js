import { Link } from "react-router-dom";

function Header({ onMenuClick }) {
  return (
    <header className="header">
      <button className="mobile-menu" onClick={onMenuClick} aria-label="Toggle navigation">☰</button>
      <Link className="brand" to="/"><span>shop</span>zone</Link>
      <div className="header-actions">
        <nav className="top-nav">
          <Link to="/shop">Shop</Link>
        </nav>
        <div className="student-profile"><div className="avatar">AS</div><div><strong>Alex Smith</strong></div><span className="chevron">⌄</span></div>
      </div>
    </header>
  );
}

export default Header;
