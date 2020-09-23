/* Amplify Params - DO NOT EDIT
	API_SINGLETABLEECOMMERCE_GRAPHQLAPIIDOUTPUT
	API_SINGLETABLEECOMMERCE_PRODUCTTABLE_ARN
	API_SINGLETABLEECOMMERCE_PRODUCTTABLE_NAME
	API_SINGLETABLEECOMMERCE_VENDORTABLE_ARN
	API_SINGLETABLEECOMMERCE_VENDORTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

const updateProductWithCategories = async ({
  info,
  identity,
  arguments,
  callback
}) => {
  
  const {
    input: { 
      name,
      brand,
      price,
      description,
      curentInventory,
      categories,
      currentCategories,
      PK,
      SK,
      weight,
      height,
      upc,
      createdAt
  },
  input
} = arguments;
  
  let UpdateExpression = "SET ";
  const ExpressionAttributeValues = {};
  const ExpressionAttributeNames = {};
  const updatedAt = new Date().toISOString()
  const CategoryProductItem = {}
  const inputWithUpdatedAt = {...input, updatedAt}
  Object.keys(inputWithUpdatedAt).forEach((key,index, arr) => {
    if (key !== "PK" && key !== "SK" && key !== "createdAt" && key !== 'currentCategories') {
      UpdateExpression = UpdateExpression += ` #${key} = :${key}${index === arr.length -1 ? "" : ","}`
      if (key === 'categories') {
        ExpressionAttributeValues[`:${key}`] = db.createSet(inputWithUpdatedAt[key])
      } else {
        ExpressionAttributeValues[`:${key}`] = inputWithUpdatedAt[key]
      }
      ExpressionAttributeNames[`#${key}`] = key
      CategoryProductItem[`${key}`] = inputWithUpdatedAt[key]
    }
  })
    const transactItemsParams = {
      TransactItems: [
        {
          Update: {
            TableName: process.env.API_CLIMATEHUB_PRODUCTTABLE_NAME,
            Key: { PK, SK },
            UpdateExpression,
            ExpressionAttributeValues,
            ExpressionAttributeNames 
          }
        },
        ...categories.map((categoryID) => ({
            Put: {
              TableName: process.env.API_CLIMATEHUB_PRODUCTTABLE_NAME,
              Item: {
                PK: `CATEGORY#${categoryID}`,
                SK: `${createdAt.split("T")[0]}#${SK}#${PK}`,
                ...CategoryProductItem
              }
            }
        }))
      ]
    }
    console.log(JSON.stringify(transactItemsParams))
    currentCategories.forEach(currentCategory => {
      console.log(currentCategory, categories[currentCategory])
      if (!categories.includes(currentCategory)) {
        transactItemsParams.TransactItems.push({
          Delete: {
            TableName: process.env.API_CLIMATEHUB_PRODUCTTABLE_NAME,
            Key: {
              PK: `CATEGORY#${currentCategory}`,
              SK: `${createdAt.split("T")[0]}#${SK}#${PK}`,
            }
          }
        })
      }
    })
     
    console.log(JSON.stringify(transactItemsParams))
    try {
      const Items = await db.transactWrite(transactItemsParams).promise()
      if (Items) {
        callback(null, {
          PK,
          SK,
          ...CategoryProductItem
        })
      }
     
    } catch (e) {
      console.log("error", JSON.stringify(e))
      callback(e, null)
    }
}


module.exports = {updateProductWithCategories};