import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import './Scorecard.css'

type Score = 0 | 1 | 2 | 3 | 4 | 5

type Category = {
  id: string
  name: string
  group?: string
  critical?: boolean
  score: Score | null
  comment?: string
}

type CategoryGroup = {
  id: string
  name: string
  categories: Category[]
}

type ScorecardDefinition = {
  id: string
  name: string
  description: string
  categories: Category[]
}

type ScorecardProps = {
  evaluated?: boolean
  initialCategories?: Category[]
  onEvaluationChange?: (
    categories: Category[],
    overallScore: number | null,
  ) => void
}

const SCORE_OPTIONS: {
  value: Exclude<Score, 0>
  label: string
}[] = [
  { value: 1, label: 'Poor' },
  { value: 2, label: 'Needs improvement' },
  { value: 3, label: 'Average' },
  { value: 4, label: 'Good' },
  { value: 5, label: 'Excellent' },
]

const COMMENT_DISABLED_CATEGORY_IDS = new Set([
  'agent-response',
  'cause-bad-rating',
  'reason-bad-rating',
])

const CUSTOMER_SUPPORT_CATEGORIES: Category[] = [
  {
    id: 'risk',
    name: 'Risk',
    group: 'Critical Issues',
    critical: true,
    score: null,
  },
  {
    id: 'prevention',
    name: 'Prevention',
    group: 'Critical Issues',
    critical: true,
    score: null,
  },
  {
    id: 'procedures',
    name: 'Procedures',
    group: 'Critical Issues',
    critical: true,
    score: null,
  },
  {
    id: 'resolution',
    name: 'Resolution',
    group: 'Critical Issues',
    critical: true,
    score: null,
  },
  {
    id: 'personalized',
    name: 'Personalization',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'wait-time',
    name: 'Wait Time',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'grammar',
    name: 'Grammar',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'inquiry-understood',
    name: 'Inquiry Understood',
    group: 'Solution',
    score: null,
  },
  {
    id: 'effective-solution',
    name: 'Effective Solution',
    group: 'Solution',
    score: null,
  },
  {
    id: 'procedures-followed',
    name: 'Procedures Followed',
    group: 'Procedures',
    score: null,
  },
  {
    id: 'agent-response',
    name: 'Agent Response',
    group: 'Other',
    score: null,
  },
  {
    id: 'cause-bad-rating',
    name: 'Cause of Bad Rating',
    group: 'Other',
    score: null,
  },
  {
    id: 'reason-bad-rating',
    name: 'Reason for Bad Rating',
    group: 'Other',
    score: null,
  },
]

const TECHNICAL_SUPPORT_CATEGORIES: Category[] = [
  {
    id: 'security-risk',
    name: 'Security Risk',
    group: 'Critical Issues',
    critical: true,
    score: null,
  },
  {
    id: 'incorrect-guidance',
    name: 'Incorrect Guidance',
    group: 'Critical Issues',
    critical: true,
    score: null,
  },
  {
    id: 'policy-violation',
    name: 'Policy Violation',
    group: 'Critical Issues',
    critical: true,
    score: null,
  },
  {
    id: 'diagnosis',
    name: 'Issue Diagnosis',
    group: 'Technical Quality',
    score: null,
  },
  {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    group: 'Technical Quality',
    score: null,
  },
  {
    id: 'technical-accuracy',
    name: 'Technical Accuracy',
    group: 'Technical Quality',
    score: null,
  },
  {
    id: 'resolution',
    name: 'Resolution',
    group: 'Technical Quality',
    score: null,
  },
  {
    id: 'clarity',
    name: 'Explanation Clarity',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'personalization',
    name: 'Personalization',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'communication',
    name: 'Communication',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'documentation',
    name: 'Documentation',
    group: 'Process',
    score: null,
  },
]

const B2B_SUPPORT_CATEGORIES: Category[] = [
  {
    id: 'security-risk',
    name: 'Security Risk',
    group: 'Critical Issues',
    critical: true,
    score: null,
  },
  {
    id: 'data-handling',
    name: 'Data Handling',
    group: 'Critical Issues',
    critical: true,
    score: null,
  },
  {
    id: 'policy-compliance',
    name: 'Policy Compliance',
    group: 'Critical Issues',
    critical: true,
    score: null,
  },
  {
    id: 'business-understanding',
    name: 'Business Understanding',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'account-ownership',
    name: 'Account Ownership',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'communication',
    name: 'Professional Communication',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'solution-quality',
    name: 'Solution Quality',
    group: 'Resolution',
    score: null,
  },
  {
    id: 'resolution',
    name: 'Resolution',
    group: 'Resolution',
    score: null,
  },
  {
    id: 'follow-up',
    name: 'Follow-up',
    group: 'Resolution',
    score: null,
  },
  {
    id: 'documentation',
    name: 'Documentation',
    group: 'Process',
    score: null,
  },
]

const CHAT_QUALITY_CATEGORIES: Category[] = [
  {
    id: 'risk',
    name: 'Risk',
    group: 'Critical Issues',
    critical: true,
    score: null,
  },
  {
    id: 'privacy',
    name: 'Privacy',
    group: 'Critical Issues',
    critical: true,
    score: null,
  },
  {
    id: 'accuracy',
    name: 'Accuracy',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'response-time',
    name: 'Response Time',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'grammar',
    name: 'Grammar',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'tone',
    name: 'Tone',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'personalization',
    name: 'Personalization',
    group: 'Customer Experience',
    score: null,
  },
  {
    id: 'inquiry-understood',
    name: 'Inquiry Understood',
    group: 'Resolution',
    score: null,
  },
  {
    id: 'effective-solution',
    name: 'Effective Solution',
    group: 'Resolution',
    score: null,
  },
  {
    id: 'closing',
    name: 'Closing',
    group: 'Resolution',
    score: null,
  },
]

const SCORECARD_DEFINITIONS: ScorecardDefinition[] = [
  {
    id: 'customer-support',
    name: 'Customer Support QA',
    description: 'General customer support evaluation',
    categories: CUSTOMER_SUPPORT_CATEGORIES,
  },
  {
    id: 'technical-support',
    name: 'Technical Support',
    description: 'Technical troubleshooting and accuracy',
    categories: TECHNICAL_SUPPORT_CATEGORIES,
  },
  {
    id: 'b2b-support',
    name: 'B2B Support',
    description: 'Business customer support evaluation',
    categories: B2B_SUPPORT_CATEGORIES,
  },
  {
    id: 'chat-quality',
    name: 'Chat Quality',
    description: 'Live chat communication quality',
    categories: CHAT_QUALITY_CATEGORIES,
  },
]

const SCORECARD_CHANNELS = [
  {
    id: 'customer-support',
    label: 'Email',
  },
  {
    id: 'chat-quality',
    label: 'Chat',
  },
] as const

const EVALUATED_SCORES: Record<string, Score> = {
  personalized: 4,
  'wait-time': 5,
  grammar: 5,
  'inquiry-understood': 5,
  'effective-solution': 4,
  'procedures-followed': 5,
  'agent-response': 4,
  'cause-bad-rating': 4,
  'reason-bad-rating': 5,

  diagnosis: 4,
  troubleshooting: 5,
  'technical-accuracy': 5,
  resolution: 4,
  clarity: 5,
  personalization: 4,
  communication: 5,
  documentation: 5,

  'business-understanding': 5,
  'account-ownership': 4,
  'solution-quality': 4,
  'follow-up': 5,

  accuracy: 5,
  'response-time': 5,
  tone: 5,
  closing: 5,
}

function createCategories(
  definition: ScorecardDefinition,
  evaluated: boolean,
): Category[] {
  return definition.categories.map((category) => ({
    ...category,
    score:
      evaluated && !category.critical
        ? EVALUATED_SCORES[category.id] ?? 4
        : null,
  }))
}

function calculateOverallScore(
  categories: Category[],
): number | null {
  const hasCriticalMistake = categories.some(
    (category) =>
      category.critical && category.score === 0,
  )

  if (hasCriticalMistake) {
    return 0
  }

  const scoredCategories = categories.filter(
    (category) =>
      !category.critical && category.score !== null,
  )

  if (scoredCategories.length === 0) {
    return null
  }

  const total = scoredCategories.reduce(
    (sum, category) =>
      sum + (category.score ?? 0),
    0,
  )

  return Math.round(
    (total / scoredCategories.length) * 20,
  )
}

export function Scorecard({
  evaluated = false,
  initialCategories,
  onEvaluationChange,
}: ScorecardProps) {
  const [selectedScorecardId, setSelectedScorecardId] =
    useState('customer-support')

  const scorecardSelectorRef =
    useRef<HTMLDivElement>(null)

  const selectedScorecard =
    SCORECARD_DEFINITIONS.find(
      (scorecard) =>
        scorecard.id === selectedScorecardId,
    ) ?? SCORECARD_DEFINITIONS[0]

  const getStartingCategories = (
    definition: ScorecardDefinition,
  ) => {
    if (
      definition.id === 'customer-support' &&
      initialCategories
    ) {
      return initialCategories
    }

    return createCategories(
      definition,
      evaluated,
    )
  }

  const [categories, setCategories] = useState<Category[]>(
    getStartingCategories(selectedScorecard),
  )

  const [openComments, setOpenComments] = useState<
    Set<string>
  >(new Set())

  const [reviewerFeedback, setReviewerFeedback] =
    useState('')

  const [flagged, setFlagged] = useState(false)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        scorecardSelectorRef.current &&
        !scorecardSelectorRef.current.contains(
          event.target as Node,
        )
      ) {
        // Nothing to close because the selector is
        // intentionally always visible.
      }
    }

    document.addEventListener(
      'mousedown',
      handleOutsideClick,
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick,
      )
    }
  }, [])

  const groups = useMemo<CategoryGroup[]>(() => {
    const groupMap = new Map<string, Category[]>()

    categories.forEach((category) => {
      const groupName = category.group ?? 'Other'

      if (!groupMap.has(groupName)) {
        groupMap.set(groupName, [])
      }

      groupMap.get(groupName)?.push(category)
    })

    return Array.from(groupMap.entries()).map(
      ([name, groupCategories]) => ({
        id: name
          .toLowerCase()
          .replace(/\s+/g, '-'),
        name,
        categories: groupCategories,
      }),
    )
  }, [categories])

  const updateCategories = (
    updated: Category[],
  ) => {
    setCategories(updated)

    onEvaluationChange?.(
      updated,
      calculateOverallScore(updated),
    )
  }

  const changeScorecard = (
    scorecardId: string,
  ) => {
    if (scorecardId === selectedScorecardId) {
      return
    }

    const nextScorecard =
      SCORECARD_DEFINITIONS.find(
        (scorecard) =>
          scorecard.id === scorecardId,
      )

    if (!nextScorecard) {
      return
    }

    const nextCategories = createCategories(
      nextScorecard,
      evaluated,
    )

    setSelectedScorecardId(scorecardId)
    setCategories(nextCategories)
    setOpenComments(new Set())
    setReviewerFeedback('')
    setFlagged(false)

    onEvaluationChange?.(
      nextCategories,
      calculateOverallScore(nextCategories),
    )
  }

  const updateScore = (
    categoryId: string,
    score: Exclude<Score, 0>,
  ) => {
    const updated = categories.map(
      (category): Category =>
        category.id === categoryId
          ? { ...category, score }
          : category,
    )

    updateCategories(updated)
  }

  const toggleCriticalMistake = (
    categoryId: string,
  ) => {
    const updated = categories.map(
      (category): Category => {
        if (category.id !== categoryId) {
          return category
        }

        return {
          ...category,
          score:
            category.score === 0 ? null : 0,
        }
      },
    )

    updateCategories(updated)
  }

  const updateComment = (
    categoryId: string,
    comment: string,
  ) => {
    if (
      COMMENT_DISABLED_CATEGORY_IDS.has(
        categoryId,
      )
    ) {
      return
    }

    const updated = categories.map(
      (category): Category =>
        category.id === categoryId
          ? { ...category, comment }
          : category,
    )

    updateCategories(updated)
  }

  const toggleComment = (
    categoryId: string,
  ) => {
    if (
      COMMENT_DISABLED_CATEGORY_IDS.has(
        categoryId,
      )
    ) {
      return
    }

    setOpenComments((current) => {
      const next = new Set(current)

      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }

      return next
    })
  }

  return (
    <aside className="scorecard">
      <div className="scorecard-scroll">
        <header className="scorecard-header">
          <div className="scorecard-header-top">
            <div className="scorecard-eyebrow">
              QUALITY REVIEW
            </div>

            <div
              className={`scorecard-status ${
                evaluated
                  ? 'scorecard-status-evaluated'
                  : ''
              }`}
            >
              <span className="scorecard-status-dot" />
              {evaluated
                ? 'Evaluated'
                : 'In progress'}
            </div>
          </div>

          <div
            className="scorecard-selector"
            ref={scorecardSelectorRef}
          >
            <div className="scorecard-selector-label">
              SCORECARD
            </div>

            <div
              className="scorecard-channel-selector"
              role="tablist"
              aria-label="Select scorecard channel"
            >
              {SCORECARD_CHANNELS.map(
                (channel) => (
                  <button
                    key={channel.id}
                    type="button"
                    role="tab"
                    aria-selected={
                      selectedScorecardId ===
                      channel.id
                    }
                    className={`scorecard-channel-option ${
                      selectedScorecardId ===
                      channel.id
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      changeScorecard(
                        channel.id,
                      )
                    }
                  >
                    {channel.label}
                  </button>
                ),
              )}
            </div>
          </div>
        </header>

        <main className="scorecard-content">
          {groups.map((group) => {
            const isCriticalGroup =
              group.id === 'critical-issues'

            const completed =
              group.categories.filter(
                (category) =>
                  category.critical
                    ? category.score === 0
                    : category.score !== null,
              ).length

            return (
              <section
                className={`scorecard-section ${
                  isCriticalGroup
                    ? 'scorecard-section-critical'
                    : ''
                }`}
                key={group.id}
              >
                <div className="scorecard-section-header">
                  <div>
                    <h3>{group.name}</h3>

                    <span>
                      {completed} of{' '}
                      {group.categories.length}{' '}
                      completed
                    </span>
                  </div>
                </div>

                <div className="scorecard-category-list">
                  {group.categories.map(
                    (category) => {
                      const isCritical =
                        Boolean(category.critical)

                      const isCriticalMistake =
                        isCritical &&
                        category.score === 0

                      const commentsDisabled =
                        COMMENT_DISABLED_CATEGORY_IDS.has(
                          category.id,
                        )

                      const commentOpen =
                        !commentsDisabled &&
                        openComments.has(
                          category.id,
                        )

                      const hasComment =
                        !commentsDisabled &&
                        Boolean(
                          category.comment?.trim(),
                        )

                      return (
                        <div
                          className={`scorecard-category ${
                            isCritical
                              ? 'scorecard-category-critical'
                              : ''
                          } ${
                            isCriticalMistake
                              ? 'scorecard-category-critical-active'
                              : ''
                          } ${
                            commentsDisabled
                              ? 'scorecard-category-no-comment'
                              : ''
                          }`}
                          key={category.id}
                        >
                          <div className="scorecard-category-row">
                            <div className="scorecard-category-info">
                              {isCritical && (
                                <span className="scorecard-critical-symbol">
                                  !
                                </span>
                              )}

                              <div>
                                <div className="scorecard-category-name">
                                  {category.name}

                                  {hasComment && (
                                    <span className="scorecard-comment-dot" />
                                  )}
                                </div>

                                {isCritical && (
                                  <div className="scorecard-category-meta">
                                    Critical category
                                  </div>
                                )}
                              </div>
                            </div>

                            {isCritical ? (
                              <button
                                type="button"
                                className={`scorecard-critical-control ${
                                  isCriticalMistake
                                    ? 'scorecard-critical-control-active'
                                    : ''
                                }`}
                                onClick={() =>
                                  toggleCriticalMistake(
                                    category.id,
                                  )
                                }
                              >
                                <span className="scorecard-critical-check">
                                  {isCriticalMistake
                                    ? '!'
                                    : '✓'}
                                </span>

                                <span>
                                  {isCriticalMistake
                                    ? 'Critical'
                                    : 'Mark as critical'}
                                </span>
                              </button>
                            ) : (
                              <div
                                className="scorecard-rating"
                                aria-label={`${category.name} rating`}
                              >
                                {SCORE_OPTIONS.map(
                                  (option) => (
                                    <button
                                      type="button"
                                      key={option.value}
                                      className={`scorecard-rating-option ${
                                        category.score ===
                                        option.value
                                          ? 'scorecard-rating-option-active'
                                          : ''
                                      }`}
                                      onClick={() =>
                                        updateScore(
                                          category.id,
                                          option.value,
                                        )
                                      }
                                      title={
                                        option.label
                                      }
                                      aria-label={`${option.value} - ${option.label}`}
                                    >
                                      {option.value}
                                    </button>
                                  ),
                                )}
                              </div>
                            )}
                          </div>

                          <div
                            className={`scorecard-category-footer ${
                              commentsDisabled
                                ? 'scorecard-category-footer-no-comment'
                                : ''
                            }`}
                          >
                            {!commentsDisabled && (
                              <button
                                type="button"
                                className={`scorecard-comment-toggle ${
                                  commentOpen ||
                                  hasComment
                                    ? 'scorecard-comment-toggle-active'
                                    : ''
                                }`}
                                onClick={() =>
                                  toggleComment(
                                    category.id,
                                  )
                                }
                              >
                                <span>
                                  {commentOpen
                                    ? '−'
                                    : '+'}
                                </span>

                                {hasComment
                                  ? 'Comment added'
                                  : 'Add comment'}
                              </button>
                            )}

                            {!isCritical &&
                              category.score !==
                                null && (
                                <span className="scorecard-rating-label">
                                  {
                                    SCORE_OPTIONS.find(
                                      (option) =>
                                        option.value ===
                                        category.score,
                                    )?.label
                                  }
                                </span>
                              )}
                          </div>

                          {commentOpen && (
                            <div className="scorecard-comment">
                              <textarea
                                value={
                                  category.comment ??
                                  ''
                                }
                                onChange={(event) =>
                                  updateComment(
                                    category.id,
                                    event.target
                                      .value,
                                  )
                                }
                                placeholder={
                                  isCritical
                                    ? 'Explain the critical issue...'
                                    : 'Add feedback for this category...'
                                }
                                autoFocus
                              />
                            </div>
                          )}
                        </div>
                      )
                    },
                  )}
                </div>
              </section>
            )
          })}

          <section className="scorecard-feedback-section">
            <div className="scorecard-section-header">
              <div>
                <h3>Reviewer feedback</h3>

                <span>
                  Add overall feedback for the agent
                </span>
              </div>
            </div>

            <textarea
              className="scorecard-feedback-input"
              value={reviewerFeedback}
              onChange={(event) =>
                setReviewerFeedback(
                  event.target.value,
                )
              }
              placeholder="Write a short summary of the evaluation..."
            />
          </section>
        </main>
      </div>

      <footer className="scorecard-footer">
        {flagged && (
          <div className="scorecard-flag-message">
            <span>✓</span>
            Mistake flagged for review
          </div>
        )}

        <div className="scorecard-footer-actions">
          <button
            type="button"
            className={`scorecard-flag-button ${
              flagged
                ? 'scorecard-flag-button-active'
                : ''
            }`}
            onClick={() => setFlagged(true)}
            disabled={flagged}
          >
            {flagged
              ? 'Flagged'
              : '⚑ Flag mistake'}
          </button>

          {!evaluated && (
            <button
              type="button"
              className="scorecard-save-button"
            >
              Submit
            </button>
          )}
        </div>
      </footer>
    </aside>
  )
}