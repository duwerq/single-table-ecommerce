import React from "react"
import { Storage, API } from "aws-amplify"
import { S3Image } from "aws-amplify-react"
import * as mutations from '../../graphql/mutations';

const AUTH_TYPE = {
  NONE: "NONE",
  API_KEY: "API_KEY",
  AWS_IAM: "AWS_IAM",
  AMAZON_COGNITO_USER_POOLS: "AMAZON_COGNITO_USER_POOLS",
  OPENID_CONNECT: "OPENID_CONNECT",
}

const previewStyle = {
  width: 320,
  height: 320,
  objectFit: "contain",
}

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

const defaultState = {
  name: "",
  image: "",
  previewImg: null,
  imageUrl: null,
}
class AddInventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {...defaultState}
  }

  clearForm = () => {
    this.setState(() => defaultState)
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onImageChange = async e => {
    const file = e.target.files[0]
    const previewImg = await toBase64(file)

    this.setState({ image: file, previewImg })
  }

  uploadImage = async categoryName => {
    if (this.state.image) {
      try {
        const storageUrl = await Storage.put(
          `CATEGORY/${categoryName}.png`,
          this.state.image,
          {
            contentType: "image/png",
          }
        )
        if (storageUrl) {
          // await this.props.fetchInventory()
          this.props.navigate("/inventory")
        }
      } catch (error) {
        console.log({ error })
      }
    } else {
      // await this.props.fetchInventory()
      this.props.navigate("/inventory")
    }
  }

  addCategory = async () => {
    const { attributes } = this.props.context.currentUser
    const { name = "" } = this.state
    const categoryName = name.replace(" ", "-").toUpperCase()
    try {
      const {
        data: { createCategory },
      } = await API.graphql({
        query: mutations.createCategory,
        variables: { 
          input: {
            PK: "CATEGORY",
            SK: `CATEGORY#${categoryName}`,
            name: name
          }
         },
        authMode: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      })
      if (createCategory) {
        this.uploadImage({ categoryName })
      }
    } catch (error) {
      console.log({ error })
    }
  }

  render() {
    const {
      name,
      brand,

      imageUrl,
    } = this.state
    console.log("add category")
    return (
      <div className="flex flex-col flex-1 items-center w-fw">
        <h3>Add Category</h3>
        <div
          className="flex flex-1 justify-center w-1/2"
          style={{ minWidth: 480 }}
        >
          <div className="w-full max-w-2xl">
            <form className="bg-white shadow-xs rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Category name
                </label>
                <input
                  onChange={this.onChange}
                  value={name}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Product name"
                  name="name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="item image"
                >
                  Category Image
                </label>
                <input type="file" onChange={e => this.onImageChange(e)} />
                {this.state.previewImg && (
                  <img src={this.state.previewImg} style={previewStyle} />
                )}
              </div>
              {!this.state.previewImg && (
                <div style={{ maxWidth: 320, maxHeight: 320 }}>
                  <S3Image imgKey={imageUrl} />
                </div>
              )}
              {/* <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="brand"
                >
                  Product brand
                </label>
                <input
                  onChange={this.onChange}
                  value={brand}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="brand"
                  placeholder="Product brand"
                  name="brand"
                />
              </div> */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={this.addCategory}
                  className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Add Category
                </button>
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
