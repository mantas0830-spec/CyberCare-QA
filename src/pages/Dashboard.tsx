import { useMemo, useState } from 'react'
import { conversations } from '../data/demoData'
import './Dashboard.css'

type DashboardProps = {
  onOpenConversation: (conversationId: string) => void
}

type DateFilter =
  | 'all'
  | 'today'
  | 'yesterday'
  | 'last-7-days'
  | 'last-30-days'
  | 'this-week'
  | 'last-week'
  | 'this-month'
  | 'last-month'
  | 'custom'

type ChannelFilter = 'all' | 'Chat' | 'Email'
type ScoreFilter = 'all' | '90-100' | '80-89' | '70-79' | 'below-70'

const AGENT_GROUPS: Record<string, string> = {
  'Daniel Wilson': 'Team Lead 1',
  'James Miller': 'Team Lead 1',
  'Sophie Brown': 'Team Lead 2',
}

const DEMO_TODAY = new Date(2026, 8, 25)

const CATEGORY_NAMES = [
  'Conversation Personalized',
  'Wait Time',
  'Grammar',
  'Effective Solution Provided',
  'Inquiry Understood',
  'Internal Procedures Followed',
  'Agent Response',
  'Cause of bad rating',
  'Reason of bad rating',
] as const

type CategoryName = (typeof CATEGORY_NAMES)[number]

function getConversationGroup(agent: string) {
  return AGENT_GROUPS[agent] ?? 'Unassigned'
}

function parseConversationDate(date: string) {
  const [month, day, year] = date.split('/').map(Number)

  if (!month || !day || !year) {
    const parsed = new Date(date)
    parsed.setHours(0, 0, 0, 0)
    return parsed
  }

  return new Date(year, month - 1, day)
}

function formatDateInput(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function startOfWeek(date: Date) {
  const result = new Date(date)
  const day = result.getDay()
  const diff = day === 0 ? -6 : 1 - day

  result.setDate(result.getDate() + diff)
  result.setHours(0, 0, 0, 0)

  return result
}

function endOfWeek(date: Date) {
  const result = startOfWeek(date)
  result.setDate(result.getDate() + 6)
  result.setHours(23, 59, 59, 999)

  return result
}

function getDateRange(
  filter: DateFilter,
  customFrom: string,
  customTo: string,
) {
  const today = new Date(DEMO_TODAY)
  today.setHours(0, 0, 0, 0)

  if (filter === 'all') {
    return { from: null, to: null }
  }

  if (filter === 'today') {
    const to = new Date(today)
    to.setHours(23, 59, 59, 999)

    return { from: today, to }
  }

  if (filter === 'yesterday') {
    const from = new Date(today)
    from.setDate(from.getDate() - 1)

    const to = new Date(from)
    to.setHours(23, 59, 59, 999)

    return { from, to }
  }

  if (filter === 'last-7-days') {
    const from = new Date(today)
    from.setDate(from.getDate() - 6)

    const to = new Date(today)
    to.setHours(23, 59, 59, 999)

    return { from, to }
  }

  if (filter === 'last-30-days') {
    const from = new Date(today)
    from.setDate(from.getDate() - 29)

    const to = new Date(today)
    to.setHours(23, 59, 59, 999)

    return { from, to }
  }

  if (filter === 'this-week') {
    return {
      from: startOfWeek(today),
      to: endOfWeek(today),
    }
  }

  if (filter === 'last-week') {
    const from = startOfWeek(today)
    from.setDate(from.getDate() - 7)

    const to = endOfWeek(from)

    return { from, to }
  }

  if (filter === 'this-month') {
    const from = new Date(today.getFullYear(), today.getMonth(), 1)

    const to = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    )

    to.setHours(23, 59, 59, 999)

    return { from, to }
  }

  if (filter === 'last-month') {
    const from = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1,
    )

    const to = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    )

    to.setHours(23, 59, 59, 999)

    return { from, to }
  }

  if (filter === 'custom') {
    const from = customFrom
      ? new Date(`${customFrom}T00:00:00`)
      : null

    const to = customTo
      ? new Date(`${customTo}T23:59:59`)
      : null

    return { from, to }
  }

  return { from: null, to: null }
}

function getConversationTags(
  conversation: (typeof conversations)[number],
) {
  const tags: string[] = []

  if (conversation.channel) {
    tags.push(conversation.channel)
  }

  if (conversation.status === 'Evaluated') {
    tags.push('Evaluated')
  }

  if (conversation.resolution === 'Resolved') {
    tags.push('Resolved')
  } else {
    tags.push('Unresolved')
  }

  if (conversation.score !== null) {
    if (conversation.score >= 90) {
      tags.push('High score')
    } else if (conversation.score >= 80) {
      tags.push('Good score')
    } else {
      tags.push('Needs attention')
    }
  }

  if (conversation.reviewer === 'AutoQA') {
    tags.push('AutoQA')
  }

  return tags
}

function getDateLabel(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function Dashboard({
  onOpenConversation,
}: DashboardProps) {
  const [dateFilter, setDateFilter] =
    useState<DateFilter>('last-30-days')

  const [channelFilter, setChannelFilter] =
    useState<ChannelFilter>('all')

  const [reviewerFilter, setReviewerFilter] = useState('all')
  const [groupFilter, setGroupFilter] = useState('all')
  const [agentFilter, setAgentFilter] = useState('all')

  const [scoreFilter, setScoreFilter] =
    useState<ScoreFilter>('all')

  const [tagFilter, setTagFilter] = useState('all')

  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')

  const dateRange = useMemo(
    () => getDateRange(dateFilter, customFrom, customTo),
    [dateFilter, customFrom, customTo],
  )

  const reviewers = useMemo(() => {
    return Array.from(
      new Set(
        conversations
          .map((conversation) => conversation.reviewer)
          .filter(
            (reviewer): reviewer is string =>
              Boolean(reviewer),
          ),
      ),
    ).sort()
  }, [])

  const agents = useMemo(() => {
    return Array.from(
      new Set(
        conversations.map((conversation) => conversation.agent),
      ),
    ).sort()
  }, [])

  const groups = useMemo(() => {
    return Array.from(
      new Set(
        conversations.map((conversation) =>
          getConversationGroup(conversation.agent),
        ),
      ),
    ).sort()
  }, [])

  const tags = useMemo(() => {
    return Array.from(
      new Set(
        conversations.flatMap((conversation) =>
          getConversationTags(conversation),
        ),
      ),
    ).sort()
  }, [])

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const conversationDate = parseConversationDate(
        conversation.date,
      )

      if (
        dateRange.from &&
        conversationDate < dateRange.from
      ) {
        return false
      }

      if (dateRange.to && conversationDate > dateRange.to) {
        return false
      }

      if (
        channelFilter !== 'all' &&
        conversation.channel !== channelFilter
      ) {
        return false
      }

      if (
        reviewerFilter !== 'all' &&
        conversation.reviewer !== reviewerFilter
      ) {
        return false
      }

      if (
        groupFilter !== 'all' &&
        getConversationGroup(conversation.agent) !== groupFilter
      ) {
        return false
      }

      if (
        agentFilter !== 'all' &&
        conversation.agent !== agentFilter
      ) {
        return false
      }

      if (scoreFilter !== 'all') {
        if (conversation.score === null) {
          return false
        }

        if (
          scoreFilter === '90-100' &&
          (conversation.score < 90 || conversation.score > 100)
        ) {
          return false
        }

        if (
          scoreFilter === '80-89' &&
          (conversation.score < 80 || conversation.score > 89)
        ) {
          return false
        }

        if (
          scoreFilter === '70-79' &&
          (conversation.score < 70 || conversation.score > 79)
        ) {
          return false
        }

        if (
          scoreFilter === 'below-70' &&
          conversation.score >= 70
        ) {
          return false
        }
      }

      if (
        tagFilter !== 'all' &&
        !getConversationTags(conversation).includes(tagFilter)
      ) {
        return false
      }

      return true
    })
  }, [
    dateRange,
    channelFilter,
    reviewerFilter,
    groupFilter,
    agentFilter,
    scoreFilter,
    tagFilter,
  ])

  const scoredConversations = useMemo(() => {
    return filteredConversations.filter(
      (conversation) =>
        conversation.status === 'Evaluated' &&
        conversation.score !== null,
    )
  }, [filteredConversations])

  const averageScore = useMemo(() => {
  if (!scoredConversations.length) {
    return 0
  }

  return Number(
    (
      scoredConversations.reduce(
        (sum, conversation) =>
          sum + (conversation.score ?? 0),
        0,
      ) / scoredConversations.length
    ).toFixed(2),
  )
}, [scoredConversations])

  const passRate = useMemo(() => {
    if (!scoredConversations.length) {
      return 0
    }

    const passing = scoredConversations.filter(
      (conversation) => (conversation.score ?? 0) >= 80,
    ).length

    return Math.round(
      (passing / scoredConversations.length) * 100,
    )
  }, [scoredConversations])

  /*
   * Keep this KPI as Critical mistakes.
   * It is intentionally based on conversations below 80.
   */
  const criticalMistakes = useMemo(() => {
    return scoredConversations.filter(
      (conversation) => (conversation.score ?? 0) < 80,
    ).length
  }, [scoredConversations])

  const performanceData = useMemo(() => {
    const grouped = new Map<
      string,
      {
        date: Date
        completed: number
        totalScore: number
      }
    >()

    scoredConversations.forEach((conversation) => {
      const date = parseConversationDate(conversation.date)
      const key = formatDateInput(date)
      const existing = grouped.get(key)

      if (existing) {
        existing.completed += 1
        existing.totalScore += conversation.score ?? 0
      } else {
        grouped.set(key, {
          date,
          completed: 1,
          totalScore: conversation.score ?? 0,
        })
      }
    })

    return Array.from(grouped.values())
      .sort(
        (a, b) =>
          a.date.getTime() - b.date.getTime(),
      )
      .map((item) => ({
        label: getDateLabel(item.date),
        completed: item.completed,
        average:
          item.completed > 0
            ? Math.round(
                item.totalScore / item.completed,
              )
            : 0,
      }))
  }, [scoredConversations])

  const scoreDistribution = useMemo(() => {
    const buckets = [
      { label: '91–100', min: 91, max: 100 },
      { label: '81–90', min: 81, max: 90 },
      { label: '71–80', min: 71, max: 80 },
      { label: '51–70', min: 51, max: 70 },
      { label: '31–50', min: 31, max: 50 },
      { label: '1–30', min: 1, max: 30 },
      { label: '0', min: 0, max: 0 },
    ]

    return buckets.map((bucket) => ({
      label: bucket.label,
      count: scoredConversations.filter(
        (conversation) => {
          const score = conversation.score ?? 0

          return (
            score >= bucket.min &&
            score <= bucket.max
          )
        },
      ).length,
    }))
  }, [scoredConversations])

  const categoryPerformance = useMemo(() => {
    return CATEGORY_NAMES.map((category) => {
      const values = scoredConversations
        .map(
          (conversation) =>
            conversation.categoryScores?.[
              category as keyof NonNullable<
                (typeof conversation)['categoryScores']
              >
            ],
        )
        .filter(
          (value): value is number =>
            typeof value === 'number',
        )

      const average = values.length
        ? Math.round(
            values.reduce(
              (sum, value) => sum + value,
              0,
            ) / values.length,
          )
        : 0

      return {
        category: category as CategoryName,
        average,
        count: values.length,
      }
    })
  }, [scoredConversations])

  const recentEvaluations = useMemo(() => {
    return [...scoredConversations].sort(
      (a, b) =>
        parseConversationDate(b.date).getTime() -
        parseConversationDate(a.date).getTime(),
    )
  }, [scoredConversations])

  const activeFilterCount = [
    dateFilter !== 'all',
    channelFilter !== 'all',
    reviewerFilter !== 'all',
    groupFilter !== 'all',
    agentFilter !== 'all',
    scoreFilter !== 'all',
    tagFilter !== 'all',
  ].filter(Boolean).length

  const clearFilters = () => {
    setDateFilter('last-30-days')
    setChannelFilter('all')
    setReviewerFilter('all')
    setGroupFilter('all')
    setAgentFilter('all')
    setScoreFilter('all')
    setTagFilter('all')
    setCustomFrom('')
    setCustomTo('')
  }

  const maxDistribution = Math.max(
    ...scoreDistribution.map(
      (item) => item.count,
    ),
    1,
  )

  /*
   * The line represents evaluation volume.
   * IQS is represented by the columns.
   */
  const maxEvaluations = Math.max(
    ...performanceData.map(
      (item) => item.completed,
    ),
    1,
  )

  const categoryAverage =
    categoryPerformance.length > 0
      ? Math.round(
          categoryPerformance.reduce(
            (sum, item) => sum + item.average,
            0,
          ) / categoryPerformance.length,
        )
      : 0

  const formatScore = (score: number | null) => {
    return score === null ? '—' : score.toString()
  }

  const performanceLinePoints = useMemo(() => {
    if (!performanceData.length) {
      return ''
    }

    const width = 1000
    const height = 220
    const horizontalPadding = 14

    return performanceData
      .map((item, index) => {
        const progress =
          performanceData.length === 1
            ? 0.5
            : index / (performanceData.length - 1)

        const x =
          horizontalPadding +
          progress *
            (width - horizontalPadding * 2)

        const y =
          height -
          (item.completed / maxEvaluations) *
            height

        return `${x},${y}`
      })
      .join(' ')
  }, [performanceData, maxEvaluations])

  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">
            QUALITY OVERVIEW
          </p>

          <h1>Dashboard</h1>

          <p className="dashboard-subtitle">
            Monitor evaluation performance and
            conversation quality.
          </p>
        </div>
      </div>

      <section className="dashboard-filters">
        <div className="dashboard-filter">
          <label htmlFor="date-filter">
            Date
          </label>

          <select
            id="date-filter"
            value={dateFilter}
            onChange={(event) =>
              setDateFilter(
                event.target.value as DateFilter,
              )
            }
          >
            <option value="all">All time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last-7-days">
              Last 7 days
            </option>
            <option value="last-30-days">
              Last 30 days
            </option>
            <option value="this-week">
              This week
            </option>
            <option value="last-week">
              Last week
            </option>
            <option value="this-month">
              This month
            </option>
            <option value="last-month">
              Last month
            </option>
            <option value="custom">
              Custom range
            </option>
          </select>
        </div>

        {dateFilter === 'custom' && (
          <>
            <div className="dashboard-filter">
              <label htmlFor="custom-from">
                From
              </label>

              <input
                id="custom-from"
                type="date"
                value={customFrom}
                onChange={(event) =>
                  setCustomFrom(
                    event.target.value,
                  )
                }
              />
            </div>

            <div className="dashboard-filter">
              <label htmlFor="custom-to">
                To
              </label>

              <input
                id="custom-to"
                type="date"
                value={customTo}
                onChange={(event) =>
                  setCustomTo(
                    event.target.value,
                  )
                }
              />
            </div>
          </>
        )}

        <div className="dashboard-filter">
          <label htmlFor="channel-filter">
            Channel
          </label>

          <select
            id="channel-filter"
            value={channelFilter}
            onChange={(event) =>
              setChannelFilter(
                event.target.value as ChannelFilter,
              )
            }
          >
            <option value="all">
              All channels
            </option>

            <option value="Chat">Chat</option>
            <option value="Email">Email</option>
          </select>
        </div>

        <div className="dashboard-filter">
          <label htmlFor="reviewer-filter">
            Reviewer
          </label>

          <select
            id="reviewer-filter"
            value={reviewerFilter}
            onChange={(event) =>
              setReviewerFilter(
                event.target.value,
              )
            }
          >
            <option value="all">
              All reviewers
            </option>

            {reviewers.map((reviewer) => (
              <option
                key={reviewer}
                value={reviewer}
              >
                {reviewer}
              </option>
            ))}
          </select>
        </div>

        <div className="dashboard-filter">
          <label htmlFor="group-filter">
            Team
          </label>

          <select
            id="group-filter"
            value={groupFilter}
            onChange={(event) =>
              setGroupFilter(
                event.target.value,
              )
            }
          >
            <option value="all">
              All teams
            </option>

            {groups.map((group) => (
              <option
                key={group}
                value={group}
              >
                {group}
              </option>
            ))}
          </select>
        </div>

        <div className="dashboard-filter">
          <label htmlFor="agent-filter">
            Agent
          </label>

          <select
            id="agent-filter"
            value={agentFilter}
            onChange={(event) =>
              setAgentFilter(
                event.target.value,
              )
            }
          >
            <option value="all">
              All agents
            </option>

            {agents.map((agent) => (
              <option
                key={agent}
                value={agent}
              >
                {agent}
              </option>
            ))}
          </select>
        </div>

        <div className="dashboard-filter">
          <label htmlFor="score-filter">
            Score
          </label>

          <select
            id="score-filter"
            value={scoreFilter}
            onChange={(event) =>
              setScoreFilter(
                event.target.value as ScoreFilter,
              )
            }
          >
            <option value="all">
              All scores
            </option>

            <option value="90-100">
              90–100
            </option>

            <option value="80-89">
              80–89
            </option>

            <option value="70-79">
              70–79
            </option>

            <option value="below-70">
              Below 70
            </option>
          </select>
        </div>

        <div className="dashboard-filter">
          <label htmlFor="tag-filter">
            Tag
          </label>

          <select
            id="tag-filter"
            value={tagFilter}
            onChange={(event) =>
              setTagFilter(
                event.target.value,
              )
            }
          >
            <option value="all">
              All tags
            </option>

            {tags.map((tag) => (
              <option
                key={tag}
                value={tag}
              >
                {tag}
              </option>
            ))}
          </select>
        </div>

        <button
          className="dashboard-clear-filters"
          type="button"
          onClick={clearFilters}
        >
          Clear

          {activeFilterCount > 0 && (
            <span>{activeFilterCount}</span>
          )}
        </button>
      </section>

      <section className="dashboard-kpis">
        <article className="dashboard-kpi-card">
          <div className="kpi-top">
            <span>Average score</span>
            <span className="kpi-icon">↗</span>
          </div>

          <strong>{averageScore}</strong>
        </article>

        <article className="dashboard-kpi-card">
          <div className="kpi-top">
            <span>Pass rate</span>
            <span className="kpi-icon">✓</span>
          </div>

          <strong>{passRate}%</strong>

          <small>Score of 80 or above</small>
        </article>

        <article className="dashboard-kpi-card">
          <div className="kpi-top">
            <span>Evaluations</span>
            <span className="kpi-icon">▤</span>
          </div>

          <strong>
            {scoredConversations.length}
          </strong>

          <small>
            of {filteredConversations.length}{' '}
            conversations
          </small>
        </article>

        <article className="dashboard-kpi-card">
          <div className="kpi-top">
            <span>Critical mistakes</span>
            <span className="kpi-icon">!</span>
          </div>

          <strong>{criticalMistakes}</strong>
        </article>
      </section>

      <section className="dashboard-card performance-card">
        <div className="dashboard-card-header">
          <div>
            <p className="card-kicker">
              TREND
            </p>

            <h2>
              Performance over time
            </h2>

            <p>
              IQS quality score and evaluation
              volume.
            </p>
          </div>

          <div className="chart-legend">
            <span>
              <i className="legend-column" />
              Average IQS
            </span>

            <span>
              <i className="legend-line" />
              Evaluations
            </span>
          </div>
        </div>

        <div className="performance-chart">
          {performanceData.length === 0 ? (
            <div className="chart-empty">
              No evaluated conversations in this
              period.
            </div>
          ) : (
            <>
              <div className="performance-y-axis">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>

              <div className="performance-plot">
                <div className="performance-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="performance-columns">
                  {performanceData.map((item) => (
                    <div
                      className="performance-column"
                      key={item.label}
                    >
                      <div className="performance-column-value">
                        {item.average}
                      </div>

                      <div
                        className="performance-score-bar"
                        style={{
                          height: `${Math.max(
                            8,
                            item.average,
                          )}%`,
                        }}
                      >
                        <span />
                      </div>

                      <span className="performance-label">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <svg
                  className="performance-line"
                  viewBox="0 0 1000 220"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="performanceLineGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop
                        offset="0%"
                        stopColor="#a5b9a7"
                      />

                      <stop
                        offset="100%"
                        stopColor="#5f8063"
                      />
                    </linearGradient>
                  </defs>

                  <polyline
                    points={performanceLinePoints}
                    fill="none"
                    stroke="url(#performanceLineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {performanceData.map(
                    (item, index) => {
                      const width = 1000
                      const height = 220
                      const horizontalPadding = 14

                      const progress =
                        performanceData.length ===
                        1
                          ? 0.5
                          : index /
                            (performanceData.length -
                              1)

                      const x =
                        horizontalPadding +
                        progress *
                          (width -
                            horizontalPadding *
                              2)

                      const y =
                        height -
                        (item.completed /
                          maxEvaluations) *
                          height

                      return (
                        <circle
                          key={`${item.label}-point`}
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#ffffff"
                          stroke="#5f8063"
                          strokeWidth="2.25"
                        />
                      )
                    },
                  )}
                </svg>

                <div className="performance-hover-grid">
                  {performanceData.map(
                    (item) => (
                      <div
                        className="performance-hover-column"
                        key={`hover-${item.label}`}
                      >
                        <div className="performance-tooltip">
                          <strong>
                            {item.average}
                          </strong>

                          <span>
                            IQS average
                          </span>

                          <small>
                            {item.completed}{' '}
                            {item.completed === 1
                              ? 'evaluation'
                              : 'evaluations'}
                          </small>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <div className="dashboard-chart-grid">
        <section className="dashboard-card distribution-card">
          <div className="dashboard-card-header">
            <div>
              <p className="card-kicker">
                QUALITY MIX
              </p>

              <h2>
                Score distribution
              </h2>

              <p>
                Evaluated conversations by score
                range.
              </p>
            </div>

            <div className="chart-summary">
              <strong>
                {scoredConversations.length}
              </strong>

              <span>evaluated</span>
            </div>
          </div>

          <div className="distribution-chart">
            {scoreDistribution.map(
              (item) => {
                const width =
                  maxDistribution > 0
                    ? (item.count /
                        maxDistribution) *
                      100
                    : 0

                return (
                  <div
                    className="distribution-row"
                    key={item.label}
                  >
                    <div className="distribution-label">
                      <span>
                        {item.label}
                      </span>
                    </div>

                    <div className="distribution-track">
                      <div
                        className="distribution-fill"
                        style={{
                          width: `${width}%`,
                        }}
                      />
                    </div>

                    <strong>
                      {item.count}
                    </strong>
                  </div>
                )
              },
            )}
          </div>
        </section>

        <section className="dashboard-card distribution-insight-card">
          <div className="dashboard-card-header">
            <div>
              <p className="card-kicker">
                OVERVIEW
              </p>

              <h2>
                Quality snapshot
              </h2>

              <p>
                Quick view of the current
                evaluation set.
              </p>
            </div>
          </div>

          <div className="quality-snapshot">
            <div className="snapshot-ring">
              <div>
                <strong>
                  {averageScore}
                </strong>

                <span>avg.</span>
              </div>
            </div>

            <div className="snapshot-details">
              <div>
                <span>Passing</span>

                <strong>
                  {passRate}%
                </strong>
              </div>

              <div>
                <span>Evaluated</span>

                <strong>
                  {scoredConversations.length}
                </strong>
              </div>

              <div>
                <span>Below 80</span>

                <strong>
                  {criticalMistakes}
                </strong>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="dashboard-card category-performance-card">
        <div className="dashboard-card-header">
          <div>
            <p className="card-kicker">
              QA BREAKDOWN
            </p>

            <h2>
              Category performance
            </h2>

            <p>
              Average score across individual
              quality categories.
            </p>
          </div>

          <div className="category-header-stat">
            <strong>
              {categoryAverage}
            </strong>

            <span>
              overall category avg.
            </span>
          </div>
        </div>

        <div className="category-performance">
          <div className="category-scale">
            <span />

            <div>
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>

            <span />
          </div>

          {categoryPerformance.map(
            (item) => (
              <div
                className="category-performance-row"
                key={item.category}
              >
                <div className="category-name">
                  <span>
                    {item.category}
                  </span>
                </div>

                <div className="category-track">
                  <div className="category-track-grid">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div
                    className="category-fill"
                    style={{
                      width: `${item.average}%`,
                    }}
                  >
                    <span />
                  </div>
                </div>

                <div className="category-score">
                  {item.average}
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="dashboard-card recent-card">
        <div className="dashboard-card-header">
          <div>
            <p className="card-kicker">
              ACTIVITY
            </p>

            <h2>
              Recent evaluations
            </h2>

            <p>
              The latest evaluated
              conversations.
            </p>
          </div>

          <span className="recent-count">
            {recentEvaluations.length}
          </span>
        </div>

        <div className="activity-table">
          <div className="activity-table-header">
            <span>Conversation</span>
            <span>Agent</span>
            <span>Channel</span>
            <span>Reviewer</span>
            <span>Score</span>
            <span>Date</span>
          </div>

          <div className="activity-scroll">
            {recentEvaluations.length === 0 ? (
              <div className="activity-empty">
                No evaluations found.
              </div>
            ) : (
              recentEvaluations.map(
                (conversation) => (
                  <button
                    className="activity-row"
                    key={conversation.id}
                    type="button"
                    onClick={() =>
                      onOpenConversation(
                        conversation.id,
                      )
                    }
                  >
                    <span className="activity-conversation">
                      <strong>
                        {conversation.subject}
                      </strong>

                      <span>
                        {conversation.displayName}
                      </span>
                    </span>

                    <span>
                      {conversation.agent}
                    </span>

                    <span>
                      <span
                        className={`channel-pill channel-${conversation.channel.toLowerCase()}`}
                      >
                        {conversation.channel}
                      </span>
                    </span>

                    <span>
                      {conversation.reviewer ??
                        '—'}
                    </span>

                    <span>
                      <span
                        className={`score-pill ${
                          (conversation.score ??
                            0) >= 90
                            ? 'score-high'
                            : (conversation.score ??
                                  0) >= 80
                              ? 'score-good'
                              : 'score-low'
                        }`}
                      >
                        {formatScore(
                          conversation.score,
                        )}
                      </span>
                    </span>

                    <span>
                      {conversation.date}
                    </span>
                  </button>
                ),
              )
            )}
          </div>
        </div>
      </section>
    </main>
  )
}