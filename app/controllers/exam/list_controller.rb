class Exam::ListController < ApplicationController
  def create
    @list = Exam::List.generate_exam_for(params[:category_id])

    render json: { list_id: @list.id }
  end

  def find
    list = Exam::List.find(params[:list_id])

    respond_with list
  end

  def available
    @enable = QuestionSet::Category.active.enabled

    render json: @enable.to_json(only: [:id, :name, :description])
  end
end
