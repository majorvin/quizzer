Rails.application.routes.draw do
  root 'dashboard#index'

  namespace :question_set do
    resources :questions, only: [:index, :show, :update, :create] do
      member do
        put "archive"
      end
    end

    resources :categories, only: [:index, :show, :update, :create] do
      member do
        put "archive"
        put "remove_questions"
        get "show_questions"
      end
    end
  end
end
