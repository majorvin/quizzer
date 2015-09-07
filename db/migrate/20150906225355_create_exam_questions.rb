class CreateExamQuestions < ActiveRecord::Migration
  def change
    create_table :exam_questions do |t|
      t.references :list, index: true, null: false
      t.string :text, null: false
    end
  end
end
