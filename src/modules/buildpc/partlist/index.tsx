import React from "react"
import { medusaClient } from "@lib/config"
import { ParsedUrlQuery } from "querystring"
import Image from "next/image"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"

export interface AIresType {
  Overall: 1 | 2 | 3
  CPU: 1 | 2 | 3
  GPU: 1 | 2 | 3
  "Storage size": 1 | 2 | 3
  PSU: 1 | 2 | 3
  RAM: 1 | 2 | 3
  Mobo: 1 | 2 | 3
  comments: string
}

const partList = {
  cpu: "pcol_01GXZM5QATSXZC9GKDJ7RM4Y9V",
  storage: "pcol_01GXZM7TGB0EY5SD369Q0E27QG",
  ram: "pcol_01GXZM6ZZCWRA5Y3J0J8YZG6QT",
  psu: "pcol_01GXZM63F3MB7CM0572YW5MWEC",
  gpu: "pcol_01GXRCDGWMF7ENXXMQMVVSEAHN",
  mobo: "pcol_01GY1VSTWA3BME51J1RQT12DTV",
}

function getPCPartTypeID(pcPartType: 1 | 2 | 3): string {
  const partTypeList = {
    1: "ptyp_01GY0BPNTNMGB92ZSPHGBQS2X2",
    2: "ptyp_01GY0BYZNYTXFXBWXC6HK7CY66",
    3: "ptyp_01GXZNWSZ81FEN6T6YKE40ZK0C",
  }
  if (!partTypeList[pcPartType]) {
    throw new Error("Invalid pcPartType. Allowed values are: 1,2,3.")
  }

  return partTypeList[pcPartType]
}

const fetchProduct = async ({
  partRating,
  pcpart,
}: {
  partRating: 1 | 2 | 3
  pcpart: string
}) => {
  return await medusaClient.products
    .list({ type_id: [getPCPartTypeID(partRating)], collection_id: [pcpart] })
    .then(({ products }) => products[0])
}

const Partlist = ({ airesponse }: { airesponse: AIresType }) => {
  //{ data, isError, isLoading, isSuccess }
  const CPUQuery = useQuery(
    [`get_cpu`, airesponse.CPU],
    () => fetchProduct({ partRating: airesponse.CPU, pcpart: partList.cpu }),
    {
      keepPreviousData: true,
    }
  )

  const GPUQuery = useQuery(
    [`get_gpu`, airesponse.GPU],
    () => fetchProduct({ partRating: airesponse.GPU, pcpart: partList.gpu }),
    {
      keepPreviousData: true,
      enabled: !!CPUQuery.data?.title && !CPUQuery.isFetching, // Check if CPUQuery is not fetching data
    }
  )

  const StorageSizeQuery = useQuery(
    [`get_storage_size`, airesponse["Storage size"]],
    () =>
      fetchProduct({
        partRating: airesponse["Storage size"],
        pcpart: partList.storage,
      }),
    {
      keepPreviousData: true,
      enabled: !!GPUQuery.data?.title && !GPUQuery.isFetching, // Check if GPUQuery is not fetching data
    }
  )

  const PSUQuery = useQuery(
    [`get_psu`, airesponse.PSU],
    () => fetchProduct({ partRating: airesponse.PSU, pcpart: partList.psu }),
    {
      keepPreviousData: true,
      enabled: !!StorageSizeQuery.data?.title && !StorageSizeQuery.isFetching, // Check if StorageSizeQuery is not fetching data
    }
  )

  const RAMQuery = useQuery(
    [`get_memory`, airesponse.RAM],
    () => fetchProduct({ partRating: airesponse.RAM, pcpart: partList.ram }),
    {
      keepPreviousData: true,
      enabled: !!PSUQuery.data?.title && !PSUQuery.isFetching, // Check if PSUQuery is not fetching data
    }
  )

  const MoboQuery = useQuery(
    [`get_Mobo`, airesponse.Mobo],
    () => fetchProduct({ partRating: airesponse.Mobo, pcpart: partList.mobo }),
    {
      keepPreviousData: true,
      enabled: !!RAMQuery.data?.title && !RAMQuery.isFetching, // Check if RAMQuery is not fetching data
    }
  )

  const parts = [
    {
      id: 1,
      name: CPUQuery.data?.title,
      price: CPUQuery.data?.variants[0]?.prices[0]?.amount,
      image: CPUQuery.data?.thumbnail,
    },
    {
      id: 2,
      name: GPUQuery.data?.title,
      price: GPUQuery.data?.variants[0]?.prices[0]?.amount,
      image: GPUQuery.data?.thumbnail,
    },
    {
      id: 3,
      name: StorageSizeQuery.data?.title,
      price: StorageSizeQuery.data?.variants[0]?.prices[0]?.amount,
      image: StorageSizeQuery.data?.thumbnail,
    },
    {
      id: 4,
      name: PSUQuery.data?.title,
      price: PSUQuery.data?.variants[0]?.prices[0]?.amount,
      image: PSUQuery.data?.thumbnail,
    },
    {
      id: 5,
      name: RAMQuery.data?.title,
      price: RAMQuery.data?.variants[0]?.prices[0]?.amount,
      image: RAMQuery.data?.thumbnail,
    },
    {
      id: 6,
      name: MoboQuery.data?.title,
      price: MoboQuery.data?.variants[0]?.prices[0]?.amount,
      image: MoboQuery.data?.thumbnail,
    },
  ]

  return (
    <div className="flex flex-wrap">
      {parts.map((part) => (
        <div
          key={part.id}
          className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4"
        >
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
  )
}

export default Partlist
