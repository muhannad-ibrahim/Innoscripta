import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const sources = ['Reuters', 'BBC', 'CNN', 'Al Jazeera', 'The Verge']
const categories = ['Technology', 'Health', 'Business', 'Sports', 'Entertainment']

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth()

  // Article search/filter state
  const [keyword, setKeyword] = useState('')
  const [source, setSource] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [page, setPage] = useState(1)
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      setError('')
      try {
        const params = new URLSearchParams()
        if (keyword) params.append('keyword', keyword)
        if (source) params.append('source', source)
        if (category) params.append('category', category)
        if (date) params.append('date', date)
        params.append('page', String(page))
        const res = await fetch(`http://localhost:8000/api/articles?${params.toString()}`)
        if (!res.ok) throw new Error('Failed to fetch articles')
        const data = await res.json()
        setArticles(data.data)
        setTotalPages(data.last_page)
      } catch (err: any) {
        setError(err.message || 'Error fetching articles')
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [keyword, source, category, date, page])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    // fetchArticles will run due to useEffect
  }

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
              {/* <div className="mt-5">
                <div className="rounded-md bg-gray-50 px-4 py-3">
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">Account Information</div>
                    <div className="mt-1 text-gray-600">
                      <p><strong>Email:</strong> {user?.email}</p>
                      <p><strong>User ID:</strong> {user?.id}</p>
                    </div>
                  </div>
                </div>
              </div> */}
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
              {/* Article Search & Filters */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Search News Articles</h2>
                <form onSubmit={handleSearch} className="flex flex-wrap gap-2 items-end justify-center items-center">
                  <input
                    type="text"
                    placeholder="Keyword"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <select value={source} onChange={e => setSource(e.target.value)} className="border rounded px-2 py-1">
                    <option value="">All Sources</option>
                    {sources.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded px-2 py-1">
                    <option value="">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <button type="submit" className="bg-indigo-600 text-white px-4 py-1 rounded">Search</button>
                </form>
                {/* Results */}
                <div className="mt-6">
                  {loading && <div>Loading articles...</div>}
                  {error && <div className="text-red-600">{error}</div>}
                  {!loading && !error && articles.length === 0 && <div>No articles found.</div>}
                  {!loading && !error && articles.length > 0 && (
                    <div>
                      <ul className="divide-y divide-gray-200">
                        {articles.map(article => (
                          <li key={article.id} className="py-4">
                            <div className="font-bold text-lg">{article.title}</div>
                            <div className="text-sm text-gray-500 mb-1">
                              {article.source} | {article.category} | {new Date(article.published_at).toLocaleDateString()}
                            </div>
                            <div className="text-gray-700">{article.content.slice(0, 120)}...</div>
                          </li>
                        ))}
                      </ul>
                      {/* Pagination */}
                      <div className="flex gap-2 mt-4 justify-center items-center">
                        <button
                          onClick={() => setPage(p => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="px-3 py-1 border rounded disabled:opacity-50"
                        >Prev</button>
                        <span>Page {page} of {totalPages}</span>
                        <button
                          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className="px-3 py-1 border rounded disabled:opacity-50"
                        >Next</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard 