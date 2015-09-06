
for i in 0..100
  params = { question: {
    text: "#{i} - What is your name?",
    choices_attributes: [
      { text: "Q#{i} - Choice1", answer: false},
      { text: "Q#{i} - Choice2", answer: true},
    ]
  }}

  QuestionSet::Question.create(params[:question])

  puts "Question ##{i} is created."
end

for i in 0..50
  qc1 = QuestionSet::Category.create({ name: "#{i} - Category", enable: true, max_question: 10, description: "Hello World!" })
  qc1.questions = QuestionSet::Question.all.limit(10)

  qc2 = QuestionSet::Category.create({ name: "#{i} - Category", enable: false, max_question: 30, description: "Hello World!" })
  qc2.questions = QuestionSet::Question.all

  puts "Question Category ##{i} is created."
end