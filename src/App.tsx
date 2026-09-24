import { useState } from 'react'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Topbar } from './components/Topbar/Topbar'
import { Conversations } from './pages/Conversations'
import { ConversationReview } from './pages/ConversationReview'
import { Dashboard } from './pages/Dashboard'
import { Settings } from './pages/Settings'
import './styles/global.css'
import './styles/variables.css'
import './styles/layout.css'

type Page =
  | 'dashboard'
  | 'conversations'
  | 'review'
  | 'reports'
  | 'settings'

function App() {
  const [page, setPage] =
    useState<Page>('dashboard')

  const [selectedConversationId, setSelectedConversationId] =
    useState<string | null>(null)

  const [isAdmin, setIsAdmin] = useState(true)

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false)

  const openReview = (conversationId: string) => {
    setSelectedConversationId(conversationId)
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

  return (
    <div className="app">
      <Sidebar
        currentPage={page}
        onNavigate={navigate}
        collapsed={sidebarCollapsed}
        onToggle={() =>
          setSidebarCollapsed((current) => !current)
        }
      />

      <main
        className={`main ${
          sidebarCollapsed ? 'main-sidebar-hidden' : ''
        }`}
      >
        {page !== 'review' && (
          <Topbar title={getTitle()} />
        )}

        {page === 'dashboard' && <Dashboard />}

        {page === 'conversations' && (
          <Conversations onOpen={openReview} />
        )}

        {page === 'review' && selectedConversationId && (
          <ConversationReview
            conversationId={selectedConversationId}
            onBack={backToConversations}
          />
        )}

        {page === 'reports' && (
          <div className="empty-page">
            <h2>Reports</h2>

            <p>
              Reporting and analytics will be built next.
            </p>
          </div>
        )}

        {page === 'settings' && (
          <Settings
            isAdmin={isAdmin}
            onRoleChange={setIsAdmin}
          />
        )}
      </main>
    </div>
  )
}

export default App