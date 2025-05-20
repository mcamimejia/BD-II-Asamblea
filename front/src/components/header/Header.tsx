import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Header.css'
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout} = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div className='header-container'>
      <ul className="nav container-fluid">
        <li className="nav-item">
          <Link className="nav-link" to={user ? '#' : '/'}>{user ? user.email : 'Ingresar'}</Link>
        </li>
        { user && (
          <li className="nav-item">
            <button className="nav-link" onClick={handleLogout}>Salir</button>
          </li>
        )}
      </ul>
    </div>
  )
}
