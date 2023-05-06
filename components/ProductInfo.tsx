import { ReducedProduct,Variant } from "@/types/product";
import { Dispatch, SetStateAction } from "react";

interface Props {
  product: ReducedProduct ;
  activeVariant: Variant;
  selectedOptions: {
    option1: string;
    option2: string | null;
    option3: string | null;
};
  setSelectedOptions:  Dispatch<SetStateAction<{
    option1: string;
    option2: string | null;
    option3: string | null;
}>> ;
}

const ProductInfo: React.FC<Props> = ({product, activeVariant, selectedOptions, setSelectedOptions}) => {

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-zinc-900">
        {product.title}
      </h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-base sm:text-xl font-light tracking-tight text-zinc-900">
          {activeVariant.price.replace(/\./g, ',')} €
        </p>
      </div>

      {product.body_html ? (
        <div className="mt-6">
          <h3 className="sr-only">Description</h3>
          <div
            className="text-sm sm:text-base space-y-6  text-zinc-700"
            dangerouslySetInnerHTML={{ __html: product.body_html }}
          />
        </div>
      ) : null}
      {product.variants.length > 1 ? (
        <>
          {product.options?.map((option) => {
            return (
              <div key={option.id}>
                <div className="mt-6 mb-2 text-sm sm:text-base text-zinc-900">{option.name}</div>
                <div className="flex flex-wrap gap-2 items-center">
                  {option.values?.map((item) => {
                    const optionKey =
                      `option${option.position}` as keyof typeof selectedOptions;
                    const isSelected =
                      selectedOptions[optionKey] === item;
                    return (
                      <button
                        key={item}
                        onClick={() =>
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [optionKey]: item,
                          }))
                        }
                        className={`px-4 rounded py-2 text-sm
                        ${
                          isSelected
                            ? "outline outline-2 outline-indigo-700 text-indigo-700 font-semibold"
                            : "border border-zinc-700 text-zinc-700 hover:border-zinc-700 hover:text-zinc-900 hover:bg-zinc-100/80"
                        }
                      `}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  )
}

export default ProductInfo