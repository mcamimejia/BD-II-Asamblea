import { useState, useEffect } from 'react';
import type { CreateParticipanteDto, RolAsamblea } from '../../types/ParticipanteAsamblea';
import type { Alert } from '../../types/Alert';
import { createParticipante, getRoles } from '../../api/participanteService';

type ParticiparModalProps = {
    idAsamblea: string;
    onSuccess?: () => void;
};

export default function ParticiparModal({ idAsamblea, onSuccess }: ParticiparModalProps) {
    const [roles, setRoles] = useState<RolAsamblea[]>([]);
    const [data, setData] = useState<CreateParticipanteDto>({
        AccionesRepresentadas: 0,
        IdAsamblea: idAsamblea,
        IdRol: ''
    });
    const [alert, setAlert] = useState<Alert | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setData(prev => ({
            ...prev,
            IdAsamblea: idAsamblea
        }));
    }, [idAsamblea]);

    const fetchData = async () => {
        try {
            const rolesData = await getRoles();
            setRoles(rolesData);
        } catch (error) {
            setAlert({
                type: 'danger',
                message: 'Error cargando roles'
            });
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === 'number'
                ? value === '' ? null : Number(value)
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!data.IdRol) {
                setAlert({
                    type: 'danger',
                    message: 'Seleccione un rol'
                });
                return;
            }
            if (data.IdRol === 'ROL003' && (!data.AccionesRepresentadas || data.AccionesRepresentadas < 1)) {
                setAlert({
                    type: 'danger',
                    message: 'Debe ingresar el número de acciones a representar'
                });
                return;
            }

            await createParticipante(data);

            setAlert({
                type: 'success',
                message: 'Registro a asamblea creado con éxito'
            });

            if (onSuccess) onSuccess();
        } catch (error: any) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error creando registro'
            });
        }
    };

    const handleClose = () => {
        setData({
            AccionesRepresentadas: 0,
            IdAsamblea: idAsamblea,
            IdRol: ''
        });
        setAlert(null);
    }

    return (
        <div
            className="modal fade"
            id="participarModal"
            tabIndex={-1}
            aria-labelledby="particiarModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Participar</h5>
                        <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="IdRol" className="form-label">Rol</label>
                                <select
                                    className="form-select"
                                    id="IdRol"
                                    name="IdRol"
                                    value={data.IdRol}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione un Rol</option>
                                    {roles?.map(rol => (
                                        <option key={rol.IdRol} value={rol.IdRol}>
                                            {rol.Rol}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {data.IdRol === 'ROL003' && (
                                <div className="mb-3">
                                    <label htmlFor="AccionesRepresentadas" className="form-label">Acciones a representar</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="AccionesRepresentadas"
                                        name="AccionesRepresentadas"
                                        value={data.AccionesRepresentadas}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary mt-3 mb-3">Participar</button>
                            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}