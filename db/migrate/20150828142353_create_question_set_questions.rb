class CreateQuestionSetQuestions < ActiveRecord::Migration
  def change
    create_table :question_set_questions do |t|
      t.string :text, null: false, index: true
      t.datetime :archived_at

      t.timestamps null: false
    end
  end
end
