export function convertToSeconds(hours, minutes, seconds){
    return (hours * 60 + minutes) * 60 + seconds
}