class QuestionSet::CategoryQuestion < ActiveRecord::Base
  belongs_to :category, class_name: "QuestionSet::Category"
  belongs_to :question, class_name: "QuestionSet::Question"
end