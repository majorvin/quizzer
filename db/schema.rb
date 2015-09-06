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

ActiveRecord::Schema.define(version: 20150903122635) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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

  create_table "question_set_category_questions", force: :cascade do |t|
    t.integer  "question_id", null: false
    t.integer  "category_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "question_set_category_questions", ["question_id", "category_id"], name: "index_category_questions", unique: true, using: :btree

  create_table "question_set_choices", force: :cascade do |t|
    t.integer  "question_id",                 null: false
    t.boolean  "answer",      default: false, null: false
    t.string   "text",                        null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "question_set_choices", ["question_id"], name: "index_question_set_choices_on_question_id", using: :btree

  create_table "question_set_questions", force: :cascade do |t|
    t.string   "text",        null: false
    t.datetime "archived_at"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "question_set_questions", ["text"], name: "index_question_set_questions_on_text", using: :btree

  add_foreign_key "question_set_choices", "question_set_questions", column: "question_id"
end
