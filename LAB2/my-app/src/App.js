import { useState } from 'react';
import './App.css';

const Icon = ({ name, size = 20 }) => {
  const paths = {
    github: 'M12 .7a11.3 11.3 0 0 0-3.58 22c.57.1.78-.25.78-.55v-2.1c-3.18.7-3.85-1.35-3.85-1.35-.52-1.3-1.27-1.65-1.27-1.65-1.03-.7.08-.68.08-.68 1.15.08 1.75 1.15 1.75 1.15 1 1.7 2.65 1.2 3.3.92.1-.72.4-1.2.7-1.48-2.53-.28-5.18-1.24-5.18-5.57 0-1.23.45-2.24 1.16-3.03-.12-.28-.5-1.43.12-2.98 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.45 3.1-1.16 3.1-1.16.62 1.55.24 2.7.12 2.98.72.8 1.16 1.8 1.16 3.03 0 4.34-2.65 5.29-5.18 5.57.4.34.76.98.76 1.98v2.94c0 .3.21.66.78.55A11.3 11.3 0 0 0 12 .7Z',
    linkedin: 'M5.2 8.5H1.4V22h3.8V8.5ZM3.3 2C2.1 2 1.2 2.9 1.2 4.1S2.1 6.2 3.3 6.2s2.1-.9 2.1-2.1S4.5 2 3.3 2ZM22.8 13.7c0-4.05-2.16-5.93-5.05-5.93-2.33 0-3.37 1.28-3.95 2.18V8.5H10V22h3.8v-6.68c0-1.76.33-3.47 2.52-3.47 2.15 0 2.18 2.01 2.18 3.58V22h3.8l.5-8.3Z',
    mail: 'M2.5 4h19A2.5 2.5 0 0 1 24 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 0 17.5v-11A2.5 2.5 0 0 1 2.5 4Zm0 2 9.5 6.2L21.5 6h-19Zm19.5 12V8.1l-10 6.52L2 8.1V18h20Z',
    arrow: 'M13.1 5.2 20 12l-6.9 6.8-1.5-1.5 4.3-4.3H4v-2h11.9l-4.3-4.3 1.5-1.5Z',
    download: 'M11 2h2v10.2l3.6-3.6 1.4 1.4-6 6-6-6 1.4-1.4 3.6 3.6V2Zm-8 17h18v3H3v-3Z',
    external: 'M13 3h8v8h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H13V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z',
    menu: 'M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z',
    close: 'm6 5 1.4-1.4L12 8.2l4.6-4.6L18 5l-4.6 4.6L18 14.2l-1.4 1.4-4.6-4.6-4.6 4.6L6 14.2l4.6-4.6L6 5Z',
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name]} /></svg>;
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const navLinks = ['About', 'Education', 'Skills', 'Projects', 'Certifications', 'Contact'];
  const skills = [
    ['HTML', '◈', 95], ['CSS', '✦', 92], ['JavaScript', 'JS', 88], ['React', '⚛', 86], ['Python', 'Py', 78],
    ['Java', 'J', 74], ['SQL', '▣', 80], ['Git', '◉', 84], ['GitHub', '⌘', 88],
  ];
  const projects = [
    { title: 'TaskFlow', type: 'Productivity web app', description: 'A focused task manager that makes daily planning feel simple and rewarding.', tech: ['React', 'CSS', 'LocalStorage'], visual: 'taskflow' },
    { title: 'Campus Connect', type: 'Student community platform', description: 'A collaborative hub for students to discover events, clubs, and campus updates.', tech: ['React', 'JavaScript', 'Firebase'], visual: 'campus' },
    { title: 'Weatherly', type: 'Weather dashboard', description: 'A clean weather experience with location search and easy-to-read forecasts.', tech: ['React', 'API', 'Responsive UI'], visual: 'weather' },
  ];

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const submitForm = (event) => { event.preventDefault(); setSent(true); event.currentTarget.reset(); };

  return (
    <div className="portfolio">
      <nav className="navbar">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Go to home">AR<span>.</span></button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>{navLinks.map((link) => <button key={link} onClick={() => scrollTo(link.toLowerCase().replace(' ', '-'))}>{link}</button>)}</div>
        <button className="nav-contact" onClick={() => scrollTo('contact')}>Let's talk <Icon name="arrow" size={17} /></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      </nav>

      <main>
        <section id="home" className="hero section-shell">
          <div className="hero-copy fade-up">
            <p className="eyebrow"><span /> AVAILABLE FOR OPPORTUNITIES</p>
            <h1>Hi, I'm <em>Ananya.</em><br />I build for the web.</h1>
            <p className="hero-text">A CSE student and aspiring React developer with a love for turning ideas into thoughtful, accessible digital experiences.</p>
            <div className="hero-actions">
              <a className="button primary" href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Get in touch <Icon name="arrow" size={18} /></a>
              <a className="button secondary" href="/resume.pdf" download>Download CV <Icon name="download" size={17} /></a>
            </div>
            <div className="social-row"><span>FOLLOW ME</span><i /><a href="https://github.com" aria-label="GitHub"><Icon name="github" /></a><a href="https://linkedin.com" aria-label="LinkedIn"><Icon name="linkedin" /></a><a href="mailto:ananya@example.com" aria-label="Email"><Icon name="mail" /></a></div>
          </div>
          <div className="hero-portrait fade-up delay"><div className="portrait-shape" /><div className="portrait-frame"><div className="portrait-photo"><span>AR</span></div></div><div className="experience-card"><strong>01</strong><span>Year of<br />building & learning</span></div><div className="scribble">creative<br />developer <span>↗</span></div></div>
        </section>

        <section id="about" className="about section-shell section-pad">
          <div className="section-label"><span>01</span><i /> ABOUT ME</div>
          <div className="about-grid"><h2>Curious mind,<br /><em>purposeful work.</em></h2><div className="about-card"><p>I'm a motivated CSE student based in India, fascinated by the way great technology can simplify everyday life. I enjoy learning in public, solving practical problems, and creating interfaces people genuinely enjoy using.</p><p>My goal is to grow into a versatile developer who brings both technical care and a human perspective to every project.</p><div className="details-grid"><div><small>LANGUAGES</small><b>English · Hindi · Kannada</b></div><div><small>BASED IN</small><b>India <span className="pin">●</span></b></div><div><small>INTERESTS</small><b>Design · Music · Reading</b></div><div><small>FOCUS</small><b>Frontend Development</b></div></div></div></div>
        </section>

        <section id="education" className="education section-pad"><div className="section-shell"><div className="section-label light"><span>02</span><i /> EDUCATION</div><h2>Learning with <em>intention.</em></h2><div className="education-list"><article><span className="year">2023 — 2026</span><div><h3>UG - Computer Science</h3><p>RVU</p></div><div className="grade"><small>CGPA</small><b>9.5 / 10</b></div><p className="education-description">Building a strong foundation in programming, databases, web technologies, and software development.</p></article><article><span className="year">2021 — 2023</span><div><h3>Higher Secondary Education</h3><p>kumaran's</p></div><div className="grade"><small>PERCENTAGE</small><b>95%</b></div><p className="education-description">Completed with a focus on Computer Science, Mathematics, and English.</p></article></div></div></section>

        <section id="skills" className="skills section-shell section-pad"><div className="section-label"><span>03</span><i /> MY TOOLKIT</div><div className="heading-row"><h2>Skills I bring<br />to the <em>table.</em></h2><p>A growing toolkit shaped by hands-on practice, coursework, and a genuine drive to keep exploring.</p></div><div className="skills-grid">{skills.map(([name, icon, level]) => <article className="skill-card" key={name}><div className="skill-icon">{icon}</div><div><h3>{name}</h3><div className="progress"><span style={{ width: `${level}%` }} /></div><small>{level}% proficiency</small></div></article>)}</div></section>

        <section id="projects" className="projects section-pad"><div className="section-shell"><div className="section-label"><span>04</span><i /> SELECTED WORK</div><div className="heading-row"><h2>Things I've<br /><em>made.</em></h2><a className="text-link" href="https://github.com">View all projects <Icon name="arrow" size={17} /></a></div><div className="projects-grid">{projects.map((project, index) => <article className="project-card" key={project.title}><div className={`project-visual ${project.visual}`}><span className="browser-dot" /><span className="browser-dot" /><span className="browser-dot" /><div className="visual-content">{index === 0 && <><b>Good morning, Ananya</b><div className="fake-task">✓ Finish portfolio design</div><div className="fake-task">○ Review assignments</div></>}{index === 1 && <><b>Campus Connect</b><div className="fake-post">Design Club · 42 attending</div><div className="fake-post">Tech Fest '25</div></>}{index === 2 && <><b>26° <small>Mostly sunny</small></b><div className="sun">☀</div><div className="forecast">MON &nbsp; TUE &nbsp; WED</div></>}</div></div><div className="project-info"><small>{project.type}</small><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tech.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href="https://github.com"><Icon name="github" size={17} /> Code</a><a href="https://example.com">Live demo <Icon name="external" size={16} /></a></div></div></article>)}</div></div></section>

        <section id="certifications" className="certifications section-shell section-pad"><div className="section-label"><span>05</span><i /> CREDENTIALS</div><h2>Always <em>learning.</em></h2><div className="cert-grid">{[['Responsive Web Design', 'freeCodeCamp', '2024'], ['JavaScript Essentials', 'Cisco Networking Academy', '2024'], ['Python for Everybody', 'Coursera', '2023']].map(([title, org, year], i) => <article className="cert-card" key={title}><div className={`cert-mark mark-${i}`}>✦</div><small>{year}</small><h3>{title}</h3><p>{org}</p><a href="https://example.com">View certificate <Icon name="arrow" size={16} /></a></article>)}</div></section>

        <section id="contact" className="contact"><div className="section-shell contact-grid"><div><div className="section-label light"><span>06</span><i /> CONTACT</div><h2>Let's create<br />something <em>great.</em></h2><p>Have a project in mind or just want to say hello? My inbox is always open.</p><div className="contact-list"><a href="mailto:ananya@example.com"><Icon name="mail" size={18} /> ananya@example.com</a><a href="tel:+910000000000">⌕ +91 00000 00000</a><span>● India</span></div><div className="contact-socials"><a href="https://github.com"><Icon name="github" /></a><a href="https://linkedin.com"><Icon name="linkedin" /></a></div></div><form className="contact-form" onSubmit={submitForm}><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@example.com" /></label><label>Subject<input required placeholder="What is this about?" /></label><label>Message<textarea required placeholder="Tell me a little about your project..." rows="4" /></label><button className="button primary" type="submit">Send message <Icon name="arrow" size={18} /></button>{sent && <p className="success">Thanks! Your message is ready to send.</p>}</form></div></section>
      </main>
      <footer><div className="section-shell"><a className="brand" href="#home">AR<span>.</span></a><p>© {new Date().getFullYear()} Ananya. Made with curiosity and care.</p><div><a href="#about">About</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div></div></footer>
    </div>
  );
}

export default App;
