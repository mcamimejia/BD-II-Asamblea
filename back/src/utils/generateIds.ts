export function generarId(prefijo: string) {
    return `${prefijo.toUpperCase()}${Date.now()}${Math.floor(Math.random() * 1000)}`;
}