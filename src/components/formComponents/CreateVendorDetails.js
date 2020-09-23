import React from 'react'
import { API } from 'aws-amplify'
import * as mutations from '../../graphql/mutations';

const AUTH_TYPE = {
  NONE: "NONE",
  API_KEY: "API_KEY",
  AWS_IAM: "AWS_IAM",
  AMAZON_COGNITO_USER_POOLS: "AMAZON_COGNITO_USER_POOLS",
  OPENID_CONNECT: "OPENID_CONNECT"
}
const initialState = {
  name: '', website: '', phoneNumber: '', description: ''
}

class CreateVendorDetails extends React.Component {
  state = initialState

  async componentDidMount() {
    // cons
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

// createLocation = async () => {
//   const {
//     selectedPlace,
//     phoneNumber,
//     email,
//     website
//   } = this.state
//   const {
//     formattedSuggestion: {mainText: name},
//     formatted_address: address,
//     latLng: {
//       lat,
//       lng
//     },
//     place_id: placeID,
//     address_components
//   } = selectedPlace;
//   console.log({
//   phoneNumber: `+1${phoneNumber}`,
//   email,
//   website,
//   name,
//   address,
//   placeID,
//   gps: {
//     lon: lng,
//     lat
//   }
// })
//   const location = {
//     phoneNumber: `+1${phoneNumber}`,
//     email,
//     website,
//     name,
//     address: getAddressComponents(address_components),
//     gps: {
//       lon: lng,
//       lat
//     },
//     placeID
//   };
 
//   try {
//     const {data: {createLocation}} = await API.graphql(graphqlOperation(mutations.createLocation, {location}));
//     if (createLocation) {
//       navigate("/app/stripe-signup", {state: {location: {...location,phoneNumber, id: createLocation.id}}})
//     }
//   } catch (error) {
//     console.log({error})
//   }
// }

createVendor = async () => {
  try {
    const {data: {addNewVendor}} = await API.graphql({query: mutations.addNewVendor, variables: {input: this.state}, authMode: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS })
  } catch (error) {
    console.log({error})
  }
}

  render() {
    const {
      name, website, phoneNumber, description
    } = this.state
    return (
      <>
        <h3>Add Vendor Details</h3>
        <div className="flex w-full">
          <div className="w-full">
          <form className="bg-white shadow-xs rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Vendor Name
                </label>
                <input
                onChange={this.onChange}
                value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Vendor Name" name="name" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Vendor Description
                </label>
                <input
                onChange={this.onChange}
                value={description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Vendor Description" name="description" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
                  Vendor Website
                </label>
                <input
                onChange={this.onChange}
                value={website} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="website" placeholder="Vendor Website" name="website" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                 Vendor Phone Number
                </label>
                <input
                onChange={this.onChange}
                value={phoneNumber} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="phoneNumber" placeholder="Vendor Phone Number" name="phoneNumber" />
              </div>
              <div className="flex items-center justify-between mt-4">
                <button onClick={this.createVendor} className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Create Vendor
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
      </>
    )
  }
}

export default CreateVendorDetails
