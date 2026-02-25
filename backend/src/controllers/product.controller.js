import Product from "../models/product.model.js";

// 🔹 Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, code, category, uom, description } = req.body;

    if (!name || !code || !category || !uom) {
      return res.status(400).json({
        message: "Name, Code, Category and UOM are required",
      });
    }

    const existing = await Product.findOne({ code });
    if (existing) {
      return res.status(400).json({
        message: "Product code already exists",
      });
    }

    const product = await Product.create({
      name,
      code,
      category,
      uom,
      description,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// 🔹 Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      products,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// 🔹 Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updated,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// 🔹 Soft Delete (Deactivate)
export const deactivateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { is_active: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deactivated",
      product,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};