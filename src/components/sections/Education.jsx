function Education() {
  return (
    <div className="education-scroll-wrapper scrollable-content">
      <div className="education-content">
        <h1>Education</h1>
        <p>My academic background and formal learning journey.</p>

        <div className="education-timeline">
          {/* Current Education */}
          <div className="education-item current">
            <div className="education-header">
              <div className="institution">
                <h2>Indian Institute of Information Technology, Kottayam</h2>
                <div className="degree">B.Tech in Computer Science Engineering</div>
                <div className="specialization">
                  Specialization in Artificial Intelligence and Data Science
                </div>
              </div>
              <div className="duration-grade">
                <div className="duration">2024 - 2028</div>
                <div className="grade">9.7 CGPA</div>
                <div className="status">Current</div>
              </div>
            </div>
          </div>

          {/* Class 12th */}
          <div className="education-item">
            <div className="education-header">
              <div className="institution">
                <h2>Chavara Public School, Pala</h2>
                <div className="subjects">
                  Physics, Chemistry, Mathematics, Computer Science, English
                </div>
              </div>
              <div className="duration-grade">
                <div className="duration">2022 - 2024</div>
                <div className="grade">95.4%</div>
                <div className="board">CBSE Class 12th</div>
              </div>
            </div>
          </div>

          {/* Class 10th */}
          <div className="education-item">
            <div className="education-header">
              <div className="institution">
                <h3>Jyothi Public School, Paika</h3>
              </div>
              <div className="duration-grade">
                <div className="grade">98.2%</div>
                <div className="board">CBSE Class 10th</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .education-scroll-wrapper {
          position: relative;
          z-index: 1;
          height: 100%;
          width:100%;
          overflow-y: auto;
          padding: 1rem;
          box-sizing: border-box;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        .education-content {
          
          max-width: 900px;
          margin: 0 auto;
        }

        .education-content h1 {
          font-size: 2rem;
          color: #f5f5dc;
        }

        .education-content p {
          margin-bottom: 1rem;
          font-size: 1rem;
          color: #e0e0d0;
        }

        .education-timeline {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .education-item {
          padding: 1rem;
          background: rgba(245, 245, 220, 0.05);
          border-radius: 8px;
          border-left: 3px solid #95b2ec;
          transition: all 0.3s ease;
        }

        .education-item:hover {
          background: rgba(245, 245, 220, 0.08);
          transform: translateX(3px);
        }

        .education-header {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .institution h2,
        .institution h3 {
          color: #f5f5dc;
          margin-bottom: 0.3rem;
          font-size: 1.1rem;
        }

        .degree {
          color: #95b2ec;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .specialization,
        .subjects {
          color: #e0e0d0;
          font-size: 0.8rem;
          font-style: italic;
        }

        .duration-grade {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.2rem;
        }

        .duration {
          color: #95b2ec;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .grade {
          font-size: 1.1rem;
          font-weight: bold;
          padding: 0.2rem 0.6rem;
          border-radius: 15px;
          background: rgba(149, 178, 236, 0.2);
          color: #95b2ec;
        }

        .status {
          background: rgba(74, 222, 128, 0.2);
          color: #4ade80;
          padding: 0.1rem 0.4rem;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .board {
          color: #e0e0d0;
          font-size: 0.75rem;
          opacity: 0.8;
        }

        /* Scrollbar style */
        .education-scroll-wrapper::-webkit-scrollbar {
          width: 8px;
        }
        .education-scroll-wrapper::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
          border-radius: 4px;
        }
        .education-scroll-wrapper::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          border-radius: 4px;
        }
        .education-scroll-wrapper::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        }

        /* ===== Responsive ===== */
        @media (max-width: 1024px) {
          .education-scroll-wrapper {
            padding: 1.5rem;
          }
          .education-content h1 {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 768px) {
          .education-scroll-wrapper {
            height: 100px;
            min-height: 40vh;
            width:100vh;
          }
          .education-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .duration-grade {
            align-items: flex-start;
            text-align: left;
          }
          .education-content h1 {
            font-size: 1.6rem;
          }
          .education-content p {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .education-scroll-wrapper {
            padding: 1rem;
          }
          .education-content h1 {
            font-size: 1.4rem;
          }
          .education-content p {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 320px) {
          .education-scroll-wrapper {
            padding: 0.8rem;
          }
          .education-content h1 {
            font-size: 1.2rem;
          }
          .education-content p {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Education;
