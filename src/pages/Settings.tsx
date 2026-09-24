type SettingsProps = {
  isAdmin: boolean
}

export function Settings({
  isAdmin,
}: SettingsProps) {
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="section-eyebrow">
            CONFIGURATION
          </div>

          <h2>Settings</h2>

          <p>
            Manage your CyberCare QA workspace and
            account settings.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <div>
              <div className="settings-title">
                Account
              </div>

              <div className="settings-description">
                Your current role in the CyberCare QA
                demo workspace.
              </div>
            </div>
          </div>

          <div className="current-role">
            Current role:
            <strong>
              {isAdmin
                ? ' QA Coordinator'
                : ' QA Reviewer'}
            </strong>
          </div>
        </div>

        {isAdmin && (
          <div className="settings-card">
            <div className="settings-card-header">
              <div>
                <div className="settings-title">
                  Manager settings
                </div>

                <div className="settings-description">
                  Manager configuration options will
                  be available here as the QA platform
                  grows.
                </div>
              </div>
            </div>

            <div className="settings-placeholder">
              Sampling rules, scorecards, users and
              workspace configuration will be added
              here.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}