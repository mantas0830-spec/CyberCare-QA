import { useState } from 'react'
import type { AuthUser } from '../../types/auth'
import './Sidebar.css'

type SidebarProps = {
  currentPage: string
  onNavigate: (page: string) => void
  collapsed: boolean
  onToggle: () => void
  user: AuthUser
  onLogout: () => void
}

const navigation = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '▦',
  },
  {
    id: 'conversations',
    label: 'Conversations',
    icon: '◫',
  },
  {
    id: 'autoqa',
    label: 'AutoQA',
    icon: '✦',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: '◒',
  },
]

const workspaces = [
  'NordVPN',
  'Surfshark',
  'Saily',
  'NordPass/NordLocker B2C',
  'B2B',
  'Incogni',
]

export function Sidebar({
  currentPage,
  onNavigate,
  collapsed,
  onToggle,
  user,
  onLogout,
}: SidebarProps) {
  const [workspace, setWorkspace] =
    useState('NordVPN')

  const [workspaceOpen, setWorkspaceOpen] =
    useState(false)

  const [userMenuOpen, setUserMenuOpen] =
    useState(false)

  return (
    <>
      <aside
        className={`sidebar ${
          collapsed ? 'sidebar-collapsed' : ''
        }`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          height: '100vh',
          zIndex: 100,
          overflow: 'visible',
        }}
      >
        <div className="sidebar-brand">
          <div className="brand-mark">
            <span className="brand-mark-c">c</span>
          </div>

          <div className="brand-content">
            <div className="brand-platform-name">
              <span>CyberCare</span>
              <span className="brand-platform-qa">
                QA
              </span>
            </div>

            <button
              className="workspace-selector"
              onClick={() =>
                setWorkspaceOpen(
                  (current) => !current,
                )
              }
              aria-expanded={workspaceOpen}
              aria-label="Select workspace"
            >
              <span>{workspace}</span>

              <span className="workspace-chevron">
                {workspaceOpen ? '▴' : '▾'}
              </span>
            </button>

            {workspaceOpen && (
              <div className="workspace-dropdown">
                <div className="workspace-dropdown-label">
                  WORKSPACE
                </div>

                {workspaces.map((item) => (
                  <button
                    key={item}
                    className={`workspace-option ${
                      workspace === item
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() => {
                      setWorkspace(item)
                      setWorkspaceOpen(false)
                    }}
                  >
                    <span>{item}</span>

                    {workspace === item && (
                      <span className="workspace-check">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-navigation">
          <div className="navigation-label">
            WORKSPACE
          </div>

          {navigation.map((item) => (
            <button
              key={item.id}
              className={`navigation-item ${
                currentPage === item.id
                  ? 'active'
                  : ''
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="navigation-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="user-details">
              <div className="user-name">
                {user.name}
              </div>

              <div className="user-role">
                {user.role === 'admin'
                  ? 'QA Coordinator'
                  : 'QA Reviewer'}
              </div>
            </div>

            <div className="user-menu-wrapper">
              <button
                className={`user-menu ${
                  userMenuOpen ? 'active' : ''
                }`}
                onClick={() =>
                  setUserMenuOpen(
                    (current) => !current,
                  )
                }
                aria-expanded={userMenuOpen}
                aria-label="Open user menu"
              >
                •••
              </button>

              {userMenuOpen && (
                <div className="user-dropdown">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false)
                      onNavigate('settings')
                    }}
                  >
                    <span className="user-dropdown-icon">
                      ⚙
                    </span>

                    <span>Settings</span>
                  </button>

                  <div className="user-dropdown-divider" />

                  <button
                    className="logout-option"
                    onClick={() => {
                      setUserMenuOpen(false)
                      onLogout()
                    }}
                  >
                    <span className="user-dropdown-icon">
                      ↪
                    </span>

                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <button
        className={`sidebar-toggle ${
          collapsed ? 'collapsed' : ''
        }`}
        onClick={onToggle}
        aria-label={
          collapsed
            ? 'Show sidebar'
            : 'Hide sidebar'
        }
        title={
          collapsed
            ? 'Show sidebar'
            : 'Hide sidebar'
        }
        style={{
          position: 'fixed',
          zIndex: 150,
        }}
      >
        {collapsed ? '›' : '‹'}
      </button>
    </>
  )
}