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
          items {
            PK
            SK
            name
            description
            brand
            price
            currentInventory
            categories
          }
        }
      }
      nextToken
    }
  }
`;