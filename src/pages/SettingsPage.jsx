import { UserRound } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import ProfileForm from '../components/settings/ProfileForm'
import PageHeader from '../components/common/PageHeader'
import Panel from '../components/common/Panel'
import SignOutButton from '../components/auth/SignOutButton'

export default function SettingsPage() {
  const { user } = useAuth()
  const fullName = user?.user_metadata?.full_name ?? ''
  const email = user?.email ?? ''
  const joinedOn = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''
  const initial = (fullName || email).charAt(0).toUpperCase()

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Settings" subtitle="Manage your profile and how SpendWise displays your money." />

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Profile" subtitle="Your name appears in the sidebar.">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-semibold text-white">
              {initial || <UserRound className="h-6 w-6" />}
            </span>
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-900">{fullName || 'No name set'}</p>
              <p className="truncate text-sm text-slate-500">{email}</p>
            </div>
          </div>
          <ProfileForm key={fullName} initialName={fullName} />
          {joinedOn && <p className="mt-6 text-xs text-slate-500">Member since {joinedOn}</p>}
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel title="Preferences" subtitle="Currency and number formatting.">
            <dl className="divide-y divide-slate-100 text-sm">
              <div className="flex items-center justify-between py-3">
                <dt className="text-slate-600">Currency</dt>
                <dd className="font-medium text-slate-900">Indian Rupee (INR)</dd>
              </div>
            </dl>
          </Panel>

          <Panel title="Account" subtitle="Sign out of SpendWise on this device.">
            <SignOutButton className="border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50" />
          </Panel>
        </div>
      </div>
    </div>
  )
}
