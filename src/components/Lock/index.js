import './style.css'

function Lock({ children, lock, handleClick }) {  
  return (
    <div className="lock">
      {children}
      <span className="material-icons" onClick={handleClick}>
      {!lock ? 'lock_open' : 'lock'}
      </span>
    </div> 
  )
}

export default Lock
