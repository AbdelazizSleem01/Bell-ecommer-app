import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import dotenv from "dotenv";
import braintree from "braintree";

dotenv.config();
//payment gateway

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//createProductController
export const createProductController = async (req, res) => {
  try {
    const {
      name,
      nameAR,
      description,
      descriptionAR,
      price,
      category,
      quantity,
    } = req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !nameAR:
        return res.status(500).send({ error: "Arabic Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !descriptionAR:
        return res
          .status(500)
          .send({ error: "Arabic Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "product created successfully",
      products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error creating the product",
      err,
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({ quantity: { $gt: 0 } })
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate product
export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      nameAR,
      description,
      price,
      category,
      quantity,
      shipping,
      descriptionAR,
    } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !nameAR:
        return res.status(500).send({ error: "Arabic Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !descriptionAR:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// filters
export const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (err) {
    console.log("filterProductController Error : ", err);
    res.status(400).send({
      success: false,
      message: " Error in Filter",
      err,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: " Error in product count",
      err,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 12;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({
      success: false,
      message: "Error retrieving products",
      error: err.message,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        // $or is the query operator used in MongoDB. It is used to specify a condition that must match any of the specified conditions
        //  $or هو عامل البحث في قاعدة البيانات MongoDB. يستخدم لتحديد شرط
        // regex : (Reagular Expressions)  يستخدم لتحديد نمط البحث في حقول الاسم والوصف للمنتجات
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { nameAR: { $regex: keyword, $options: "iu" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(401).send({
      success: false,
      message: "Something went wrong in Search API",
      err,
    });
  }
};

// relatedProductController
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      //لجلب بيانات الفئة المرتبطة بكل منتج
      //هذا يعني أنه بدلاً من الحصول على معرف الفئة فقط، يتم استرجاع كافة بيانات الفئة المرتبطة مع المنتج.
      .populate("category");
    res.status(200).send({
      succes: true,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Server Error in geting related product ",
    });
  }
};

//categoryProductController
export const categoryProductController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      status: true,
      category,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      success: false,
      message: "Error In Category Products",
      err,
    });
  }
};


export const brainTreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        console.error("Braintree Token Error:", err);
        return res.status(500).json({ error: "Failed to generate client token" });
      }
      res.json({ clientToken: response.clientToken });
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: { submitForSettlement: true },
      },
      async (error, result) => {
        if (result?.success) {
          const order = await new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();

          res.json({
            success: true,
            message: "Payment Successful",
            orderId: order._id,
            transactionId: result.transaction.id,
            amount: result.transaction.amount,
          });
        } else {
          res.status(500).json({
            success: false,
            message: error?.message || "Payment Failed",
            braintreeError: error,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
