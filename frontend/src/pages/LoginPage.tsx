import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Settings } from 'lucide-react'
import { useStore } from '@/store/useStore'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { children, setCurrentUser, addChild, language, setLanguage } = useStore()
  const [isCreating, setIsCreating] = useState(false)
  const [newName, setNewName] = useState('')

  const handleLogin = (user: any) => {
    setCurrentUser(user)
    navigate('/home')
  }

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault()
    if (newName.trim()) {
      const newChild = {
        id: `child-${Date.now()}`,
        name: newName.trim(),
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${newName.trim()}&backgroundColor=b6e3f4`,
        stats: {
          colors: 0, animals: 0, shapes: 0, numbers: 0,
          emotions: 0, vehicles: 0, food: 0, alphabet: 0,
          totalStars: 0, timeLearned: 0
        }
      }
      addChild(newChild)
      handleLogin(newChild)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4 relative">
      <div className="absolute top-4 right-4 z-10">
        <Button 
          variant="outline" 
          onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
          className="rounded-full px-6 py-2 border-2 border-blue-200 text-lg font-bold text-gray-700 hover:bg-blue-50 transition-colors"
        >
          {language === 'en' ? 'বাংলা' : 'English'}
        </Button>
      </div>

      <Card className="max-w-4xl w-full mx-auto">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-5xl text-[#60A5FA] mb-4">Happy Learn</CardTitle>
          <p className="text-2xl text-gray-500">
            {language === 'bn' ? 'আজ কে খেলছে?' : 'Who is playing today?'}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 items-center pt-8">
          {!isCreating ? (
            <div className="flex gap-12 justify-center flex-wrap">
              {children.map(user => (
                <button
                  key={user.id}
                  onClick={() => handleLogin(user)}
                  className="group flex flex-col items-center gap-4 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <div className="w-48 h-48 rounded-full bg-blue-100 flex items-center justify-center border-8 border-transparent group-hover:border-blue-400 overflow-hidden shadow-lg">
                    <img src={user.avatar} alt={user.name} className="w-32 h-32" />
                  </div>
                  <span className="text-3xl font-bold text-gray-700">{user.name}</span>
                </button>
              ))}

              {children.length === 0 && (
                <button
                  onClick={() => handleLogin({ name: 'Leo', avatar: '' })}
                  className="group flex flex-col items-center gap-4 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <div className="w-48 h-48 rounded-full bg-blue-100 flex items-center justify-center border-8 border-transparent group-hover:border-blue-400 overflow-hidden shadow-lg">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Leo&backgroundColor=b6e3f4" alt="Leo Avatar" className="w-32 h-32" />
                  </div>
                  <span className="text-3xl font-bold text-gray-700">Leo</span>
                </button>
              )}

              <button
                onClick={() => setIsCreating(true)}
                className="group flex flex-col items-center gap-4 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <div className="w-48 h-48 rounded-full bg-gray-50 flex items-center justify-center border-8 border-dashed border-gray-300 group-hover:border-blue-400 overflow-hidden shadow-sm">
                  <span className="text-8xl font-light text-gray-400 group-hover:text-blue-400">+</span>
                </div>
                <span className="text-3xl font-bold text-gray-500 group-hover:text-blue-500">
                  {language === 'bn' ? 'নতুন খেলোয়াড়' : 'New Player'}
                </span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleCreateNew} className="flex flex-col gap-8 items-center w-full max-w-md bg-white p-8 rounded-3xl border-4 border-blue-100 shadow-sm">
              <h3 className="text-3xl font-bold text-gray-700">
                {language === 'bn' ? 'তোমার নাম কী?' : 'What is your name?'}
              </h3>
              <input
                type="text"
                placeholder={language === 'bn' ? "তোমার নাম লেখো..." : "Type your name..."}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full text-4xl p-6 text-center rounded-2xl border-4 border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                autoFocus
              />
              <div className="flex gap-4 w-full">
                <Button type="button" variant="outline" size="lg" className="flex-1 text-2xl h-20 rounded-xl border-4 border-gray-200" onClick={() => setIsCreating(false)}>
                  {language === 'bn' ? 'পেছনে' : 'Back'}
                </Button>
                <Button type="submit" size="lg" disabled={!newName.trim()} className="flex-1 text-2xl h-20 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:text-gray-500">
                  {language === 'bn' ? 'চলো খেলি!' : "Let's Play!"}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-8 border-t-4 border-gray-100 w-full flex justify-center">
            <Button variant="secondary" onClick={() => navigate('/parent')} size="lg" className="w-full max-w-sm">
              <Settings className="mr-3 w-8 h-8" />
              {language === 'bn' ? 'প্যারেন্ট ড্যাশবোর্ড' : 'Parent Dashboard'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
