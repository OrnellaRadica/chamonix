import { Collection } from "@/types/collection";
import { Product } from "@/types/product";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | Collection
  | {
      message: string;
    };

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const route =
    "https://test-fullstack.myshopify.com/admin/api/2023-04/products.json";
  const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
  if (!TOKEN) return res.status(401).send({ message: "Missing token" });

  const response = (await fetch(route, {
    method: "GET",
    headers: {
      "X-Shopify-Access-Token": TOKEN,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())) as {
    products: Product[];
  };

  const reducedProducts = response.products.map((product) => ({
    id: product.id,
    image: product.image,
    title: product.title,
    variants: product.variants,
    images: product.images
  }));

  return res.status(200).json({
    products: reducedProducts,
  });
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
  }
}
