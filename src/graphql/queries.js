/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCategory = /* GraphQL */ `
  query GetCategory($PK: ID!, $SK: ID!) {
    getCategory(PK: $PK, SK: $SK) {
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
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $PK: ID
    $SK: ModelIDKeyConditionInput
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCategorys(
      PK: $PK
      SK: $SK
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        PK
        SK
        GSI1PK
        GSI1SK
        name
        createdAt
        updatedAt
        products {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getCategoryProduct = /* GraphQL */ `
  query GetCategoryProduct($PK: ID!, $SK: ID!) {
    getCategoryProduct(PK: $PK, SK: $SK) {
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
export const listCategoryProducts = /* GraphQL */ `
  query ListCategoryProducts(
    $PK: ID
    $SK: ModelIDKeyConditionInput
    $filter: ModelCategoryProductFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCategoryProducts(
      PK: $PK
      SK: $SK
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
`;
export const getVendor = /* GraphQL */ `
  query GetVendor($PK: ID!, $SK: ID!) {
    getVendor(PK: $PK, SK: $SK) {
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
export const listVendors = /* GraphQL */ `
  query ListVendors(
    $PK: ID
    $SK: ModelIDKeyConditionInput
    $filter: ModelVendorFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listVendors(
      PK: $PK
      SK: $SK
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        PK
        SK
        description
        name
        website
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($PK: ID!, $SK: ID!) {
    getCustomer(PK: $PK, SK: $SK) {
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
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $PK: ID
    $SK: ModelIDKeyConditionInput
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCustomers(
      PK: $PK
      SK: $SK
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        PK
        SK
        userID
        name
        email
        city
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($PK: ID!, $SK: ID!) {
    getProduct(PK: $PK, SK: $SK) {
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
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $PK: ID
    $SK: ModelIDKeyConditionInput
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProducts(
      PK: $PK
      SK: $SK
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
`;
