Rails.application.routes.draw do
  root 'dashboard#index'

  namespace :question_set do
    resources :questions, only: [:show, :create, :update, :index] do
      member do
        put "archive"
      end
    end

    resources :categories, only: [:index, :show, :update, :create] do
      member do
        put "archive"
      end
    end
  end
end
