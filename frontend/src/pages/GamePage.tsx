import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Star, Home, HelpCircle } from 'lucide-react'
import { useStore } from '@/store/useStore'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { GAME_DATA_EN, GAME_DATA_BN } from '@/data/gameData'

export const GamePage = () => {
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()
  const { currentUser, updateChildStats, language } = useStore()
  const { width, height } = useWindowSize()

  const GAME_DATA_MAP = language === 'bn' ? GAME_DATA_BN : GAME_DATA_EN
  const GAME_DATA = GAME_DATA_MAP[category || 'colors'] || GAME_DATA_MAP['colors']

  const [currentStep, setCurrentStep] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [errorState, setErrorState] = useState<string | null>(null)

  const currentQuestion = GAME_DATA[currentStep]

  useEffect(() => {
    // Pre-load voices so they are available immediately
    window.speechSynthesis.getVoices()
    const handleVoicesChanged = () => window.speechSynthesis.getVoices()
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged)
  }, [])

  const speakPrompt = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)

      // Select the best available voice based on the language
      const voices = window.speechSynthesis.getVoices()
      if (language === 'bn') {
        utterance.lang = 'bn-BD'
        // Prioritize Google's native Bengali voice if available
        const bnVoice = voices.find(v => v.name.includes('Google বাংলা') || v.name.includes('Google Bengali') || v.lang.includes('bn'))
        if (bnVoice) utterance.voice = bnVoice
      } else {
        utterance.lang = 'en-US'
        const enVoice = voices.find(v => v.name.includes('Google US English') || (v.lang === 'en-US' && v.name.includes('Female')))
        if (enVoice) utterance.voice = enVoice
      }

      utterance.rate = 0.85
      utterance.pitch = 1.2
      window.speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    // Small delay ensures voices are fully loaded before speaking the initial prompt
    const timer = setTimeout(() => speakPrompt(currentQuestion.prompt), 200)
    return () => clearTimeout(timer)
  }, [currentQuestion, language])

  const handleOptionClick = (option: string) => {
    if (completed || showConfetti) return

    if (option === currentQuestion.target) {
      setShowConfetti(true)
      setErrorState(null)

      setTimeout(() => {
        setShowConfetti(false)
        if (currentStep < GAME_DATA.length - 1) {
          setCurrentStep(c => c + 1)
        } else {
          setCompleted(true)
          if (currentUser) {
            updateChildStats(currentUser.id, category || 'colors', 25, 3)
          }
        }
      }, 3000)
    } else {
      setErrorState(option)
      setTimeout(() => setErrorState(null), 1000)
    }
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center gap-8 relative overflow-hidden">
        <Confetti width={width} height={height} recycle={true} numberOfPieces={200} />
        <h1 className="text-6xl font-bold text-green-500 animate-bounce">
          {language === 'bn' ? 'খুব ভালো!' : 'Great Job!'}
        </h1>
        <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-lg border-4 border-yellow-200 z-10">
          <Star className="w-16 h-16 text-yellow-400 fill-yellow-400 animate-pulse" />
          <span className="text-5xl font-bold text-yellow-600">
            {language === 'bn' ? '+৩ স্টার' : '+3 Stars'}
          </span>
        </div>
        <Button size="lg" onClick={() => navigate('/home')} className="mt-8 z-10 w-64 h-24 text-3xl">
          <Home className="mr-4 w-10 h-10" />
          {language === 'bn' ? 'হোম' : 'Home'}
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 flex flex-col relative">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}

      <header className="flex justify-between items-center mb-12">
        <Button size="lg" variant="ghost" onClick={() => navigate('/home')} className="bg-white border-4 border-gray-200 shadow-sm gap-4">
          <Home className="w-8 h-8" />
          {language === 'bn' ? 'হোম' : 'Home'}
        </Button>

        <div className="flex-1 max-w-xl mx-8">
          <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep) / GAME_DATA.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <Button size="lg" variant="secondary" className="gap-4 shadow-sm" onClick={() => speakPrompt(currentQuestion.prompt)}>
          <HelpCircle className="w-8 h-8" />
          {language === 'bn' ? 'আবার শুনুন' : 'Hear Again'}
        </Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-12 w-full max-w-4xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-gray-700 text-center">
          {currentQuestion.prompt}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {currentQuestion.options.map((option: string, idx: number) => {
            const isError = errorState === option
            const isSuccess = showConfetti && option === currentQuestion.target

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                className={`aspect-square w-full bg-white rounded-3xl border-8 shadow-md transition-all flex items-center justify-center text-7xl md:text-8xl
                   ${isError ? 'border-red-400 bg-red-50 animate-bounce' : ''}
                   ${isSuccess ? 'border-green-400 bg-green-50 scale-110' : ''}
                   ${!isError && !isSuccess ? 'border-gray-100 hover:border-blue-300 hover:scale-105 active:scale-95' : ''}
                 `}
              >
                {option}
              </button>
            )
          })}
        </div>
      </main>
    </div>
  )
}
