export function millisToTimeString(millis: number): string {
    const date = new Date(millis);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function millisToDate(millis: number): string {
    return new Date(millis).toDateString();
}