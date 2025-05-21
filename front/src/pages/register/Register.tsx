import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { RegisterDto } from '../../types/RegisterDto'
import type { Alert } from '../../types/Alert';
import { register } from '../../api/usuarioService';


export default function Register() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<RegisterDto>({
        Correo: '',
        Password: '',
        PrimerNombre: '',
        SegundoNombre: '',
        PrimerApellido: '',
        SegundoApellido: '',
        Perfil: '',
        DireccionUno: '',
        DireccionDos: '',
        Complemento: '',
        CodigoPostal: '',
        Barrio: '',
        Ciudad: '',
        Pais: '',
        NumDocumento: null,
        TipoDocumento: '',
        FechaExpedicion: ''
    });

    const [alert, setAlert] = useState<Alert | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: type === 'number'
                ? value === '' ? null : Number(value)
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!userData.Correo || !userData.Password || !userData.PrimerNombre  || !userData.Perfil
                || !userData.NumDocumento || !userData.TipoDocumento || !userData.FechaExpedicion
                || !userData.DireccionUno || !userData.Barrio || !userData.Ciudad || !userData.Pais) {
                setAlert({
                    type: 'danger',
                    message: 'Faltan datos requeridos'
                });
            }
            await register(userData);

            setAlert({
                type: 'success',
                message: 'Usuario creado con éxito'
            });

            navigate('/');
        } catch (error: any) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error creando usuario'
            });
        }
    };

    return (
        <div className='register-container container'>
            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col ps-5 pe-5'>
                        <div className='mb-5'>
                            <h3 className='mb-5'>Nuevo Usuario</h3>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="PrimerNombre"
                                    name="PrimerNombre"
                                    placeholder='Primer Nombre'
                                    value={userData.PrimerNombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="SegundoNombre"
                                    name="SegundoNombre"
                                    placeholder='Segundo Nombre'
                                    value={userData.SegundoNombre}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="PrimerApellido"
                                    name="PrimerApellido"
                                    placeholder='Primer Apellido'
                                    value={userData.PrimerApellido}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="SegundoApellido"
                                    name="SegundoApellido"
                                    placeholder='Segundo Apellido'
                                    value={userData.SegundoApellido}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-select"
                                    id="TipoDocumento"
                                    name="TipoDocumento"
                                    value={userData.TipoDocumento}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Tipo de documento</option>
                                    <option value='CC'>Cédula de Ciudadanía</option>
                                    <option value='PP'>Pasaporte</option>
                                    <option value='CE'>Cédula de Extranjería</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="NumDocumento"
                                    name="NumDocumento"
                                    placeholder='Número de documento'
                                    value={userData.NumDocumento ?? ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="FechaExpedicion" className="form-label">Fecha de expedición</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="FechaExpedicion"
                                    name="FechaExpedicion"
                                    placeholder='Fecha de expedición'
                                    value={userData.FechaExpedicion?.toString() ?? ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className='mb-5'>
                            <h3 className='mb-5'>Credenciales</h3>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Correo"
                                    name="Correo"
                                    placeholder='Correo electrónico'
                                    value={userData.Correo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    name="Password"
                                    placeholder='Contraseña'
                                    value={userData.Password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-select"
                                    id="Perfil"
                                    name="Perfil"
                                    value={userData.Perfil}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione Perfil</option>
                                    <option value='EMPLEADO'>Empleado</option>
                                    <option value='EXTERNO'>Externo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='col ps-5 pe-5'>
                        <div className='mb-5'>
                            <h3 className='mb-5'>Dirección</h3>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="DireccionUno"
                                    name="DireccionUno"
                                    placeholder='Dirección principal'
                                    value={userData.DireccionUno}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Complemento"
                                    name="Complemento"
                                    placeholder='Complemento'
                                    value={userData.Complemento}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="CodigoPostal"
                                    name="CodigoPostal"
                                    placeholder='Código Postal'
                                    value={userData.CodigoPostal}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Barrio"
                                    name="Barrio"
                                    placeholder='Barrio'
                                    value={userData.Barrio}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Ciudad"
                                    name="Ciudad"
                                    placeholder='Ciudad'
                                    value={userData.Ciudad}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Pais"
                                    name="Pais"
                                    placeholder='País'
                                    value={userData.Pais}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className='mt-3'>
                            <button type="submit" className="btn btn-primary">Registrarse</button>
                            <span className='ms-3'><Link to={'/'}>Iniciar sesión</Link></span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
