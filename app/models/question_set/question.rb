class QuestionSet::Question < ActiveRecord::Base
  before_save :atleast_two_choices

  default_scope { order("id") }

  has_many :category_questions, class_name: "QuestionSet::CategoryQuestion"
  has_many :categories, through: :category_questions
  has_many :choices, class_name: "QuestionSet::Choice", inverse_of: :question

  accepts_nested_attributes_for :choices, allow_destroy: true, reject_if: :reject_question

  validates :text, presence: true

  scope :active, -> { where(archived_at: nil) }
  scope :where_text_like, -> (text) { where("text ilike ?", "%#{text}%") }

  private

  def reject_question(attrb)
    attrb['text'].blank? && self.persisted?
  end

  def atleast_two_choices
    if self.choices.size < 2
      self.errors.add(:base, "Should have at least 2 choices.")
      return false
    else
      return true
    end
  end
end