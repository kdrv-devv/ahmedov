'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Biznes uchun Reels',
    category: 'Mobilografiya',
    description:
      'Biznes sahifalar uchun sotuvga yo‘naltirilgan reels va qisqa videolar.',
    image: 'https://img.freepik.com/premium-psd/business-instagram-reels-cover-youtube-thumbnail-design_475351-827.jpg',
  },
  {
    id: 2,
    title: 'Shaxsiy brend videosi',
    category: 'Kontent yaratish',
    description:
      'Bloger va mutaxassislar uchun imij va ishonchni oshiruvchi video kontent.',
    image: 'https://i.ytimg.com/vi/rekoIT95cYE/sddefault.jpg',
  },
  {
    id: 3,
    title: 'Instagram kontent',
    category: 'SMM video',
    description:
      'Instagram va TikTok uchun muntazam, kreativ va trendga mos videolar.',
    image: 'https://cdn.iticket.uz/event/artist_bg/saStazg56GehBntfHVQYwlotfzPLimYByVl2ZXhP.jpg',
  },
  {
    id: 4,
    title: 'Reklama video',
    category: 'Promo video',
    description:
      'Mahsulot va xizmatlar uchun qisqa, ta’sirli va sotuvchi reklama videolari.',
    image: 'https://i.ytimg.com/vi/631dHC1WrX0/maxresdefault.jpg',
  },
  {
    id: 5,
    title: 'Kurs jarayonidan lavhalar',
    category: 'Mobilografiya kursi',
    description:
      'O‘quvchilar bilan amaliy mashg‘ulotlar va real natijalar.',
    image: 'https://inrise.pro/img/courses/course-mobileography-lg.jpg',
  },
  {
    id: 6,
    title: 'O‘quvchilar ishlari',
    category: 'Bitiruvchilar natijasi',
    description:
      'Mobilografiya kursini tugatgan o‘quvchilarning real ishlari va videolari.',
    image: 'https://i.ytimg.com/vi/tCUc5mBWoUY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBkRFikbO44cZvSvJcFNp9CcxPZCg',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="bg-black py-24 px-6 relative overflow-hidden">
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
            Oxirgi <span className="text-red-500">ishlar</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Mobilografiya xizmatlari va kurs jarayonidan real loyihalar
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-6 h-64 bg-gray-900">
                <div
                  className={`absolute inset-0 ${project.image} transition-transform duration-500 group-hover:scale-110`}
                />
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="text-white" size={24} />
                </div>
              </div>

              <div>
                <p className="text-red-500 text-sm font-semibold uppercase tracking-wide mb-2">
                  {project.category}
                </p>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400">{project.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}