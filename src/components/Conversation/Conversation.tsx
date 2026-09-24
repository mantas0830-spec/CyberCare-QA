import { useState } from 'react'
import type { Conversation as ConversationType } from '../../data/demoData'
import './Conversation.css'

type ConversationProps = {
  conversation: ConversationType
}

type ConversationTab =
  | 'events'
  | 'metadata'
  | 'conversation'

type ConversationEvent = {
  id: number
  time: string
  type: 'added' | 'removed' | 'status'
  label: string
  value: string
}

export function Conversation({
  conversation,
}: ConversationProps) {
  const [activeTab, setActiveTab] =
    useState<ConversationTab>('events')

  const events: ConversationEvent[] = [
    {
      id: 1,
      time: '10:42',
      type: 'added',
      label: 'Agent added tag',
      value: 'asked_refund',
    },
    {
      id: 2,
      time: '10:43',
      type: 'added',
      label: 'Agent added tag',
      value: 'refund_terms',
    },
    {
      id: 3,
      time: '10:44',
      type: 'removed',
      label: 'Agent removed tag',
      value: 'cancel_subscription',
    },
    {
      id: 4,
      time: '10:46',
      type: 'status',
      label: 'Agent changed status',
      value: 'Open → Solved',
    },
  ]

  const customerEmail = `${conversation.customer
    .toLowerCase()
    .replace(/\s+/g, '.')}@example.com`

  const resolutionRate =
    conversation.resolution === 'Resolved'
      ? '100%'
      : '0%'

  const device =
    conversation.channel === 'Chat'
      ? 'Desktop'
      : 'Mobile'

  const operatingSystem =
    conversation.channel === 'Chat'
      ? 'Windows 11'
      : 'iOS 18'

  const country = 'United Kingdom'
  const isp = 'Example Broadband'

  return (
    <div className="conversation-panel">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="conversation-panel-header">
        <div className="conversation-header-main">
          <div className="section-eyebrow">
            CONVERSATION
          </div>

          <h2>
            {conversation.channel === 'Chat'
              ? `Conversation with ${conversation.displayName}`
              : conversation.subject}
          </h2>

          <div className="conversation-meta">
            <span>{conversation.id}</span>
            <span>•</span>
            <span>{conversation.channel}</span>
            <span>•</span>
            <span>{conversation.date}</span>
          </div>
        </div>

        <span
          className={`status-badge ${
            conversation.status === 'Evaluated'
              ? 'evaluated'
              : 'not-evaluated'
          }`}
        >
          {conversation.status}
        </span>
      </div>

      {/* =====================================================
          TABS
          ===================================================== */}

      <div className="conversation-tabs">
        <button
          type="button"
          className={`conversation-tab ${
            activeTab === 'events'
              ? 'conversation-tab-active'
              : ''
          }`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>

        <button
          type="button"
          className={`conversation-tab ${
            activeTab === 'metadata'
              ? 'conversation-tab-active'
              : ''
          }`}
          onClick={() => setActiveTab('metadata')}
        >
          Metadata
        </button>

        <button
          type="button"
          className={`conversation-tab ${
            activeTab === 'conversation'
              ? 'conversation-tab-active'
              : ''
          }`}
          onClick={() =>
            setActiveTab('conversation')
          }
        >
          Conversation Information
        </button>
      </div>

      {/* =====================================================
          TAB CONTENT
          ===================================================== */}

      <div
        className={`conversation-tab-content conversation-tab-content-${activeTab}`}
      >
        {/* ================= EVENTS ================= */}

        {activeTab === 'events' && (
          <div className="events-panel">
            {events.map((event, index) => (
              <div
                className="event-item"
                key={event.id}
              >
                <div className="event-time">
                  {event.time}
                </div>

                <div className="event-line">
                  <span
                    className={`event-dot event-dot-${event.type}`}
                  />

                  {index <
                    events.length - 1 && (
                    <span className="event-connector" />
                  )}
                </div>

                <div className="event-content">
                  <strong>
                    {event.label}
                  </strong>

                  <span
                    className={`event-value event-value-${event.type}`}
                  >
                    {event.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= METADATA ================= */}

        {activeTab === 'metadata' && (
          <div className="information-grid">
            <div className="information-item">
              <span>Device</span>
              <strong>{device}</strong>
            </div>

            <div className="information-item">
              <span>OS</span>
              <strong>
                {operatingSystem}
              </strong>
            </div>

            <div className="information-item">
              <span>Country</span>
              <strong>{country}</strong>
            </div>

            <div className="information-item">
              <span>ISP</span>
              <strong>{isp}</strong>
            </div>
          </div>
        )}

        {/* ============== CONVERSATION INFO ============== */}

        {activeTab === 'conversation' && (
          <div className="information-grid">
            <div className="information-item">
              <span>Customer Email</span>
              <strong>{customerEmail}</strong>
            </div>

            <div className="information-item">
              <span>CSAT</span>
              <strong>
                {conversation.csat !== null
                  ? `${conversation.csat}/5`
                  : 'Not rated'}
              </strong>
            </div>

            <div className="information-item">
              <span>Resolution Rate</span>
              <strong>
                {resolutionRate}
              </strong>
            </div>

            <div className="information-item">
              <span>Channel</span>
              <strong>
                {conversation.channel}
              </strong>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          TRANSCRIPT
          ===================================================== */}

      <div className="conversation-transcript">
        <div className="transcript-heading">
          <span>CONVERSATION</span>
        </div>

        <div className="conversation-messages">
          {conversation.messages.map(
            (message) => (
              <div
                className={`message ${
                  message.sender === 'agent'
                    ? 'message-agent'
                    : 'message-customer'
                }`}
                key={message.id}
              >
                <div className="message-header">
                  <strong>
                    {message.name}
                  </strong>

                  <span>
                    {message.time}
                  </span>
                </div>

                <div className="message-bubble">
                  {message.text}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  )
}