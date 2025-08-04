import { useState, useEffect } from 'react'
import './App.css'
import CircularNavigation from './components/NavigationWheel'
import Intro from './components/sections/Intro'
import Resume from './components/sections/Resume'
import Projects from './components/sections/Projects'
import TechTools from './components/sections/TechTools'
import About from './components/sections/About'
import Education from './components/sections/Education'
import Contact from './components/sections/Contact'
import Certifications from './components/sections/Certifications'
import LearningJourney from './components/sections/LearningJourney'

function App() {
  const [activeSection, setActiveSection] = useState('intro')
  const [previousSection, setPreviousSection] = useState('intro')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const renderSection = (section) => {
    switch (section) {
      case 'resume': return <Resume />
      case 'projects': return <Projects />
      case 'tech': return <TechTools />
      case 'about': return <About />
      case 'education': return <Education />
      case 'contact': return <Contact />
      case 'certifications': return <Certifications />
      case 'learning': return <LearningJourney />
      default: return <Intro />
    }
  }

  const handleSectionChange = (newSection) => {
    if (newSection !== activeSection) {
      setPreviousSection(activeSection)
      setIsTransitioning(true)
      
      // After animation completes, update the active section
      setTimeout(() => {
        setActiveSection(newSection)
        setIsTransitioning(false)
      }, 400) // Half of the transition duration
    }
  }

  return (
    <div className="container">
      <div className="left-section">
        <CircularNavigation setActiveSection={handleSectionChange} />
      </div>
      <div className="right-section">
        <div className={`cube-container ${isTransitioning ? 'rotating' : ''}`}>
          <div className="cube-face front">
            {renderSection(isTransitioning ? previousSection : activeSection)}
          </div>
          <div className="cube-face back">
            {renderSection(isTransitioning ? activeSection : previousSection)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App