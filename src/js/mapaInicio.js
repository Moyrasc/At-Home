
(function(){
    
    const lat =  37.6175227;
    const lng =  -4.3275976;
    const mapa = L.map('mapa-inicio').setView([lat, lng], 15);

    let markers = new L.FeatureGroup().addTo(mapa)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    const obtenerPropiedades = async () => {
        try {
            const url = 'api/propiedades'
            const resp = await fetch(url)
            const propiedades = await resp.json()
            
            mostrarPropiedades(propiedades)

        } catch (error) {
            console.log(error)
        }
    }
    const mostrarPropiedades = propiedades => {
        propiedades.forEach( propiedad => {
            //Agregar pines al mapa del Home
            const marker = new L.marker([propiedad?.lat, propiedad?.lng], {
                autoPan: true,
            })
            .addTo(mapa)
            .bindPopup(`
                <p class=" font-bold" id="categoria-popup">${propiedad.categoria.nombre}</p>
                <h1 class="text-l font-extrabold uppercase my-2">${propiedad?.titulo}</h1>
                <img src="/uploads/${propiedad?.imagen}" alt="imagen inmueble"/>
                <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
                <a href="/propiedad/${propiedad.id}" class=" block p-2 text-center font-bold" id="inmueble">Ver Inmueble</a>
                
            
            `)

            markers.addLayer(marker)
        })
    }
    obtenerPropiedades()
})()