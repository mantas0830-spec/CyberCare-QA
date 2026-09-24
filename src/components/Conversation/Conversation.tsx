import type { Conversation as ConversationType } from '../../data/demoData'

type ConversationProps = {
  conversation: ConversationType
}

export function Conversation({ conversation }: ConversationProps) {
  return (
    <div className="conversation-panel">
      <div className="conversation-header">
        <div>
          <div className="conversation-customer">
            {conversation.customer}
          </div>

          <div className="conversation-subject">
            {conversation.subject}
          </div>
        </div>

        <div className="conversation-meta">
          <span className="channel-badge">{conversation.channel}</span>
          <span>{conversation.id}</span>
        </div>
      </div>

      <div className="conversation-messages">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={`message-row ${message.sender}`}
          >
            <div className="message-avatar">
              {message.name.charAt(0)}
            </div>

            <div className="message-content">
              <div className="message-header">
                <strong>{message.name}</strong>
                <span>{message.time}</span>
              </div>

              <div className="message-bubble">{message.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}