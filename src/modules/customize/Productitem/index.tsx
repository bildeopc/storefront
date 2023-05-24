import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useMemo } from "react"
import { Product } from "types/medusa"
import Image from "next/image"

type ProductActionsProps = {
  product: Product
  setParts: Function
}

const Productitem: React.FC<ProductActionsProps> = ({ product, setParts }) => {
  return (
    <>
      <div key={product.id} className="w-full lg:w-1/2 xl:w-1/2 p-4">
        <div className="flex flex-row items-center">
          <div className="w-12 h-12 flex-shrink-0">
            <Image
              src={
                product.thumbnail
                  ? product.thumbnail
                  : "https://cdn.discordapp.com/attachments/811231774327177326/1095026021654351974/BildeoPC_logo_2.png"
              } // Replace with actual image URL
              alt={product.title}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div className="flex-grow pl-4">
            <div className="text-lg font-semibold">
              {product.title ? product.title : "Item not available"}
            </div>
            <div className="text-gray-500">
              {product.variants[0]?.prices[0]?.amount
                ? `RM ${(product.variants[0]?.prices[0]?.amount / 100).toFixed(
                    2
                  )}`
                : "Price not available"}
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                setParts(product)
              }}
              className="bg-gray-900 text-white py-2 px-4 rounded-md"
            >
              Use
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Productitem
