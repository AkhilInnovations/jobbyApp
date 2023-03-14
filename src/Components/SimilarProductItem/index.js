import {BsStarFill} from 'react-icons/bs'

// import {Link} from 'react-router-dom'

import {MdLocationOn, MdWork} from 'react-icons/md'

import './index.css'

const SimilarProductItem = props => {
  const {eachSimilarJob} = props

  const getFormattedData = {
    companyLogoUrl: eachSimilarJob.company_logo_url,
    employmentType: eachSimilarJob.employment_type,
    id: eachSimilarJob.id,
    jobDescription: eachSimilarJob.job_description,

    location: eachSimilarJob.location,

    rating: eachSimilarJob.rating,
    title: eachSimilarJob.title,
  }

  const {
    title,
    employmentType,
    companyLogoUrl,
    rating,
    jobDescription,
    location,
  } = getFormattedData

  return (
    <li className="similar-product-item">
      <div className="">
        <li className="job-item">
          <div className="icon-container">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="similar job company logo"
            />
            <div className="role-holder">
              <h1 className="role">{title}</h1>
              <div className="rating-holder">
                <BsStarFill className="star-image" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <h1 className="description">Description</h1>
          <p className="description-para">{jobDescription}</p>
          <div className="job-middle-container">
            <div className="location-holder">
              <div className="icon-holder">
                <MdLocationOn />
                <p className="icon-name">{location}</p>
              </div>
              <div className="icon-holder">
                <MdWork />
                <p className="icon-name">{employmentType}</p>
              </div>
            </div>
          </div>
        </li>
      </div>
    </li>
  )
}

export default SimilarProductItem
