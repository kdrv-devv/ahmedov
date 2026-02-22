'use client'

import { motion } from 'framer-motion'
import { Instagram, X, Linkedin, Github, ArrowUp } from 'lucide-react'

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: X, href: '#', label: 'X' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Asosiy Qism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-6xl lg:text-7xl font-black text-white mb-6 text-balance">
            Shoxruh <span className="text-red-500">Ahmedov</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Professional mobilograf va mobilografiya kursi muallifi. 
            Telefon orqali sifatli video olish, montaj qilish va daromad qilishni o‘rgataman.
          </p>
        </motion.div>

        {/* Havolalar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-800 pt-12"
        >
          
          {/* Tezkor havolalar */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase text-sm tracking-wide">
              Navigatsiya
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Bosh sahifa', id: 'home' },
                { name: 'Men haqimda', id: 'about' },
                { name: 'Xizmatlar', id: 'services' },
                { name: 'Ishlar', id: 'projects' },
                { name: 'Bog‘lanish', id: 'contact' },
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ijtimoiy tarmoqlar */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase text-sm tracking-wide">
              Ijtimoiy tarmoqlar
            </h3>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.2}}
                  className="w-10 h-10 bg-gray-900 hover:bg-red-500 rounded-full flex items-center justify-center  hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pastki Qism */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-gray-800 mt-12"
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Shoxruh Ahmedov. Barcha huquqlar himoyalangan.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Yuqoriga qaytish"
          >
            <ArrowUp size={20} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}