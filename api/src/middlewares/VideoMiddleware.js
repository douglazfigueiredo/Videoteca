const { validate: isUuid } = require("uuid");
const Video = require("../models/Video");

module.exports = {
  async validateId(request, response, next) {
    const { id } = request.params;

    if(!isUuid(id)){
      return response.status(400).json({ error: "Invalid ID."});
    }

    try{
      const video = await Video.findById(id);
      response.video = video;
      if(!video) {
        return response.status(404).json({ error: "Video not found."});
      }
    } catch(err) {
      return res.status(500).json({ error: err.message });
    }

    next();
  }
}