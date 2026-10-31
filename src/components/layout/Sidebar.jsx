import { NavLink } from 'react-router-dom'
import { ArrowLeftRight, BarChart3, LayoutDashboard, Settings, Tags } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import BrandMark from '../common/BrandMark'
import SignOutButton from '../auth/SignOutButton'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/categories', label: 'Categories', icon: Tags },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ onNavigate }) {
  const { user } = useAuth()
  const displayName = user?.user_metadata?.full_name || user?.email

  return (
    <aside className="flex h-full flex-col bg-navy-900 text-slate-300">
      <div className="px-6 py-6">
        <BrandMark />
      </div>

      <nav aria-label="Main navigation" className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-white/10 text-white shadow-sm' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <p className="truncate text-sm font-medium text-white">{displayName}</p>
        <p className="truncate text-xs text-slate-400">{user?.email}</p>
        <SignOutButton className="mt-3 w-full border border-white/20 text-slate-200 hover:bg-white/10 hover:text-white" />
      </div>
    </aside>
  )
}
