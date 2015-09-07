class Exam::QuestionSerializer < ActiveModel::Serializer
  attributes :text

  has_many :choices
end