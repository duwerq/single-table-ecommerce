import React from 'react'

import { SiteContext, ContextProviderComponent } from '../context/mainContext'
import { DENOMINATION } from '../../providers/inventoryProvider'
import { FaTimes, FaLongArrowAltRight } from 'react-icons/fa'
import { Link } from 'gatsby'
import CartLink from '../components/CartLink'
import QuantityPicker from '../components/QuantityPicker'
import { slugify } from '../../utils/helpers'
import Image from '../components/Image'

const Cart = ({ context }) => {
  const {
    numberOfItemsInCart, cart, removeFromCart, total, setItemQuantity
  } = context
  const cartEmpty = numberOfItemsInCart === Number(0)

  function increment(item) {
    item.quantity = item.quantity + 1
    setItemQuantity(item)
  }

  function decrement(item) {
    if (item.quantity === 1) return
    item.quantity = item.quantity - 1
    setItemQuantity(item)
  }

  return (
    <>
      <CartLink />
      <div className="flex flex-col items-center pb-10">
        <div className="
          flex flex-col w-full
          c_large:w-c_large
        ">
          <div className="pt-10 pb-8">
            <h1 className="text-5xl font-light">Your Cart</h1>
          </div>

          {
            cartEmpty ? (
              <h3>No items in cart.</h3>
            ) : (
              <div className="flex flex-col">
                <div className="">
                  {
                    cart.map((item) => {
                      return (
                        <div className="border-b py-10" key={item.id}>

                          { /* Responsive - Desktop */}
                          <div className="flex items-center hidden md:flex">
                            <Link to={slugify(item.name)}>
                              <Image className="w-32 m-0" src={item.image} alt={item.name} />
                            </Link>
                            <Link to={slugify(item.name)}>
                              <p className="
                              m-0 pl-10 text-gray-600 text-sm w-56
                              ">
                                {item.name}
                              </p>
                            </Link>
                            <div className="ml-4">
                              <QuantityPicker
                                numberOfitems={item.quantity}
                                increment={() => increment(item)}
                                decrement={() => decrement(item)}
                              />
                            </div>
                            <div className="flex flex-1 justify-end">
                              <p className="m-0 pl-10 text-gray-900 tracking-tighter font-semibold">
                                {DENOMINATION + item.price}
                              </p>
                            </div>
                            <div role="button" onClick={() => removeFromCart(item)} className="
                            m-0 ml-10 text-gray-900 text-s cursor-pointer
                            ">
                              <FaTimes />
                            </div>
                          </div>

                          { /* Responsive - Mobile */}
                          <div className="flex items-center flex md:hidden">
                            <Link to={slugify(item.name)}>
                              <Image className="w-32 m-0" src={item.image} alt={item.name} />
                            </Link>
                            <div>
                              <Link to={slugify(item.name)}>
                                <p className="
                                m-0 pl-6 text-gray-600 text-base
                                ">
                                  {item.name}
                                </p>
                              </Link>
                              <div className="ml-6 mt-4 mb-2">
                                <QuantityPicker
                                  hideQuantityLabel
                                  numberOfitems={item.quantity}
                                  increment={() => increment(item)}
                                  decrement={() => decrement(item)}
                                />
                              </div>
                              <div className="flex flex-1">
                                <p className="text-lg m-0 pl-6 pt-4 text-gray-900 tracking-tighter font-semibold">
                                  {DENOMINATION + item.price}
                                </p>
                              </div>
                            </div>
                            <div role="button" onClick={() => removeFromCart(item)} className="
                            m-0 ml-10 text-gray-900 text-s cursor-pointer mr-2
                            ">
                              <FaTimes />
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>  
            </div>
            )
          }
          <div className="flex flex-1 justify-end py-8">
            <p className="text-sm pr-10">Total</p>
            <p className="font-semibold tracking-tighter">{DENOMINATION + total}</p>
          </div>
          {!cartEmpty && (
            <Link to="/checkout" className="flex flex-1 justify-end">
              <div className="cursor-pointer flex">
                <p className="text-gray-600 text-sm mr-2">Proceed to check out</p>
                <FaLongArrowAltRight className="text-gray-600 mt-1" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

function CartWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {
          context => <Cart {...props} context={context} />
        }
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}


export default CartWithContext