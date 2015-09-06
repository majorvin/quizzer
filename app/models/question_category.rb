class QuestionCategory < ActiveRecord::Base
  validates :name, :max_question, presence: true

  has_many :category_items
  has_many :questions, :through => :category_items

  default_scope { order("id") }
end
