import { useEffect, useState } from "react";
import type { Alert } from "../../types/Alert";
import { asambleaDetails } from "../../api/asambleaService";
import type { Asamblea } from "../../types/Asamblea";
import type { Mocion, Opciones, ResultadosMocion } from "../../types/Mocion";
import { useParams } from "react-router-dom";
import type { ParticipanteAsamblea } from "../../types/ParticipanteAsamblea";
import { formatNumber } from "../../utils/formatNumber";
import CreateMocionModal from "../../components/modal/CreateMocionModal";
import ResultadosModal from "../../components/modal/ResultadosModal";
import VotarModal from "../../components/modal/VotarModal";
import { io, Socket } from "socket.io-client";

export default function Asamblea() {
    const [asamblea, setAsamblea] = useState<Asamblea | null>(null);
    const [mociones, setMociones] = useState<Mocion[]>([]);
    const [resultados, setResultados] = useState<{resultado: ResultadosMocion, opciones: Opciones} | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<Alert | null>(null);
    const [participante, setParticipante] = useState<ParticipanteAsamblea | null>(null);
    const [mocionActiva, setMocionActiva] = useState<Mocion | null>(null);
    const { id } = useParams<{ id: string }>();

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Conexión al websocket
        const newSocket = io(import.meta.env.VITE_API_URL);
        setSocket(newSocket);

        newSocket.on("mocionCreada", (mocion) => {
            if(participante?.Rol?.IdRol === 'ROL003'){
                setMocionActiva(mocion);
                setTimeout(() => {
                    const modal = document.getElementById('votarModal');
                    if (modal) {
                        // @ts-ignore
                        let bsModal = window.bootstrap.Modal.getInstance(modal);
                        if (!bsModal) {
                            // @ts-ignore
                            bsModal = new window.bootstrap.Modal(modal);
                        }
                        bsModal.show();
                    }
                }, 100);
            }
        });

        newSocket.on("mocionInactiva", () => {
            const modal = document.getElementById('votarModal');
            if (modal) {
                // @ts-ignore
                const bsModal = window.bootstrap.Modal.getInstance(modal);
                if (bsModal) {
                    bsModal.hide();
                }
            }
            setMocionActiva(null);
        });

        newSocket.on("resultadosMocion", (idMocion) => {
            const mocion = mociones.find(x => x.IdMocion === idMocion.id);
            if (!mocion) return;
            setResultados({resultado: mocion?.Resultados[0], opciones: mocion?.Opciones});
            setTimeout(() => {
                const modal = document.getElementById('resultadosModal');
                if (modal) {
                    // @ts-ignore
                    let bsModal = window.bootstrap.Modal.getInstance(modal);
                    if (!bsModal) {
                        // @ts-ignore
                        bsModal = new window.bootstrap.Modal(modal);
                    }
                    bsModal.show();
                }
            }, 100);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [participante]);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        try {
            if (!id) {
                setAlert({
                    type: 'danger',
                    message: 'Error al cargar detalles'
                });
                return null
            }
            const res = await asambleaDetails(id);
            if (res.asamblea) {
                setAsamblea(res.asamblea);
            }
            if(res.asamblea?.Mociones){
                setMociones(res.asamblea.Mociones)
            }
            if(res.participante){
                setParticipante(res.participante)
            }
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
            <div className="row mt-5">
                <div className="col">
                    <h3>Detalles de la asamblea</h3>
                    <p><strong>Fecha:</strong> {asamblea?.Fecha && new Date(asamblea.Fecha).toLocaleDateString()}</p>
                    <p><strong>Hora Inicio:</strong> {asamblea?.Fecha && asamblea?.HoraInicio && new Date(`${asamblea.Fecha}T${asamblea.HoraInicio}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p><strong>Hora Fin:</strong> {asamblea?.Fecha && asamblea?.HoraFin && new Date(`${asamblea.Fecha}T${asamblea.HoraFin}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p><strong>Lugar:</strong> {asamblea?.Lugar}</p>
                    <p><strong>Tipo:</strong> {asamblea?.Tipo}</p>
                    <p><strong>Total de acciones:</strong> {formatNumber(asamblea?.AccionesTotal ?? 0, 0)}</p>
                    <p><strong>Máximo de acciones por participante:</strong> {formatNumber(asamblea?.AccionesMaximoParticipante ?? 0, 0)}</p>
                </div>
                <div className="col">
                    <h3>Datos Participante</h3>
                    <p><strong>Rol:</strong> {participante?.Rol?.Rol}</p>
                    {participante?.Rol?.IdRol === 'ROL003' && (
                        <p><strong>Acciones actuales representadas:</strong> {formatNumber(participante?.AccionesRepresentadas ?? 0, 0)}</p>
                    )}
                </div>
            </div>
            {participante?.Rol?.Crear && (
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#crearMocionModal">Crear Mocion</button>
                </div>
            )}
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
                                        <td>{x.HoraInicio && new Date(x.HoraInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                        <td>{x.HoraFin && new Date(x.HoraFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                        <td>
                                            <button 
                                                onClick={() => setResultados({resultado: x.Resultados[0], opciones: x.Opciones})} 
                                                className="btn btn-primary"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#resultadosModal"
                                            >
                                                Ver resultados
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                : <tr><td colSpan={7} className="text-center">No hay mociones para mostrar</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <CreateMocionModal 
                idAsamblea={id ?? ''}  
                onSuccess={fetch}
            />
            <ResultadosModal
                resultados={resultados}
                handleClose={() => setResultados(null)}
            />
            {mocionActiva && (
                <VotarModal
                    mocion={mocionActiva}
                    participanteId={participante?.IdParticipante ?? ''}
                    onSuccess={fetch}
                />
            )}
        </div>
    )
}