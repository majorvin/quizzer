class QuestionCategoryItem < ActiveRecord::Base
  belongs_to :question_category
  belongs_to :question
end
