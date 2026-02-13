import { useState, useRef } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 50, left: 50 })
  const [yesClicked, setYesClicked] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imageFiles, setImageFiles] = useState({})
  const fileInputRef = useRef(null)

  const questions = [
    { id: 'care-comfort', type: 'text', text: 'Kunjiii… tell me honestly, does my care ever feel too uncomfortable?', placeholder: 'Be honest with me, it\'s okay… 💛' },
    { id: 'feel-loved', type: 'text', text: 'When do you feel most loved by me?', placeholder: 'Tell me those special moments… 💕' },
    { id: 'love-rating', type: 'text', text: 'Rate your love for me out of 10… and tell me why?', placeholder: 'e.g. 10/10 because… ❤️' },
    { id: 'fav-thing', type: 'text', text: 'What is your favorite thing about me?', placeholder: 'What do you love the most? 🌸' },
    { id: 'improve', type: 'text', text: 'I know I\'m not perfect — what is one thing I should improve?', placeholder: 'Help me become better for you… 🌱' },
    { id: 'habit-change', type: 'text', text: 'What habit of mine should I change so our bond becomes stronger?', placeholder: 'I\'m ready to grow with you… 💪' },
    { id: 'first-reaction', type: 'dropdown', text: 'If I stood in front of you right now, would you speak first… or just hug me?', placeholder: 'Choose what your heart says…', options: [
      'Shake hands like strangers',
      'Deep hug, no words needed',
      'Hold your hands and smile',
      'Hug you and never let go',
      'Just look at you and feel happy'
    ]},
    { id: 'promise-happy', type: 'text', text: 'Promise me that you will be happy when we end this relation 🥺', placeholder: 'Promise me… 🤞' },
    { id: 'marry-me', type: 'text', text: 'Consider this question as imaginary, and tell me one thing — if the situations and family are accepted, will you marry me? 💍', placeholder: 'Speak from your heart… 💖' },
    { id: 'selfie', type: 'image', text: 'Show me your present face… selfy! 📸', placeholder: 'Upload a photo from gallery' },
    { id: 'photo-for-me', type: 'image', text: 'Send me a photo you clicked only for me 💝', placeholder: 'Upload a photo from gallery' },
    { id: 'advice', type: 'text', text: 'Any advice for me?', placeholder: 'Your words mean everything… ✨' }
  ]

  const moveNoButton = () => {
    const newTop = Math.random() * 80
    const newLeft = Math.random() * 80
    setNoButtonPosition({ top: newTop, left: newLeft })
  }

  const handleYesClick = () => {
    setYesClicked(true)
    setCurrentAnswer('')
    setImagePreview(null)
    setUploadProgress(0)
  }

  const handleNext = () => {
    const question = questions[currentQuestion]
    if (question.type === 'image') {
      if (imagePreview && imageFile) {
        setAnswers({ ...answers, [question.id]: imagePreview })
        setImageFiles({ ...imageFiles, [question.id]: imageFile })
        setCurrentAnswer('')
        setImagePreview(null)
        setImageFile(null)
        setUploadProgress(0)
        setCurrentQuestion(currentQuestion + 1)
      }
    } else if (currentAnswer.trim()) {
      setAnswers({ ...answers, [question.id]: currentAnswer })
      setCurrentAnswer('')
      setImagePreview(null)
      setImageFile(null)
      setUploadProgress(0)
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      const prevQuestion = questions[currentQuestion - 1]
      const prevAnswer = answers[prevQuestion.id] || ''
      if (prevQuestion.type === 'image') {
        setImagePreview(prevAnswer || null)
        setImageFile(imageFiles[prevQuestion.id] || null)
        setCurrentAnswer('')
        setUploadProgress(prevAnswer ? 100 : 0)
      } else {
        setCurrentAnswer(prevAnswer)
        setImagePreview(null)
        setImageFile(null)
        setUploadProgress(0)
      }
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB')
      return
    }

    setUploadProgress(0)
    setImagePreview(null)
    setImageFile(file)

    const reader = new FileReader()
    
    // Simulate realistic upload progress
    let progress = 0
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15 + 5
      if (progress >= 90) {
        progress = 90
        clearInterval(progressInterval)
      }
      setUploadProgress(Math.round(progress))
    }, 200)

    reader.onload = (event) => {
      clearInterval(progressInterval)
      // Animate from current to 100%
      let currentProg = 90
      const finishInterval = setInterval(() => {
        currentProg += 2
        if (currentProg >= 100) {
          currentProg = 100
          clearInterval(finishInterval)
        }
        setUploadProgress(currentProg)
      }, 50)
      
      setImagePreview(event.target.result)
    }

    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    setImageFile(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Upload a single image to Supabase Storage
  const uploadImageToSupabase = async (file, questionId) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${questionId}.${fileExt}`
    const filePath = `uploads/${fileName}`

    const { data, error } = await supabase.storage
      .from('valentine-photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('valentine-photos')
      .getPublicUrl(filePath)

    return urlData.publicUrl
  }

  const handleSubmit = async () => {
    const question = questions[currentQuestion]
    let finalAnswers = { ...answers }
    let finalImageFiles = { ...imageFiles }

    if (question.type === 'image') {
      if (imagePreview && imageFile) {
        finalAnswers[question.id] = imagePreview
        finalImageFiles[question.id] = imageFile
      } else {
        return
      }
    } else {
      if (!currentAnswer.trim()) return
      finalAnswers[question.id] = currentAnswer
    }

    setAnswers(finalAnswers)
    setImageFiles(finalImageFiles)
    setIsLoading(true)
    setSendError(false)

    try {
      // 1. Upload images to Supabase Storage
      const imageUrls = {}
      const imageQuestions = questions.filter(q => q.type === 'image')
      
      for (const q of imageQuestions) {
        const file = finalImageFiles[q.id]
        if (file) {
          const url = await uploadImageToSupabase(file, q.id)
          imageUrls[q.id] = url
        }
      }

      // 2. Build the row for the database
      const dbRow = {
        care_comfort: finalAnswers['care-comfort'] || null,
        feel_loved: finalAnswers['feel-loved'] || null,
        love_rating: finalAnswers['love-rating'] || null,
        fav_thing: finalAnswers['fav-thing'] || null,
        improve: finalAnswers['improve'] || null,
        habit_change: finalAnswers['habit-change'] || null,
        first_reaction: finalAnswers['first-reaction'] || null,
        promise_happy: finalAnswers['promise-happy'] || null,
        marry_me: finalAnswers['marry-me'] || null,
        selfie_url: imageUrls['selfie'] || null,
        photo_for_me_url: imageUrls['photo-for-me'] || null,
        advice: finalAnswers['advice'] || null,
        submitted_at: new Date().toISOString()
      }

      // 3. Insert into Supabase database
      const { error } = await supabase
        .from('valentine_responses')
        .insert([dbRow])

      if (error) throw error

      console.log('✅ Saved to Supabase successfully!')
      setIsSubmitted(true)
    } catch (error) {
      console.error('❌ Failed to save:', error)
      setSendError(true)
      // Save to localStorage as backup
      localStorage.setItem('valentineAnswers', JSON.stringify(
        Object.fromEntries(
          Object.entries(finalAnswers).filter(([, v]) => !String(v).startsWith('data:image'))
        )
      ))
      localStorage.setItem('valentineAnswersDate', new Date().toISOString())
      // Still show success page
      setIsSubmitted(true)
    } finally {
      setIsLoading(false)
    }
  }

  // Check if current question has a valid answer
  const isCurrentAnswerValid = () => {
    const question = questions[currentQuestion]
    if (question.type === 'image') return !!imagePreview
    return currentAnswer.trim().length > 0
  }

  if (isSubmitted) {
    return (
      <div className="container success">
        <div className="heart-icon">💖</div>
        <h1>Thank You! 🎉</h1>
        <div className="final-message">
          <p className="success-message">
            Thanks for your love my sweet little angel. 💕
          </p>
          <p className="success-paragraph">
            I will be with you all the time. If you feel unhappy or sad in the future, 
            remember me — I will be here for you at any time. ❤️
          </p>
        </div>
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
          
          {/* TEXT INPUT */}
          {question.type === 'text' && (
            <textarea
              className="answer-input"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder={question.placeholder}
              rows={5}
              autoFocus
              disabled={isLoading}
            />
          )}

          {/* DROPDOWN INPUT */}
          {question.type === 'dropdown' && (
            <div className="dropdown-wrapper">
              <select
                className="dropdown-input"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                disabled={isLoading}
              >
                <option value="">-- {question.placeholder} --</option>
                {question.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          )}

          {/* IMAGE UPLOAD */}
          {question.type === 'image' && (
            <div className="image-upload-wrapper">
              {!imagePreview ? (
                <label className="upload-area" htmlFor={`file-${question.id}`}>
                  <div className="upload-icon">📷</div>
                  <p className="upload-text">Tap here to choose a photo from gallery</p>
                  <p className="upload-hint">Max 5MB · JPG, PNG, HEIC</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id={`file-${question.id}`}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input-hidden"
                  />
                </label>
              ) : (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <button className="remove-image-btn" onClick={removeImage}>✕ Remove</button>
                </div>
              )}
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="upload-progress-wrapper">
                  <div className="upload-progress-bar">
                    <div 
                      className="upload-progress-fill" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="upload-progress-text">Uploading... {uploadProgress}%</span>
                </div>
              )}
              
              {uploadProgress === 100 && imagePreview && (
                <p className="upload-complete">✅ Upload complete!</p>
              )}
            </div>
          )}
          
          {sendError && (
            <div className="error-message">
              ⚠️ Email failed to send, but your answers are saved locally.
            </div>
          )}
          
          <div className="button-group">
            {currentQuestion > 0 && (
              <button className="back-button" onClick={handleBack} disabled={isLoading}>
                ← Back
              </button>
            )}
            
            {isLastQuestion ? (
              <button 
                className="submit-button" 
                onClick={handleSubmit}
                disabled={!isCurrentAnswerValid() || isLoading}
              >
                {isLoading ? 'Sending... 💌' : 'Submit 💝'}
              </button>
            ) : (
              <button 
                className="next-button" 
                onClick={handleNext}
                disabled={!isCurrentAnswerValid()}
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
