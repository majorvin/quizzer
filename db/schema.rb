# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150907020505) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "exam_choices", force: :cascade do |t|
    t.integer "question_id",                 null: false
    t.string  "text",                        null: false
    t.boolean "answer",      default: false
  end

  create_table "exam_lists", force: :cascade do |t|
    t.integer "category_id", null: false
  end

  add_index "exam_lists", ["category_id"], name: "index_exam_lists_on_category_id", using: :btree

  create_table "exam_questions", force: :cascade do |t|
    t.integer "list_id", null: false
    t.string  "text",    null: false
  end

  add_index "exam_questions", ["list_id"], name: "index_exam_questions_on_list_id", using: :btree

  create_table "question_set_categories", force: :cascade do |t|
    t.string   "name",                         null: false
    t.string   "description"
    t.boolean  "enable",       default: false, null: false
    t.datetime "archived_at"
    t.integer  "max_question"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  add_index "question_set_categories", ["name"], name: "index_question_set_categories_on_name", using: :btree

  create_table "question_set_choices", force: :cascade do |t|
    t.integer  "question_id",                 null: false
    t.boolean  "answer",      default: false, null: false
    t.string   "text",                        null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "question_set_choices", ["question_id"], name: "index_question_set_choices_on_question_id", using: :btree

  create_table "question_set_questions", force: :cascade do |t|
    t.integer  "category_id", null: false
    t.string   "text",        null: false
    t.datetime "archived_at"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "question_set_questions", ["category_id"], name: "index_question_set_questions_on_category_id", using: :btree
  add_index "question_set_questions", ["text"], name: "index_question_set_questions_on_text", using: :btree

  add_foreign_key "question_set_choices", "question_set_questions", column: "question_id"
  add_foreign_key "question_set_questions", "question_set_categories", column: "category_id"
end
