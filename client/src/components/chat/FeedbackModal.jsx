import { useState } from "react";
import { Star, X, Send } from "lucide-react";
import { useBotSettingsStore } from "../../store/botSettingsStore";
import { getBotConfig } from "../../utils/botConfig";
import toast from "react-hot-toast";

const FeedbackModal = ({
  isOpen,
  onClose,
  botType,
  messageId,
  conversationId,
}) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { submitFeedback } = useBotSettingsStore();
  const bot = getBotConfig(botType);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    setIsSubmitting(true);
    try {
      await submitFeedback({
        botType,
        messageId,
        conversationId,
        rating,
        comment: comment.trim() || null,
      });
      toast.success("Thanks for your feedback! ⭐");
      setRating(0);
      setComment("");
      onClose();
    } catch {
      toast.error("Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div
          className={`px-6 py-4 bg-gradient-to-r ${bot?.gradient} flex items-center justify-between`}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">{bot?.emoji}</span>
            <div>
              <p className="text-white font-bold text-sm">Rate this response</p>
              <p className="text-white/70 text-xs">{bot?.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {/* Star selector */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="transition-transform hover:scale-125 active:scale-110"
                >
                  <Star
                    size={32}
                    className={`transition-colors ${
                      star <= (hovered || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            {/* Label */}
            <p
              className={`text-sm font-semibold transition-all ${
                hovered || rating
                  ? "text-yellow-500 dark:text-yellow-400"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {labels[hovered || rating] || "Select a rating"}
            </p>
          </div>

          {/* Comment */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Comment{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="What did you think of this response?"
              className="
                w-full px-4 py-2.5 text-sm rounded-xl border
                bg-gray-50 dark:bg-gray-900
                text-gray-900 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500
                border-gray-200 dark:border-gray-700
                focus:border-blue-500 dark:focus:border-blue-500
                focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20
                outline-none transition-all resize-none
              "
            />
            <p className="text-right text-xs text-gray-400 mt-1">
              {comment.length}/500
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !rating}
              className={`
                flex-1 flex items-center justify-center gap-2
                py-2.5 rounded-xl text-sm font-semibold text-white
                bg-gradient-to-r ${bot?.gradient}
                hover:shadow-md transition-all
                disabled:opacity-60 disabled:cursor-not-allowed
              `}
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={14} />
              )}
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
