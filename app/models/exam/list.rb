class Exam::List < ActiveRecord::Base
  belongs_to :category, class_name: "QuestionSet::Category"
  has_many :questions, class_name: "Exam::Question", inverse_of: :list

  def self.generate_exam_for(id)
    # id = 103
    category = QuestionSet::Category.find(id)
    max_questions = category.max_question < category.questions.count ? category.max_question : category.questions.count

    questions = category.questions.order("RANDOM()").limit(max_questions)
    list = self.create(category: category)

    # temporary use loop
    questions.each do |question|
      exam_question = Exam::Question.create(list: list, text: question.text)

      question.choices.each do |choice|
        Exam::Choice.create(question: exam_question, text: choice.text)
      end
    end

    list.reload

    return list
  end
end