class Exam::Question < ActiveRecord::Base
  belongs_to :list, class_name: "Exam::List", inverse_of: :questions

  has_many :choices, class_name: "Exam::Choice", inverse_of: :question
end