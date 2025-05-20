import { useEffect, useState } from "react";
import type { Alert } from "../../types/Alert";
import { asambleaList } from "../../api/asambleaService";
import type { Asamblea } from "../../types/Asamblea";
import type { Mocion } from "../../types/Mocion";

export default function Asamblea() {
    const [asamblea, setAsamblea] = useState<Asamblea | null>(null);
    const [mociones, setMociones] = useState<Mocion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<Alert | null>(null);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        try {
            const res = await asambleaList();
            setAsamblea(res);
        } catch (error: any) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error al cargar detalles'
            });
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div>Cargando...</div>;
    if (alert) return <div className={`alert alert-${alert.type}`}>{alert.message}</div>

    return (
        <div className='asamblea-list-container container'>
            <h1>{asamblea?.Nombre}</h1>
            <p><strong>Fecha:</strong> {asamblea?.Fecha && new Date(asamblea.Fecha).toLocaleDateString()}</p>
            <p><strong>Hora Inicio:</strong> {asamblea?.Fecha && asamblea?.HoraInicio && new Date(`${asamblea.Fecha}T${asamblea.HoraInicio}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p><strong>Hora Fin:</strong> {asamblea?.Fecha && asamblea?.HoraFin && new Date(`${asamblea.Fecha}T${asamblea.HoraFin}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p><strong>Lugar:</strong> {asamblea?.Lugar}</p>
            <p><strong>Tipo:</strong> {asamblea?.Tipo}</p>
            <div className='row align-items-center mt-5'>
                <div className="col-12">
                    <h3>Mociones:</h3>
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Pregunta</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Hora Inicio</th>
                                <th scope="col">Hora Fin</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mociones?.length >= 1
                                ? mociones.map((x) => (
                                    <tr key={x.IdMocion}>
                                        <td>{x.IdMocion}</td>
                                        <td>{x.Pregunta}</td>
                                        <td>{x.Descripcion}</td>
                                        <td>{x.TipoMocion}</td>
                                        <td>{new Date(`${asamblea?.Fecha}T${x.HoraInicio}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                        <td>{new Date(`${asamblea?.Fecha}T${x.HoraFin}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                        <td><button>Ver resultados</button></td>
                                    </tr>
                                ))
                                : <tr><td colSpan={7} className="text-center">No hay mociones para mostrar</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}