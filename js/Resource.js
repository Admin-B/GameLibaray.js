var Resource = {
  image: {},
  addImage: function (tag, src, callback) {
    if (typeof tag !== 'string' && typeof src !== 'string') {
      return false;
    }
    var image = new Image();
    image.src = src;
    if (typeof callback === 'function') {
      image.onload = callback;
    }
    this.image[tag] = image;
  },
  audio: {},
  addAudio: function () {
  }
};
