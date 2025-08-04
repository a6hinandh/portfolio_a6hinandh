function Contact() {
  return (
    <div className="content">
      <h1>Contact</h1>
      <p>Get in touch with me for collaborations, opportunities, or just to say hello!</p>
      <div className="placeholder-content">
        <p><em>Contact information will be added soon...</em></p>
        <div className="coming-soon">
          <h3>Contact Methods:</h3>
          <ul>
            <li>Email Address</li>
            <li>LinkedIn Profile</li>
            <li>GitHub Profile</li>
            <li>Portfolio Website</li>
            <li>Social Media Links</li>
            <li>Contact Form</li>
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

export default Contact