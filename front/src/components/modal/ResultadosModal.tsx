import type { Opciones, ResultadosMocion } from '../../types/Mocion';

type ResultadosModalProps = {
    resultados: {resultado: ResultadosMocion, opciones: Opciones} | null;
    handleClose: () => void;
};

export default function ResultadosModal({ resultados, handleClose }: ResultadosModalProps) {
    const opcion = resultados?.opciones[resultados?.resultado?.Estado as keyof Opciones];
    return (
        <div
            className="modal fade"
            id="resultadosModal"
            tabIndex={-1}
            aria-labelledby="resultadosLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Resultados Moción</h5>
                        <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Cantidad de votos totales:</strong></p>
                        <p>{resultados?.resultado?.CantidadVotosTotal}</p>

                        <p><strong>Opción ganadora:</strong></p>
                        <p>{opcion}</p>

                        <p><strong>Requiere secundar:</strong></p>
                        <p>{resultados?.resultado?.RequiereSecundar ? 'Sí' : 'No'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}