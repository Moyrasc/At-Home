
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
            .bindPopup('Información Aquí')

            markers.addLayer(marker)
        })
    }
    obtenerPropiedades()
})()