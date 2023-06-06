

const generarId = () => Math.random(32).toString(32).substring(2) + Date.now().toString(32);

export {
    generarId
}