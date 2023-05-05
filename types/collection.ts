import { Product } from "./product";

export interface Collection {
  products: Pick<Product, "title" | "image" | "variants" | "id" | "images">[];
}
