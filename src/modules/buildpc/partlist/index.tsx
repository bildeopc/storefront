import React from "react"
import { medusaClient } from "@lib/config"
import { ParsedUrlQuery } from "querystring"
import Image from "next/image"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import Link from "next/link"

export type PartId = "CPU" | "GPU" | "Storage size" | "PSU" | "RAM" | "Mobo"
export interface partsType {
  id: PartId
  variantID?: string
  name?: string
  price?: number
  image?: string | null
}

// Define the interface for the AI response object
export interface AIresType {
  CPU: 0 | 1 | 2 | 3
  GPU: 0 | 1 | 2 | 3
  "Storage size": 0 | 1 | 2 | 3
  PSU: 0 | 1 | 2 | 3
  RAM: 0 | 1 | 2 | 3
  Mobo: 0 | 1 | 2 | 3
  comments: string
}

export const PartIdLabels: Record<PartId, string> = {
  CPU: "Processor",
  GPU: "Graphics Card",
  "Storage size": "Storage Size",
  PSU: "Power Supply",
  RAM: "Memory",
  Mobo: "Motherboard",
}

// Define an object containing collection IDs for each PC part type
export const partList = {
  CPU: "pcol_01GXZM5QATSXZC9GKDJ7RM4Y9V",
  "Storage size": "pcol_01GXZM7TGB0EY5SD369Q0E27QG",
  RAM: "pcol_01GXZM6ZZCWRA5Y3J0J8YZG6QT",
  PSU: "pcol_01GXZM63F3MB7CM0572YW5MWEC",
  GPU: "pcol_01GXRCDGWMF7ENXXMQMVVSEAHN",
  Mobo: "pcol_01GY1VSTWA3BME51J1RQT12DTV",
}

// Define a function to get the PC part type ID based on a given rating, 1 = low end, 2 = mid end, 3 = high end
function getPCPartTypeID(pcPartType: 0 | 1 | 2 | 3): string {
  if (pcPartType === 0) return ""

  const partTypeList = {
    1: "ptyp_01GY0BPNTNMGB92ZSPHGBQS2X2",
    2: "ptyp_01GY0BYZNYTXFXBWXC6HK7CY66",
    3: "ptyp_01GXZNWSZ81FEN6T6YKE40ZK0C",
  }

  // Throw an error if an invalid rating is provided
  if (!partTypeList[pcPartType]) {
    throw new Error("Invalid pcPartType. Allowed values are: 1,2,3.")
  }

  // Return the corresponding type ID
  return partTypeList[pcPartType]
}

// Define an asynchronous function to fetch a product based on a given rating and collection ID
const fetchProduct = async ({
  partRating,
  pcpart,
}: {
  partRating: 0 | 1 | 2 | 3
  pcpart: string
}) => {
  if (partRating === 0)
    return {
      id: pcpart,
      title: "No Product Found",
      variants: [],
      thumbnail:
        "https://cdn.discordapp.com/attachments/811231774327177326/1095026021654351974/BildeoPC_logo_2.png",
    }
  // Use the Medusa client to list products matching the given type and collection IDs, and return the first product
  return await medusaClient.products
    .list({ type_id: [getPCPartTypeID(partRating)], collection_id: [pcpart] })
    .then(({ products }) => products[0])
}

const Partlist = ({ airesponse }: { airesponse: AIresType }) => {
  //{ data, isError, isLoading, isSuccess }
  const CPUQuery = useQuery(
    [`get_cpu`, airesponse.CPU],
    () => fetchProduct({ partRating: airesponse.CPU, pcpart: partList.CPU }),
    {
      keepPreviousData: true,
    }
  )

  const GPUQuery = useQuery(
    [`get_gpu`, airesponse.GPU],
    () => fetchProduct({ partRating: airesponse.GPU, pcpart: partList.GPU }),
    {
      keepPreviousData: true,
      enabled: !CPUQuery.isFetching, // Check if CPUQuery is not fetching data
    }
  )

  const StorageSizeQuery = useQuery(
    [`get_storage_size`, airesponse["Storage size"]],
    () =>
      fetchProduct({
        partRating: airesponse["Storage size"],
        pcpart: partList["Storage size"],
      }),
    {
      keepPreviousData: true,
      enabled: !GPUQuery.isFetching, // Check if GPUQuery is not fetching data
    }
  )

  const PSUQuery = useQuery(
    [`get_psu`, airesponse.PSU],
    () => fetchProduct({ partRating: airesponse.PSU, pcpart: partList.PSU }),
    {
      keepPreviousData: true,
      enabled: !StorageSizeQuery.isFetching, // Check if StorageSizeQuery is not fetching data
    }
  )

  const RAMQuery = useQuery(
    [`get_memory`, airesponse.RAM],
    () => fetchProduct({ partRating: airesponse.RAM, pcpart: partList.RAM }),
    {
      keepPreviousData: true,
      enabled: !PSUQuery.isFetching, // Check if PSUQuery is not fetching data
    }
  )

  const MoboQuery = useQuery(
    [`get_Mobo`, airesponse.Mobo],
    () => fetchProduct({ partRating: airesponse.Mobo, pcpart: partList.Mobo }),
    {
      keepPreviousData: true,
      enabled: !RAMQuery.isFetching, // Check if RAMQuery is not fetching data
    }
  )

  const parts: partsType[] = [
    {
      // Define the CPU part object
      id: "CPU",
      variantID: CPUQuery.data?.variants[0]?.id, // Get the CPU ID from the query result,
      name: CPUQuery.data?.title, // Get the CPU name from the query result
      price: CPUQuery.data?.variants[0]?.prices[0]?.amount, // Get the CPU price from the query result
      image: CPUQuery.data?.thumbnail, // Get the CPU image from the query result
    },
    {
      // Define the GPU part object
      id: "GPU",
      variantID: GPUQuery.data?.variants[0]?.id, // Get the GPU ID from the query result,
      name: GPUQuery.data?.title, // Get the GPU name from the query result
      price: GPUQuery.data?.variants[0]?.prices[0]?.amount, // Get the GPU price from the query result
      image: GPUQuery.data?.thumbnail, // Get the GPU image from the query result
    },
    {
      // Define the storage size part object
      id: "Storage size",
      variantID: StorageSizeQuery.data?.variants[0]?.id, // Get the storage size ID from the query result
      name: StorageSizeQuery.data?.title, // Get the storage size name from the query result
      price: StorageSizeQuery.data?.variants[0]?.prices[0]?.amount, // Get the storage size price from the query result
      image: StorageSizeQuery.data?.thumbnail, // Get the storage size image from the query result
    },
    {
      // Define the PSU part object
      id: "PSU",
      variantID: PSUQuery.data?.variants[0]?.id, // Get the PSU ID from the query result
      name: PSUQuery.data?.title, // Get the PSU name from the query result
      price: PSUQuery.data?.variants[0]?.prices[0]?.amount, // Get the PSU price from the query result
      image: PSUQuery.data?.thumbnail, // Get the PSU image from the query result
    },
    {
      // Define the RAM part object
      id: "RAM",
      variantID: RAMQuery.data?.variants[0]?.id, // Get the RAM ID from the query result
      name: RAMQuery.data?.title, // Get the RAM name from the query result
      price: RAMQuery.data?.variants[0]?.prices[0]?.amount, // Get the RAM price from the query result
      image: RAMQuery.data?.thumbnail, // Get the RAM image from the query result
    },
    {
      // Define the motherboard part object
      id: "Mobo",
      variantID: MoboQuery.data?.variants[0]?.id, // Get the motherboard ID from the query result
      name: MoboQuery.data?.title, // Get the motherboard name from the query result
      price: MoboQuery.data?.variants[0]?.prices[0]?.amount, // Get the motherboard price from the query result
      image: MoboQuery.data?.thumbnail, // Get the motherboard image from the query result
    },
  ]

  return (
    <>
      <div className="flex flex-wrap">
        {parts.map((part) => (
          <div key={part.id} className="w-full lg:w-1/2 xl:w-1/2 p-4">
            <div className="pb-2 text-black font-semibold">
              {PartIdLabels[part.id]}
            </div>
            <div className="flex flex-row items-center">
              <div className="w-12 h-12 flex-shrink-0">
                <Image
                  src={
                    part.image
                      ? part.image
                      : "https://cdn.discordapp.com/attachments/811231774327177326/1095026021654351974/BildeoPC_logo_2.png"
                  } // Replace with actual image URL
                  alt={part.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="flex-grow pl-4">
                <div className="text-lg font-semibold">
                  {part.name ? part.name : "Item not available"}
                </div>
                <div className="text-gray-500">
                  {part.price
                    ? `RM ${(part.price / 100).toFixed(2)}`
                    : "Price not available"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <div className="p-2 flex flex-row justify-end">
          <Link
            href={{
              pathname: "/customize",
              query: { partlist: JSON.stringify(parts) },
            }}
          >
            <a className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark">
              Customize
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Partlist
