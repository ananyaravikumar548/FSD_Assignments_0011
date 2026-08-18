function Sidebar({ open }) {
  const nav = ["Home", "Shop", "Orders", "Account"];
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <p className="sidebar-label">MENU</p>
      <nav>
        {nav.map((n) => (
          <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
