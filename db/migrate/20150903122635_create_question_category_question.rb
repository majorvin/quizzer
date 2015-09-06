class CreateQuestionCategoryQuestion < ActiveRecord::Migration
  def change
    create_table :question_set_category_questions do |t|
      t.integer :question_id, null: false
      t.integer :category_id, null: false

      t.timestamps null: false
    end

    add_index :question_set_category_questions, ["question_id", "category_id"], unique: true, name: "index_category_questions"
  end
end
