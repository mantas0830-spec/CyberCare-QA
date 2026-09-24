import { useMemo, useState } from 'react'
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

const DEFAULT_CATEGORIES: Category[] = [
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

const EVALUATED_CATEGORIES: Category[] = [
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
    score: 4,
  },
  {
    id: 'wait-time',
    name: 'Wait Time',
    group: 'Customer Experience',
    score: 5,
  },
  {
    id: 'grammar',
    name: 'Grammar',
    group: 'Customer Experience',
    score: 5,
  },
  {
    id: 'inquiry-understood',
    name: 'Inquiry Understood',
    group: 'Solution',
    score: 5,
  },
  {
    id: 'effective-solution',
    name: 'Effective Solution',
    group: 'Solution',
    score: 4,
  },
  {
    id: 'procedures-followed',
    name: 'Procedures Followed',
    group: 'Procedures',
    score: 5,
  },
  {
    id: 'agent-response',
    name: 'Agent Response',
    group: 'Other',
    score: 4,
  },
  {
    id: 'cause-bad-rating',
    name: 'Cause of Bad Rating',
    group: 'Other',
    score: 4,
  },
  {
    id: 'reason-bad-rating',
    name: 'Reason for Bad Rating',
    group: 'Other',
    score: 5,
  },
]

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
    (sum, category) => sum + (category.score ?? 0),
    0,
  )

  return Math.round(
    (total / scoredCategories.length) * 20,
  )
}

function getScoreDescription(score: number | null) {
  if (score === null) {
    return 'Not evaluated'
  }

  if (score === 0) {
    return 'Critical failure'
  }

  if (score === 1) {
    return 'Poor'
  }

  if (score === 2) {
    return 'Needs improvement'
  }

  if (score === 3) {
    return 'Average'
  }

  if (score === 4) {
    return 'Good'
  }

  return 'Excellent'
}

export function Scorecard({
  evaluated = false,
  initialCategories,
  onEvaluationChange,
}: ScorecardProps) {
  const startingCategories =
    initialCategories ??
    (evaluated
      ? EVALUATED_CATEGORIES
      : DEFAULT_CATEGORIES)

  const [categories, setCategories] = useState<Category[]>(
    startingCategories,
  )

  const [openComments, setOpenComments] = useState<
    Set<string>
  >(new Set())

  const [reviewerFeedback, setReviewerFeedback] =
    useState('')

  const [flagged, setFlagged] = useState(false)

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
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        categories: groupCategories,
      }),
    )
  }, [categories])

  const overallScore =
    calculateOverallScore(categories)

  const updateCategories = (
    updated: Category[],
  ) => {
    setCategories(updated)

    onEvaluationChange?.(
      updated,
      calculateOverallScore(updated),
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
          score: category.score === 0 ? null : 0,
        }
      },
    )

    updateCategories(updated)
  }

  const updateComment = (
    categoryId: string,
    comment: string,
  ) => {
    const updated = categories.map(
      (category): Category =>
        category.id === categoryId
          ? { ...category, comment }
          : category,
    )

    updateCategories(updated)
  }

  const toggleComment = (categoryId: string) => {
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
              {evaluated ? 'Evaluated' : 'In progress'}
            </div>
          </div>

          <div className="scorecard-overall">
            <div className="scorecard-overall-label">
              Overall score
            </div>

            <div className="scorecard-overall-number">
              {overallScore === null
                ? '—'
                : overallScore}

              <span>/100</span>
            </div>

            <div className="scorecard-overall-description">
              {getScoreDescription(overallScore)}
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
                      {group.categories.length} completed
                    </span>
                  </div>
                </div>

                <div className="scorecard-category-list">
                  {group.categories.map((category) => {
                    const isCritical =
                      Boolean(category.critical)

                    const isCriticalMistake =
                      isCritical &&
                      category.score === 0

                    const commentOpen =
                      openComments.has(category.id)

                    const hasComment =
                      Boolean(category.comment?.trim())

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
                                    title={option.label}
                                    aria-label={`${option.value} - ${option.label}`}
                                  >
                                    {option.value}
                                  </button>
                                ),
                              )}
                            </div>
                          )}
                        </div>

                        <div className="scorecard-category-footer">
                          <button
                            type="button"
                            className={`scorecard-comment-toggle ${
                              commentOpen || hasComment
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

                          {!isCritical &&
                            category.score !== null && (
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
                                category.comment ?? ''
                              }
                              onChange={(event) =>
                                updateComment(
                                  category.id,
                                  event.target.value,
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
                  })}
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
            {flagged ? 'Flagged' : '⚑ Flag mistake'}
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