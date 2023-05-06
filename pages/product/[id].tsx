import ProductCarousel from "@/components/ProductCarousel";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ReducedProduct } from "@/types/product";
import { Collection } from "@/types/collection";
import { useState } from "react";
import ProductInfo from "@/components/ProductInfo";

const serverRoute = process.env.SERVER_ROUTE;

export const getStaticProps: GetStaticProps<{
  product: ReducedProduct;
}> = async ({ params }) => {
  const id = params?.id as string;

  const product = await fetch(`${serverRoute}/api/shopify/product/${id}`).then(
    (response) => response.json()
  );

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const collection = (await fetch(`${serverRoute}/api/shopify/collection`).then(
    (response) => response.json()
  )) as Collection;
  const productUrls = collection.products.map((product) => {
    return { params: { id: product.id.toString() } };
  });

  return {
    paths: productUrls,
    fallback: "blocking",
  };
};

export default function ProductPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedOptions, setSelectedOptions] = useState({
    option1: product.options?.[0]?.values[0],
    option2: product.options?.[1]?.values[0] || null,
    option3: product.options?.[2]?.values[0] || null,
  });

  const activeVariant =
    product.variants.find(
      (item) =>
        item.option1 === selectedOptions.option1 &&
        item.option2 === selectedOptions.option2 &&
        item.option3 === selectedOptions.option3
    ) || product.variants[0]; // We shouldn't get here, but JIC this is a fallback to the first optino.
  return (
    <>
      <section className="mx-auto py-6 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 min-h-[calc(100vh-73px)]">
        <div className="md:grid md:grid-cols-2 md:items-start md:gap-x-8">
          {product.images.length != 0 ? (
            <ProductCarousel
              images={product.images}
              activeVariant={activeVariant}
            />
          ) : (
            <div className="bg-gray-200 h-full w-full rounded-lg"></div>
          )}
          <div>
          <ProductInfo
            product={product}
            activeVariant={activeVariant}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          <form className="mt-12 px-4 sm:px-0">
            <button
              type="submit"
              className="flex w-full max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
            >
              Add to cart
            </button>
          </form>
          </div>
        </div>
      </section>
    </>
  );
}
