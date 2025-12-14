const Product = require("../models/product-model");

const getsProductData = async (req, res) => {
  try {
    const productsData = req.body.productsData;

    if (!Array.isArray(productsData) || productsData.length === 0) {
      return res.status(400).json({ message: "productsData must be a non-empty array." });
    }

    // ✅ Use id if available, otherwise use productId
    const idList = productsData.map(item => item.id || item.productId);
    const products = await Product.find({ _id: { $in: idList } });

    if (!products.length) {
      return res.status(404).json({ message: "No products found." });
    }

    const productData = productsData.map(({ id, productId, variantIndex, qty }) => {
      const lookupId = id || productId; // ✅ use whichever exists
      const product = products.find(p => p._id.toString() === lookupId);
      if (!product) return null;

      const isVariantProduct = product.variants && product.variants.length > 0;

      if (isVariantProduct) {
        if (variantIndex === undefined || !product.variants[variantIndex]) {
          return null; // skip if variantIndex is missing or invalid
        }

        const variant = product.variants[variantIndex];

        return {
          id: product._id,
          name: product.name,
          variantName: variant.color,
          image: variant.image,
          qty,
          price: variant.price,
          variantIndex
        };
      }

      // Simple product (no variants)
      return {
        id: product._id,
        name: product.name,
        image: product.image,
        qty,
        price: product.price
      };
    }).filter(Boolean); // remove null entries

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = getsProductData;