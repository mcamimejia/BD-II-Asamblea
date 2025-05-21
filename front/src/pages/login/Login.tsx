import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import type { LoginDto } from '../../types/LoginDto'
import type { Alert } from '../../types/Alert'
import { postLogin } from '../../api/authService'
import { useAuth } from '../../context/AuthContext'
import './Login.css'

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<LoginDto>({
        correo: '',
        password: ''
    });
    const [alert, setAlert] = useState<Alert | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!userData.correo || !userData.password) {
                setAlert({
                    type: 'danger',
                    message: 'Faltan campos requeridos'
                });
                return;
            }

            const res = await postLogin(userData);
            login(res.access_token);
            navigate('/asambleas');
        } catch (error: any) {
            setAlert({
                type: 'danger',
                message: error.message || 'Credenciales inválidas'
            });
        }
    };

    return (
        <div className='login-container container'>
            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
            <div className='login-form row justify-content-center align-items-center'>
                <div className='col-12 col-md-4'>
                    <h3 className='mb-5'>¡Bienvenido!</h3>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="correo"
                            name="correo"
                            placeholder='Correo electrónico'
                            value={userData.correo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder='Contraseña'
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mt-5'>
                        <button type="button" onClick={handleSubmit} className="btn btn-primary">Iniciar sesión</button>
                        <span className='ms-3'><Link to={'/registro'}>Registrarse</Link></span>
                    </div>
                </div>
            </div>
        </div>
    )
}