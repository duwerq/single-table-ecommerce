
/* eslint-disable-line */ 
// const aws = require('aws-sdk');
// const { v4: uuidv4 } = require('uuid');
// const db = new aws.DynamoDB.DocumentClient();
// const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

// const addNewVendor = async ({ 
//    info,
//   identity,
//   arguments,
//   callback
// }) => {

//   const vendorID = uuidv4();
//   const Item = {
//       PK: `VENDOR#${vendorID}`,
//       SK: `VENDOR#${vendorID}`,
//       ...arguments.input,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     }
//   const createVendorPutParams = {
//     TableName: process.env.API_SINGLETABLEECOMMERCE_VENDORTABLE_ARN,
//     Item
//   };

//   try {
//     const newVendor = await db.put(createVendorPutParams).promise();  
//     console.log({newVendor})
//     if (newVendor) {
//      const updatedVendorID = await updateCognitoVendorID({vendorID, username: identity.username});
//      if (updatedVendorID.error) {
//       callback("Unable to update vendorID", Item)
//      } else {
//        callback(null, Item)
//      }
//     }
//   } catch (error) {
//     callback(error, null);
//   }
// };

// const updateCognitoVendorID = async ({vendorID, username}) => {
//   const addUserParams = {
//     UserAttributes: [
//       {
//         Name: "custom:vendorID",
//         Value: vendorID
//       }
//     ],
//     UserPoolId: process.env.AUTH_SINGLETABLEECOMMERCEE0C0FE59_USERPOOLID
//     Username: username
//   };

//   try {
//     await cognitoidentityserviceprovider.adminUpdateUserAttributes(addUserParams).promise();
//     return {}
//   } catch (error) {
//     console.log({error})
//     return {error};
//   }
// }

// module.exports = {addNewVendor};