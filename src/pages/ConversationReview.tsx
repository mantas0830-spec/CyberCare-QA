import { Conversation } from '../components/Conversation/Conversation'
import { Scorecard } from '../components/Scorecard/Scorecard'
import { conversations } from '../data/demoData'

type ConversationReviewProps = {
  conversationId: string
  onBack: () => void
}

export function ConversationReview({
  conversationId,
  onBack,
}: ConversationReviewProps) {
  const conversation = conversations.find(
    (item) => item.id === conversationId,
  )

  if (!conversation) {
    return (
      <div className="empty-page">
        <h2>Conversation not found</h2>

        <button className="secondary-button" onClick={onBack}>
          ← Back to Conversations
        </button>
      </div>
    )
  }

  return (
    <div className="review-page">
      <div className="review-topbar">
        <button className="back-button" onClick={onBack}>
          ← Conversations
        </button>

        <div className="review-actions">
          <button className="secondary-button">Previous</button>
          <button className="secondary-button">Next</button>
          <button className="primary-button">Save Evaluation</button>
        </div>
      </div>

      <div className="review-layout">
        <Conversation conversation={conversation} />
        <Scorecard />
      </div>
    </div>
  )
}