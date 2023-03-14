import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Profile extends Component {
  state = {
    profileDetails: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const profileDetail = fetchedData.profile_details
      const updatedprofileDetails = {
        name: profileDetail.name,
        profileImageUrl: profileDetail.profile_image_url,
        shortBio: profileDetail.short_bio,
      }
      this.setState({profileDetails: updatedprofileDetails})
    }
    if (response.status === 400) {
      console.log('error')
    }
  }

  render() {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-bg-container">
        <div className="profile-card">
          <img src={profileImageUrl} alt="name" className="profile_image_url" />
          <h1 className="name">{name}</h1>
          <p className="shortBio">{shortBio} </p>
        </div>
      </div>
    )
  }
}

export default Profile
