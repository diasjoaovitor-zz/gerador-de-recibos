import { Link } from 'react-router-dom'

import './style.css'

function Header({ children, pathname, state }) {  
  return (
    <header className="header-component">
      <h1>{children}</h1>
      <Link to={{ pathname, state }}>
        <button className="material-icons">arrow_back</button>
      </Link>
    </header>
  )
}

export default Header
