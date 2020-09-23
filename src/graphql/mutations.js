/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      PK
      SK
      GSI1PK
      GSI1SK
      name
      createdAt
      updatedAt
      products {
        items {
          PK
          SK
          GSI1PK
          GSI1SK
          vendorID
          price
          name
          image
          description
          currentInventory
          brand
          height
          weight
          upc
          categories
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      PK
      SK
      GSI1PK
      GSI1SK
      name
      createdAt
      updatedAt
      products {
        items {
          PK
          SK
          GSI1PK
          GSI1SK
          vendorID
          price
          name
          image
          description
          currentInventory
          brand
          height
          weight
          upc
          categories
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      PK
      SK
      GSI1PK
      GSI1SK
      name
      createdAt
      updatedAt
      products {
        items {
          PK
          SK
          GSI1PK
          GSI1SK
          vendorID
          price
          name
          image
          description
          currentInventory
          brand
          height
          weight
          upc
          categories
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createCategoryProduct = /* GraphQL */ `
  mutation CreateCategoryProduct(
    $input: CreateCategoryProductInput!
    $condition: ModelCategoryProductConditionInput
  ) {
    createCategoryProduct(input: $input, condition: $condition) {
      PK
      SK
      GSI1PK
      GSI1SK
      vendorID
      price
      name
      image
      description
      currentInventory
      brand
      height
      weight
      upc
      categories
      createdAt
      updatedAt
    }
  }
`;
export const updateCategoryProduct = /* GraphQL */ `
  mutation UpdateCategoryProduct(
    $input: UpdateCategoryProductInput!
    $condition: ModelCategoryProductConditionInput
  ) {
    updateCategoryProduct(input: $input, condition: $condition) {
      PK
      SK
      GSI1PK
      GSI1SK
      vendorID
      price
      name
      image
      description
      currentInventory
      brand
      height
      weight
      upc
      categories
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategoryProduct = /* GraphQL */ `
  mutation DeleteCategoryProduct(
    $input: DeleteCategoryProductInput!
    $condition: ModelCategoryProductConditionInput
  ) {
    deleteCategoryProduct(input: $input, condition: $condition) {
      PK
      SK
      GSI1PK
      GSI1SK
      vendorID
      price
      name
      image
      description
      currentInventory
      brand
      height
      weight
      upc
      categories
      createdAt
      updatedAt
    }
  }
`;
export const createVendor = /* GraphQL */ `
  mutation CreateVendor(
    $input: CreateVendorInput!
    $condition: ModelVendorConditionInput
  ) {
    createVendor(input: $input, condition: $condition) {
      PK
      SK
      description
      name
      website
      createdAt
      updatedAt
    }
  }
`;
export const updateVendor = /* GraphQL */ `
  mutation UpdateVendor(
    $input: UpdateVendorInput!
    $condition: ModelVendorConditionInput
  ) {
    updateVendor(input: $input, condition: $condition) {
      PK
      SK
      description
      name
      website
      createdAt
      updatedAt
    }
  }
`;
export const deleteVendor = /* GraphQL */ `
  mutation DeleteVendor(
    $input: DeleteVendorInput!
    $condition: ModelVendorConditionInput
  ) {
    deleteVendor(input: $input, condition: $condition) {
      PK
      SK
      description
      name
      website
      createdAt
      updatedAt
    }
  }
`;
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
      PK
      SK
      userID
      name
      email
      city
      createdAt
      updatedAt
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
      PK
      SK
      userID
      name
      email
      city
      createdAt
      updatedAt
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
      PK
      SK
      userID
      name
      email
      city
      createdAt
      updatedAt
    }
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      PK
      SK
      GSI1PK
      GSI1SK
      vendorID
      price
      name
      image
      description
      currentInventory
      brand
      height
      weight
      upc
      categories
      createdAt
      updatedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      PK
      SK
      GSI1PK
      GSI1SK
      vendorID
      price
      name
      image
      description
      currentInventory
      brand
      height
      weight
      upc
      categories
      createdAt
      updatedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      PK
      SK
      GSI1PK
      GSI1SK
      vendorID
      price
      name
      image
      description
      currentInventory
      brand
      height
      weight
      upc
      categories
      createdAt
      updatedAt
    }
  }
`;
