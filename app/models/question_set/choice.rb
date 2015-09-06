class QuestionSet::Choice < ActiveRecord::Base
  validates :text, :question, presence: true

  belongs_to :question, class_name: "QuestionSet::Question", inverse_of: :choices

  default_scope { order("id") }
end
