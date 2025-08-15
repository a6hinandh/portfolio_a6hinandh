function About() {
  return (
    <div className="about-card-scroll-wrapper scrollable-content">
      <div className="about-card">
        <h1>About Me</h1>
        <p>
          Hi! I'm <strong>Abhinandh A</strong>, a Computer Science undergraduate at <strong>IIIT Kottayam</strong>, 
          specializing in Artificial Intelligence and Data Science. I'm a curious and driven learner who thrives 
          at the intersection of creativity and logic.
        </p>
        <p>
          My journey began with web and app development, where I fell in love with building useful, intuitive digital 
          tools. Along the way, I developed a strong interest in clean UI/UX design and automation.
        </p>
        <p>
          I’m currently diving deeper into <strong>AI and large language models</strong>, fascinated by their potential 
          to power smarter, more meaningful solutions. I enjoy working in collaborative, hackathon-driven environments 
          and am also exploring entrepreneurship.
        </p>
        <p>
          Whether it’s building with code, solving algorithmic challenges, or crafting AI-powered tools, I strive to learn 
          something new every day and use technology to create real impact.
        </p>
      </div>

      <style jsx>{`
        .about-card-scroll-wrapper {
  /* sits inside .right-section */
  position: relative;         /* ensure it’s above ::before glass */
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* match the glassmorphism look */
.about-card {
  background: rgba(245, 245, 220, 0.05);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(149, 178, 236, 0.2);
  box-shadow: 0 4px 20px rgba(149, 178, 236, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.about-card h1 {
  color: #95b2ec;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.about-card p {
  line-height: 1.7;
  margin-bottom: 1rem;
  color: #f0f0e6;
  font-size: 1rem;
}

.about-card strong {
  color: #95b2ec;
}

/* Scrollbar like your other pages */
.about-card-scroll-wrapper::-webkit-scrollbar { width: 8px; }
.about-card-scroll-wrapper::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 4px;
}
.about-card-scroll-wrapper::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  border-radius: 4px;
}
.about-card-scroll-wrapper::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
}

/* ===== Responsive ===== */

/* Tablet */
@media (max-width: 1024px) {
  .about-card-scroll-wrapper { padding: 1.5rem; }
  .about-card { padding: 1.5rem; }
}

/* Mobile – this is the fix for ~760px */
@media (max-width: 768px) {
  .about-card-scroll-wrapper {
    /* IMPORTANT: don’t force 100% height when parent becomes auto */
    height: 100px;
    min-height: 40vh;
    width:100vh;
  }
  .about-card {
    padding: 1rem;
    border-radius: 14px;
  }
  .about-card h1 { font-size: 1.6rem; margin-bottom: 1rem; }
  .about-card p { font-size: 0.95rem; line-height: 1.6; }
}

/* Small mobile */
@media (max-width: 480px) {
  .about-card-scroll-wrapper { padding: 1rem; }
  .about-card { padding: 1rem; border-radius: 12px; }
  .about-card h1 { font-size: 1.4rem; }
  .about-card p { font-size: 0.9rem; }
}

/* Very small */
@media (max-width: 320px) {
  .about-card-scroll-wrapper { padding: 0.8rem; }
  .about-card { padding: 0.8rem; border-radius: 10px; }
  .about-card h1 { font-size: 1.2rem; }
  .about-card p { font-size: 0.85rem; }
}
      `}</style>
    </div>
  );
}

export default About;
