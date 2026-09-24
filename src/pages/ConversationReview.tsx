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

  return (
    <div className="review-page">
      <div className="review-topbar">
        <button
          className="back-button"
          onClick={onBack}
        >
          ← Conversations
        </button>
      </div>

      <div className="review-layout">
        <Conversation
          conversation={conversation}
        />

        <Scorecard
          evaluated={isEvaluated}
        />
      </div>
    </div>
  )
}