// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery.min
//= require jquery.Jcrop
//= require_tree .

$(document).ready(function () {
  var ratio = 1;

  $(".picture-field").on("change", function(event){
    make_cropable_image($(this));
  });
  make_cropable_image($(".picture-field"));
  function make_cropable_image(element){
    var target = element[0];
    if (target.files.length == 1 && target.files[0].type.indexOf("image/") == 0) {
      var image = target.files[0];
      var imageContainer = $(element).parents("form").find(".image-display");
      imageDisplay = $("<img/>").attr("src", URL.createObjectURL(image));
      imageContainer.html(imageDisplay)
      imageContainer.show();
      $(imageDisplay).Jcrop({
        onChange: update_crop,
        onSelect: update_crop,
        setSelect: [500,500,0,0],
        boxWidth: 500,
        aspectRatio: ratio
      });;
    }
  }

  function update_crop(coords) {
    $("#crop_x").val(Math.round(coords.x * ratio));
    $("#crop_y").val(Math.round(coords.y * ratio));
    $("#crop_w").val(Math.round(coords.w * ratio));
    $("#crop_h").val(Math.round(coords.h * ratio));
  }
});
