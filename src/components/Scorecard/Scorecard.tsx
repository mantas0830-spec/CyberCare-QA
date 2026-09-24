type Criterion = {
  title: string
  score: number
  max: number
  status: 'pass' | 'warning' | 'fail'
  comment?: string
}

const criteria: Criterion[] = [
  {
    title: 'Communication',
    score: 10,
    max: 10,
    status: 'pass',
    comment: 'Clear, polite and professional communication.',
  },
  {
    title: 'Problem Identification',
    score: 18,
    max: 20,
    status: 'pass',
    comment: 'Agent asked relevant diagnostic questions.',
  },
  {
    title: 'Resolution',
    score: 20,
    max: 20,
    status: 'pass',
    comment: 'Provided a relevant troubleshooting step.',
  },
  {
    title: 'Product Knowledge',
    score: 12,
    max: 20,
    status: 'warning',
    comment:
      'The agent could have provided more detailed protocol troubleshooting.',
  },
  {
  title: 'Personalization',
  score: 10,
  max: 10,
  status: 'pass',
  comment: "Response was adapted to the customer's situation.",
},
  {
    title: 'Closing',
    score: 9,
    max: 10,
    status: 'pass',
    comment: 'Conversation was closed appropriately.',
  },
]

export function Scorecard() {
  return (
    <div className="scorecard">
      <div className="scorecard-header">
        <div>
          <div className="section-eyebrow">QA EVALUATION</div>
          <h2>Customer Support Scorecard</h2>
        </div>

        <button className="more-button">•••</button>
      </div>

      <div className="score-summary">
        <div className="score-circle">
          <span>87</span>
          <small>/100</small>
        </div>

        <div>
          <div className="score-label">Overall Score</div>
          <div className="score-status">Good performance</div>
        </div>
      </div>

      <div className="criteria">
        {criteria.map((criterion) => (
          <div className="criterion" key={criterion.title}>
            <div className="criterion-top">
              <div className="criterion-title">
                <span className={`criterion-icon ${criterion.status}`}>
                  {criterion.status === 'pass'
                    ? '✓'
                    : criterion.status === 'warning'
                      ? '!'
                      : '×'}
                </span>

                <span>{criterion.title}</span>
              </div>

              <strong>
                {criterion.score}
                <span>/{criterion.max}</span>
              </strong>
            </div>

            <div className="criterion-bar">
              <div
                className={`criterion-progress ${criterion.status}`}
                style={{
                  width: `${(criterion.score / criterion.max) * 100}%`,
                }}
              />
            </div>

            {criterion.comment && (
              <div className="criterion-comment">
                {criterion.comment}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="feedback-section">
        <div className="section-eyebrow">QA FEEDBACK</div>

        <div className="feedback-box">
          <strong>Reviewer feedback</strong>

          <p>
            Good handling of the customer's issue. The troubleshooting
            flow was clear and the agent maintained a professional tone.
            Consider providing more detailed protocol-level troubleshooting
            when the initial server change does not resolve the issue.
          </p>
        </div>
      </div>
    </div>
  )
}