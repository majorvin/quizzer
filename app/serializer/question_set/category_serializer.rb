class QuestionSet::CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :enable, :max_question
end