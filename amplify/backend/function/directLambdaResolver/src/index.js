/* Amplify Params - DO NOT EDIT
	API_SINGLETABLEECOMMERCE_GRAPHQLAPIIDOUTPUT
	API_SINGLETABLEECOMMERCE_PRODUCTTABLE_ARN
	API_SINGLETABLEECOMMERCE_PRODUCTTABLE_NAME
	API_SINGLETABLEECOMMERCE_VENDORTABLE_ARN
	API_SINGLETABLEECOMMERCE_VENDORTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const {addProductToCategory} = require("./resolvers/addProductToCategory")
const {addNewVendor} = require("./resolvers/addNewVendor")
const {updateProductWithCategories} = require("./resolvers/updateProductWithCategories")

exports.handler = async (event, context, callback) => {
    // TODO implement
    console.log(JSON.stringify(event), context)
    
    const {info, source, identity, arguments, stash} = event;
    console.log('info fieldname', info.fieldname)
     switch(info.fieldName) {
        case "addProductToCategory":

            return addProductToCategory({
                info,
                identity,
                arguments,
                callback
            });
        case "addNewVendor":
            
            return addNewVendor({
                info,
                identity,
                arguments,
                callback
            });
            // updateProductWithCategories
        case "updateProductWithCategories":
            console.log('update')
            return updateProductWithCategories({
                info,
                identity,
                arguments,
                callback
            });
            

        default:
            callback("Unknown field, unable to resolve" + info.fieldName, null);
            break;
    }
};