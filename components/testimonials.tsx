'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Jasur Karimov',
    role: 'Mobilografiya kursi bitiruvchisi',
    content:
      'Kursga kelgunimcha oddiy telefon bilan shunchaki video olardim. Hozir esa mijozlarim bor va har oy stabil daromad qilyapman. Eng yoqqan tomoni — hammasi amaliy o‘rgatiladi.',
    rating: 5,
  },
  {
    name: 'Dilnoza Raxmonova',
    role: 'SMM mutaxassisi',
    content:
      'Mobilografiya kursi menga kontent sifatini 2 baravar oshirishga yordam berdi. Reelslarim ko‘proq ko‘rila boshladi va mijozlar soni oshdi.',
    rating: 5,
  },
  {
    name: 'Bekzod Ismoilov',
    role: 'Boshlovchi mobilograf',
    content:
      '0 dan boshlaganman. Hozir esa to‘y va biznes uchun video olib berayapman. Kurs juda tushunarli va motivatsiya beradi.',
    rating: 5,
  },
  {
    name: 'Madina Yo‘ldosheva',
    role: 'Bloger',
    content:
      'Telefon bilan ham professional darajada video olish mumkinligini shu kursda bildim. Kontentim sifati ancha oshdi.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="testimonials" className="bg-black py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            O‘quvchilar <span className="text-red-500">fikrlari</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Mobilografiya kursini tugatganlar natijalari va fikrlari
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 lg:p-12 min-h-64 flex flex-col justify-between">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array(testimonials[currentIndex].rating)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
            </div>

            {/* Content */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl text-gray-300 mb-6 leading-relaxed italic">
                "{testimonials[currentIndex].content}"
              </p>
            </motion.div>

            {/* Author */}
            <div>
              <h4 className="text-lg font-bold text-white">{testimonials[currentIndex].name}</h4>
              <p className="text-gray-400">{testimonials[currentIndex].role}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8 justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Indicators */}
          <div className="flex gap-2 justify-center mt-6">
            {testimonials.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === currentIndex ? 32 : 8,
                  backgroundColor: i === currentIndex ? '#ef4444' : '#666',
                }}
                className="h-2 rounded-full transition-all"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
