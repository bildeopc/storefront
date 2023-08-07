// Import necessary dependencies and types from external libraries
import { medusaClient } from "@lib/config"
import { Product, StoreGetProductsParams } from "@medusajs/medusa"

// Set a constant for the collection limit
const COL_LIMIT = 15

// Function to get featured products
const getFeaturedProducts = async (): Promise<any> => {
  const payload = {} as Record<string, unknown>

  // Check if a specific product is defined in environment variables
  if (process.env.FEATURED_PRODUCTS) {
    payload.id = process.env.FEATURED_PRODUCTS as string
  } else {
    payload.limit = 3
  }

  // Fetch the list of products using the Medusa client
  const products = await medusaClient.products
    .list(payload)
    .then(({ products }) => products)
    .catch((_) => [])

  return products
}

// Function to get global data used in header and footer
const getGlobalData = async () => {
  let totalCount = 0

  // Fetch collections up to COL_LIMIT and get count
  const collections = await medusaClient.collections
    .list({ limit: COL_LIMIT })
    .then(({ collections, count }) => {
      totalCount = count
      return collections
    })
    .catch((_) => undefined)

  // Fetch featured products
  const featuredProducts = await getFeaturedProducts()

  return {
    navData: {
      // Provide information about collections and featured products
      hasMoreCollections: totalCount > COL_LIMIT,
      collections: collections?.map((c) => ({ id: c.id, title: c.title })) || [],
      featuredProducts,
    },
  }
}

// Function to get site data
export const getSiteData = async () => {
  const globalData = await getGlobalData()

  return {
    site: globalData,
  }
}

// Function to get data for a specific product
export const getProductData = async (handle: string) => {
  // Fetch product list using the Medusa client
  const data = await medusaClient.products
    .list({ handle })
    .then(({ products }) => products)

  const product = data[0]

  if (!product) {
    throw new Error(`Product with handle ${handle} not found`)
  }

  return {
    page: {
      data: product,
    },
  }
}

// Function to get initial products for a collection
const getInitialProducts = async (collectionId: string) => {
  // Fetch a limited number of products for the specified collection
  const result = await medusaClient.products
    .list({ collection_id: [collectionId], limit: 10 })
    .then(({ products, count }) => {
      return {
        initialProducts: products,
        count: count,
        hasMore: count > 10,
      }
    })
    .catch((_) => ({ initialProducts: [], count: 0, hasMore: false }))

  return result
}

// Function to get data for a specific collection
export const getCollectionData = async (id: string) => {
  const siteData = await getGlobalData()

  // Fetch collection data using the Medusa client
  const data = await medusaClient.collections
    .retrieve(id)
    .then(({ collection }) => collection)
    .catch(() => undefined)

  if (!data) {
    throw new Error(`Collection with handle ${id} not found`)
  }

  // Fetch initial products for the collection
  const additionalData = await getInitialProducts(id)

  return {
    page: {
      data,
      additionalData,
    },
    site: siteData,
  }
}

// Define type for parameters used in fetching a list of products
type FetchProductListParams = {
  pageParam?: number
  queryParams: StoreGetProductsParams
}

// Function to fetch a list of products
export const fetchProductsList = async ({
  pageParam = 0,
  queryParams,
}: FetchProductListParams) => {
  // Fetch products using the Medusa client with pagination and query parameters
  const { products, count, offset } = await medusaClient.products.list({
    limit: 12,
    offset: pageParam,
    ...queryParams,
  })

  return {
    response: { products, count },
    nextPage: count > offset + 12 ? offset + 12 : null,
  }
}
