import {Link, withRouter} from 'react-router-dom'
// import {AiFillHome} from 'react-icons/ai'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <ul className="nav-bar-large-container">
          <li className="nav-menu-item">
            <Link to="/">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </Link>
          </li>
          <div className="">
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </ul>

        {/* <div className="nav-menu-mobile">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu-list-mobile">
            <li className="nav-menu-item-mobile">
              <Link to="/" className="nav-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                  alt="nav home"
                  className="nav-bar-image"
                />
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <Link to="/cart" className="nav-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                  alt="nav cart"
                  className="nav-bar-image"
                />
              </Link>
            </li>
            <button type="button" className="nav-mobile-btn">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                alt="nav logout"
                className="nav-bar-image"
                onClick={onClickLogout}
              />
            </button>
          </ul>
        </div> */}
      </div>
    </nav>
  )
}

export default withRouter(Header)
