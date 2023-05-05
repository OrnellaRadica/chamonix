import { Collection } from "@/types/collection";
import { Product } from "@/types/product";
import Link from "next/link";

interface Props {
  product: Collection["products"][number];
}
const ProductCard: React.FC<Props> = ({ product }) => {
  const getLowestVariantPrice = (variants: Product["variants"]) => {
    const lowToHigh = variants.sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
    return lowToHigh[0];
  };

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="aspect-h-1 relative aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        {product.image ? (
          <>
            <img
              src={product.image.src}
              alt={product.image.alt}
              className={`h-full absolute top-0 left-0 w-full object-fit object-center block ${
                product.images[1]
                  ? "group-hover:hidden"
                  : "group-hover:opacity-75"
              }`}
            />
            {product.images?.[1] && (
              <img
                src={product.images?.[1]?.src}
                alt={product.images?.[1]?.alt}
                className="h-full absolute top-0 left-0 w-full object-fit object-center hidden group-hover:block group-hover:opacity-75"
              />
            )}
          </>
        ) : (
          <div className="bg-gray-200 h-[300px]"></div>
        )}
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {getLowestVariantPrice(product.variants).price}
      </p>
    </Link>
  );
};

export default ProductCard;
