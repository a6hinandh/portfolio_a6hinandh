import React, { useRef, useEffect, useCallback, useState } from 'react';

// Magic Bento utilities and constants
const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_SPOTLIGHT_RADIUS = 250;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
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
  enableMagnetism = true,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

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
    magnetismAnimationRef.current?.kill?.();

    particlesRef.current.forEach((particle) => {
      if (particle.parentNode) {
        particle.style.transition = 'all 0.3s ease';
        particle.style.transform = 'scale(0)';
        particle.style.opacity = '0';
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 300);
      }
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

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
          clone.style.transition = 'all 0.3s ease';
          clone.style.transform = 'scale(1)';
          clone.style.opacity = '1';
        }, 10);

        const moveParticle = () => {
          if (!isHoveredRef.current) return;
          const x = (Math.random() - 0.5) * 80;
          const y = (Math.random() - 0.5) * 80;
          clone.style.transform = `translate(${x}px, ${y}px) scale(1) rotate(${Math.random() * 360}deg)`;
          setTimeout(moveParticle, 2000 + Math.random() * 1000);
        };
        setTimeout(moveParticle, 500);

        const pulse = () => {
          if (!isHoveredRef.current) return;
          clone.style.opacity = Math.random() * 0.5 + 0.3;
          setTimeout(pulse, 1500 + Math.random() * 1000);
        };
        setTimeout(pulse, 1000);
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        element.style.transition = 'transform 0.3s ease';
        element.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg)';
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }

      if (enableMagnetism) {
        element.style.transform = element.style.transform.replace(/translate[XY]\([^)]*\)/g, '');
      }
    };

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.03;
        const magnetY = (y - centerY) * 0.03;
        const currentTransform = element.style.transform || '';
        const newTransform = currentTransform.replace(/translate[XY]\([^)]*\)/g, '') + ` translateX(${magnetX}px) translateY(${magnetY}px)`;
        element.style.transform = newTransform;
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
        transform: scale(0);
        opacity: 1;
        transition: all 0.8s ease;
      `;

      element.appendChild(ripple);

      setTimeout(() => {
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0';
      }, 10);

      setTimeout(() => ripple.remove(), 800);
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
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

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
      width: 600px;
      height: 600px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.12) 0%,
        rgba(${glowColor}, 0.06) 15%,
        rgba(${glowColor}, 0.03) 25%,
        rgba(${glowColor}, 0.015) 40%,
        rgba(${glowColor}, 0.008) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      transition: opacity 0.3s ease;
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
      const cards = gridRef.current.querySelectorAll(".tech-box");

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

      const targetOpacity = minDistance <= proximity ? 0.6 : 
                           minDistance <= fadeDistance ? 
                           ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.6 : 0;

      spotlightRef.current.style.opacity = targetOpacity;
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll(".tech-box").forEach((card) => {
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
    'EJS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', // EJS uses JS logo
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

  // Use a fallback or apply filter for dark logos
  const darkLogos = ['Express.js'];

  return (
    <img
      src={logoMap[tech] || 'https://via.placeholder.com/20x20?text=?'}
      alt={tech}
      style={{
        width: '20px',
        height: '20px',
        marginRight: '8px',
        flexShrink: 0,
        filter: darkLogos.includes(tech) ? 'invert(1)' : 'brightness(0.9)'
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
      title: 'Frontend',
      items: ['HTML', 'CSS', 'Javascript', 'React.js', 'Bootstrap', 'JQuery', 'EJS'],
      gridArea: 'frontend',
      color: '#060010'
    },
    {
      title: 'Backend',
      items: ['Node.js', 'Express.js', 'FastAPI'],
      gridArea: 'backend',
      color: '#060010'
    },
    {
      title: 'Language',
      items: ['Python', 'Java', 'C', 'C++'],
      gridArea: 'language',
      color: '#060010'
    },
    {
      title: 'Database',
      items: ['PostgreSQL', 'MYSQL'],
      gridArea: 'database',
      color: '#060010'
    },
    {
      title: 'Mobile',
      items: ['Flutter'],
      gridArea: 'mobile',
      color: '#060010'
    },
    {
      title: 'Tools',
      items: ['Render', 'GIT', 'OAuth'],
      gridArea: 'tools',
      color: '#060010'
    }
  ];

  return (
    <div className="tech-stack-section">
      {/* Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid rgba(132, 0, 255, 0.3)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #8400ff, #b366ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          Tech Stack
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#e0e0d0',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          A comprehensive overview of the frameworks, programming languages, databases, and tools 
          I work with to build modern, scalable applications.
        </p>
      </div>

      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={shouldDisableAnimations}
        enabled={true}
        spotlightRadius={DEFAULT_SPOTLIGHT_RADIUS}
        glowColor={DEFAULT_GLOW_COLOR}
      />
      
      <div 
        ref={gridRef}
        className="tech-grid-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto auto',
          gap: '1rem',
          padding: '2rem',
          maxWidth: '900px',
          margin: 'auto',
          '--glow-color': DEFAULT_GLOW_COLOR,
        }}
      >
        {techSections.map((section, index) => (
          <ParticleCard
            key={section.title}
            className={`tech-box ${section.gridArea}`}
            disableAnimations={shouldDisableAnimations}
            particleCount={6}
            glowColor={DEFAULT_GLOW_COLOR}
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
            style={{
              background: section.color,
              border: '1px solid #392e4e',
              borderRadius: '1rem',
              padding: '1rem',
              textAlign: 'center',
              color: 'white',
              gridArea: section.gridArea,
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              // Grid positioning
              ...(section.gridArea === 'frontend' && {
                gridColumn: '1 / 2',
                gridRow: '1 / 3'
              }),
              ...(section.gridArea === 'backend' && {
                gridColumn: '2 / 3',
                gridRow: '1'
              }),
              ...(section.gridArea === 'language' && {
                gridColumn: '3 / 4',
                gridRow: '1 / 2'
              }),
              ...(section.gridArea === 'database' && {
                gridColumn: '2 / 3',
                gridRow: '2'
              }),
              ...(section.gridArea === 'mobile' && {
                gridColumn: '3 / 4',
                gridRow: '2'
              }),
              ...(section.gridArea === 'tools' && {
                gridColumn: '1 / 4',
                gridRow: '3'
              }),
              // Glow variables
              '--glow-x': '50%',
              '--glow-y': '50%',
              '--glow-intensity': '0',
              '--glow-radius': '200px',
            }}
          >
            {/* Border glow effect */}
            <div
              style={{
                content: '',
                position: 'absolute',
                inset: '0',
                padding: '2px',
                background: `radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                  rgba(132, 0, 255, calc(var(--glow-intensity) * 0.8)) 0%,
                  rgba(132, 0, 255, calc(var(--glow-intensity) * 0.4)) 30%,
                  transparent 60%)`,
                borderRadius: 'inherit',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'subtract',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease',
                zIndex: 1,
              }}
            />
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{
                margin: '0 0 0.5rem',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: '#f5f5dc'
              }}>
                {section.title}
              </h3>
              
              {section.gridArea === 'tools' ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  paddingTop: '0.5rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#e0e0d0',
                      fontSize: '0.9rem'
                    }}>
                      <TechLogo tech={item} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <ul style={{
                  listStyle: 'none',
                  padding: '0',
                  margin: '0'
                }}>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} style={{
                      margin: '0.25rem 0',
                      color: '#e0e0d0',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TechLogo tech={item} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ParticleCard>
        ))}
      </div>

      <style jsx>{`
        .tech-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15), 0 0 30px rgba(132, 0, 255, 0.2);
        }
        
        .particle-container {
          position: relative;
          overflow: hidden;
        }
        
        .particle::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: rgba(132, 0, 255, 0.2);
          border-radius: 50%;
          z-index: -1;
        }
        
        .global-spotlight {
          mix-blend-mode: screen;
          will-change: transform, opacity;
          z-index: 200 !important;
          pointer-events: none;
        }
        
        @media (max-width: 768px) {
          .tech-grid-container {
            grid-template-columns: 1fr !important;
            padding: 1rem !important;
          }
          
          .tech-box {
            grid-column: 1 !important;
            grid-row: auto !important;
          }
          
          .tech-stack-section h1 {
            font-size: 2rem !important;
          }
          
          .tech-stack-section p {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TechTools;