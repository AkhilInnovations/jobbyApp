import {BsStarFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import {MdLocationOn, MdWork} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  return (
    <div className="">
      <li className="job-item">
        <Link to={`/jobs/${jobData.id}`} className="link">
          <div className="icon-container">
            <img
              src={jobData.companyLogoUrl}
              className="company-logo"
              alt="company logo"
            />
            <div className="role-holder">
              <h1 className="role">{jobData.title}</h1>
              <div className="rating-holder">
                <BsStarFill className="star-image" />
                <p className="rating">{jobData.rating}</p>
              </div>
            </div>
          </div>
          <div className="job-middle-container">
            <div className="location-holder">
              <div className="icon-holder">
                <MdLocationOn />
                <p className="icon-name">{jobData.location}</p>
              </div>
              <div className="icon-holder">
                <MdWork />
                <p className="icon-name">{jobData.employmentType}</p>
              </div>
            </div>
            <p className="salary">{jobData.packagePerAnnum}</p>
          </div>
          <hr className="hr" />
          <h1 className="description">Description</h1>
          <p className="description-para">{jobData.jobDescription}</p>
        </Link>
      </li>
    </div>
  )
}

export default JobCard
