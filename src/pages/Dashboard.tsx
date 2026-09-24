import { conversations } from '../data/demoData'

export function Dashboard() {
  const evaluated = conversations.filter(
    (conversation) => conversation.status === 'Evaluated',
  )

  const scoredConversations = evaluated.filter(
    (conversation) => conversation.score !== null,
  )

  const average =
    scoredConversations.length > 0
      ? scoredConversations.reduce(
          (sum, conversation) => sum + (conversation.score ?? 0),
          0,
        ) / scoredConversations.length
      : 0

  const pendingCount = conversations.filter(
    (conversation) => conversation.status === 'Pending',
  ).length

  return (
    <div className="page-content">
      <div className="welcome">
        <div>
          <div className="section-eyebrow">OVERVIEW</div>
          <h2>Good evening, QA Manager</h2>
          <p>Here's what's happening with your QA activity.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Average QA Score</div>
          <div className="stat-value">{average.toFixed(0)}%</div>
          <div className="stat-change positive">
            ↑ 4.2% this month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Evaluations</div>
          <div className="stat-value">
            {scoredConversations.length}
          </div>
          <div className="stat-change positive">
            Evaluated conversations
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Pending Reviews</div>
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-change">
            Requires attention
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Critical Errors</div>
          <div className="stat-value">3</div>
          <div className="stat-change negative">
            ↓ 2 this month
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <div className="section-eyebrow">
                RECENT ACTIVITY
              </div>
              <h3>Recent evaluations</h3>
            </div>

            <button className="text-button">
              View all →
            </button>
          </div>

          <div className="evaluation-list">
            {scoredConversations.slice(0, 4).map(
              (conversation) => {
                const score = conversation.score ?? 0

                return (
                  <div
                    className="evaluation-row"
                    key={conversation.id}
                  >
                    <div className="evaluation-avatar">
                      {conversation.agent.charAt(0)}
                    </div>

                    <div className="evaluation-main">
                      <strong>{conversation.agent}</strong>
                      <span>{conversation.subject}</span>
                    </div>

                    <div
                      className={`evaluation-score ${
                        score < 80
                          ? 'low'
                          : score < 90
                            ? 'medium'
                            : 'high'
                      }`}
                    >
                      {score}%
                    </div>
                  </div>
                )
              },
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <div className="section-eyebrow">
                PERFORMANCE
              </div>
              <h3>Score distribution</h3>
            </div>
          </div>

          <div className="distribution">
            <div className="distribution-row">
              <span>90–100</span>
              <div className="distribution-bar">
                <div style={{ width: '72%' }} />
              </div>
              <strong>72%</strong>
            </div>

            <div className="distribution-row">
              <span>80–89</span>
              <div className="distribution-bar">
                <div style={{ width: '48%' }} />
              </div>
              <strong>48%</strong>
            </div>

            <div className="distribution-row">
              <span>70–79</span>
              <div className="distribution-bar">
                <div style={{ width: '24%' }} />
              </div>
              <strong>24%</strong>
            </div>

            <div className="distribution-row">
              <span>&lt;70</span>
              <div className="distribution-bar">
                <div style={{ width: '8%' }} />
              </div>
              <strong>8%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}