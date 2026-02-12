import { useState } from 'react'
import './App.css'

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 50, left: 50 })
  const [yesClicked, setYesClicked] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const questions = [
    { id: 'why-love', text: 'Why do you love me?', placeholder: 'Share what makes your heart flutter...' },
    { id: 'how-much', text: 'How much do you love me?', placeholder: 'Express your feelings...' },
    { id: 'like-most', text: 'What do you like most in me?', placeholder: 'Tell me what you cherish...' },
    { id: 'dont-like', text: 'What you dont like in me?', placeholder: 'Be honest, it\'s okay...' },
    { id: 'improvements', text: 'What improvements are you expecting from me?', placeholder: 'Help me grow with you...' },
    { id: 'marry', text: 'Will you marry me? 💍', placeholder: 'Type your answer here...' }
  ]

  const moveNoButton = () => {
    // Generate random position for the No button
    const newTop = Math.random() * 80 // Keep within 80% of viewport height
    const newLeft = Math.random() * 80 // Keep within 80% of viewport width
    setNoButtonPosition({ top: newTop, left: newLeft })
  }

  const handleYesClick = () => {
    setYesClicked(true)
    setCurrentAnswer('')
  }

  const handleNext = () => {
    if (currentAnswer.trim()) {
      setAnswers({ ...answers, [questions[currentQuestion].id]: currentAnswer })
      setCurrentAnswer('')
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      const prevQuestion = questions[currentQuestion - 1]
      setCurrentAnswer(answers[prevQuestion.id] || '')
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    if (currentAnswer.trim()) {
      const finalAnswers = { ...answers, [questions[currentQuestion].id]: currentAnswer }
      setAnswers(finalAnswers)
      setIsSubmitted(true)
      console.log('Submitted Answers:', finalAnswers)
      // Here you can send the data to a backend or store it locally
    }
  }

  if (isSubmitted) {
    return (
      <div className="container success">
        <div className="heart-icon">💖</div>
        <h1>Thank You! 🎉</h1>
        <p className="success-message">Your answers mean the world to me! ❤️</p>
        <p className="success-subtitle">I promise to cherish every word you wrote.</p>
        <div className="celebration">✨💕✨💐✨💕✨</div>
      </div>
    )
  }

  if (yesClicked) {
    const question = questions[currentQuestion]
    const isLastQuestion = currentQuestion === questions.length - 1
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="container questionnaire">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="question-number">Question {currentQuestion + 1} of {questions.length}</div>
        
        <div className="question-card">
          <h2 className="question-title">{question.text}</h2>
          
          <textarea
            className="answer-input"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder={question.placeholder}
            rows={6}
            autoFocus
          />
          
          <div className="button-group">
            {currentQuestion > 0 && (
              <button className="back-button" onClick={handleBack}>
                ← Back
              </button>
            )}
            
            {isLastQuestion ? (
              <button 
                className="submit-button" 
                onClick={handleSubmit}
                disabled={!currentAnswer.trim()}
              >
                Submit 💝
              </button>
            ) : (
              <button 
                className="next-button" 
                onClick={handleNext}
                disabled={!currentAnswer.trim()}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="heart-icon">💘</div>
      <h1 className="greeting">Hey there!</h1>
      <p className="name">Akhil</p>
      <p className="question">has a question for you...</p>
      
      <div className="question-box">
        <h2 className="main-question">Will You Be My Valentine? 🌹</h2>
      </div>

      <button 
        className="yes-button"
        onClick={handleYesClick}
      >
        Yes 💕
      </button>

      <button 
        className="no-button"
        style={{
          position: 'absolute',
          top: `${noButtonPosition.top}%`,
          left: `${noButtonPosition.left}%`,
          transform: 'translate(-50%, -50%)'
        }}
        onMouseEnter={moveNoButton}
        onTouchStart={moveNoButton}
        onClick={(e) => {
          e.preventDefault()
          moveNoButton()
        }}
      >
        No
      </button>

      <p className="hint">My heart says you'll click Yes! 💕</p>
    </div>
  )
}

export default App
