/* Amplify Params - DO NOT EDIT
	API_SINGLETABLEECOMMERCE_GRAPHQLAPIIDOUTPUT
	API_SINGLETABLEECOMMERCE_PRODUCTTABLE_ARN
	API_SINGLETABLEECOMMERCE_PRODUCTTABLE_NAME
	API_SINGLETABLEECOMMERCE_VENDORTABLE_ARN
	API_SINGLETABLEECOMMERCE_VENDORTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

const addProductToCategory = async ({
  info,
  identity,
  arguments,
  callback
}) => {
  console.log({info, identity, arguments})
  const {input: { 
    productID, 
    categories, 
    vendorID,
    price,
  	name,
  	image,
  	description,
  	currentInventory,
  	brand,
  	height,
  	weight,
  	upc
    
  }} = arguments;
  
  
  if (!productID) {
    let newProductID = uuidv4()
    let createdAt = new Date().toISOString();
    const transactItemsParams = {
      TransactItems: [
        {
          Put: {
            TableName: process.env.API_CLIMATEHUB_PRODUCTTABLE_NAME,
            ConditionExpression: "attribute_not_exists(PK) AND attribute_not_exists(SK)",
            Item: {
              PK: `VENDOR#${vendorID}`,
              SK: `PRODUCT#${newProductID}`,
              price,
              // image,
              categories: categories,
              description,
              brand,
              height,
              weight,
              upc,
              name,
              createdAt
            }
          },
        },
        ...categories.map((categoryID) => ({
            Put: {
              TableName: process.env.API_CLIMATEHUB_PRODUCTTABLE_NAME,
              ConditionExpression: "attribute_not_exists(PK) AND attribute_not_exists(SK)",
              Item: {
                PK: `CATEGORY#${categoryID}`,
                SK: `${createdAt.split("T")[0]}#PRODUCT#${newProductID}#VENDOR#${vendorID}`,
                price,
                // image,
                description,
                brand,
                height,
                weight,
                upc,
                name
              }
            }
        }))
        
      ]
    }
     
    try {
      const Items = await db.transactWrite(transactItemsParams).promise()
      if (Items) {
        const newProduct = {
          PK: `VENDOR#${vendorID}`,
          SK: `PRODUCT#${newProductID}`,
          price,
          // image,
          categories: categories,
          description,
          brand,
          height,
          weight,
          upc,
          name,
          createdAt
        }
        callback(null, newProduct)
      }
     
    } catch (e) {
      console.log("error", JSON.stringify(e))
      callback(e, null)
    }
  } else if (productID) {
    let productRecord = null;
    try {
      const getProductParams = {
        TableName: process.env.API_CLIMATEHUB_PRODUCTTABLE_NAME,
        AttributesToGet: [
          'PK',
          'SK',
          'GSI1PK',
          'GSI1SK',
          'price',
          'image',
          'description',
          'currentInventory',
          'brand',
          'height',
          'weight',
          'upc',
          'vendorID',
          'name',
          'createdAt',
          'categories'
        ],
        Key: {
          PK: vendorID,
          SK: productID
        }
      };
      
      // if ()
      const { Item} = await db.get(getProductParams).promise();
    
      if (Item.PK && Item.SK) {
       productRecord = Item;
      }
    } catch (error) {
      callback(error, null)
    }
    
    if (productRecord) {
      const productCreatedAt = productRecord.createdAt.split("T")[0];
      const {
        price,
        image,
        description,
        brand,
        height,
        weight,
        upc,
        name,
        categories
      } = productRecord;
      
      let newCategories = categories;
      
      if (categories && categories.values && categories.values.length > 0) {
        newCategories = [...categories.values, ...categories]
      }
      
      const transactItemsParams = {
        TransactItems: [
          ...categories.map((categoryID) => ({
            Put: {
              TableName: process.env.API_CLIMATEHUB_PRODUCTTABLE_NAME,
              ConditionExpression: "attribute_not_exists(PK) AND attribute_not_exists(SK)",
              Item: {
                PK: `CATEGORY#${categoryID}`,
                SK: `${productCreatedAt}#PRODUCT#${productID}#VENDOR#${vendorID}`,
                price,
                // image,
                description,
                brand,
                height,
                weight,
                upc,
                name
              }
            }
          })),
          {
            Update: {
                TableName: process.env.API_CLIMATEHUB_PRODUCTTABLE_NAME,
                Key:{
                  PK: vendorID,
                  SK: productID
                },
                UpdateExpression: 'set #categories = :categories',
                ExpressionAttributeNames: {
                  '#categories': 'categories'
                },
                ExpressionAttributeValues: {
                  ':categories': db.createSet(newCategories)
                }
            }
          }
        ]
      }
       
      try {
        const Items = await db.transactWrite(transactItemsParams).promise()
        if (Items) {
          const newCategoryProduct = {
            PK: `VENDOR#${vendorID}`,
            SK: `PRODUCT#${productID}`,
            price,
            categories: newCategories,
            description,
            brand,
            height,
            weight,
            upc,
            name
          }
          callback(null, newCategoryProduct)
        }
       
      } catch (e) {
        console.log("error", JSON.stringify(e))
        callback(e, null)
      }
    }
  }
  
}


module.exports = {addProductToCategory};