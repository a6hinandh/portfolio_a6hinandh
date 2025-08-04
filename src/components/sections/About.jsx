function About() {
  return (
    <div className="about-card-scroll-wrapper">
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
          height: 100%;
          overflow-y: auto;
          padding: 2rem;
          box-sizing: border-box;
        }

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
        }

        .about-card p {
          line-height: 1.7;
          margin-bottom: 1rem;
          color: #f0f0e6;
        }

        .about-card strong {
          color: #95b2ec;
        }

        @media (max-width: 768px) {
          .about-card {
            padding: 1.5rem;
          }

          .about-card-scroll-wrapper {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default About;
