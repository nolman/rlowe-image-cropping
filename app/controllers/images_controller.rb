class ImagesController < ApplicationController
  def index
  end

  def show
    @image = Image.find(params[:id])
  end

  def create
    args = params.require(:image).permit(:crop_x, :crop_y, :crop_w, :crop_h, :file)
    image = Image.create!(args)
    redirect_to image_path(image)
  end
end
