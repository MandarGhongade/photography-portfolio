type P = { className?: string }

export const WhatsAppIcon = ({ className = 'w-5 h-5' }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.45-5.02c0-5.2 4.24-9.44 9.46-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44zm8.05-17.5A11.32 11.32 0 0 0 12.04.68C5.77.68.66 5.78.66 12.06c0 2 .52 3.96 1.52 5.69L.57 23.64l6.03-1.58a11.36 11.36 0 0 0 5.43 1.38h.01c6.27 0 11.38-5.1 11.38-11.38 0-3.04-1.18-5.9-3.33-8.05z" />
  </svg>
)

export const InstagramIcon = ({ className = 'w-5 h-5' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const YoutubeIcon = ({ className = 'w-5 h-5' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <rect x="2.5" y="5" width="19" height="14" rx="4" />
    <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" stroke="none" />
  </svg>
)

export const PhoneIcon = ({ className = 'w-5 h-5' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <path d="M5 3.5h3l1.6 4.2-2 1.3a11 11 0 0 0 7.4 7.4l1.3-2 4.2 1.6v3A2 2 0 0 1 18.4 21 15.5 15.5 0 0 1 3 5.6a2 2 0 0 1 2-2.1z" />
  </svg>
)

export const MailIcon = ({ className = 'w-5 h-5' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </svg>
)

export const PinIcon = ({ className = 'w-5 h-5' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

export const CameraIcon = ({ className = 'w-6 h-6' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={className} aria-hidden>
    <path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="13" r="3.6" />
  </svg>
)

export const PlayIcon = ({ className = 'w-6 h-6' }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
)

export const ArrowIcon = ({ className = 'w-4 h-4' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
    <path d="M4 12h16m-6-6 6 6-6 6" />
  </svg>
)

export const ChevronIcon = ({ className = 'w-6 h-6', dir = 'right' }: P & { dir?: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden
    style={{ transform: dir === 'left' ? 'rotate(180deg)' : undefined }}>
    <path d="m9 5 7 7-7 7" />
  </svg>
)

export const CloseIcon = ({ className = 'w-6 h-6' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
