import Image from "next/image";
import Link from "next/link";
import { getLowestVariantPrice } from "@/helpers";
import { Collection } from "@/types/collection";

interface Props {
  product: Collection["products"][number];
}

const ProductCard: React.FC<Props> = ({ product }) => {

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="aspect-h-1 relative aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8xl:aspect-w-7">
        {product.image ? (
          <>
            <Image
              src={product.image.src}
              alt={product.image.alt}
              width={600}
              height={600}
              priority
              className={`h-full absolute top-0 left-0 w-full object-contain object-center block ${
                product.images[1]
                  ? "group-hover:hidden"
                  : "group-hover:opacity-75"
              }`}
            />
            {product.images?.[1] && (
              <Image
                src={product.images?.[1]?.src}
                alt={product.images?.[1]?.alt}
                width={600}
                height={600}
                priority
                className="h-full absolute top-0 left-0 w-full object-contain object-center hidden group-hover:block group-hover:opacity-75"
              />
            )}
          </>
        ) : (
          <div className="bg-gray-100 h-[300px]"></div>
        )}
      </div>
      <h3 className="mt-4 text-sm font-semibold text-zinc-900">{product.title}</h3>
      <p className="mt-1 text-sm sm:text-base font-light text-zinc-900">
        {getLowestVariantPrice(product.variants).price.replace(/\./g, ',')} €
      </p>
    </Link>
  );
};

export default ProductCard;
