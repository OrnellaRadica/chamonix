import {  useMemo, useState } from "react";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import ProductCard from "@/components/ProductCard";
import { Collection as CollectionType } from "@/types/collection";
import { getLowestVariantPrice } from "@/helpers";


export const getStaticProps: GetStaticProps<{
  collection: CollectionType;
}> = async ({}) => {
  const serverRoute = process.env.SERVER_ROUTE;
  const collection = (await fetch(`${serverRoute}/api/shopify/collection`).then(
    (response) => response.json()
  )) as CollectionType;

  return {
    props: {
      collection,
    },
  };
};

const Collection = ({
  collection,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [sortBy, setSortBy] = useState("recommended");

  const sortedProducts = useMemo(
    () =>
      sortBy === "recommended"
        ? collection.products
        : [...collection.products].sort((a, b) => {
            const aPrice = getLowestVariantPrice(a.variants).price;
            const bPrice = getLowestVariantPrice(b.variants).price;
            if (sortBy === "lowHigh") {
              return parseFloat(aPrice) - parseFloat(bPrice);
            } else {
              return parseFloat(bPrice) - parseFloat(aPrice);
            }
          }),
    [sortBy]
  );

  return (
    <>
      <Head>
        <title>Chamonix - New Collection</title>
        <meta
          name="description"
          content="Get ready for the ultimate snowboarding adventure with our high-quality snowboards and accessories. From beginners to experts, our equipment is designed to enhance your performance and help you conquer the slopes."
        />
        <meta property="og:image" content="/images/logo-chamonix.png" />
      </Head>
      <section>
        <div className="mx-auto max--2xl px-4 py-6 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="flex flex-wrap justify-between gap-4 sm:flex-row sm:items-baseline sm:justify-between mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900">
              Snowboards
            </h2>
            <div className="flex items-center gap-4">
              <label
                htmlFor="sortBy"
                className="block text-sm font-medium leading-6 text-zinc-900 whitespace-nowrap"
              >
                Sort by
              </label>
              <select
                id="sortBy"
                name="sortBy"
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-sm text-zinc-900 ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Recommendeds</option>
                <option value="lowHigh">Price - Low to High</option>
                <option value="highLow">Price - High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {sortedProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Collection;
