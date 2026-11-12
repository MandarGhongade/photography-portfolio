// ─────────────────────────────────────────────────────────────
// All business details live here. Change once, updates everywhere.
// ─────────────────────────────────────────────────────────────
import { pick } from './photos'

export const site = {
  name: 'Aurora Frames',
  tagline: 'Photography & Films',
  owner: 'Your Name',
  city: 'Pune, Maharashtra',
  phone: '+91 98765 43210',
  whatsapp: '919130280676', // country code + number, no "+" or spaces
  whatsappDisplay: '+91 91302 80676',
  whatsappMessage: "Hi! I saw your website and I'd like to enquire about a shoot.",
  email: 'hello@auroraframes.in',
  instagram: 'https://instagram.com/auroraframes',
  instagramHandle: '@auroraframes',
  youtube: 'https://youtube.com/@auroraframes',
  address: 'Studio 4, Koregaon Park, Pune 411001',
  hours: 'Mon – Sat · 10:00 AM – 7:00 PM',
  stats: [
    { value: '350+', label: 'Weddings captured' },
    { value: '10', label: 'Years of storytelling' },
    { value: '40+', label: 'Cities travelled' },
    { value: '120+', label: 'Brand & corporate shoots' },
  ],
}

export const whatsappLink = (text = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

export type CategorySlug = 'weddings' | 'pre-wedding' | 'fashion' | 'corporate'

export interface Category {
  slug: CategorySlug
  name: string
  blurb: string
  highlights: string
  description: string
}

export const categories: Category[] = [
  {
    slug: 'weddings',
    highlights: 'Wedding highlights',
    name: 'Weddings',
    blurb: 'Rituals, emotions & everything in between',
    description:
      'From the haldi laughter to the last dance — candid, timeless coverage of your biggest day, told as one continuous story.',
  },
  {
    slug: 'pre-wedding',
    highlights: 'Pre-Wedding highlights',
    name: 'Pre-Wedding',
    blurb: 'Your love story, before the vows',
    description:
      'Cinematic couple sessions in hand-picked locations — hills, beaches, heritage forts or the café where it all began.',
  },
  {
    slug: 'fashion',
    highlights: 'Fashion highlights',
    name: 'Fashion',
    blurb: 'Editorial, lookbooks & portfolios',
    description:
      'Bold editorial imagery for designers, models and labels — styled, lit and retouched to magazine standard.',
  },
  {
    slug: 'corporate',
    highlights: 'Corporate Event highlights',
    name: 'Corporate Events',
    blurb: 'Conferences, launches & brand stories',
    description:
      'Polished, discreet coverage of conferences, product launches, award nights and leadership portraits.',
  },
]

export interface Album {
  slug: string
  title: string
  category: CategorySlug
  location: string
  date: string
  featured?: boolean
  cover: string
  photos: string[] // photo ids — will become R2 keys later
  videos: number
  story: string
}

export const albums: Album[] = [
  { slug: 'riya-arjun', title: 'Riya & Arjun', category: 'weddings', location: 'Udaipur', date: 'Feb 2026', featured: true, cover: '1587271407850-8d438ca9fdf2', photos: pick('weddings', 0, 25), videos: 2, story: 'A three-day palace wedding on the banks of Lake Pichola — marigolds, mehendi and a sunset pheras.' },
  { slug: 'sneha-rohan', title: 'Sneha & Rohan', category: 'weddings', location: 'Pune', date: 'Dec 2025', cover: '1617627143750-d86bc21e42bb', photos: pick('weddings', 6, 25), videos: 1, story: 'A traditional Maharashtrian wedding full of colour, nauvari sarees and joyful chaos.' },
  { slug: 'aisha-kabir', title: 'Aisha & Kabir', category: 'weddings', location: 'Goa', date: 'Nov 2025', featured: true, cover: '1537633552985-df8429e8048b', photos: pick('weddings', 11, 25), videos: 1, story: 'Barefoot beach vows, a sundowner sangeet and a night under fairy lights.' },
  { slug: 'meera-dev', title: 'Meera & Dev', category: 'pre-wedding', location: 'Lonavala', date: 'Jan 2026', featured: true, cover: '1546032996-6dfacbacbf3f', photos: pick('pre-wedding', 0, 25), videos: 1, story: 'Misty monsoon hills, an old jeep and a lot of laughter.' },
  { slug: 'tara-nikhil', title: 'Tara & Nikhil', category: 'pre-wedding', location: 'Jaipur', date: 'Oct 2025', cover: '1604017011826-d3b4c23f8914', photos: pick('pre-wedding', 5, 25), videos: 1, story: 'Pink-city lanes, Amer fort at golden hour and a vintage scooter.' },
  { slug: 'monsoon-edit', title: 'The Monsoon Edit', category: 'fashion', location: 'Mumbai', date: 'Aug 2025', featured: true, cover: '1610030469983-98e550d6193c', photos: pick('fashion', 0, 25), videos: 1, story: 'A rain-soaked editorial for an independent handloom label.' },
  { slug: 'noir-lookbook', title: 'Noir Lookbook', category: 'fashion', location: 'Studio', date: 'Jun 2025', cover: '1534528741775-53994a69daeb', photos: pick('fashion', 6, 25), videos: 0, story: 'Monochrome studio lookbook — sharp tailoring, hard light, deep shadows.' },
  { slug: 'techsummit-2025', title: 'TechSummit 2025', category: 'corporate', location: 'Bengaluru', date: 'Sep 2025', featured: true, cover: '1540575467063-178a50c2df87', photos: pick('corporate', 0, 25), videos: 1, story: 'Two-day conference coverage: keynotes, panels, networking and the after-party.' },
  { slug: 'launch-night', title: 'Product Launch Night', category: 'corporate', location: 'Pune', date: 'Jul 2025', cover: '1492684223066-81342ee5ff30', photos: pick('corporate', 4, 25), videos: 1, story: 'A high-energy automobile launch with stage, press and guest coverage.' },
]

export interface Film {
  title: string
  subtitle: string
  category: CategorySlug
  duration: string
  poster: string
}

export const films: Film[] = [
  { title: 'Riya & Arjun — Wedding Film', subtitle: 'Udaipur', category: 'weddings', duration: '6:42', poster: '1587271407850-8d438ca9fdf2' },
  { title: 'Meera & Dev — Pre-Wedding', subtitle: 'Lonavala', category: 'pre-wedding', duration: '3:15', poster: '1546032996-6dfacbacbf3f' },
  { title: 'Aisha & Kabir — Highlights', subtitle: 'Goa', category: 'weddings', duration: '4:08', poster: '1537633552985-df8429e8048b' },
  { title: 'The Monsoon Edit — BTS', subtitle: 'Mumbai', category: 'fashion', duration: '1:52', poster: '1529139574466-a303027c1d8b' },
  { title: 'TechSummit 2025 — Recap', subtitle: 'Bengaluru', category: 'corporate', duration: '2:30', poster: '1475721027785-f74eccf877e2' },
  { title: 'Sneha & Rohan — Teaser', subtitle: 'Pune', category: 'weddings', duration: '1:10', poster: '1617627143750-d86bc21e42bb' },
]

export const testimonials = [
  {
    quote:
      'We relived our wedding the moment we opened the album. Every glance, every tear — they caught it all without us ever noticing the camera.',
    name: 'Riya & Arjun',
    meta: 'Wedding · Udaipur',
  },
  {
    quote:
      'Our pre-wedding shoot felt like a day out with friends. The film still gives our families goosebumps.',
    name: 'Meera & Dev',
    meta: 'Pre-Wedding · Lonavala',
  },
  {
    quote:
      'Professional, punctual and incredibly creative. Same-day highlights for our summit were a huge hit on LinkedIn.',
    name: 'Ananya Rao',
    meta: 'Marketing Head · TechSummit',
  },
]

export const services = [
  { title: 'Candid Photography', text: 'Natural, unposed moments captured as they unfold.' },
  { title: 'Cinematic Films', text: 'Wedding films, teasers and highlight reels in 4K.' },
  { title: 'Drone Coverage', text: 'Breathtaking aerial views of venues and processions.' },
  { title: 'Premium Albums', text: 'Hand-crafted, lay-flat albums designed to last generations.' },
]

export const process = [
  { step: '01', title: 'Say Hello', text: 'Drop a message on WhatsApp or fill the enquiry form with your date and city.' },
  { step: '02', title: 'Plan Together', text: 'A call to understand your story, schedule, locations and the moments that matter.' },
  { step: '03', title: 'The Shoot', text: 'We blend in, guide gently when needed and capture everything — big and small.' },
  { step: '04', title: 'Delivery', text: 'Sneak peeks in 48 hours, full gallery & films delivered in a private online gallery.' },
]
