class Image < ActiveRecord::Base
  mount_uploader :file, ImageUploader
  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h
  after_create :reprocess, if: :cropping?

  def cropping?
    !crop_x.blank? && !crop_y.blank? && !crop_w.blank? && !crop_h.blank?
  end

  def profile_geometry
    image = Magick::Image::read(self.file.current_path).first
    @geometry = {width: image.columns, height: image.rows}
  end

  private
  def reprocess
    self.file.recreate_versions!
  end
end
