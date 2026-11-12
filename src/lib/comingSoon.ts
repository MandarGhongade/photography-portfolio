import type { MouseEvent } from 'react'

export const SOON_EVENT = 'coming-soon'

/** Show the "coming soon" notice (rendered by <Toast />). */
export function comingSoon(message: string) {
  window.dispatchEvent(new CustomEvent(SOON_EVENT, { detail: message }))
}

export const INSTAGRAM_SOON = 'Our Instagram page will be implemented in the future. Stay tuned!'

/** Spread onto any Instagram <a> until the client's real account is connected. */
export const instagramLink = {
  href: '#instagram',
  onClick: (e: MouseEvent) => {
    e.preventDefault()
    comingSoon(INSTAGRAM_SOON)
  },
}
