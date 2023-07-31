export const isEqual = (A, B) => {
    return (A[0] === B[0] && A[1] === B[1]);
}

export const toSan = (from, to) => {
    return `${String.fromCharCode('a'.charCodeAt(0) + from[1])}${8 - from[0]}${String.fromCharCode('a'.charCodeAt(0) + to[1])}${8 - to[0]}`
}