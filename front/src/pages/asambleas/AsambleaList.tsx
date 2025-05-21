import { useEffect, useState } from "react";
import type { Alert } from "../../types/Alert";
import { asambleaList } from "../../api/asambleaService";
import type { AsambleaListRes } from "../../types/Asamblea";
import { Link } from "react-router-dom";
import ParticiparModal from "../../components/modal/ParticiparModal";
import { formatNumber } from "../../utils/formatNumber";

export default function AsambleaList() {
    const [asambleas, setAsambleas] = useState<AsambleaListRes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<Alert | null>(null);
    const [asambleaSelected, setAsambleaSelected] = useState<string | null>(null);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        try {
            const res = await asambleaList();
            setAsambleas(res);
        } catch (error: any) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error al cargar las asambleas'
            });
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div>Cargando...</div>;
    if (alert) return <div className={`alert alert-${alert.type}`}>{alert.message}</div>

    return (
        <div className='asamblea-list-container container'>
            <h1>Asambleas Activas</h1>
            <div className='row align-items-center mt-5'>
                <div className="col-12">
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Hora Inicio</th>
                                <th scope="col">Hora Fin</th>
                                <th scope="col">Lugar</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Máx. de acciones por participante</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {asambleas?.length >= 1
                                ? asambleas.map((x) => (
                                    <tr key={x.IdAsamblea}>
                                        <td>{x.Nombre}</td>
                                        <td>{new Date(x.Fecha).toLocaleDateString()}</td>
                                        <td>{new Date(`${x.Fecha}T${x.HoraInicio}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                        <td>{new Date(`${x.Fecha}T${x.HoraFin}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                        <td>{x.Lugar}</td>
                                        <td>{x.Tipo}</td>
                                        <td>{formatNumber(x.AccionesMaximoParticipante,0)}</td>
                                        <td>
                                            {x.isParticipante 
                                                ? <Link to={`/asamblea/${x.IdAsamblea}`}>Ver detalles</Link>
                                                : <button type="button" onClick={() => setAsambleaSelected(x.IdAsamblea)} data-bs-toggle="modal" data-bs-target="#participarModal" className="btn btn-primary">Participar</button>
                                            }
                                        </td>
                                    </tr>
                                ))
                                : <tr><td colSpan={7} className="text-center">No hay asambleas para mostrar</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <ParticiparModal 
                idAsamblea={asambleaSelected ?? ''}  
                onSuccess={fetch}
            />
        </div>
    )
}