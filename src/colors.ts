function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export function generateColors(numColors: number) {
    return [...Array(numColors)].map(generateColor);
}

export function getCorrectColor(colors: string[]) {
    return colors[Math.floor(Math.random() * colors.length)];
}