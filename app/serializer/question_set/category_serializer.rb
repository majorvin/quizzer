class QuestionSet::CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :enable, :max_question

  # has_many :questions

  # def questions
  #   return [] if @serialization_options.nil? || !@serialization_options[:with_question]

  #   object.questions
  # end
end