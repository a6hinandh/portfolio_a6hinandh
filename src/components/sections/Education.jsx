function Education() {
  return (
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
              <div className="specialization">Specialization in Artificial Intelligence and Data Science</div>
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
              <div className="subjects">Physics, Chemistry, Mathematics, Computer Science, English</div>
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

      <style jsx>{`
        .education-content {
          padding: 0.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }

        .education-content h1 {
          margin: 0 0 0.5rem 0;
          font-size: 2rem;
        }

        .education-content p {
          margin: 0 0 1rem 0;
          font-size: 0.9rem;
        }

        .education-timeline {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          max-height: calc(100vh - 180px);
        }

        .education-item {
          position: relative;
          padding: 0.8rem 1rem;
          background: rgba(245, 245, 220, 0.05);
          border-radius: 8px;
          border-left: 3px solid #95b2ec;
          transition: all 0.3s ease;
          margin-bottom: 0.5rem;
        }

        .education-item:hover {
          background: rgba(245, 245, 220, 0.08);
          transform: translateX(3px);
        }

        .education-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .institution h2, .institution h3 {
          color: #f5f5dc;
          margin: 0 0 0.3rem 0;
          font-size: 1.1rem;
          line-height: 1.2;
        }

        .degree {
          color: #95b2ec;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }

        .specialization {
          color: #e0e0d0;
          font-size: 0.8rem;
          font-style: italic;
        }

        .subjects {
          color: #e0e0d0;
          font-size: 0.8rem;
          line-height: 1.3;
        }

        .duration-grade {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.2rem;
          min-width: 120px;
        }

        .duration {
          color: #95b2ec;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .grade {
          font-size: 1.2rem;
          font-weight: bold;
          padding: 0.2rem 0.6rem;
          border-radius: 15px;
          margin: 0.1rem 0;
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

        @media (max-width: 768px) {
          .education-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .duration-grade {
            align-items: flex-start;
            text-align: left;
            min-width: auto;
          }
          
          .education-item {
            padding: 0.8rem 1rem;
          }

          .education-content h1 {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  )
}
export default Education