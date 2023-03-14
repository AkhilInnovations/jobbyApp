import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import {BsSearch} from 'react-icons/bs'

import FiltersGroup from '../FiltersGroup'
import Header from '../Header'
import Profile from '../Profile'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    AllJobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeEmploymentTypeId: '',
    activeSalaryRangeId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {
      activeEmploymentTypeId,
      searchInput,
      activeSalaryRangeId,
    } = this.state

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentTypeId}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const {jobs} = fetchedData
      const updatedData = jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        AllJobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      //   console.log('error')
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeEmploymentType = activeEmploymentTypeId => {
    this.setState({activeEmploymentTypeId}, this.getJobs)
  }

  changeSalaryRange = e => {
    if (e.target.checked) {
      this.setState({activeSalaryRangeId: e.target.value}, this.getJobs)
    }
  }

  //   changeSalaryRange = activeSalaryRangeId => {
  //     this.setState({activeSalaryRangeId}, this.getJobs)
  //   }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button type="button" data-testid="searchButton">
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  onRetry = props => {
    const {history} = props
    history.push('/jobs')
  }

  renderSuccessJobViewView = () => {
    const {AllJobsList} = this.state
    const shouldShow = AllJobsList.length > 0

    return shouldShow ? (
      <div className="all-products-container">
        <ul className="job-success-container">
          {AllJobsList.map(jobData => (
            <JobCard jobData={jobData} key={jobData.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="products-failure-img"
        />
        <h1 className="product-failure-heading-text">No Jobs Found</h1>
        <p className="products-failure-description">
          We could not find any jobs. Try other filters
        </p>

        <button
          type="button"
          className="shop-now-button"
          onClick={this.onRetry}
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <Link to="/jobs">
        <button type="button" className="shop-now-button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessJobViewView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeEmploymentTypeId, activeSalaryRangeId} = this.state

    return (
      <div className="">
        <Header />
        <div className="profile-filter-container">
          <div className="filters-group">
            <Profile />
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              activeEmploymentTypeId={activeEmploymentTypeId}
              activeSalaryRangeId={activeSalaryRangeId}
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
            />
          </div>
          <div className="search-container">
            {this.renderSearchInput()}
            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
