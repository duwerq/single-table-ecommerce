/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
export const onCreateCategoryProduct = /* GraphQL */ `
  subscription OnCreateCategoryProduct {
    onCreateCategoryProduct {
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
export const onUpdateCategoryProduct = /* GraphQL */ `
  subscription OnUpdateCategoryProduct {
    onUpdateCategoryProduct {
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
export const onDeleteCategoryProduct = /* GraphQL */ `
  subscription OnDeleteCategoryProduct {
    onDeleteCategoryProduct {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
