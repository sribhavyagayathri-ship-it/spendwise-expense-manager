import BrandMark from './BrandMark'
import Spinner from './Spinner'

export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50">
      <BrandMark light={false} />
      <Spinner label="Loading your finances..." />
    </div>
  )
}
