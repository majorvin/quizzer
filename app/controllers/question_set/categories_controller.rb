class QuestionSet::CategoriesController < ApplicationController
  def index
    @active     = QuestionSet::Category.active.where_name_like(params[:keywords])
    @page       = (params[:page] || 0).to_i
    @page_size  = (params[:page_size] || 10).to_i
    @categories = @active.offset(@page_size * @page).limit(@page_size)

    respond_with @categories, meta: { total_count: @active.count }
  end

  def show
    @category = QuestionSet::Category.find(params[:id])

    respond_with @category, with_question: true
  end

  def create
    @category =  QuestionSet::Category.create(category_params)

    if @category.save
      render json: { id: @category.id }
    else
      render json: { errors: @category.errors.to_a }, status: :unprocessable_entity
    end
  end

  def update
    @category = QuestionSet::Category.find(params[:id])

    if @category.update(category_params)
      render nothing: true, status: 204
    else
      render json: { errors: @category.errors.to_a }, status: :unprocessable_entity
    end
  end

  # Archive a category
  def archive
    @category = QuestionSet::Category.find(params[:id])

    if @category.update_attributes(archived_at: DateTime.now)
      render nothing: true, status: 204
    else
      render json: { errors: @category.errors.to_a }, status: :unprocessable_entity
    end
  end

  private

  def category_params
    params.require(:category).permit(:name, :description, :max_question, :enable)
  end
end