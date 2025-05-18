export const formatTime = (date: Date): string => {
    return date.toTimeString().split(' ')[0]; // 'HH:mm:ss'
}