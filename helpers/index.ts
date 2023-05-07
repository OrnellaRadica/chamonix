import { Product } from "@/types/product";

export const getLowestVariantPrice = (variants: Product["variants"]) => {
  const lowToHigh = variants.sort(
    (a, b) => parseFloat(a.price) - parseFloat(b.price)
  );
  return lowToHigh[0];
};
