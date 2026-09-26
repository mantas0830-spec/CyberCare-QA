import { useState } from 'react'
import { Conversation } from '../components/Conversation/Conversation'
import { Scorecard } from '../components/Scorecard/Scorecard'
import { conversations } from '../data/demoData'
import './ConversationReview.css'

type Category = {
  id: string
  name: string
  group?: string
  critical?: boolean
  score: 0 | 1 | 2 | 3 | 4 | 5 | null
  comment?: string
}

type ReviewPanel =
  | 'events'
  | 'metadata'
  | 'interaction-history'
  | 'conversation-information'
  | null

type ConversationReviewProps = {
  conversationId: string
  onBack: () => void
  onEvaluationSubmitted?: (
    conversationId: string,
    overallScore: number | null,
  ) => void
}

export function ConversationReview({
  conversationId,
  onBack,
  onEvaluationSubmitted,
}: ConversationReviewProps) {
  const [activePanel, setActivePanel] =
    useState<ReviewPanel>('events')

  const conversation = conversations.find(
    (item) => item.id === conversationId,
  )

  if (!conversation) {
    return (
      <div className="empty-page">
        <h2>Conversation not found</h2>

        <button
          className="secondary-button"
          onClick={onBack}
        >
          ← Back to Conversations
        </button>
      </div>
    )
  }

  const isEvaluated =
    conversation.status === 'Evaluated'

  const togglePanel = (
    panel: Exclude<ReviewPanel, null>,
  ) => {
    setActivePanel((current) =>
      current === panel ? null : panel,
    )
  }

  const handleEvaluationSubmitted = (
    _categories: Category[],
    overallScore: number | null,
  ) => {
    onEvaluationSubmitted?.(
      conversation.id,
      overallScore,
    )
  }

  return (
    <div className="review-page">
      <div
        className={`review-layout ${
          activePanel
            ? 'review-layout-panel-open'
            : ''
        }`}
      >
        {/* =================================================
            LEFT CONTEXT BLOCK
            ================================================= */}

        <aside className="review-context">
          <div className="review-context-rail">
            <button
              type="button"
              className={`review-context-button ${
                activePanel === 'events'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                togglePanel('events')
              }
              title="Events"
            >
              <span className="review-context-icon">
                ◷
              </span>

              <span className="review-context-label">
                Events
              </span>
            </button>

            <button
              type="button"
              className={`review-context-button ${
                activePanel === 'metadata'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                togglePanel('metadata')
              }
              title="Metadata"
            >
              <span className="review-context-icon">
                ⓘ
              </span>

              <span className="review-context-label">
                Metadata
              </span>
            </button>

            <button
              type="button"
              className={`review-context-button ${
                activePanel ===
                'interaction-history'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                togglePanel(
                  'interaction-history',
                )
              }
              title="Interaction history"
            >
              <span className="review-context-icon">
                ↔
              </span>

              <span className="review-context-label">
                Interaction
              </span>
            </button>

            <button
              type="button"
              className={`review-context-button ${
                activePanel ===
                'conversation-information'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                togglePanel(
                  'conversation-information',
                )
              }
              title="Conversation information"
            >
              <span className="review-context-icon">
                ▣
              </span>

              <span className="review-context-label">
                Conversation
              </span>
            </button>
          </div>

          {activePanel && (
            <div className="review-context-panel">
              <div className="review-context-panel-header">
                <div>
                  <span className="review-context-panel-eyebrow">
                    CONVERSATION
                  </span>

                  <h3>
                    {activePanel === 'events' &&
                      'Events'}

                    {activePanel ===
                      'metadata' &&
                      'Metadata'}

                    {activePanel ===
                      'interaction-history' &&
                      'Interaction history'}

                    {activePanel ===
                      'conversation-information' &&
                      'Conversation information'}
                  </h3>
                </div>

                <button
                  type="button"
                  className="review-context-close"
                  onClick={() =>
                    setActivePanel(null)
                  }
                  aria-label="Close information panel"
                  title="Close panel"
                >
                  ‹
                </button>
              </div>

              <div className="review-context-content">
                {activePanel === 'events' && (
                  <EventsPanel />
                )}

                {activePanel === 'metadata' && (
                  <MetadataPanel
                    conversation={conversation}
                  />
                )}

                {activePanel ===
                  'interaction-history' && (
                  <InteractionHistoryPanel />
                )}

                {activePanel ===
                  'conversation-information' && (
                  <ConversationInformationPanel
                    conversation={conversation}
                  />
                )}
              </div>
            </div>
          )}
        </aside>

        {/* =================================================
            CENTER CONVERSATION BLOCK
            ================================================= */}

        <main className="review-conversation">
          <Conversation
            conversation={conversation}
          />
        </main>

        {/* =================================================
            RIGHT SCORECARD BLOCK
            ================================================= */}

        <aside className="review-scorecard">
          <Scorecard
            evaluated={isEvaluated}
            onEvaluationChange={
              handleEvaluationSubmitted
            }
          />
        </aside>
      </div>
    </div>
  )
}

/* =========================================================
   EVENTS
   ========================================================= */

function EventsPanel() {
  return (
    <div className="review-event-list">
      <ReviewEvent
        time="09:41"
        title="Conversation started"
        description="Customer initiated the conversation."
      />

      <ReviewEvent
        time="09:42"
        title="Agent joined"
        description="An agent joined the conversation."
      />

      <ReviewEvent
        time="09:44"
        title="Customer replied"
        description="Customer sent a new message."
      />

      <ReviewEvent
        time="09:51"
        title="Conversation ended"
        description="The conversation was closed."
      />
    </div>
  )
}

function ReviewEvent({
  time,
  title,
  description,
}: {
  time: string
  title: string
  description: string
}) {
  return (
    <div className="review-event">
      <div className="review-event-time">
        {time}
      </div>

      <div className="review-event-marker" />

      <div className="review-event-body">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </div>
  )
}

/* =========================================================
   METADATA
   ========================================================= */

function MetadataPanel({
  conversation,
}: {
  conversation: (typeof conversations)[number]
}) {
  return (
    <div className="review-detail-list">
      <ReviewDetail
        label="Conversation ID"
        value={conversation.id}
      />

      <ReviewDetail
        label="Channel"
        value={conversation.channel}
      />

      <ReviewDetail
        label="Agent"
        value={conversation.agent}
      />

      <ReviewDetail
        label="Status"
        value={conversation.status}
      />

      <ReviewDetail
        label="Created"
        value="Today, 09:41"
      />

      <ReviewDetail
        label="Language"
        value="English"
      />
    </div>
  )
}

/* =========================================================
   INTERACTION HISTORY
   ========================================================= */

function InteractionHistoryPanel() {
  return (
    <div className="review-interaction-history">
      <div className="review-history-summary">
        <strong>Previous conversations</strong>

        <span>
          Conversations previously held with this
          customer.
        </span>
      </div>

      <div className="review-customer-conversation">
        <div className="review-customer-conversation-top">
          <span className="review-history-date">
            Sep 18, 2026
          </span>

          <span className="review-history-channel">
            Chat
          </span>
        </div>

        <strong>
          VPN connection stopped working
        </strong>

        <span>
          Customer contacted support about a
          connection issue.
        </span>
      </div>

      <div className="review-customer-conversation">
        <div className="review-customer-conversation-top">
          <span className="review-history-date">
            Sep 4, 2026
          </span>

          <span className="review-history-channel">
            Email
          </span>
        </div>

        <strong>
          Subscription question
        </strong>

        <span>
          Customer asked about their subscription
          and billing.
        </span>
      </div>

      <div className="review-customer-conversation">
        <div className="review-customer-conversation-top">
          <span className="review-history-date">
            Aug 21, 2026
          </span>

          <span className="review-history-channel">
            Chat
          </span>
        </div>

        <strong>
          Application troubleshooting
        </strong>

        <span>
          Customer needed help troubleshooting the
          application.
        </span>
      </div>
    </div>
  )
}

/* =========================================================
   CONVERSATION INFORMATION
   ========================================================= */

function ConversationInformationPanel({
  conversation,
}: {
  conversation: (typeof conversations)[number]
}) {
  return (
    <div className="review-detail-list">
      <ReviewDetail
        label="Subject"
        value="Customer support conversation"
      />

      <ReviewDetail
        label="Contact type"
        value="Technical support"
      />

      <ReviewDetail
        label="Product"
        value="NordVPN"
      />

      <ReviewDetail
        label="Language"
        value="English"
      />

      <ReviewDetail
        label="Channel"
        value={conversation.channel}
      />

      <ReviewDetail
        label="Participants"
        value="Customer, Agent"
      />

      <ReviewDetail
        label="Duration"
        value="10 minutes"
      />

      <ReviewDetail
        label="Tags"
        value="vpn, connection, troubleshooting"
      />
    </div>
  )
}

/* =========================================================
   SHARED DETAIL
   ========================================================= */

function ReviewDetail({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="review-detail">
      <span className="review-detail-label">
        {label}
      </span>

      <span className="review-detail-value">
        {value}
      </span>
    </div>
  )
}