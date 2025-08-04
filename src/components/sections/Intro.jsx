import TextType from './components/TextType';
import GradientText from './components/GradientText';
function Intro() {
  return (
    <div className="content">
      <h1><GradientText
      colors={[" #ffffffff"," #49bde4ff"]}
      animationSpeed={3}
      showBorder={false}
      className='custom-class'>
        Hi, I'm Abhinandh A
      </GradientText>
      </h1>
      <div className="exploring-section">
        <h2>Exploring<div><TextType text={["Web & App Dev","UI/UX Designing" ]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter='_'
        /></div></h2>
      </div>
      <p className="ai-statement">
        I'm excited about AI — not just how it works, but how it can shape what we build. 
        I'm eager to explore it and create with it.
      </p>
    </div>
  )
}

export default Intro