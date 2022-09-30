import { v4 as uuid } from "uuid";

let products = [];
let sales = [];

export const getProducts = (req, res) => {
  res.send(products);
};



export const getSales = (req, res) => {
  res.send(sales);
};

export const createProduct = (req, res) => {
  const product = req.body;
  products.push({ ...product, id: uuid() });
  res.send("Product Added Successfully");
}

export const createSales = (req, res) => {
  const product = req.body;
  products.push({ ...product, id: uuid() });
  res.send("Product Added Successfully");
}

export const deleteProduct = (req, res) => {
  products = products.filter((user) => user.id !== req.params.id);
  res.send("Product Deleted Successfully");
};

export const updateProduct = (req, res) => {
  const product = products.find((product) => product.id === req.params.id);

  product.name = req.body.name;
  product.quantidade = req.body.quantidade;
  product.value = req.body.value;
  res.send("Product Updated Successfully");
}


