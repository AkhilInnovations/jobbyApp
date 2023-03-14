// import { BsSearch } from 'react-icons/bs'

import './index.css'

const FiltersGroup = props => {
  const renderEmploymentList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachItem => {
      const {changeEmploymentType} = props

      const oncheckboxEvent = () =>
        changeEmploymentType(eachItem.employmentTypeId)

      return (
        <li className="eachItem-employ" key={eachItem.employmentTypeId}>
          <div className="">
            <input
              type="checkbox"
              id={eachItem.employmentTypeId}
              value={eachItem.employmentTypeId}
              onChange={oncheckboxEvent}
            />
            <label className="label" htmlFor={eachItem.employmentTypeId}>
              {eachItem.label}
            </label>
          </div>
        </li>
      )
    })
  }

  const renderEmployment = () => (
    <>
      <h1 className="Employment-heading">Type of Employment</h1>
      <ul className="employ-list">{renderEmploymentList()}</ul>
    </>
  )

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(range => {
      const {changeSalaryRange} = props
      const onradioEvent = event => changeSalaryRange(event)

      return (
        <li className="salaryRange-item" key={range.salaryRangeId}>
          <input
            type="radio"
            id={range.salaryRangeId}
            value={range.salaryRangeId}
            name="salary-radio"
            onChange={onradioEvent}
          />
          <label className="label" htmlFor={range.salaryRangeId}>
            {range.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div>
      <h1 className="salaryRange-heading">Salary Range</h1>
      <ul className="salaryRange-list">{renderSalaryRangeList()}</ul>
    </div>
  )

  return (
    <div className="filters-group-container">
      <hr />
      {renderEmployment()}
      <hr />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
