Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do

    resources :comments
    resources :videos 

    get "thirtyIndex", to: "videos#thirtyIndex"
    get "tenIndex", to: "videos#thirtyIndex"
    get "find_user", to: "comments#find_user"

  end
end
