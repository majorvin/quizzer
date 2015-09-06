
for i in 0..50
  params = { category: {
    name: "#{i} - Category",
    enable: true,
    max_question: 10,
    description: "Hello World!",
    questions_attributes: [
      {
        text: "Q#{i} - Question",
        choices_attributes: [
          { text: "Q#{i} - Choice1", answer: false},
          { text: "Q#{i} - Choice2", answer: true},
        ]
      },
      {
        text: "Q#{i} - Question",
        choices_attributes: [
          { text: "Q#{i} - Choice1", answer: false},
          { text: "Q#{i} - Choice2", answer: true},
        ]
      },
    ]
  }}
  qc1 = QuestionSet::Category.create(params[:category])

  qc2 = QuestionSet::Category.create({ name: "#{i} - Category", enable: false, max_question: 30, description: "Hello World!" })

  puts "Question Category ##{i} is created."
end

question_params = []

for i in 0..300
  question_params << {
    text: "Super Question - #{i}",
    choices_attributes: [
      { text: "Q#{i} - Choice1", answer: false},
      { text: "Q#{i} - Choice2", answer: true},
    ]
  }
end

params = { category: {
  name: "#{i} - Category",
  enable: true,
  max_question: 10,
  description: "Hello World!",
  questions_attributes: question_params
}}
qc1 = QuestionSet::Category.create(params[:category])