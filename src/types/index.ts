import { UserRole, EventStatus, OfferStatus, BookingStatus, Artist, Event, Offer, Booking, User } from '@prisma/client'

export type { User, Artist, Event, Offer, Booking }
export { UserRole, EventStatus, OfferStatus, BookingStatus }

// Extended types with relations
export interface UserWithProfile extends User {
  artistProfile?: Artist | null
}

export interface EventWithRelations extends Event {
  client: User
  offers?: OfferWithRelations[]
  booking?: BookingWithRelations | null
}

export interface OfferWithRelations extends Offer {
  event: Event
  artist: ArtistWithUser
}

export interface ArtistWithUser extends Artist {
  user: User
}

export interface BookingWithRelations extends Booking {
  event: Event
  artist: ArtistWithUser
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Form types
export interface CreateEventFormData {
  title: string
  eventType: string
  description?: string
  budgetMin: number
  budgetMax: number
  date: string
  time?: string
  duration?: number
  location: string
  venueType?: string
  vibe: string[]
  guestCount?: number
  notes?: string
}

export interface ArtistProfileFormData {
  bio: string
  genres: string[]
  performanceType: string[]
  pricing: {
    hourly?: number
    perEvent?: number
  }
  experience: string
  location: string
}

export interface OfferFormData {
  price: number
  message: string
}

// Dashboard stats
export interface DashboardStats {
  totalBookings: number
  totalRevenue: number
  activeEvents: number
  pendingOffers: number
}

// Admin stats
export interface AdminStats {
  totalUsers: number
  totalArtists: number
  totalEvents: number
  totalBookings: number
  totalRevenue: number
  pendingApprovals: number
}

// Event types for dropdown
export const EVENT_TYPES = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Anniversary',
  'Concert',
  'Festival',
  'Private Party',
  'Restaurant/Cafe',
  'Hotel Event',
  'Club Event',
  'Charity Event',
  'Other'
] as const

// Genre types
export const GENRES = [
  'Pop',
  'Rock',
  'Jazz',
  'Classical',
  'Bollywood',
  'Hip Hop',
  'Electronic/EDM',
  'R&B',
  'Country',
  'Latin',
  'Folk',
  'Metal',
  'Blues',
  'Reggae',
  'Soul',
  'Funk',
  'Indie',
  'Acoustic',
  'Cover Band',
  'Tribute Act'
] as const

// Performance types
export const PERFORMANCE_TYPES = [
  'Solo Singer',
  'Singer with Guitar',
  'Band (2-4 members)',
  'Band (5+ members)',
  'DJ',
  'DJ + MC',
  'Instrumentalist',
  'Comedian',
  'Magician',
  'Dance Group',
  'Acapella Group',
  'Orchestra',
  'Choir'
] as const

// Vibe/Style options
export const VIBE_OPTIONS = [
  'Romantic',
  'Upbeat/Energetic',
  'Relaxed/Chill',
  'Elegant/Classy',
  'Party/Dance',
  'Intimate',
  'Professional',
  'Festive',
  'Modern',
  'Traditional',
  'Fusion',
  'Bollywood Style',
  'Western Style',
  'Live Band Feel',
  'DJ/Vibe'
] as const
