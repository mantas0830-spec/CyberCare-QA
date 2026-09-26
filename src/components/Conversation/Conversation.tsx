import type { Conversation as ConversationType } from '../../data/demoData'
import './Conversation.css'

type ConversationProps = {
  conversation: ConversationType
}

export function Conversation({
  conversation,
}: ConversationProps) {
  return (
    <div className="conversation-panel">
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

      <div className="conversation-transcript">
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
                  <strong>{message.name}</strong>
                  <span>{message.time}</span>
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