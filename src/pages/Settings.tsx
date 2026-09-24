type SettingsProps = {
  isAdmin: boolean
  onRoleChange: (isAdmin: boolean) => void
}

export function Settings({
  isAdmin,
  onRoleChange,
}: SettingsProps) {
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="section-eyebrow">CONFIGURATION</div>
          <h2>Settings</h2>
          <p>
            Manage your CyberCare QA workspace and account settings.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <div>
              <div className="settings-title">
                User role
              </div>

              <div className="settings-description">
                Switch between the Admin and normal QA reviewer
                experience while testing the platform.
              </div>
            </div>
          </div>

          <div className="role-switch">
            <button
              className={!isAdmin ? 'selected' : ''}
              onClick={() => onRoleChange(false)}
            >
              <span className="role-icon">👤</span>

              <span>
                <strong>Normal User</strong>
                <small>QA Reviewer</small>
              </span>
            </button>

            <button
              className={isAdmin ? 'selected' : ''}
              onClick={() => onRoleChange(true)}
            >
              <span className="role-icon">🛠</span>

              <span>
                <strong>Admin</strong>
                <small>QA Manager</small>
              </span>
            </button>
          </div>

          <div className="current-role">
            Current role:
            <strong>
              {isAdmin ? ' Administrator' : ' Normal User'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  )
}