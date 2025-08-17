import { FiCode, FiGlobe, FiAward, FiExternalLink } from 'react-icons/fi'
import { useState } from 'react'

function Certifications() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const certificationItems = [
    {
      title: "Complete Full Stack Web Development Bootcamp",
      description: "Comprehensive bootcamp covering frontend and backend development technologies including React, Node.js, MongoDB, and modern web practices.",
      id: 3,
      icon: <FiGlobe className="cert-icon" />,
      issuer: "Udemy",
      date: "July 2025",
      certificateImage: "./udemy1.jpg",
      skills: ["React", "Node.js", "MongoDB", "JavaScript", "HTML/CSS"]
    },
    {
      title: "Flutter & Dart - The Complete Guide [2025 Edition]",
      description: "Comprehensive course covering fundamentals of Flutter framework and Dart programming language for cross-platform mobile development.",
      id: 2,
      icon: <FiGlobe className="cert-icon" />,
      issuer: "Udemy",
      date: "Aug 2025",
      certificateImage: "./udemy2.jpg",
      skills: ["Flutter", "Dart", "Mobile Dev", "Cross-Platform", "UI/UX"]
    },
    {
      title: "Programming in Modern C++",
      description: "Comprehensive course covering modern C++ programming concepts, best practices, and advanced features from NPTEL's premier curriculum.",
      id: 1,
      icon: <FiCode className="cert-icon" />,
      issuer: "NPTEL",
      date: "May 2025",
      certificateImage: "./nptel1.jpg",
      skills: ["C++", "OOP", "STL", "Memory Management", "Performance"]
    }
  ];

  const handleViewCertificate = (cert) => {
    // Option 1: Open certificate image in a new tab/window
    window.open(cert.certificateImage, '_blank');
    
    // Option 2: Show certificate in a modal (uncomment the line below and comment the line above)
    // setSelectedCertificate(cert);
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <div className="scrollable-content">
      <div className="certifications-header">
        <h1>Certifications</h1>
        <p>Credentials and certifications demonstrating my commitment to continuous learning and professional development in technology.</p>
      </div>
      
      <div className="certifications-grid">
        {certificationItems.map((cert) => (
          <div key={cert.id} className="certification-card">
            <div className="card-header">
              <div className="cert-icon-container">
                {cert.icon}
                <FiAward className="award-badge" />
              </div>
              <div className="issuer-info">
                <span className="issuer">{cert.issuer}</span>
                <span className="cert-date">{cert.date}</span>
              </div>
            </div>
            
            <div className="card-content">
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-description">{cert.description}</p>
              
              <div className="skills-container">
                <span className="skills-label">Key Skills:</span>
                <div className="skills-tags">
                  {cert.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="card-footer">
              <button 
                className="view-certificate-btn"
                onClick={() => handleViewCertificate(cert)}
              >
                <span>View Certificate</span>
                <FiExternalLink className="external-icon" />
              </button>
            </div>
            
            <div className="card-glow"></div>
          </div>
        ))}
      </div>

      {/* Certificate Modal (optional - uncomment if you want modal instead of new tab) */}
      {selectedCertificate && (
        <div className="certificate-modal" onClick={closeCertificateModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeCertificateModal}>×</button>
            <img 
              src={selectedCertificate.certificateImage} 
              alt={`${selectedCertificate.title} Certificate`}
              className="certificate-image"
            />
            <div className="modal-info">
              <h3>{selectedCertificate.title}</h3>
              <p>{selectedCertificate.issuer} • {selectedCertificate.date}</p>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .certifications-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 1;
        }

        .certifications-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa, #a78bfa, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          text-shadow: none;
        }

        .certifications-header p {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .certifications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          max-width: 1100px;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        .certification-card {
          background: linear-gradient(135deg, 
            rgba(30, 41, 59, 0.6) 0%, 
            rgba(15, 23, 42, 0.8) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(59, 130, 246, 0.2);
          padding: 1rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(148, 163, 184, 0.1);
        }

        .certification-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.4),
            0 0 30px rgba(59, 130, 246, 0.2),
            inset 0 1px 0 rgba(148, 163, 184, 0.2);
        }

        .certification-card:hover .card-glow {
          opacity: 1;
          transform: scale(1.1);
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at center,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(147, 51, 234, 0.05) 50%,
            transparent 70%
          );
          opacity: 0;
          transition: all 0.4s ease;
          pointer-events: none;
          z-index: 0;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .cert-icon-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
        }

        .cert-icon {
          font-size: 1.5rem;
          color: white;
          z-index: 2;
        }

        .award-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          font-size: 1rem;
          color: #fbbf24;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 50%;
          padding: 4px;
          border: 2px solid #fbbf24;
        }

        .issuer-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .issuer {
          font-weight: 600;
          color: #60a5fa;
          font-size: 1.1rem;
        }

        .cert-date {
          font-size: 0.9rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .card-content {
          position: relative;
          z-index: 1;
          margin-bottom: 2rem;
        }

        .cert-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #f1f5f9;
          margin-bottom: 0.8rem;
          line-height: 1.4;
        }

        .cert-description {
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .skills-container {
          margin-top: 1.5rem;
        }

        .skills-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #a78bfa;
          margin-bottom: 0.8rem;
        }

        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .skill-tag {
          background: rgba(59, 130, 246, 0.15);
          color: #93c5fd;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }

        .skill-tag:hover {
          background: rgba(59, 130, 246, 0.25);
          color: #ddd6fe;
          transform: translateY(-2px);
        }

        .card-footer {
          position: relative;
          z-index: 1;
        }

        .view-certificate-btn {
          width: 100%;
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .view-certificate-btn:hover {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .external-icon {
          font-size: 1rem;
          transition: transform 0.3s ease;
        }

        .view-certificate-btn:hover .external-icon {
          transform: translateX(2px);
        }

        /* Certificate Modal Styles */
        .certificate-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: rgba(30, 41, 59, 0.95);
          border-radius: 20px;
          padding: 20px;
          max-width: 90vw;
          max-height: 90vh;
          position: relative;
          border: 1px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 30px;
          cursor: pointer;
          z-index: 1001;
          transition: color 0.3s ease;
        }

        .close-btn:hover {
          color: #f1f5f9;
        }

        .certificate-image {
          width: 100%;
          height: auto;
          max-height: 70vh;
          object-fit: contain;
          border-radius: 12px;
          margin-bottom: 15px;
        }

        .modal-info {
          text-align: center;
          color: #f1f5f9;
        }

        .modal-info h3 {
          margin: 0 0 5px 0;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .modal-info p {
          margin: 0;
          color: #94a3b8;
          font-size: 1rem;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        
        /* Tablet breakpoint */
        @media (max-width: 1024px) {
          .certifications-grid {
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 1.5rem;
          }

          .certifications-header h1 {
            font-size: 2.2rem;
          }

          .certification-card {
            padding: 1.5rem;
          }
        }

        /* Mobile breakpoint */
        @media (max-width: 768px) {
          .certifications-header {
            margin-bottom: 2rem;
          }

          .certifications-header h1 {
            font-size: 2rem;
          }

          .certifications-header p {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .certifications-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .certification-card {
            padding: 1.5rem;
            border-radius: 16px;
          }

          .cert-icon-container {
            width: 50px;
            height: 50px;
            border-radius: 12px;
          }

          .cert-icon {
            font-size: 1.2rem;
          }

          .cert-title {
            font-size: 1.2rem;
          }

          .cert-description {
            font-size: 0.9rem;
          }

          .skills-tags {
            gap: 0.5rem;
          }

          .skill-tag {
            font-size: 0.75rem;
            padding: 0.3rem 0.6rem;
          }

          .certificate-modal {
            padding: 10px;
          }

          .modal-content {
            padding: 15px;
          }
        }

        /* Small mobile breakpoint */
        @media (max-width: 480px) {
          .certifications-header h1 {
            font-size: 1.8rem;
          }

          .certifications-header p {
            font-size: 0.95rem;
          }

          .certification-card {
            padding: 1.2rem;
            border-radius: 14px;
          }

          .card-header {
            margin-bottom: 1.2rem;
          }

          .cert-icon-container {
            width: 45px;
            height: 45px;
            border-radius: 10px;
          }

          .cert-icon {
            font-size: 1.1rem;
          }

          .issuer {
            font-size: 1rem;
          }

          .cert-date {
            font-size: 0.85rem;
          }

          .cert-title {
            font-size: 1.1rem;
          }

          .cert-description {
            font-size: 0.85rem;
            margin-bottom: 1.2rem;
          }

          .skills-label {
            font-size: 0.85rem;
          }

          .skill-tag {
            font-size: 0.7rem;
            padding: 0.25rem 0.5rem;
          }

          .view-certificate-btn {
            padding: 0.7rem 1.2rem;
            font-size: 0.9rem;
          }
        }

        /* Very small screens */
        @media (max-width: 320px) {
          .certification-card {
            padding: 1rem;
            border-radius: 12px;
          }

          .certifications-header h1 {
            font-size: 1.6rem;
          }

          .certifications-header p {
            font-size: 0.9rem;
          }

          .cert-title {
            font-size: 1rem;
          }

          .cert-description {
            font-size: 0.8rem;
          }

          .skills-tags {
            gap: 0.4rem;
          }

          .skill-tag {
            font-size: 0.65rem;
            padding: 0.2rem 0.4rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Certifications