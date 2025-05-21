export const formatNumber = (value: number | string, decimals: number = 2): string => {
    const number = Number(value);
    if (isNaN(number)) return "0,00";
    return number.toLocaleString("es-ES", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: true, // fuerza el separador de miles
    });
}