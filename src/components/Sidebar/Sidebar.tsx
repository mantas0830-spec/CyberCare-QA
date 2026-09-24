import { useState } from 'react'

type SidebarProps = {
  currentPage: string
  onNavigate: (page: string) => void
  collapsed: boolean
  onToggle: () => void
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: '▦' },
  { id: 'conversations', label: 'Conversations', icon: '◫' },
  { id: 'reports', label: 'Reports', icon: '◒' },
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
}: SidebarProps) {
  const [workspace, setWorkspace] = useState('NordVPN')
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <>
      <aside
        className={`sidebar ${
          collapsed ? 'sidebar-collapsed' : ''
        }`}
      >
        <div className="sidebar-brand">
          <div className="brand-mark">
            <span className="brand-mark-c">c</span>
          </div>

          <div className="brand-content">
            <div className="brand-platform-name">
              <span>CyberCare</span>
              <span className="brand-platform-qa">QA</span>
            </div>

            <button
              className="workspace-selector"
              onClick={() =>
                setWorkspaceOpen((current) => !current)
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
                      workspace === item ? 'selected' : ''
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
                currentPage === item.id ? 'active' : ''
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
            <div className="user-avatar">M</div>

            <div className="user-details">
              <div className="user-name">Mantas</div>

              <div className="user-role">
                Quality Coordinator
              </div>
            </div>

            <div className="user-menu-wrapper">
              <button
                className={`user-menu ${
                  userMenuOpen ? 'active' : ''
                }`}
                onClick={() =>
                  setUserMenuOpen((current) => !current)
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
      >
        {collapsed ? '›' : '‹'}
      </button>
    </>
  )
}