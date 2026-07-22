import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ArrowLeft, Download } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export const ParentDashboard = () => {
  const navigate = useNavigate()
  const { children, language } = useStore()
  
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 pb-32">
      <header className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">
          {language === 'bn' ? 'প্যারেন্ট ড্যাশবোর্ড' : 'Parent Dashboard'}
        </h1>
        <Button variant="ghost" onClick={() => navigate('/')} className="border-2 border-gray-300">
          <ArrowLeft className="mr-2 w-6 h-6" /> {language === 'bn' ? 'লগইনে ফিরে যান' : 'Back to Login'}
        </Button>
      </header>

      {children.length === 0 ? (
        <div className="text-center text-gray-500 text-2xl mt-32">
          {language === 'bn' 
            ? 'এখনও কোনো শিশু প্রোফাইল তৈরি করা হয়নি। নতুন প্রোফাইল তৈরি করতে লগইনে ফিরে যান!' 
            : 'No children profiles created yet. Go to login to create one!'}
        </div>
      ) : (
        <div className="flex flex-col gap-16 max-w-7xl mx-auto">
          {children.map(child => {
            const chartData = language === 'bn' ? [
              { name: 'রং', score: child.stats.colors },
              { name: 'পশুপাখি', score: child.stats.animals },
              { name: 'আকৃতি', score: child.stats.shapes },
              { name: 'সংখ্যা', score: child.stats.numbers },
              { name: 'আবেগ', score: child.stats.emotions },
              { name: 'যানবাহন', score: child.stats.vehicles },
              { name: 'খাবার', score: child.stats.food },
              { name: 'বর্ণমালা', score: child.stats.alphabet },
              { name: 'আবহাওয়া', score: child.stats.weather },
              { name: 'পোশাক', score: child.stats.clothing },
              { name: 'খেলাধুলা', score: child.stats.sports },
              { name: 'শরীর', score: child.stats.body },
            ] : [
              { name: 'Colors', score: child.stats.colors },
              { name: 'Animals', score: child.stats.animals },
              { name: 'Shapes', score: child.stats.shapes },
              { name: 'Numbers', score: child.stats.numbers },
              { name: 'Emotions', score: child.stats.emotions },
              { name: 'Vehicles', score: child.stats.vehicles },
              { name: 'Food', score: child.stats.food },
              { name: 'Alphabet', score: child.stats.alphabet },
              { name: 'Weather', score: child.stats.weather },
              { name: 'Clothing', score: child.stats.clothing },
              { name: 'Sports', score: child.stats.sports },
              { name: 'Body', score: child.stats.body },
            ]

            return (
              <div key={child.id} className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white p-8 rounded-3xl shadow-sm border-2 border-blue-100">
                <div className="col-span-1 lg:col-span-3 flex items-center gap-4 mb-4">
                  <img src={child.avatar} alt={child.name} className="w-16 h-16 rounded-full bg-blue-100 border-2 border-blue-200" />
                  <h2 className="text-3xl font-bold text-gray-800">
                    {language === 'bn' ? `${child.name}-এর অগ্রগতি` : `${child.name}'s Progress`}
                  </h2>
                </div>

                <div className="col-span-1 lg:col-span-2">
                  <Card className="h-full border-none shadow-none">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-gray-700">
                        {language === 'bn' ? 'শেখার অগ্রগতি (সঠিকতা %)' : 'Learning Progress (Accuracy %)'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                      <div className="h-96 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="score" fill="#60A5FA" radius={[10, 10, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="col-span-1 flex flex-col gap-8">
                  <Card className="border-none shadow-none bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {language === 'bn' ? 'দ্রুত পরিসংখ্যান' : 'Quick Stats'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <div className="flex justify-between items-center p-4 bg-blue-100 rounded-2xl">
                        <span className="text-lg font-bold text-gray-600">
                          {language === 'bn' ? 'মোট স্টার' : 'Total Stars'}
                        </span>
                        <span className="text-2xl font-bold text-yellow-500">{child.stats.totalStars} ⭐</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-100 rounded-2xl">
                        <span className="text-lg font-bold text-gray-600">
                          {language === 'bn' ? 'শেখার সময়' : 'Time Learned'}
                        </span>
                        <span className="text-2xl font-bold text-green-600">
                          {child.stats.timeLearned} {language === 'bn' ? 'মিনিট' : 'mins'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-none bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {language === 'bn' ? 'সুপারিশ' : 'Recommendations'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-md text-gray-600 leading-relaxed mb-6">
                        {language === 'bn' ? (
                          <>
                            <strong>{child.name}</strong> খুব ভালো করছে! আমরা আগামী সপ্তাহে নতুন কিছু শেখার পরামর্শ দিচ্ছি।
                          </>
                        ) : (
                          <>
                            <strong>{child.name}</strong> is doing exceptionally well! We recommend focusing on new categories next week.
                          </>
                        )}
                      </p>
                      <Button className="w-full" size="lg">
                        <Download className="mr-3 w-5 h-5" />
                        {language === 'bn' ? 'রিপোর্ট ডাউনলোড করুন' : 'Export PDF Report'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
