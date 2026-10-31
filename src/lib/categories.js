import {
  Award,
  Clapperboard,
  Coins,
  Gift,
  GraduationCap,
  HeartPulse,
  Home,
  Laptop,
  MoreHorizontal,
  Plane,
  ShoppingBag,
  Utensils,
  Wallet,
  Zap,
} from 'lucide-react'

export const EXPENSE_CATEGORIES = [
  { name: 'Food', icon: Utensils, color: '#f59e0b' },
  { name: 'Rent', icon: Home, color: '#0ea5e9' },
  { name: 'Travel', icon: Plane, color: '#14b8a6' },
  { name: 'Shopping', icon: ShoppingBag, color: '#f43f5e' },
  { name: 'Education', icon: GraduationCap, color: '#2563eb' },
  { name: 'Entertainment', icon: Clapperboard, color: '#84cc16' },
  { name: 'Healthcare', icon: HeartPulse, color: '#ec4899' },
  { name: 'Bills and Utilities', icon: Zap, color: '#64748b' },
  { name: 'Other', icon: MoreHorizontal, color: '#94a3b8' },
]

export const INCOME_CATEGORIES = [
  { name: 'Salary', icon: Wallet, color: '#059669' },
  { name: 'Allowance', icon: Gift, color: '#10b981' },
  { name: 'Freelancing', icon: Laptop, color: '#0d9488' },
  { name: 'Scholarship', icon: Award, color: '#16a34a' },
  { name: 'Other Income', icon: Coins, color: '#4ade80' },
]

const FALLBACK_CATEGORY = { name: 'Other', icon: MoreHorizontal, color: '#94a3b8' }

export function getCategoryOptions(type) {
  return type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
}

export function getCategoryMeta(type, name) {
  return getCategoryOptions(type).find((category) => category.name === name) ?? FALLBACK_CATEGORY
}

export const ALL_CATEGORY_NAMES = [
  ...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].map((category) => category.name)),
]
