import React, { useRef, useEffect, useCallback, useState } from 'react';

// Magic Bento utilities and constants
const DEFAULT_PARTICLE_COUNT = 6;
const DEFAULT_SPOTLIGHT_RADIUS = 200;
const DEFAULT_GLOW_COLOR = "59, 130, 246";
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: rgba(${color}, 0.8);
    box-shadow: 0 0 4px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.6,
  fadeDistance: radius * 0.8,
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

// ParticleCard Component
const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor
      )
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach((particle) => {
      if (particle.parentNode) {
        particle.style.transition = 'all 0.2s ease';
        particle.style.transform = 'scale(0)';
        particle.style.opacity = '0';
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 200);
      }
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current || disableAnimations) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        clone.style.transform = 'scale(0)';
        clone.style.opacity = '0';
        setTimeout(() => {
          clone.style.transition = 'all 0.2s ease';
          clone.style.transform = 'scale(1)';
          clone.style.opacity = '1';
        }, 10);

        const moveParticle = () => {
          if (!isHoveredRef.current) return;
          const x = (Math.random() - 0.5) * 60;
          const y = (Math.random() - 0.5) * 60;
          clone.style.transform = `translate(${x}px, ${y}px) scale(1)`;
          setTimeout(moveParticle, 1500 + Math.random() * 1000);
        };
        setTimeout(moveParticle, 300);

        const pulse = () => {
          if (!isHoveredRef.current) return;
          clone.style.opacity = Math.random() * 0.4 + 0.3;
          setTimeout(pulse, 1000 + Math.random() * 1000);
        };
        setTimeout(pulse, 500);
      }, index * 80);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles, disableAnimations]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        element.style.transition = 'transform 0.2s ease';
        element.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(2deg) translateY(-2px)';
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      }
    };

    const handleMouseMove = (e) => {
      if (!enableTilt) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    };

    const handleClick = (e) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.3) 0%, rgba(${glowColor}, 0.1) 50%, transparent 70%);
        left: ${x - 50}px;
        top: ${y - 50}px;
        pointer-events: none;
        z-index: 1000;
        transform: scale(0);
        opacity: 1;
        transition: all 0.6s ease;
      `;

      element.appendChild(ripple);

      setTimeout(() => {
        ripple.style.transform = 'scale(2)';
        ripple.style.opacity = '0';
      }, 10);

      setTimeout(() => ripple.remove(), 600);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

// GlobalSpotlight Component
const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.08) 0%,
        rgba(${glowColor}, 0.04) 20%,
        rgba(${glowColor}, 0.02) 35%,
        rgba(${glowColor}, 0.01) 50%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      transition: opacity 0.2s ease;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current;
      const rect = section.getBoundingClientRect();
      const mouseInside = e.clientX >= rect.left && e.clientX <= rect.right && 
                         e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside;
      const cards = gridRef.current.querySelectorAll(".tech-card");

      if (!mouseInside) {
        spotlightRef.current.style.opacity = '0';
        cards.forEach((card) => {
          card.style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - 
                        Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      spotlightRef.current.style.left = e.clientX + 'px';
      spotlightRef.current.style.top = e.clientY + 'px';

      const targetOpacity = minDistance <= proximity ? 0.4 : 
                           minDistance <= fadeDistance ? 
                           ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.4 : 0;

      spotlightRef.current.style.opacity = targetOpacity;
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll(".tech-card").forEach((card) => {
        card.style.setProperty("--glow-intensity", "0");
      });
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0';
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (spotlightRef.current?.parentNode) {
        spotlightRef.current.parentNode.removeChild(spotlightRef.current);
      }
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

// Mobile detection hook
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const TechLogo = ({ tech }) => {
  const logoMap = {
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'Javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    'JQuery': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
    'EJS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'C': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'MYSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    'Render': 'https://images.opencollective.com/render/6280d6bf/logo/256.png',
    'GIT': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'OAuth': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg'
  };

  const darkLogos = ['Express.js'];

  return (
    <img
      src={logoMap[tech] || 'https://via.placeholder.com/18x18?text=?'}
      alt={tech}
      style={{
        width: '18px',
        height: '18px',
        marginRight: '6px',
        flexShrink: 0,
        filter: darkLogos.includes(tech) ? 'invert(1) brightness(0.9)' : 'brightness(0.95)'
      }}
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
};

// Main TechTools Component
const TechTools = () => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = isMobile;

  const techSections = [
    {
      title: 'Frontend Development',
      items: ['HTML', 'CSS', 'Javascript', 'React.js', 'Bootstrap', 'JQuery', 'EJS'],
      description: 'Building responsive, interactive user interfaces with modern web technologies',
      icon: '🎨'
    },
    {
      title: 'Backend Development',
      items: ['Node.js', 'Express.js', 'FastAPI'],
      description: 'Creating robust server-side applications and RESTful APIs',
      icon: '⚙️'
    },
    {
      title: 'Programming Languages',
      items: ['Python', 'Java', 'C', 'C++'],
      description: 'Multi-language proficiency for diverse development needs',
      icon: '💻'
    },
    {
      title: 'Database Management',
      items: ['PostgreSQL', 'MYSQL'],
      description: 'Designing and optimizing relational database systems',
      icon: '🗄️'
    },
    {
      title: 'Mobile Development',
      items: ['Flutter'],
      description: 'Cross-platform mobile app development',
      icon: '📱'
    },
    {
      title: 'Development Tools',
      items: ['Render', 'GIT', 'OAuth'],
      description: 'Essential tools for deployment, version control, and authentication',
      icon: '🛠️'
    }
  ];

  return (
    <div className="tech-stack-section">
      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={shouldDisableAnimations}
        enabled={!shouldDisableAnimations}
        spotlightRadius={DEFAULT_SPOTLIGHT_RADIUS}
        glowColor={DEFAULT_GLOW_COLOR}
      />
      
      {/* Header Section */}
      <div className="tech-header">
        <h1 className="tech-title">
          Technology Stack
        </h1>
        <p className="tech-subtitle">
          Building modern applications with cutting-edge technologies and industry best practices
        </p>
      </div>

      <div ref={gridRef} className="tech-grid">
        {techSections.map((section, index) => (
          <ParticleCard
            key={section.title}
            className="tech-card"
            disableAnimations={shouldDisableAnimations}
            particleCount={4}
            glowColor={DEFAULT_GLOW_COLOR}
            enableTilt={!shouldDisableAnimations}
            clickEffect={true}
            style={{
              '--glow-x': '50%',
              '--glow-y': '50%',
              '--glow-intensity': '0',
              '--glow-radius': '150px',
            }}
          >
            {/* Glow border effect */}
            <div
              className="card-glow-border"
              style={{
                position: 'absolute',
                inset: '0',
                padding: '1px',
                background: `radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                  rgba(59, 130, 246, calc(var(--glow-intensity) * 0.6)) 0%,
                  rgba(59, 130, 246, calc(var(--glow-intensity) * 0.3)) 30%,
                  transparent 70%)`,
                borderRadius: 'inherit',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'subtract',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            
            <div className="card-content">
              <div className="card-header">
                <span className="card-icon" role="img" aria-label={section.title}>
                  {section.icon}
                </span>
                <h3 className="card-title">{section.title}</h3>
              </div>
              
              <p className="card-description">{section.description}</p>
              
              <div className="tech-items">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="tech-item">
                    <TechLogo tech={item} />
                    <span className="tech-name">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ParticleCard>
        ))}
      </div>

      <style jsx>{`
        .tech-stack-section {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          padding: 1rem;
          overflow-y: auto;
          box-sizing: border-box;
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.4) transparent;
          -webkit-overflow-scrolling: touch;
        }

        .tech-stack-section::-webkit-scrollbar {
          width: 6px;
        }

        .tech-stack-section::-webkit-scrollbar-track {
          background: transparent;
        }

        .tech-stack-section::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.4);
          border-radius: 3px;
        }

        .tech-stack-section::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.6);
        }

        .tech-header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(59, 130, 246, 0.2);
        }

        .tech-title {
          font-size: 2.2rem !important;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa, #a78bfa, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.75rem;
          text-shadow: none;
        }

        .tech-subtitle {
          font-size: 1rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .tech-card {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.3),
            0 2px 8px rgba(59, 130, 246, 0.1);
          position: relative;
          overflow: hidden;
        }

        .tech-card:hover {
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 4px 16px rgba(59, 130, 246, 0.2);
        }

        .card-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .card-icon {
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 10px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #f1f5f9;
          margin: 0;
          line-height: 1.3;
        }

        .card-description {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .tech-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .tech-item {
          display: flex;
          align-items: center;
          padding: 0.5rem 0.75rem;
          background: rgba(15, 23, 42, 0.3);
          border: 1px solid rgba(59, 130, 246, 0.15);
          border-radius: 8px;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }

        .tech-item:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
          transform: translateX(3px);
        }

        .tech-name {
          color: #cbd5e1;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .particle-container {
          position: relative;
          overflow: hidden;
        }

        .global-spotlight {
          mix-blend-mode: screen;
          will-change: transform, opacity;
          z-index: 200 !important;
          pointer-events: none;
        }

        /* Large desktop */
        @media (min-width: 1440px) {
          .tech-stack-section {
            padding: 2rem;
          }

          .tech-title {
            font-size: 2.5rem !important;
          }

          .tech-subtitle {
            font-size: 1.1rem;
          }

          .tech-grid {
            gap: 2rem;
          }

          .tech-card {
            padding: 2rem;
          }
        }

        /* Desktop */
        @media (max-width: 1280px) {
          .tech-title {
            font-size: 2rem !important;
          }

          .tech-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.25rem;
          }
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .tech-stack-section {
            padding: 1.5rem;
          }

          .tech-title {
            font-size: 1.8rem !important;
          }

          .tech-subtitle {
            font-size: 0.95rem;
          }

          .tech-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.25rem;
          }

          .tech-header {
            margin-bottom: 1.5rem;
          }
        }

        /* Mobile and tablet - matches App.css breakpoint */
        @media (max-width: 768px) {
          /* Match the App.css mobile behavior */
          .tech-stack-section {
            height: auto !important;
            min-height: auto;
            width: 100%;
            padding: 1rem;
            overflow: visible !important;
            position: static;
          }

          .tech-header {
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
          }

          .tech-title {
            font-size: 1.6rem !important;
            margin-bottom: 0.5rem;
          }

          .tech-subtitle {
            font-size: 0.9rem;
            line-height: 1.5;
          }

          .tech-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
            max-width: none;
          }

          .tech-card {
            padding: 1.25rem;
            margin-bottom: 0.5rem;
          }

          .card-title {
            font-size: 1.1rem;
          }

          .card-description {
            font-size: 0.85rem;
            margin-bottom: 1.25rem;
          }

          .tech-item {
            padding: 0.4rem 0.6rem;
          }

          .tech-name {
            font-size: 0.85rem;
          }

          .card-icon {
            width: 36px;
            height: 36px;
            font-size: 1.4rem;
          }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          .tech-stack-section {
            padding: 1rem 0.75rem;
          }

          .tech-title {
            font-size: 1.4rem !important;
          }

          .tech-subtitle {
            font-size: 0.85rem;
            padding: 0 0.5rem;
          }

          .tech-card {
            padding: 1rem;
            border-radius: 12px;
          }

          .card-icon {
            width: 32px;
            height: 32px;
            font-size: 1.2rem;
          }

          .card-header {
            gap: 0.5rem;
            margin-bottom: 0.75rem;
          }

          .card-title {
            font-size: 1rem;
          }

          .card-description {
            font-size: 0.8rem;
            margin-bottom: 1rem;
          }

          .tech-items {
            gap: 0.5rem;
          }

          .tech-item {
            padding: 0.35rem 0.5rem;
            border-radius: 6px;
          }

          .tech-name {
            font-size: 0.8rem;
          }
        }

        /* Very small screens */
        @media (max-width: 320px) {
          .tech-stack-section {
            padding: 0.75rem 0.5rem;
          }

          .tech-title {
            font-size: 1.2rem !important;
          }

          .tech-subtitle {
            font-size: 0.8rem;
            padding: 0 0.25rem;
          }

          .tech-header {
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
          }

          .tech-card {
            padding: 0.75rem;
          }

          .card-icon {
            width: 28px;
            height: 28px;
            font-size: 1rem;
          }

          .card-title {
            font-size: 0.95rem;
          }

          .card-description {
            font-size: 0.75rem;
            line-height: 1.4;
          }

          .tech-item {
            padding: 0.3rem 0.4rem;
          }

          .tech-name {
            font-size: 0.75rem;
          }
        }

        /* Landscape phone orientation */
        @media (max-width: 768px) and (orientation: landscape) {
          .tech-stack-section {
            padding: 0.75rem;
          }

          .tech-header {
            margin-bottom: 1rem;
          }

          .tech-title {
            font-size: 1.4rem !important;
          }

          .tech-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .tech-card {
            padding: 1rem;
          }
        }

        /* High DPI screens */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .tech-card {
            border-width: 0.5px;
          }
          
          .tech-item {
            border-width: 0.5px;
          }
        }
      `}</style>
    </div>
  );
};

export default TechTools;