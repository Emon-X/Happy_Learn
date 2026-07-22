import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Star, ArrowLeft, HelpCircle } from 'lucide-react'
import { useStore } from '@/store/useStore'

export const HomePage = () => {
  const navigate = useNavigate()
  const { currentUser, language } = useStore()
  
  if (!currentUser) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <header className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-4 border-blue-200">
            <img src={currentUser.avatar} alt="Avatar" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">
            {language === 'bn' ? `হ্যালো, ${currentUser.name}!` : `Hi, ${currentUser.name}!`}
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-white px-6 py-4 rounded-full shadow-sm border-4 border-yellow-200">
          <Star className="w-10 h-10 text-yellow-400 fill-yellow-400 animate-float" />
          <span className="text-3xl font-bold text-yellow-600">{currentUser.stats.totalStars}</span>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto pb-32">
        <Card className="cursor-pointer hover:border-blue-300" onClick={() => navigate('/game/colors')}>
          <CardContent className="flex flex-col items-center justify-center p-8 gap-4 pointer-events-none">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-5xl">🎨</div>
            <CardTitle className="text-3xl">{language === 'bn' ? 'রং' : 'Colors'}</CardTitle>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:border-green-300" onClick={() => navigate('/game/animals')}>
          <CardContent className="flex flex-col items-center justify-center p-8 gap-4 pointer-events-none">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl">🐶</div>
            <CardTitle className="text-3xl">{language === 'bn' ? 'পশুপাখি' : 'Animals'}</CardTitle>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:border-purple-300" onClick={() => navigate('/game/shapes')}>
          <CardContent className="flex flex-col items-center justify-center p-8 gap-4 pointer-events-none">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-5xl">🔺</div>
            <CardTitle className="text-3xl">{language === 'bn' ? 'আকৃতি' : 'Shapes'}</CardTitle>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-orange-300" onClick={() => navigate('/game/numbers')}>
          <CardContent className="flex flex-col items-center justify-center p-8 gap-4 pointer-events-none">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-5xl">🔢</div>
            <CardTitle className="text-3xl">{language === 'bn' ? 'সংখ্যা' : 'Numbers'}</CardTitle>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-pink-300" onClick={() => navigate('/game/emotions')}>
          <CardContent className="flex flex-col items-center justify-center p-8 gap-4 pointer-events-none">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center text-5xl">😊</div>
            <CardTitle className="text-3xl">{language === 'bn' ? 'আবেগ' : 'Emotions'}</CardTitle>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-teal-300" onClick={() => navigate('/game/transportation')}>
          <CardContent className="flex flex-col items-center justify-center p-8 gap-4 pointer-events-none">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center text-5xl">🚗</div>
            <CardTitle className="text-3xl">{language === 'bn' ? 'যানবাহন' : 'Vehicles'}</CardTitle>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-yellow-300" onClick={() => navigate('/game/food')}>
          <CardContent className="flex flex-col items-center justify-center p-8 gap-4 pointer-events-none">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-5xl">🍕</div>
            <CardTitle className="text-3xl">{language === 'bn' ? 'খাবার' : 'Food'}</CardTitle>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-indigo-300" onClick={() => navigate('/game/alphabet')}>
          <CardContent className="flex flex-col items-center justify-center p-8 gap-4 pointer-events-none">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-5xl">A</div>
            <CardTitle className="text-3xl">{language === 'bn' ? 'বর্ণমালা' : 'Alphabet'}</CardTitle>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-cyan-300" onClick={() => navigate('/game/weather')}>
          <CardContent className="flex flex-col items-center justify-center p-8 gap-4 pointer-events-none">
            <div className="w-24 h-24 bg-cyan-100 rounded-full flex items-center justify-center text-5xl">☀️</div>
            <CardTitle className="text-3xl">{language === 'bn' ? 'আবহাওয়া' : 'Weather'}</CardTitle>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-fuchsia-300" onClick={() => navigate('/game/clothing')}>
          <CardContent className="flex flex-col items-center justify-center p-8 gap-4 pointer-events-none">
            <div className="w-24 h-24 bg-fuchsia-100 rounded-full flex items-center justify-center text-5xl">👕</div>
            <CardTitle className="text-3xl">{language === 'bn' ? 'পোশাক' : 'Clothing'}</CardTitle>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-lime-300" onClick={() => navigate('/game/sports')}>
          <CardContent className="flex flex-col items-center justify-center p-8 gap-4 pointer-events-none">
            <div className="w-24 h-24 bg-lime-100 rounded-full flex items-center justify-center text-5xl">⚽</div>
            <CardTitle className="text-3xl">{language === 'bn' ? 'খেলাধুলা' : 'Sports'}</CardTitle>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-rose-300" onClick={() => navigate('/game/body')}>
          <CardContent className="flex flex-col items-center justify-center p-8 gap-4 pointer-events-none">
            <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center text-5xl">✋</div>
            <CardTitle className="text-3xl">{language === 'bn' ? 'শরীর' : 'Body'}</CardTitle>
          </CardContent>
        </Card>
      </div>
      
      <div className="fixed bottom-8 right-8 flex gap-4">
        <Button size="icon" variant="secondary" className="w-20 h-20 rounded-full shadow-lg">
          <HelpCircle className="w-10 h-10" />
        </Button>
      </div>
      
      <div className="fixed bottom-8 left-8 flex gap-4">
        <Button size="icon" variant="ghost" onClick={() => {
          useStore.getState().setCurrentUser(null)
          navigate('/')
        }} className="w-20 h-20 rounded-full bg-white shadow-lg border-4 border-gray-200">
           <ArrowLeft className="w-10 h-10 text-gray-500" />
        </Button>
      </div>
    </div>
  )
}
