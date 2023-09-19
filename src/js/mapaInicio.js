
(function(){
    
    const lat =  37.6175227;
    const lng =  -4.3275976;
    const mapa = L.map('mapa-inicio').setView([lat, lng], 15);

    let markers = new L.FeatureGroup().addTo(mapa)
    let propiedades = []
    //Filtros Página principal
    const filtros = {
        categoria:'',
        precio:''
    }
    const categoriasSelect = document.querySelector('#categorias')
    const preciosSelect = document.querySelector('#precios')

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //Filtrado Categorías y Precios
    categoriasSelect.addEventListener('change', e => {
        filtros.categoria = +e.target.value
        filtrarPropiedades()
    })
    preciosSelect.addEventListener('change', e => {
        filtros.precio = +e.target.value
        filtrarPropiedades()
    })
    const obtenerPropiedades = async () => {
        try {
            const url = 'api/propiedades'
            const resp = await fetch(url)
            propiedades = await resp.json()
            
            mostrarPropiedades(propiedades)
        } catch (error) {
            console.log(error)
        }
    }
    const mostrarPropiedades = propiedades => {
        
        //Limpiar los markers previos
        markers.clearLayers()

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
    const filtrarPropiedades = () => {
        const resultado = propiedades.filter(filtrarCategoria).filter(filtrarPrecio)
        mostrarPropiedades(resultado)
    }
    const filtrarCategoria = propiedad => filtros.categoria ? propiedad.categoriaId === filtros.categoria : propiedad
    const filtrarPrecio = propiedad => filtros.precio ? propiedad.precioId === filtros.precio : propiedad

    obtenerPropiedades()
})()