import Amplify, { API } from "aws-amplify"
import * as queries from "../src/graphql/customQueries"
import awsconfig from "../src/aws-exports"
/*
Inventory items must adhere to the following schema:

type Product {
  id: ID!
  categories: [String]!
  price: Float!
  name: String!
  image: String!
  description: String!
  currentInventory: Int!
  brand: String
  
  height: String
  weight: String
  upc: String
}
*/
Amplify.configure(awsconfig)

const productImageUrl = ({SK}) => {
  const productVendorKeys = SK.split("#")
  const image = `https://${awsconfig.aws_user_files_s3_bucket}.s3.amazonaws.com/public/VENDOR-${productVendorKeys[4]}/PRODUCT-${productVendorKeys[2]}.png`
  return image;
}

const categoryImageUrl = ({SK}) => {
  return `https://${awsconfig.aws_user_files_s3_bucket}.s3.amazonaws.com/public/${SK.replace('#', '/')}.png`
}

async function getInventory() {
  
  try {
    const {
      data: { listCategorys },
    } = await API.graphql({ query: queries.listCategorys, PK: "CATEGORY" })
  
    if (listCategorys) {
      let inventory = []
      const inventoryByCategory = listCategorys.items.map(category => {
        let productsWithImageUrls = []
        if (category.products && category.products.items && category.products.items.length > 0) {
          productsWithImageUrls = category.products.items.map(product =>  {
            const inventoryWithNavInfo = {
              id: product.SK,
              ...product,
              categories: [category.name],
              image: productImageUrl({SK: product.SK})
            }
            inventory.push(inventoryWithNavInfo)
            return inventoryWithNavInfo
          })
        }
        return {
          ...category,
          products: {
            ...category.products,
            items: productsWithImageUrls,
          },
          image: categoryImageUrl({SK: category.SK})
        }
      })
      return { inventory, inventoryByCategory }
    }
    
  } catch (error) {
    console.log("error", JSON.stringify(error))
  }
}

const DENOMINATION = "$"

export { DENOMINATION, getInventory as default }
