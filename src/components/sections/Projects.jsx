import { useState, useRef, useEffect, useCallback } from 'react';
import { FaGithub, FaExternalLinkAlt, FaLinkedin, FaPlay, FaPause } from 'react-icons/fa';
import './Projects.css';

function Projects() {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videoStates, setVideoStates] = useState({});
  const [isVisible, setIsVisible] = useState({});
  const videoRefs = useRef({});
  const observerRef = useRef(null);

  const projects = [
    {
      id: 'timetable',
      title: 'School TimeTable Generator',
      description: 'A dynamic, constraint-aware School Timetable Generator built to automate and optimize academic scheduling in real time. Features intelligent conflict resolution, teacher availability tracking, etc.',
      type: 'video',
      media: './demo1.mp4',
      technologies: ['React', 'FastAPI', 'MongoDB', 'Algorithm Design'],
      links: [
        { icon: FaGithub, text: 'View Code', url: 'https://github.com/a6hinandh/School_TimeTable_Generator' },
        { icon: FaExternalLinkAlt, text: 'Live Demo', url: 'https://timetable-generator-t4h3.onrender.com' },
        { icon: FaLinkedin, text: 'Article', url: 'https://www.linkedin.com/posts/abhinandh-a-0a624a332_webdevelopment-ai-edtech-activity-7352650536547942400-PC5I?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOvf_4BAIsszhcVezftr44cyMq7VCSUvGo' }
      ]
    },
    {
      id: 'ecobyte',
      title: 'EcoByte - Smart E-Waste Marketplace',
      description: 'A comprehensive smart marketplace app designed to tackle the growing crisis of e-waste through intelligent matching, recycling tracking, and environmental impact visualization. Connects buyers, sellers, and recyclers in a sustainable ecosystem.',
      type: 'youtube',
      media: 'https://www.youtube.com/embed/loRIlxXh0qw?autoplay=0&mute=1&loop=1&playlist=loRIlxXh0qw&controls=1&modestbranding=1&rel=0&enablejsapi=1',
      technologies: ['Flutter', 'Firebase', 'AI/ML'],
      links: [
        { icon: FaGithub, text: 'View Code', url: 'https://github.com/VioniX37/EcoByte' },
        { icon: FaExternalLinkAlt, text: 'Live App', url: 'https://ecobyte-web.netlify.app' },
        { icon: FaLinkedin, text: 'Case Study', url: 'https://www.linkedin.com/posts/abhinandh-a-0a624a332_ecobyte-vionix-googlesolutionchallenge-activity-7335274271541202946-Ukz_?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOvf_4BAIsszhcVezftr44cyMq7VCSUvGo' }
      ]
    },
    {
      id: 'fined',
      title: 'FinEd - AI-Powered Financial Education Platform',
      description: 'An AI-powered financial education platform designed to make finance simple, interactive, and practical for everyone.',
      type: 'youtube',
      media: 'https://www.youtube.com/embed/1QaKuIKHQtE?autoplay=0&mute=1&loop=1&playlist=1QaKuIKHQtE&controls=1&modestbranding=1&rel=0&enablejsapi=1',
      technologies: ['React','Node.js', 'Firebase', 'AI/ML'],
      links: [
        { icon: FaGithub, text: 'View Code', url: 'https://github.com/a6hinandh/FinEd' },
        { icon: FaExternalLinkAlt, text: 'Live App', url: 'https://fined-7zy8.onrender.com' },
        { icon: FaLinkedin, text: 'Case Study', url: '' }
      ]
    }
  ];

  // Enhanced video control with error handling
  const handleVideoControl = useCallback(async (projectId, action) => {
    const video = videoRefs.current[projectId];
    if (!video) return;

    try {
      if (action === 'play') {
        await video.play();
        setPlayingVideo(projectId);
        setVideoStates(prev => ({ ...prev, [projectId]: 'playing' }));
      } else if (action === 'pause') {
        video.pause();
        setPlayingVideo(null);
        setVideoStates(prev => ({ ...prev, [projectId]: 'paused' }));
      }
    } catch (error) {
      console.warn(`Video ${action} failed for project ${projectId}:`, error);
      setVideoStates(prev => ({ ...prev, [projectId]: 'error' }));
    }
  }, []);

  // Intersection Observer for lazy loading and auto-play
  useEffect(() => {
    const observerOptions = {
      threshold: [0.2, 0.6],
      rootMargin: '50px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const projectId = entry.target.dataset.projectId;
        if (!projectId) return;

        const isIntersecting = entry.isIntersecting;
        const intersectionRatio = entry.intersectionRatio;

        setIsVisible(prev => ({ ...prev, [projectId]: isIntersecting }));

        // Auto-play video when 60% visible
        if (intersectionRatio >= 0.6 && isIntersecting) {
          const project = projects.find(p => p.id === projectId);
          if (project?.type === 'video') {
            handleVideoControl(projectId, 'play');
          }
        } 
        // Pause when less than 20% visible
        else if (intersectionRatio < 0.2 && !isIntersecting) {
          const project = projects.find(p => p.id === projectId);
          if (project?.type === 'video') {
            handleVideoControl(projectId, 'pause');
          }
        }
      });
    }, observerOptions);

    // Observe all project cards
    const cards = document.querySelectorAll('.project-block');
    cards.forEach((card) => observerRef.current?.observe(card));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleVideoControl, projects]);

  // Video event handlers
  const setupVideoEvents = useCallback((video, projectId) => {
    if (!video) return;

    const handleLoadStart = () => setVideoStates(prev => ({ ...prev, [projectId]: 'loading' }));
    const handleCanPlay = () => setVideoStates(prev => ({ ...prev, [projectId]: 'ready' }));
    const handleError = () => setVideoStates(prev => ({ ...prev, [projectId]: 'error' }));
    const handleEnded = () => {
      setPlayingVideo(null);
      setVideoStates(prev => ({ ...prev, [projectId]: 'ended' }));
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Manual video toggle
  const toggleVideo = useCallback((projectId) => {
    const isPlaying = playingVideo === projectId;
    handleVideoControl(projectId, isPlaying ? 'pause' : 'play');
  }, [playingVideo, handleVideoControl]);

  // Render video controls
  const renderVideoControls = (projectId) => {
    const isPlaying = playingVideo === projectId;
    const state = videoStates[projectId];

    if (state === 'error') {
      return (
        <div className="video-error">
          <span>Video unavailable</span>
        </div>
      );
    }

    return (
      <button
        className="video-control-btn"
        onClick={() => toggleVideo(projectId)}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        disabled={state === 'loading'}
      >
        {state === 'loading' ? (
          <div className="loading-spinner" />
        ) : isPlaying ? (
          <FaPause />
        ) : (
          <FaPlay />
        )}
      </button>
    );
  };

  return (
      <div className="projects-scroll-wrapper">
        <div className="section-header">
          <h1>Featured Projects</h1>
          <p>Innovative solutions crafted with passion and precision</p>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-block"
              data-project-id={project.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-content">
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>

                {/* Technology Tags */}
                {project.technologies && (
                  <div className="tech-tags">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="project-links">
                  {project.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label={`${link.text} for ${project.title}`}
                    >
                      <link.icon aria-hidden="true" />
                      <span>{link.text}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="project-media" data-visible={isVisible[project.id]}>
                {project.type === 'video' ? (
                  <div className="video-container">
                    <video
                      ref={(el) => {
                        if (el) {
                          videoRefs.current[project.id] = el;
                          setupVideoEvents(el, project.id);
                        }
                      }}
                      className="project-video"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={`./posters/${project.id}-poster.jpg`}
                    >
                      <source src={project.media} type="video/mp4" />
                      <p>Your browser doesn't support video playback.</p>
                    </video>
                    <div className="video-overlay">
                      {renderVideoControls(project.id)}
                    </div>
                  </div>
                ) : (
                  <div className="iframe-container">
                    <iframe
                      className="project-video"
                      src={project.media}
                      title={`${project.title} Demo Video`}
                      frameBorder="0"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default Projects;