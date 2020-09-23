import React from 'react'
import {Storage, API} from 'aws-amplify'
import { S3Image } from 'aws-amplify-react';
import { PhotoPicker } from 'aws-amplify-react';

import * as mutations from '../../graphql/mutations';
const AUTH_TYPE = {
  NONE: "NONE",
  API_KEY: "API_KEY",
  AWS_IAM: "AWS_IAM",
  AMAZON_COGNITO_USER_POOLS: "AMAZON_COGNITO_USER_POOLS",
  OPENID_CONNECT: "OPENID_CONNECT"
}


const previewStyle = {
  width: 320,
  height: 320,
  objectFit: "contain"
}

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const defaultState = {
  name: '', 
  brand: '',
  price: '', 
  categories: {
    "Agriculture": false,
    "Auto/Transportation": false,
    "Industrial": false,
    "Solar": false,
    "Smart Buildings": false
  }, 
  showCategories: false,
  image: '', 
  description: '', 
  currentInventory: '',
  previewImg: null,
  imageUrl: null
}
class AddInventory extends React.Component {
  constructor(props) {
    super(props);

    let initialState = {
      ...defaultState,
      categories: {...defaultState.categories}
    }

    const { editInventory = {} } = this.props
    console.log({editInventory})
    if (editInventory.PK) {
      const  {
        name = '', 
        brand = '',
        price = '', 
        description = '',
        curentInventory = '',
        categories = [],
        PK,
        SK
      } = editInventory
  
      initialState = {
        ...initialState,
        name,
        brand,
        price,
        description,
        curentInventory,
        PK,
        SK,
        imageUrl: `${PK.replace('#','-')}/${SK.replace('#','-')}.png`
      }
      if (categories && categories.length > 0)
        Object.keys(initialState.categories).forEach(key => {
          if (categories.includes(key.replace(" ", "-").toUpperCase())) {
            initialState.categories[key] = true
          } else {
            initialState.categories[key] = false
          }
      })
    }
    console.log({initialState})
    this.state = initialState
  }
  

  clearForm = () => {

    this.setState(() => (defaultState))
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }
  onImageChange = async (e) => {
    const file = e.target.files[0];
    const previewImg = await toBase64(file);

    this.setState({ image: file, previewImg})
  }

  uploadImage = async ({vendorID, productID}) => {
    if (this.state.image) {
      try {
        const storageUrl = await Storage.put(`${vendorID.replace('#','-')}/${productID.replace('#','-')}.png`, this.state.image, {
          contentType: 'image/png',
        })
        if (storageUrl) {
          await this.props.fetchInventory()
          this.props.navigate('/inventory')
        }

      } catch (error) {
        console.log({error})
      }
    } else {
      await this.props.fetchInventory()
      this.props.navigate('/inventory')
    }
  }

  addItem = async () => {
    const {  attributes } = this.props.context.currentUser
    const {
      name,
      brand,
      price,
      categories,
      description,
      PK,
      SK
    } = this.state;

    const input = {
      name,
      brand,
      price: Number(price),
      categories: [],
      vendorID: attributes["custom:vendorID"],
      description
    };

    /* Type Cateogory { SK: 'CATEGORY#<categoryID> } */
    Object.keys(categories).forEach(key => {if(categories[key]) { 
      const categoryID = key.replace(" ", "-").toUpperCase();
      input.categories.push(categoryID)
    }})

    if (SK) {
      const {categories: currentCategories, createdAt} = this.props.editInventory;
      this.updateItem({...input, PK, SK, currentCategories, createdAt })
    } else {
      try {
        const {data: {addProductToCategory}} = await API.graphql({query: mutations.addProductToCategory, variables: {input}, authMode: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS})
        if (addProductToCategory) {
          this.uploadImage({vendorID: addProductToCategory.PK, productID: addProductToCategory.SK})
          
        }
      } catch (error) {
         console.log({error})
      }
    }
  }

  updateItem = async (input) => {
    try {
      const {data: {updateProductWithCategories}} = await API.graphql({query: mutations.updateProductWithCategories, variables: {input}, authMode: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS})
      if (updateProductWithCategories) {
        this.uploadImage({vendorID: updateProductWithCategories.PK, productID: updateProductWithCategories.SK})
      }
    } catch (error) {
       console.log({error})
    }
  }
  render() {
    const {
      name, brand, price, categories, image, imageUrl,description, currentInventory, PK, SK
    } = this.state
   
    return (
      <div className="flex flex-col flex-1 items-center w-fw">
        <h3>{this.props.editInventory ? 'Edit Product' : 'Add Product'}</h3>
        <div className="flex flex-1 justify-center w-1/2" style={{minWidth: 480}}>
          <div className="w-full max-w-2xl">
            <form className="bg-white shadow-xs rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Product name
                </label>
                <input
                onChange={this.onChange}
                value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Product name" name="name" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Product price
                </label>
                <input
                onChange={this.onChange}
                value={price} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="Product price" name="price" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Product Description
                </label>
                <input
                onChange={this.onChange}
                value={description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Product Description" name="description" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item image">
                  Product image
                </label>
                <input
                  type="file"
                  onChange={(e) => this.onImageChange(e)}
                />
               {this.state.previewImg && <img src={this.state.previewImg} style={previewStyle}/>}
              </div>
              {!this.state.previewImg && 
                <div style={{maxWidth: 320, maxHeight: 320}}>
                  <S3Image imgKey={imageUrl} />
                </div>
              }
              <div className="mb-4 relative z-10">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categories">Choose categories:</label>
                
                  <div className="w-full">
                    <span className="rounded-md shadow-sm">
                      <button
                        onClick={e => {
                          e.preventDefault()
                          this.setState({showCategories: !this.state.showCategories})
                        }}
                      
                          type="button" className="inline-flex flex-row justify-between items-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150" id="options-menu" aria-haspopup="falses" aria-expanded="false">
                        {/* Options
                        <!-- Heroicon name: chevron-down --> */}
                        <div className="flex flex-row justify-start">
                        {Object.keys(categories).some(key => categories[key]) ?
                          Object.keys(categories).map((key,index) => categories[key] &&
                            <span className={`${index === 0 ? "px-1": "px-4"} text-gray-700 mg-0 `}>{key}</span>
                          )
                          :
                          <span className="px-1 text-gray-700 mg-0 ">Categories</span>
                          }
                          </div>
                        <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  </div>
              {/* 
                <!--
                  Dropdown panel, show/hide based on dropdown state.

                  Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                  Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                --> */}
                
                <div className={`origin-top-left ${this.state.showCategories ? 'absolute' : 'hidden'} left-0 mt-2 w-full rounded-md shadow-lg bg-white`}>
                  <div className="rounded-md bg-white shadow-xs">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      
                      {Object.keys(categories).map(key => (
                          <button 
                            onClick={(e) => {
                                e.preventDefault()
                                console.log('categories', categories[key])
                                this.setState(
                                  prevState => ({
                                    ...prevState, 
                                    categories: {
                                      ...prevState.categories, 
                                      [key]: !prevState.categories[key]
                                    } 
                                  })
                                )
                              }}
                              className={`${categories[key] ? 'bg-gray-400 text-gray-900' : ''} text-left block px-4 py-2 text-sm leading-5 text-gray-700 w-full hover:bg-gray-200 hover:text-gray-900 focus:outline-none`} role="menuitem">
                              {key}
                            </button>
                      ))}
                    </div>
                  </div>
                
              </div>
              </div>
               <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
                  Product brand
                </label>
                <input
                onChange={this.onChange}
                value={brand} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="brand" placeholder="Product brand" name="brand" />
              </div>
              <div className="flex items-center justify-between mt-4">
                <button onClick={this.addItem} className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  {this.state.PK ? "Update Product" : "Add Product"}
                </button>
                <a onClick={this.clearForm} className="inline-block align-baseline font-bold text-sm" href="#">
                  Clear Form
                </a>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
              &copy;2020 JAMstack ECommerce. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default AddInventory