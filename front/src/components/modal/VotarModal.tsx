import { useState, useEffect } from 'react';
import type { Alert } from '../../types/Alert';
import type { Mocion } from '../../types/Mocion';
import type { CreateVotacionDto } from '../../types/CreateVotacionDto';
import { createVotacion } from '../../api/votacionMocionService';

type VotarModalProps = {
    mocion: Mocion;
    participanteId: string;
    onSuccess?: () => void;
};

export default function VotarModal({ mocion, participanteId, onSuccess }: VotarModalProps) {
    const [data, setData] = useState<CreateVotacionDto>({
        IdMocion: mocion.IdMocion,
        IdParticipante: participanteId,
        OpcionVoto: ''
    });
    const [alert, setAlert] = useState<Alert | null>(null);

    useEffect(() => {
        setData(prev => ({
            ...prev,
            IdMocion: mocion.IdMocion,
            IdParticipante: participanteId,
        }));
    }, [mocion, participanteId]);

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

            if(!data.OpcionVoto) {
                setAlert({
                    type: 'danger',
                    message: 'Debe escojer una opción para votar'
                });     
                return;
            }

            await createVotacion(data);

            setAlert({
                type: 'success',
                message: 'Votación registrada'
            });

            if (onSuccess) onSuccess();
        } catch (error: any) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error en la votación'
            });
        }
    };

    const handleClose = () => {
        setData({
            IdMocion: mocion.IdMocion,
            IdParticipante: participanteId,
            OpcionVoto: ''
        });
        setAlert(null);
    }

    return (
        <div
            className="modal fade"
            id="votarModal"
            tabIndex={-1}
            aria-labelledby="votarModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">¡Moción lanzada!</h5>
                        <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h5>{mocion.Pregunta}</h5>
                        <p>{mocion.Descripcion}</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Seleccione su opción</label>
                                <div>
                                    {Object.entries(mocion.Opciones)
                                        .filter(([key, value]) => key.startsWith('Opcion') && value)
                                        .map(([key, value], index) => (
                                            <div className="form-check" key={index}>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="OpcionVoto"
                                                    id={`${key}`}
                                                    value={value as string}
                                                    checked={data.OpcionVoto === value}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor={`${key}`}>
                                                    {value}
                                                </label>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            
                            <button type="submit" className="btn btn-primary mt-3 mb-3">Votar</button>
                            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}