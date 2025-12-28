const cloudinary = require("../utlis/cloudinary");
const getCloudinaryDetials = async (req, res) => {
    try {
        const result = await cloudinary.api.usage();
        const images = await cloudinary.api.resources({ resource_type: "image", max_results: 500 });
        const imageSize = images.resources.reduce((sum, r) => sum + r.bytes, 0);
        const videos = await cloudinary.api.resources({ resource_type: "video", max_results: 500 });
        const videoSize = videos.resources.reduce((sum, r) => sum + r.bytes, 0);
        const raw = await cloudinary.api.resources({ resource_type: "raw", max_results: 500 });
        const rawSize = raw.resources.reduce((sum, r) => sum + r.bytes, 0);

        res.json({
            totalUsed: result.storage.usage,
            limit: 25 * 1024 * 1024 * 1024,
            images: imageSize,
            Videos: videoSize,
            documents: rawSize,
            other: result.storage.usage - (imageSize + videoSize + rawSize),
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch Cloudinary details", error: error.message });
    }
}
module.exports = getCloudinaryDetials;