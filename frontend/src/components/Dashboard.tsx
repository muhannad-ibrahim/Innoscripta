import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Welcome, {user?.name}!
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>You are successfully logged in to your account.</p>
              </div>
              <div className="mt-5">
                <div className="rounded-md bg-gray-50 px-4 py-3">
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">Account Information</div>
                    <div className="mt-1 text-gray-600">
                      <p><strong>Email:</strong> {user?.email}</p>
                      <p><strong>User ID:</strong> {user?.id}</p>
                    </div>
                  </div>
                </div>
              </div>
              {user?.preferences && (
                <div className="mt-5">
                  <div className="rounded-md bg-blue-50 px-4 py-3">
                    <div className="text-sm">
                      <div className="font-medium text-blue-800">User Preferences</div>
                      <div className="mt-1 text-blue-600">
                        <p><strong>Theme:</strong> {user.preferences.theme}</p>
                        <p><strong>Language:</strong> {user.preferences.language}</p>
                        <p><strong>Notifications:</strong> {user.preferences.notifications_enabled ? 'Enabled' : 'Disabled'}</p>
                        <p><strong>Timezone:</strong> {user.preferences.timezone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard 