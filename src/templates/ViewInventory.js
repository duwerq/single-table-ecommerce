import React from 'react'

import { S3Image } from 'aws-amplify-react';

import { DENOMINATION } from '../../providers/inventoryProvider'
import { Link } from 'gatsby'
import { slugify } from '../../utils/helpers'
import { FaTimes } from 'react-icons/fa'

class ViewInventory extends React.Component {
  state = {
    inventory: [],
    currentItem: {},
    editingIndex: []
  }

  editItem = (item, index) => {
    this.props.navigate(`/inventory/edit/${slugify(item.SK)}`)  
  }
  // saveItem = async index => {
  //   const inventory = [...this.state.inventory]
  //   inventory[index] = this.state.currentItem
  //   // update item in database
  //   this.setState({ editingIndex: null, inventory })
  // }
  // deleteItem = async index => {
  //   const inventory = [...this.state.inventory.slice(0, index), ...this.state.inventory.slice(index + 1)]
  //   this.setState({ inventory })
  // }
  // onChange = event => {
  //   const currentItem = {
  //     ...this.state.currentItem,
  //     [event.target.name]: event.target.value
  //   }
    
  //   this.setState({ currentItem })
  // }
  render() {
    const { inventory } = this.props
    
    return (
      <div>
        <h2>Inventory</h2>
        {
          inventory.map((item, index) => {
            return (
              <div className="border-b py-10" key={item.id}>
                <div className="flex items-center">
                  {/* <Link to={slugify(item.name)}> */}
                  <div style={{maxWidth: 320, maxHeight: 320}}>
                    <S3Image level="public" imgKey={`${item.PK.replace('#','-')}/${item.SK.replace('#','-')}.png`} onLoad={url => console.log(url)}  />
                    </div>
                  {/* </Link> */}
                  <Link to={slugify(item.name)}>
                    <p className="m-0 pl-10 text-gray-600 text-sm">
                      {item.name}
                    </p>
                  </Link>
                  <div className="flex flex-1 justify-end">
                    <p className="m-0 pl-10 text-gray-900 tracking-tighter text-sm">In stock: {item.currentInventory}</p>
                    <p className="m-0 pl-20 text-gray-900 tracking-tighter font-semibold">
                      {DENOMINATION + item.price}
                    </p>
                  </div>
                  <div className="flex items-center m-0 ml-10 text-gray-900 text-s cursor-pointer">
                    <FaTimes onClick={() => this.deleteItem(index)} />
                    <p role="button" onClick={() => this.editItem(item)} className="text-sm ml-10 m-0">Edit</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default ViewInventory