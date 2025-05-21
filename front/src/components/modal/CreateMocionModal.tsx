import { useState, useEffect } from 'react';
import type { Alert } from '../../types/Alert';
import type { CreateMocionDto } from '../../types/CreateMocionDto';
import { createMocion } from '../../api/mocionService';

type CreateMocionModalProps = {
    idAsamblea: string;
    onSuccess?: () => void;
};

export default function CreateMocionModal({ idAsamblea, onSuccess }: CreateMocionModalProps) {
    const [data, setData] = useState<CreateMocionDto>({
        Pregunta: '',
        IdAsamblea: idAsamblea,
        Opcion1: '',
        Opcion2: '',
    });
    const [numOpciones, setNumOpciones] = useState<number>(2);
    const [alert, setAlert] = useState<Alert | null>(null);

    useEffect(() => {
        setData(prev => ({
            ...prev,
            IdAsamblea: idAsamblea
        }));
    }, [idAsamblea]);

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

            if(!data.Pregunta || !data.Opcion1 || !data.Opcion2) {
                setAlert({
                    type: 'danger',
                    message: 'Faltan campos requeridos'
                });     
                return;
            }

            await createMocion(data);

            setAlert({
                type: 'success',
                message: 'Moción creada con éxito'
            });

            if (onSuccess) onSuccess();
        } catch (error: any) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error creando moción'
            });
        }
    };

    const handleClose = () => {
        setData({
            Pregunta: '',
            IdAsamblea: idAsamblea,
            Opcion1: '',
            Opcion2: '',
        });
        setAlert(null);
        setNumOpciones(2);
    }

    return (
        <div
            className="modal fade"
            id="crearMocionModal"
            tabIndex={-1}
            aria-labelledby="creacionMocionModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Crear Moción</h5>
                        <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="Pregunta" className="form-label">Pregunta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Pregunta"
                                    name="Pregunta"
                                    value={data.Pregunta}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Descripcion" className="form-label">Descripción</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Descripcion"
                                    name="Descripcion"
                                    value={data.Descripcion}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="numOpciones" className="form-label">Número de opciones</label>
                                <select
                                    className="form-select"
                                    id="numOpciones"
                                    name="numOpciones"
                                    value={numOpciones}
                                    onChange={(e) => setNumOpciones(Number(e.target.value))}
                                    required
                                >
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                </select>
                            </div>
                            {[...Array(numOpciones)].map((_, index) => (
                                <div className="mb-3" key={index}>
                                    <label htmlFor={`Opcion${index + 1}`} className="form-label">Opción {index + 1}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`Opcion${index + 1}`}
                                        name={`Opcion${index + 1}`}
                                        value={data[`Opcion${index + 1}` as keyof CreateMocionDto]}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            ))}
                            <button type="submit" className="btn btn-primary mt-3 mb-3">Lanzar Moción</button>
                            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}