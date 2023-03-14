import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiLinkExternal} from 'react-icons/bi'

// import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {MdLocationOn, MdWork} from 'react-icons/md'

import {BsStarFill} from 'react-icons/bs'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const jobDetails = fetchedData.job_details
      const similarJobs = fetchedData.similar_jobs
      this.setState({jobData: jobDetails, similarJobsData: similarJobs})
      console.log(jobDetails)
      this.setState({
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    const {jobData} = this.state
    return (
      <div className="product-details-failure-view-container">
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          className="failure-view-image"
        />
        <h1 className="product-not-found-heading">
          Oops! Something Went Wrong
        </h1>
        <p className="">We cannot seem to find the page you are looking for</p>
        <Link to={`/jobs/${jobData.id}`}>
          <button type="button" className="button">
            Retry
          </button>
        </Link>
      </div>
    )
  }

  renderJobDetailsView = () => {
    const {jobData, similarJobsData} = this.state
    const getFormattedData = {
      companyLogoUrl: jobData.company_logo_url,
      companyWebsiteUrl: jobData.company_website_url,
      employmentType: jobData.employment_type,
      id: jobData.id,
      jobDescription: jobData.job_description,
      skills: jobData.skills,
      lifeAtCompany: jobData.life_at_company,
      location: jobData.location,
      packagePerAnnum: jobData.package_per_annum,
      rating: jobData.rating,
      similarJobs: jobData.similar_jobs,
    }

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = getFormattedData

    return (
      <div className="job-details-success-view">
        <div className="job-success-container">
          <li className="job-item" key={id}>
            <div className="icon-container">
              <img
                src={companyLogoUrl}
                className="company-logo"
                alt="job details company logo"
              />
              <div className="role-holder">
                <h1 className="role">title</h1>
                <div className="rating-holder">
                  <BsStarFill className="star-image" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
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
              <p className="salary">{packagePerAnnum}</p>
            </div>
            <hr className="hr" />
            <div className="company-Website">
              <h1 className="description">Description</h1>
              <a href={companyWebsiteUrl} rel="noreferrer" target="_blank">
                <p className="violet-text">
                  Visit <BiLinkExternal className="visit" />
                </p>
              </a>
            </div>
            <p className="description-para">{jobDescription}</p>
            <div className="">
              <h1 className="heading">Skills</h1>
              <ul className="skills-list">
                {skills.map(eachItem => (
                  <li className="skill-list">
                    <img
                      src={eachItem.image_url}
                      alt={eachItem.name}
                      className="skill-image"
                    />
                    <p className="">{eachItem.name} </p>
                  </li>
                ))}
              </ul>
            </div>
            <h1 className="">Life at Company</h1>
            <div className="lifeAt-Company">
              <p className="description-para">{lifeAtCompany.description}</p>
              <img src={lifeAtCompany.image_url} alt="life at company" />
            </div>
          </li>
        </div>
        <h1 className="similar-products-heading">Similar Jobs</h1>
        <ul className="similar-products-list">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarProductItem
              eachSimilarJob={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
