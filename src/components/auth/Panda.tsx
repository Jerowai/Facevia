'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'

interface PandaProps {
  isHiding: boolean
}

export function Panda({ isHiding }: PandaProps) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center gap-2 mb-2">
      <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-2xl transition-transform duration-500" xmlns="http://www.w3.org/2000/svg">
        {/* Ear left */}
        <circle cx="22" cy="30" r="18" fill="#1a1a1a" />
        <circle cx="22" cy="30" r="10" fill="#333" />
        {/* Ear right */}
        <circle cx="98" cy="30" r="18" fill="#1a1a1a" />
        <circle cx="98" cy="30" r="10" fill="#333" />
        {/* Head */}
        <circle cx="60" cy="65" r="48" fill="white" />
        {/* Eye patches */}
        <ellipse cx="40" cy="55" rx="16" ry="14" fill="#1a1a1a" />
        <ellipse cx="80" cy="55" rx="16" ry="14" fill="#1a1a1a" />
        {/* Eyes — open vs closed */}
        {isHiding ? (
          <>
            {/* Eyes closed: curved lines */}
            <path 
              d="M32 55 Q40 48 48 55" 
              stroke="white" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round" 
              className="animate-in fade-in duration-300"
            />
            <path 
              d="M72 55 Q80 48 88 55" 
              stroke="white" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round" 
              className="animate-in fade-in duration-300"
            />
          </>
        ) : (
          <>
            {/* Eyes open: circles */}
            <circle cx="40" cy="55" r="7" fill="white" className="animate-in zoom-in duration-300" />
            <circle cx="80" cy="55" r="7" fill="white" className="animate-in zoom-in duration-300" />
            <circle cx="42" cy="54" r="3.5" fill="#1a1a1a" />
            <circle cx="82" cy="54" r="3.5" fill="#1a1a1a" />
            {/* Shine */}
            <circle cx="44" cy="52" r="1.5" fill="white" />
            <circle cx="84" cy="52" r="1.5" fill="white" />
          </>
        )}
        {/* Nose */}
        <ellipse cx="60" cy="75" rx="9" ry="7" fill="#f0a8b0" />
        <ellipse cx="60" cy="75" rx="5" ry="3.5" fill="#e87d8f" />
        {/* Mouth */}
        <path d="M52 84 Q60 92 68 84" stroke="#e87d8f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
      <p className="text-gray-400 text-[10px] sm:text-xs font-medium tracking-wide border border-white/10 px-3 py-1 bg-white/5 rounded-full backdrop-blur-sm">
        {isHiding ? `🙈 ${t('auth.panda.peeking')}` : `👀 ${t('auth.panda.watching')}`}
      </p>
    </div>
  )
}
