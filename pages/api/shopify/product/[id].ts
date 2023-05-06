import { Product, ReducedProduct } from "@/types/product";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | ReducedProduct
  | {
      message: string;
    };

const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const productId = req.query.id as string;
  const route = `https://test-fullstack.myshopify.com/admin/api/2023-04/products/${productId}.json`;
  const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
  if (!TOKEN) return res.status(401).send({ message: "Missing token" });

  const response = (await fetch(route, {
    method: "GET",
    headers: {
      "X-Shopify-Access-Token": TOKEN,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())) as {
    product: Product;
  };

  const reducedProduct = {
    id: response.product.id,
    title: response.product.title,
    body_html: response.product.body_html,
    variants: response.product.variants,
    images: response.product.images,
    options: response.product.options,
  };

  return res.status(200).json(reducedProduct);
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProduct(req, res);
  }
}
