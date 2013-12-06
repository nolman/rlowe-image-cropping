class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MimeTypes
  include CarrierWave::RMagick

  process :set_content_type
  storage :file

  version :cropped do
    process :manually_croped
  end

  def manually_croped
     manipulate! do |img| 
       if model.cropping?
         img = img.crop(model.crop_x.to_i,model.crop_y.to_i,model.crop_h.to_i,model.crop_w.to_i)
       end
       img = img.resize_to_fit(200, 200)
     end 
   end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
