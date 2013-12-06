RloweImageCropping::Application.routes.draw do
  resources :images
  root 'images#index'
end
