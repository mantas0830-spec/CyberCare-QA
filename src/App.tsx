import { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Topbar } from './components/Topbar/Topbar'
import { Conversations } from './pages/Conversations'
import { ConversationReview } from './pages/ConversationReview'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Settings } from './pages/Settings'
import type { AuthUser } from './types/auth'
import './styles/global.css'
import './styles/variables.css'
import './styles/layout.css'

type Page =
  | 'dashboard'
  | 'conversations'
  | 'review'
  | 'reports'
  | 'settings'

const AUTH_STORAGE_KEY = 'cybercare-qa-demo-user'

function App() {
  const [user, setUser] = useState<AuthUser | null>(
    null,
  )

  const [authLoading, setAuthLoading] = useState(true)

  const [page, setPage] =
    useState<Page>('dashboard')

  const [
    selectedConversationId,
    setSelectedConversationId,
  ] = useState<string | null>(null)

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem(
      AUTH_STORAGE_KEY,
    )

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(
          storedUser,
        ) as AuthUser

        if (
          parsedUser &&
          parsedUser.email &&
          parsedUser.name &&
          parsedUser.role
        ) {
          setUser(parsedUser)
        }
      } catch {
        localStorage.removeItem(
          AUTH_STORAGE_KEY,
        )
      }
    }

    setAuthLoading(false)
  }, [])

  const handleLogin = (
    authenticatedUser: AuthUser,
  ) => {
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(authenticatedUser),
    )

    setUser(authenticatedUser)
    setPage('dashboard')
    setSelectedConversationId(null)
  }

  const handleLogout = () => {
    localStorage.removeItem(
      AUTH_STORAGE_KEY,
    )

    setUser(null)
    setPage('dashboard')
    setSelectedConversationId(null)
    setSidebarCollapsed(false)
  }

  const openReview = (
    conversationId: string,
  ) => {
    setSelectedConversationId(
      conversationId,
    )
    setPage('review')
  }

  const backToConversations = () => {
    setSelectedConversationId(null)
    setPage('conversations')
  }

  const navigate = (nextPage: string) => {
    if (
      nextPage === 'dashboard' ||
      nextPage === 'conversations' ||
      nextPage === 'reports' ||
      nextPage === 'settings'
    ) {
      setSelectedConversationId(null)
      setPage(nextPage)
    }
  }

  const getTitle = () => {
    switch (page) {
      case 'dashboard':
        return 'Dashboard'

      case 'conversations':
        return 'Conversations'

      case 'reports':
        return 'Reports'

      case 'settings':
        return 'Settings'

      case 'review':
        return 'Conversation Review'
    }
  }

  if (authLoading) {
    return null
  }

  if (!user) {
    return (
      <Login onLogin={handleLogin} />
    )
  }

  const isAdmin = user.role === 'admin'

  return (
    <div className="app">
      <Sidebar
        currentPage={page}
        onNavigate={navigate}
        collapsed={sidebarCollapsed}
        onToggle={() =>
          setSidebarCollapsed(
            (current) => !current,
          )
        }
        user={user}
        onLogout={handleLogout}
      />

      <main
        className={`main ${
          sidebarCollapsed
            ? 'main-sidebar-hidden'
            : ''
        }`}
      >
        {page !== 'review' && (
          <Topbar title={getTitle()} />
        )}

        {page === 'dashboard' && (
          <Dashboard />
        )}

        {page === 'conversations' && (
          <Conversations
            onOpen={openReview}
            isAdmin={isAdmin}
          />
        )}

        {page === 'review' &&
          selectedConversationId && (
            <ConversationReview
              conversationId={
                selectedConversationId
              }
              onBack={
                backToConversations
              }
            />
          )}

        {page === 'reports' && (
          <div className="empty-page">
            <h2>Reports</h2>

            <p>
              Reporting and analytics will
              be built next.
            </p>
          </div>
        )}

        {page === 'settings' && (
          <Settings
            isAdmin={isAdmin}
          />
        )}
      </main>
    </div>
  )
}

export default App