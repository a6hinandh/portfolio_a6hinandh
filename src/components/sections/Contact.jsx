import { useState } from 'react';
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane, FaSpinner, FaTimes, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { send } from '@emailjs/browser';



function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  
  const [status, setStatus] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  setStatus("");
  setIsSubmitting(true);

  send(
  serviceId,
  templateId,
  {
    name: formData.name,
    email: formData.email,
    message: formData.message
  },
  publicKey
)
.then((response) => {
  console.log('SUCCESS!', response.status, response.text);
  setStatus("success");
  setFormData({ name: "", email: "", message: "" });
})
.catch((error) => {
  console.error('FAILED...', error);
  setStatus("error");
})
.finally(() => {
  setIsSubmitting(false);
  setShowModal(true);
});

};


  const closeModal = () => {
    setShowModal(false);
    setStatus("");
  };

  return (
    <div className="content-c">
      <div className="contact-header">
        <h1>Let's Connect</h1>
        <p className="contact-subtitle">
          I'd love to hear from you! Whether it's about potential collaborations, 
          exciting opportunities, or just to share ideas - drop me a message below.
        </p>
      </div>

      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper textarea-wrapper">
              <FaCommentDots className="input-icon textarea-icon" />
              <textarea
                name="message"
                placeholder="Let’s talk — your message starts here..."
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-textarea"
              ></textarea>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="button-icon spinning" />
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane className="button-icon" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>

      {/* Status Modal */}
      {showModal && status && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="status-modal">
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            
            {status === "success" && (
              <div className="modal-content success">
                <div className="modal-icon success-icon">
                  <FaCheckCircle />
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. I'll get back to you soon!</p>
              </div>
            )}
            
            {status === "error" && (
              <div className="modal-content error">
                <div className="modal-icon error-icon">
                  <FaExclamationTriangle />
                </div>
                <h3>Oops! Something went wrong</h3>
                <p>Please try again later or reach out via social media.</p>
              </div>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        .content-c {
          padding: 1rem;
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          overflow-y: auto;
          box-sizing: border-box;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .contact-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #f5f5dc, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-subtitle {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #e0e0d0;
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-container {
          max-width: 500px;
          margin: 0 auto;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          position: relative;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .textarea-wrapper {
          align-items: flex-start;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: rgba(245, 245, 220, 0.6);
          z-index: 2;
          font-size: 1rem;
        }

        .textarea-icon {
          top: 1rem;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid rgba(245, 245, 220, 0.2);
          border-radius: 12px;
          background: rgba(245, 245, 220, 0.05);
          backdrop-filter: blur(10px);
          color: #f5f5dc;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.5;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: rgba(245, 245, 220, 0.6);
          background: rgba(245, 245, 220, 0.1);
          box-shadow: 0 0 0 4px rgba(245, 245, 220, 0.1);
        }

        .form-input:focus + .input-icon, .form-textarea:focus + .input-icon {
          color: #f5f5dc;
        }

        .form-input::placeholder, .form-textarea::placeholder {
          color: rgba(245, 245, 220, 0.5);
        }

        .submit-button {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #f5f5dc, #e0e0d0);
          color: #222;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
        }

        .submit-button:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .submit-button:hover:before {
          left: 100%;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(245, 245, 220, 0.3);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .submit-button.submitting {
          background: linear-gradient(135deg, #d0d0d0, #c0c0c0);
        }

        .button-icon {
          font-size: 1rem;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        .status-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(245, 245, 220, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 2rem;
          min-width: 400px;
          max-width: 90vw;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 1001;
          animation: modalSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: #666;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
        }

        .modal-close:hover {
          background: rgba(0, 0, 0, 0.1);
          color: #333;
        }

        .modal-content {
          text-align: center;
          color: #333;
        }

        .modal-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: bounceIn 0.6s ease-out 0.2s both;
        }

        .success-icon {
          color: #22c55e;
        }

        .error-icon {
          color: #ef4444;
        }

        .modal-content h3 {
          margin: 0 0 1rem 0;
          font-size: 1.4rem;
          color: #333;
        }

        .modal-content p {
          margin: 0;
          font-size: 1rem;
          color: #666;
          line-height: 1.5;
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes modalSlideIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Large Desktop */
        @media (min-width: 1440px) {
          .contact-header h1 {
            font-size: 3rem;
          }
          
          .contact-subtitle {
            font-size: 1.2rem;
          }

          .contact-container {
            max-width: 600px;
          }
        }

        /* Desktop */
        @media (max-width: 1280px) {
          .contact-header h1 {
            font-size: 2.2rem;
          }
          
          .contact-subtitle {
            font-size: 1.05rem;
          }
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .content-c {
            padding: 1.5rem;
          }

          .contact-header h1 {
            font-size: 2rem;
          }
          
          .contact-subtitle {
            font-size: 1rem;
          }

          .contact-container {
            max-width: 450px;
          }
        }

        /* Mobile Layout - Matches App.css mobile breakpoint */
        @media (max-width: 768px) {
          .content-c {
            padding: 1rem;
            height: auto !important; /* Natural height for mobile */
            overflow: visible !important; /* No internal scrolling needed */
            width: 100% !important; /* Full width */
            display: block; /* Natural block flow */
          }

          .contact-header {
            margin-bottom: 2rem;
            text-align: center;
          }

          .contact-header h1 {
            font-size: 2rem;
            margin-bottom: 0.8rem;
          }
          
          .contact-subtitle {
            font-size: 1rem;
            padding: 0 0.5rem;
            max-width: 100%;
          }

          .contact-container {
            max-width: 100%;
            padding: 0;
            margin: 0 auto;
          }

          .contact-form {
            gap: 1.2rem;
          }

          .form-input, .form-textarea {
            padding: 0.8rem 0.8rem 0.8rem 2.5rem;
            font-size: 1rem;
            border-radius: 10px;
          }

          .input-icon {
            left: 0.8rem;
            font-size: 0.9rem;
          }

          .form-textarea {
            min-height: 100px;
          }

          .submit-button {
            padding: 0.9rem 1.5rem;
            font-size: 1rem;
            border-radius: 10px;
          }

          .status-modal {
            min-width: auto;
            width: 85vw;
            padding: 1.5rem;
            border-radius: 16px;
            margin: 1rem;
          }

          .modal-icon {
            font-size: 2.5rem;
          }

          .modal-content h3 {
            font-size: 1.2rem;
          }

          .modal-content p {
            font-size: 0.9rem;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .content-c {
            padding: 0.8rem;
          }

          .contact-header {
            margin-bottom: 1.5rem;
          }

          .contact-header h1 {
            font-size: 1.8rem;
          }
          
          .contact-subtitle {
            font-size: 0.95rem;
          }

          .contact-form {
            gap: 1rem;
          }

          .form-input, .form-textarea {
            padding: 0.7rem 0.7rem 0.7rem 2.2rem;
            font-size: 0.95rem;
          }

          .input-icon {
            left: 0.7rem;
            font-size: 0.85rem;
          }

          .form-textarea {
            min-height: 90px;
          }

          .submit-button {
            padding: 0.8rem 1.2rem;
            font-size: 0.95rem;
          }

          .status-modal {
            width: 90vw;
            padding: 1.2rem;
            margin: 0.5rem;
          }

          .modal-icon {
            font-size: 2rem;
          }

          .modal-content h3 {
            font-size: 1.1rem;
          }

          .modal-content p {
            font-size: 0.85rem;
          }
        }

        /* Very Small Mobile */
        @media (max-width: 320px) {
          .content-c {
            padding: 0.6rem;
          }

          .contact-header h1 {
            font-size: 1.6rem;
          }
          
          .contact-subtitle {
            font-size: 0.9rem;
          }

          .form-input, .form-textarea {
            padding: 0.6rem 0.6rem 0.6rem 2rem;
            font-size: 0.9rem;
          }

          .input-icon {
            left: 0.6rem;
            font-size: 0.8rem;
          }

          .form-textarea {
            min-height: 80px;
          }

          .submit-button {
            padding: 0.7rem 1rem;
            font-size: 0.9rem;
          }

          .status-modal {
            width: 95vw;
            padding: 1rem;
          }

          .modal-icon {
            font-size: 1.8rem;
          }

          .modal-content h3 {
            font-size: 1rem;
          }

          .modal-content p {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;