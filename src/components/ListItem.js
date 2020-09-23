import React from 'react'
import { Link } from 'gatsby'
import { DENOMINATION } from '../../providers/inventoryProvider'
import Image from './Image'

const ListItem = ({ link, title, imageSrc, price }) =>  (
  <div className="
    w-100
    md:w-1/2
    lg:w-1/4
    p1 sm:p-2
  ">
    <Link to={`/${link}`}>
      <div className="h-72 flex justify-center items-center bg-light hover:bg-light-200">
        <div className="flex flex-column justify-center items-center">
          <Image alt={title} src={imageSrc} className="w-3/5" />
        </div>
      </div>
    </Link>
    <div>
      <p className="m-4 text-center text-l font-semibold mb-1">{title}</p>
      <p className="text-center text-xs text-gray-700 mb-4">{`${DENOMINATION}${price}`}</p>
    </div>
  </div>
)

export default ListItem