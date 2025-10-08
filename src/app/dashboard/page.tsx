import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { Plus, FolderOpen, TrendingUp, Star } from 'lucide-react'

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await currentUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 lg:py-6 bg-white/95 backdrop-blur-md border-b border-neutral-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl lg:text-2xl">M</span>
            </div>
            <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Mockr</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/generate"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
            >
              Create Comic
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-neutral-900 mb-4">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}! 👋
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed text-neutral-600">
            Ready to create some satirical masterpieces? Your comic journey continues here.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          <Link href="/generate" className="group">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden p-8 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">Create New Comic</h3>
              <p className="text-neutral-600 leading-relaxed">
                Generate a new political cartoon with AI. Express your satirical vision in minutes.
              </p>
            </div>
          </Link>

          <div className="group cursor-pointer">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden p-8 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <FolderOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">My Gallery</h3>
              <p className="text-neutral-600 leading-relaxed">
                View and manage all your created comics. Share your favorites with the world.
              </p>
              <div className="mt-4 px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full inline-block">
                Coming Soon
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden p-8 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">Analytics</h3>
              <p className="text-neutral-600 leading-relaxed">
                Track your comic performance and see which satirical takes resonate most.
              </p>
              <div className="mt-4 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full inline-block">
                Coming Soon
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden p-8 lg:p-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-neutral-900">Recent Comics</h2>
            <Link href="/generate" className="text-blue-600 hover:text-blue-700 font-medium">
              Create your first comic →
            </Link>
          </div>

          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-md">
              <Star className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Start Your Satirical Journey</h3>
            <p className="text-neutral-600 leading-relaxed mb-8 max-w-lg mx-auto">
              You haven't created any comics yet. Click the button below to generate your first AI-powered political cartoon!
            </p>
            <Link
              href="/generate"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Comic</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}