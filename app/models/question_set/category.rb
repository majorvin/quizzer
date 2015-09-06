class QuestionSet::Category < ActiveRecord::Base
  validates :name, :max_question, presence: true

  has_many :category_questions, class_name: "QuestionSet::CategoryQuestion"
  has_many :questions, :through => :category_questions

  default_scope { order("id") }

  scope :active, -> { where(archived_at: nil) }
  scope :where_name_like, -> (text) { where("name ilike ?", "%#{text}%") }
end