import Carousel from './components/Carousel'
import { FiCode, FiGlobe } from 'react-icons/fi'

function Certifications() {
  const certificationItems = [
    {
      title: "Complete Full Stack Web Development Bootcamp",
      description: "Comprehensive bootcamp covering frontend and backend development technologies.",
      id: 3,
      icon: <FiGlobe className="carousel-icon" />,
      issuer: "Udemy",
      date: "July 2025",
      certificateImage: "./udemy1.jpg", // Adjust path as needed
    },
    {
      title: "Flutter & Dart - The Complete Guide [2025 Edition]",
      description: "Comprehensive course covering fundamentals of Flutter & Dart.",
      id: 2,
      icon: <FiGlobe className="carousel-icon" />,
      issuer: "Udemy",
      date: "Aug 2025",
      certificateImage: "./udemy2.jpg", // Adjust path as needed
    },
    {
      title: "Programming in Modern C++",
      description: "Comprehensive course covering modern C++ programming concepts and best practices from NPTEL.",
      id: 1,
      icon: <FiCode className="carousel-icon" />,
      issuer: "NPTEL",
      date: "May 2025",
      certificateImage: "./nptel1.jpg", // Adjust path as needed
    }
  ];

  return (
    <div className="content-c">
      <h1 style={{paddingLeft:'25%'}}>Certifications</h1>
      <p>Professional certifications and credentials I've earned in technology and development.</p>
      <div style={{ 
        height: '400px', // Reduced height
        position: 'relative', 
        marginTop: '2rem', // Slightly reduced left margin
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Carousel
          items={certificationItems}
          baseWidth={500} // Increased width from 400 to 500
          autoplay={true}
          autoplayDelay={4000}
          pauseOnHover={true}
          loop={true}
          round={false}
        />
      </div>
      <style jsx>{`
        .content-c{
          posiiton:relative;
          z-index:1;
          width:100%;
          overflow-y: auto;
          padding:1rem;
          box-sizing: border-box;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        @media (max-width: 768px){
          .content-c{
            height:100px;
            min-height:40vh;
            width:100vh;
          }
        }
      `}
      </style>
    </div>
  )
}

export default Certifications