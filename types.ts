import { IpsumTypes } from '@/constants/ipsum-types'

// Define types
export type IpsumType = keyof typeof IpsumTypes
export type WordCategory = 'nouns' | 'adjectives' | 'verbs' | 'descriptors'
