import { useMemo, useState } from 'react'
import { conversations } from '../data/demoData'
import './Conversations.css'

type ConversationsProps = {
  onOpen: (conversationId: string) => void
  isAdmin: boolean
}

type SamplingFilter =
  | 'my-assigned'
  | 'unassigned'
  | 'all'

type ResolutionFilter =
  | 'all'
  | 'resolved'
  | 'not-resolved'

type CsatFilter =
  | 'all'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'

const samplingLabels: Record<
  SamplingFilter,
  string
> = {
  'my-assigned': 'My assigned',
  unassigned: 'Unassigned',
  all: 'All conversations',
}

const resolutionLabels: Record<
  ResolutionFilter,
  string
> = {
  all: 'All resolution rates',
  resolved: 'Resolved',
  'not-resolved': 'Not Resolved',
}

const csatLabels: Record<CsatFilter, string> = {
  all: 'All CSAT',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
}

const agents = Array.from(
  new Set(
    conversations.map(
      (conversation) => conversation.agent,
    ),
  ),
).sort()

export function Conversations({
  onOpen,
  isAdmin,
}: ConversationsProps) {
  const [sampling, setSampling] =
    useState<SamplingFilter>('my-assigned')

  const [samplingOpen, setSamplingOpen] =
    useState(false)

  const [resolution, setResolution] =
    useState<ResolutionFilter>('all')

  const [resolutionOpen, setResolutionOpen] =
    useState(false)

  const [csat, setCsat] =
    useState<CsatFilter>('all')

  const [csatOpen, setCsatOpen] =
    useState(false)

  const [agent, setAgent] =
    useState('all')

  const [agentOpen, setAgentOpen] =
    useState(false)

  const [agentSearch, setAgentSearch] =
    useState('')

  const [channel, setChannel] =
    useState<'all' | 'Chat' | 'Email'>('all')

  const [channelOpen, setChannelOpen] =
    useState(false)

  const [search, setSearch] = useState('')

  const filteredAgents = useMemo(() => {
    const query = agentSearch
      .trim()
      .toLowerCase()

    if (!query) {
      return agents
    }

    return agents.filter((item) =>
      item.toLowerCase().includes(query),
    )
  }, [agentSearch])

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

    if (agent !== 'all') {
      result = result.filter(
        (conversation) =>
          conversation.agent === agent,
      )
    }

    if (channel !== 'all') {
      result = result.filter(
        (conversation) =>
          conversation.channel === channel,
      )
    }

    if (resolution === 'resolved') {
      result = result.filter(
        (conversation) =>
          conversation.resolution === 'Resolved',
      )
    }

    if (resolution === 'not-resolved') {
      result = result.filter(
        (conversation) =>
          conversation.resolution ===
          'Not Resolved',
      )
    }

    if (csat !== 'all') {
      result = result.filter(
        (conversation) =>
          conversation.csat === Number(csat),
      )
    }

    if (search.trim()) {
      const query = search
        .trim()
        .toLowerCase()

      result = result.filter(
        (conversation) =>
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
            .includes(query),
      )
    }

    return result
  }, [
    sampling,
    agent,
    channel,
    resolution,
    csat,
    search,
  ])

  const selectSampling = (
    value: SamplingFilter,
  ) => {
    setSampling(value)
    setSamplingOpen(false)
  }

  const selectResolution = (
    value: ResolutionFilter,
  ) => {
    setResolution(value)
    setResolutionOpen(false)
  }

  const selectCsat = (
    value: CsatFilter,
  ) => {
    setCsat(value)
    setCsatOpen(false)
  }

  const selectAgent = (value: string) => {
    setAgent(value)
    setAgentOpen(false)
    setAgentSearch('')
  }

  return (
    <div className="page-content conversations-page">
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
          <div className="filter-dropdown agent-filter">
            <button
              className="filter-button"
              onClick={() =>
                setAgentOpen(
                  (current) => !current,
                )
              }
              aria-expanded={agentOpen}
            >
              {agent === 'all'
                ? 'All agents'
                : agent}{' '}
              ▾
            </button>

            {agentOpen && (
              <div className="filter-dropdown-menu agent-menu">
                <div className="agent-search">
                  <input
                    value={agentSearch}
                    onChange={(event) =>
                      setAgentSearch(
                        event.target.value,
                      )
                    }
                    placeholder="Search agents..."
                    autoFocus
                  />
                </div>

                <button
                  className={
                    agent === 'all'
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    selectAgent('all')
                  }
                >
                  All agents
                </button>

                {filteredAgents.map(
                  (item) => (
                    <button
                      key={item}
                      className={
                        agent === item
                          ? 'selected'
                          : ''
                      }
                      onClick={() =>
                        selectAgent(item)
                      }
                    >
                      {item}
                    </button>
                  ),
                )}

                {filteredAgents.length ===
                  0 && (
                  <div className="filter-empty">
                    No agents found.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="filter-dropdown">
          <button
            className="filter-button"
            onClick={() =>
              setChannelOpen(
                (current) => !current,
              )
            }
            aria-expanded={channelOpen}
          >
            {channel === 'all'
              ? 'All channels'
              : channel}{' '}
            ▾
          </button>

          {channelOpen && (
            <div className="filter-dropdown-menu">
              <button
                className={
                  channel === 'all'
                    ? 'selected'
                    : ''
                }
                onClick={() => {
                  setChannel('all')
                  setChannelOpen(false)
                }}
              >
                All channels
              </button>

              <button
                className={
                  channel === 'Chat'
                    ? 'selected'
                    : ''
                }
                onClick={() => {
                  setChannel('Chat')
                  setChannelOpen(false)
                }}
              >
                Chat
              </button>

              <button
                className={
                  channel === 'Email'
                    ? 'selected'
                    : ''
                }
                onClick={() => {
                  setChannel('Email')
                  setChannelOpen(false)
                }}
              >
                Email
              </button>
            </div>
          )}
        </div>

        <div className="filter-dropdown">
          <button
            className="filter-button"
            onClick={() =>
              setResolutionOpen(
                (current) => !current,
              )
            }
            aria-expanded={resolutionOpen}
          >
            {resolutionLabels[resolution]} ▾
          </button>

          {resolutionOpen && (
            <div className="filter-dropdown-menu">
              {(
                Object.keys(
                  resolutionLabels,
                ) as ResolutionFilter[]
              ).map((value) => (
                <button
                  key={value}
                  className={
                    resolution === value
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    selectResolution(value)
                  }
                >
                  {resolutionLabels[value]}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="filter-dropdown">
          <button
            className="filter-button"
            onClick={() =>
              setCsatOpen(
                (current) => !current,
              )
            }
            aria-expanded={csatOpen}
          >
            {csatLabels[csat]} ▾
          </button>

          {csatOpen && (
            <div className="filter-dropdown-menu">
              {(
                Object.keys(
                  csatLabels,
                ) as CsatFilter[]
              ).map((value) => (
                <button
                  key={value}
                  className={
                    csat === value
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    selectCsat(value)
                  }
                >
                  {csatLabels[value]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="conversation-results-meta">
        <span>
          {filteredConversations.length}{' '}
          conversation
          {filteredConversations.length !==
          1
            ? 's'
            : ''}{' '}
          found
        </span>

        <span>
          {filteredConversations.filter(
            (conversation) =>
              conversation.status ===
                'Not Evaluated',
          ).length}{' '}
          pending
        </span>
      </div>

      <div className="table-card conversations-table-card">
        <table>
          <thead>
            <tr>
              <th>Conversation</th>
              <th>Agent</th>
              <th>Channel</th>
              <th>Date</th>
              <th>Status</th>
              <th>Resolution</th>
              <th>CSAT</th>
              <th>QA Score</th>
            </tr>
          </thead>

          <tbody>
            {filteredConversations.map(
              (conversation) => {
                const csatRating =
                  conversation.csat

                return (
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
                      <span
                        className={`resolution-badge ${
                          conversation.resolution ===
                          'Resolved'
                            ? 'resolved'
                            : 'not-resolved'
                        }`}
                      >
                        {conversation.resolution}
                      </span>
                    </td>

                    <td>
                      {csatRating !== null ? (
                        <>
                          <span className="csat-value">
                            {'★'.repeat(
                              csatRating,
                            )}

                            <span className="csat-empty">
                              {'★'.repeat(
                                5 -
                                  csatRating,
                              )}
                            </span>
                          </span>

                          <span className="csat-number">
                            {csatRating}/5
                          </span>
                        </>
                      ) : (
                        <span className="csat-number csat-not-rated">
                          —
                        </span>
                      )}
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
                )
              },
            )}

            {filteredConversations.length ===
              0 && (
              <tr>
                <td colSpan={8}>
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