const Media = require("../models/media-model");
const cloudinary = require("../utlis/cloudinary");

// Upload helper
const uploadToCloudinary = async (fileBuffer, fileName) => {
  const cleanedName = fileName.trim().toLowerCase().replace(/\s+/g, "-");
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", public_id: `media/${cleanedName}` },
        (err, result) => (err ? reject(err) : resolve(result.secure_url))
      )
      .end(fileBuffer);
  });
};

const uploadMedia = async (req, res, next) => {
  try {
    const files = req.files;
    const names = req.body.names; // original names from frontend

    if (!files || files.length === 0) {
      return next({ status: 400, message: "No files received" });
    }

    const uploadedResults = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileBuffer = file.buffer;
      const originalName = Array.isArray(names) ? names[i] : names;

      // Get file extension
      const extension = originalName.includes(".")
        ? originalName.substring(originalName.lastIndexOf("."))
        : "";

      const baseName = originalName.replace(extension, "");

      // Generate a unique name by checking DB
      let uniqueName = baseName + extension;
      let counter = 1;
      while (await Media.exists({ fileName: uniqueName })) {
        uniqueName = `${baseName}-${counter}${extension}`;
        counter++;
      }

      // Upload to Cloudinary using unique name
      const imageUrl = await uploadToCloudinary(fileBuffer, uniqueName);

      // Save to DB
      const saved = await Media.create({
        name: uniqueName,
        size: file.size,
        url: imageUrl,
        type: file.mimetype,
      });

      uploadedResults.push({
        id: saved._id,
        name: saved.name,
        url: saved.url,
        size: saved.size,
        type: saved.type,
        status: "completed",
      });
    }

    res.status(201).json({
      message: "Upload complete",
      uploaded: uploadedResults,
    });

  } catch (error) {
    console.error("Upload media error:", error);
    next({ status: 500, message: error.message });
  }
};

module.exports = uploadMedia;
