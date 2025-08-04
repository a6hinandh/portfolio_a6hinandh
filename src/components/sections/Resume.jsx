import { useState, useEffect, useRef } from "react";

const Magnet = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef(null);

  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e) => {
      if (!magnetRef.current) return;

      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true);

        const offsetX = (e.clientX - centerX) / magnetStrength;
        const offsetY = (e.clientY - centerY) / magnetStrength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [padding, disabled, magnetStrength]);

  const transitionStyle = isActive ? activeTransition : inactiveTransition;

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: transitionStyle,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

function Resume() {
  const handleViewResume = () => {
    // Replace with your actual PDF URL/path
    window.open('/path-to-your-resume.pdf', '_blank')
  }

  return (
    <>
      <div className="content">
        <h1>Resume</h1>
        <p>View my complete professional background and experience.</p>
        <Magnet padding={50} disabled={false} magnetStrength={4}>
          <button 
            className="resume-button"
            onClick={handleViewResume}
          >
            View Resume (PDF)
          </button>
        </Magnet>
      </div>
      
      <style jsx>{`
        .resume-button {
          background: linear-gradient(135deg, #f5f5dc, #e6e6d0);
          color: #2a2a2a;
          border: none;
          padding: 12px 24px;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 2rem;
          box-shadow: 0 4px 15px rgba(245, 245, 220, 0.2);
        }
        
        .resume-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 245, 220, 0.3);
          background: linear-gradient(135deg, #e6e6d0, #d6d6c0);
        }
        
        .resume-button:active {
          transform: translateY(0);
        }
      `}</style>
    </>
  )
}

export default Resume