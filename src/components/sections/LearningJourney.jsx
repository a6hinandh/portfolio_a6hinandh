function LearningJourney() {
  return (
    <div className="content">
      <h1>Learning Journey</h1>
      <p>My continuous learning path, current studies, and future learning goals.</p>
      <div className="placeholder-content">
        <p><em>Learning journey details will be added soon...</em></p>
        <div className="coming-soon">
          <h3>Learning Focus Areas:</h3>
          <ul>
            <li>Current Learning Projects</li>
            <li>Online Courses & MOOCs</li>
            <li>Books & Resources</li>
            <li>Skill Development Timeline</li>
            <li>Future Learning Goals</li>
            <li>Knowledge Sharing</li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .placeholder-content {
          margin-top: 2rem;
          padding: 1.5rem;
          border: 2px dashed rgba(245, 245, 220, 0.3);
          border-radius: 8px;
          background: rgba(245, 245, 220, 0.05);
        }
        
        .coming-soon h3 {
          color: #f5f5dc;
          margin-bottom: 1rem;
        }
        
        .coming-soon ul {
          list-style-type: none;
          padding-left: 0;
        }
        
        .coming-soon li {
          margin: 0.5rem 0;
          padding-left: 1rem;
          position: relative;
        }
        
        .coming-soon li::before {
          content: "▸";
          position: absolute;
          left: 0;
          color: #f5f5dc;
        }
      `}</style>
    </div>
  )
}

export default LearningJourney