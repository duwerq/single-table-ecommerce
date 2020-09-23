import React from "react"
import { API, Auth } from "aws-amplify";
import { toast } from 'react-toastify';
import awsconfig from '../aws-exports';
import * as queries from "../graphql/customQueries"


const productImageUrl = ({SK}) => {
  const productVendorKeys = SK.split("#")
  const image = `https://${awsconfig.aws_user_files_s3_bucket}.s3.amazonaws.com/public/VENDOR-${productVendorKeys[4]}/PRODUCT-${productVendorKeys[2]}.png`
  return image;
}

const categoryImageUrl = ({SK}) => {
  return `https://${awsconfig.aws_user_files_s3_bucket}.s3.amazonaws.com/public/${SK.replace('#', '/')}.png`
}



const STORAGE_KEY = 'GATSBY_ECOMMERCE_STARTER_'

const initialState = {
  cart: [],
  numberOfItemsInCart: 0,
  total: 0
}

const SiteContext = React.createContext()

function calculateTotal(cart) {
  const total = cart.reduce((acc, next) => {
    const quantity = next.quantity
    acc = acc + JSON.parse(next.price) * quantity
    return acc
  }, 0)
  return total
}

class ContextProviderComponent extends React.Component {
  state = {
    currentUser: null,
    currentUserLoading: true,
    inventory: [],
    categories: []
  }
  async componentDidMount() {
    
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (!storageState) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
      }
    }
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
        API.configure({aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS"})
        this.getInventory();
        this.setState({currentUser, currentUserLoading: false})
      }
    } catch (error) {
      console.log({error})
      this.getInventory();
      this.setState({currentUserLoading: false})
    }
  }

  setItemQuantity = (item) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    const { cart } = storageState
    const index = cart.findIndex(cartItem => cartItem.id === item.id)
    cart[index].quantity = item.quantity
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      cart, numberOfItemsInCart: cart.length, total: calculateTotal(cart)
    }))
    this.forceUpdate()
  }

  addToCart = item => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    const { cart } = storageState
    if (cart.length) {
      const index = cart.findIndex(cartItem => cartItem.id === item.id)
      if (index >= Number(0)) {
        /* If this item is already in the cart, update the quantity */
        cart[index].quantity = cart[index].quantity + item.quantity
      } else {
        /* If this item is not yet in the cart, add it */
        cart.push(item)
      }
    } else {
      /* If no items in the cart, add the first item. */
      cart.push(item)
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      cart, numberOfItemsInCart: cart.length, total: calculateTotal(cart)
    }))
    toast("Successfully added item to cart!", {
      position: toast.POSITION.TOP_LEFT
    })
    this.forceUpdate()
  }

  removeFromCart = (item) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    let { cart } = storageState
    cart = cart.filter(c => c.id !== item.id)

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      cart, numberOfItemsInCart: cart.length, total: calculateTotal(cart)
    }))
    this.forceUpdate()
  }

  clearCart = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
    this.forceUpdate()
  }

  updateCurrentUser = currentUser => {
    if (currentUser) {
      API.configure({aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS"})
      
    } else {
      API.configure({aws_appsync_authenticationType: "AWS_IAM"})
    }
    this.setState({currentUser})
  }

  getInventory = async () => {
    try {
      const {
        data: { listCategorys },
      } = await API.graphql({ query: queries.listCategorys, PK: "CATEGORIES" })
    
      if (listCategorys) {
        let inventory = []
        const inventoryByCategory = listCategorys.items.map(category => {
          let productsWithImageUrls = []
          if (category.products && category.products.items && category.products.items.length > 0) {
            productsWithImageUrls = category.products.items.map(product =>  {
              const productIDRegex = /PRODUCT#.*?\#/g;
              const productID = product.SK.match(productIDRegex)[0].replace(/\#/g, "");
              const inventoryWithNavInfo = {
                id: productID,
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

        this.setState({ inventory, categories: inventoryByCategory })
      }
      
    } catch (error) {
      console.log("error", JSON.stringify(error))
    }
  }

  render() {
    let state = initialState
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (storageState) {
        state = JSON.parse(storageState)
      }
    }

    return (
      
            <SiteContext.Provider 
            value={{
              ...state,
               categories: this.state.categories,
               inventory: this.state.inventory,
               addToCart: this.addToCart,
               clearCart: this.clearCart,
               removeFromCart: this.removeFromCart,
               setItemQuantity: this.setItemQuantity,
               currentUser: this.state.currentUser,
               updateCurrentUser: this.updateCurrentUser
            }}>
             {!this.state.currentUserLoading && this.props.children}
           </SiteContext.Provider>
     
    )
  }
}

export {
  SiteContext,
  ContextProviderComponent
}