import { useMemo, useState } from 'react'
import { conversations } from '../data/demoData'

type ConversationsProps = {
  onOpen: (conversationId: string) => void
  isAdmin: boolean
}

type SamplingFilter =
  | 'my-assigned'
  | 'unassigned'
  | 'all'

const samplingLabels: Record<
  SamplingFilter,
  string
> = {
  'my-assigned': 'My assigned',
  unassigned: 'Unassigned',
  all: 'All conversations',
}

export function Conversations({
  onOpen,
  isAdmin,
}: ConversationsProps) {
  const [sampling, setSampling] =
    useState<SamplingFilter>('my-assigned')

  const [samplingOpen, setSamplingOpen] =
    useState(false)

  const [search, setSearch] = useState('')

  const filteredConversations = useMemo(() => {
    let result = conversations

    if (sampling === 'my-assigned') {
      result = result.filter(
        (conversation) =>
          conversation.reviewer === 'Mantas',
      )
    }

    if (sampling === 'unassigned') {
      result = result.filter(
        (conversation) =>
          conversation.reviewer === null,
      )
    }

    if (search.trim()) {
      const query = search
        .trim()
        .toLowerCase()

      result = result.filter(
        (conversation) => {
          return (
            conversation.id
              .toLowerCase()
              .includes(query) ||
            conversation.customer
              .toLowerCase()
              .includes(query) ||
            conversation.displayName
              .toLowerCase()
              .includes(query) ||
            conversation.agent
              .toLowerCase()
              .includes(query) ||
            conversation.subject
              .toLowerCase()
              .includes(query)
          )
        },
      )
    }

    return result
  }, [sampling, search])

  const selectSampling = (
    value: SamplingFilter,
  ) => {
    setSampling(value)
    setSamplingOpen(false)
  }

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="section-eyebrow">
            QUALITY MANAGEMENT
          </div>

          <h2>Conversations</h2>

          <p>
            Review conversations assigned to you
            and complete QA evaluations.
          </p>
        </div>
      </div>

      <div className="filters">
        <div className="search-box">
          <span>⌕</span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search conversations..."
          />
        </div>

        <div className="filter-dropdown">
          <button
            className="filter-button"
            onClick={() =>
              setSamplingOpen(
                (current) => !current,
              )
            }
            aria-expanded={samplingOpen}
          >
            {samplingLabels[sampling]} ▾
          </button>

          {samplingOpen && (
            <div className="filter-dropdown-menu">
              <button
                className={
                  sampling === 'my-assigned'
                    ? 'selected'
                    : ''
                }
                onClick={() =>
                  selectSampling(
                    'my-assigned',
                  )
                }
              >
                My assigned
              </button>

              {isAdmin && (
                <>
                  <button
                    className={
                      sampling === 'unassigned'
                        ? 'selected'
                        : ''
                    }
                    onClick={() =>
                      selectSampling(
                        'unassigned',
                      )
                    }
                  >
                    Unassigned
                  </button>

                  <button
                    className={
                      sampling === 'all'
                        ? 'selected'
                        : ''
                    }
                    onClick={() =>
                      selectSampling('all')
                    }
                  >
                    All conversations
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {isAdmin && (
          <>
            <button className="filter-button">
              All agents ▾
            </button>

            <button className="filter-button">
              All channels ▾
            </button>

            <button className="filter-button">
              All statuses ▾
            </button>

            <button className="filter-button">
              Date ▾
            </button>
          </>
        )}
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Conversation</th>
              <th>Agent</th>
              <th>Channel</th>
              <th>Date</th>
              <th>Status</th>
              <th>QA Score</th>
            </tr>
          </thead>

          <tbody>
            {filteredConversations.map(
              (conversation) => (
                <tr
                  key={conversation.id}
                  onClick={() =>
                    onOpen(conversation.id)
                  }
                >
                  <td>
                    <div className="conversation-table-main">
                      <strong>
                        {conversation.channel ===
                        'Chat'
                          ? `Conversation with ${conversation.displayName}`
                          : conversation.subject}
                      </strong>

                      <span>
                        {conversation.id}
                      </span>
                    </div>
                  </td>

                  <td>
                    {conversation.agent}
                  </td>

                  <td>
                    <span className="channel-badge">
                      {conversation.channel}
                    </span>
                  </td>

                  <td>
                    {conversation.date}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        conversation.status ===
                        'Evaluated'
                          ? 'evaluated'
                          : 'pending'
                      }`}
                    >
                      {conversation.status}
                    </span>
                  </td>

                  <td>
                    <strong className="table-score">
                      {conversation.score !==
                      null
                        ? `${conversation.score}%`
                        : '—'}
                    </strong>
                  </td>
                </tr>
              ),
            )}

            {filteredConversations.length ===
              0 && (
              <tr>
                <td colSpan={6}>
                  <div className="empty-table">
                    No conversations found.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}