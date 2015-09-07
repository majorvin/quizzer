class Exam::ListSerializer < ActiveModel::Serializer
  has_many :questions
end