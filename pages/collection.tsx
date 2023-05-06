import ProductCard from "@/components/ProductCard";
import { Collection as CollectionType } from "@/types/collection";
import { GetStaticProps, InferGetStaticPropsType } from "next";

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
  return (
    <section className="bg-white">
      <div className="mx-auto max--2xl px-4 py-6 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {collection.products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
