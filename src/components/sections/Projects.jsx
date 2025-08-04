import { useState, useRef, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaLinkedin } from 'react-icons/fa';
import ScrollStack, { ScrollStackItem } from "./components/ScrollStack";
import './Projects.css';

function Projects() {
  const [visibleCard, setVisibleCard] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (visibleCard === 0 && videoRef.current) {
      videoRef.current.play().catch(console.error);
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [visibleCard]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardIndex = parseInt(entry.target.dataset.cardIndex);
          setVisibleCard(cardIndex);
        }
      });
    }, { threshold: 0.6 });

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="projects-section">
      <div className="section-header">
        <h1>My Projects</h1>
        <p>A showcase of my recent work and creative solutions</p>
      </div>

      <ScrollStack
        itemDistance={120}
        itemScale={0.04}
        itemStackDistance={30}
        stackPosition="1%"
        scaleEndPosition="15%"
        baseScale={0.92}
      >
        <ScrollStackItem>
          <div className="project-card video-card" data-card-index="0">
            <div className="project-content">
              <h2 className="project-title">School TimeTable Generator</h2>
              <p className="project-description">
                A dynamic, constraint-aware School Timetable Generator built to automate and optimize academic scheduling in real time.
              </p>
              <div className="project-links">
                <a href="https://github.com/yourusername/project1" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub /> <span>GitHub</span>
                </a>
                <a href="https://your-website.com" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaExternalLinkAlt /> <span>Live Site</span>
                </a>
                <a href="https://linkedin.com/posts/your-post" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaLinkedin /> <span>LinkedIn</span>
                </a>
              </div>
            </div>
            <div className="project-media">
              <video
                ref={videoRef}
                className="project-video"
                muted
                loop
                playsInline
                poster="/path-to-video-poster.jpg"
              >
                <source src="./demo1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </ScrollStackItem>

        <ScrollStackItem>
          <div className="project-card video-card" data-card-index="1">
            <div className="project-content">
              <h2 className="project-title">EcoByte</h2>
              <p className="project-description">
                A smart marketplace app designed to tackle the growing crisis of e-waste.
              </p>
              <div className="project-links">
                <a href="https://github.com/yourusername/project2" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub /> <span>GitHub</span>
                </a>
                <a href="https://your-dashboard.com" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaExternalLinkAlt /> <span>Live Demo</span>
                </a>
                <a href="https://linkedin.com/posts/your-post-2" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaLinkedin /> <span>LinkedIn</span>
                </a>
              </div>
            </div>
            <div className="project-media">
  <iframe
    className="project-video"
    src="https://www.youtube.com/embed/loRIlxXh0qw?autoplay=1&mute=1&loop=1&playlist=loRIlxXh0qw&controls=0&modestbranding=1&rel=0&disablekb=1&fs=0"
    title="EcoByte Demo Video"
    frameBorder="0"
    allow="autoplay; encrypted-media"
    allowFullScreen={false}
    style={{ pointerEvents: 'none' }} // ❌ disables interaction
  ></iframe>
</div>

          </div>
        </ScrollStackItem>
      </ScrollStack>
    </div>
  );
}

export default Projects;
