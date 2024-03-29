(function () {

    const lat = document.querySelector('#lat').value || 37.6175227;
    const lng = document.querySelector('#lng').value || -4.3275976;
    const mapa = L.map('mapa').setView([lat, lng], 15);
    let marker;

    //Provider y Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
    //Marcador para la localizacion
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    })
        .addTo(mapa)
    //Detectar el movimiento del marcador
    marker.on('moveend', function (e) {
        marker = e.target

        const posicion = marker.getLatLng();
        //Centrar el marcador del mapa 
        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))
        //Obtener info calle al soltar marcador
        geocodeService.reverse().latlng(posicion, 15).run(function (error, resultado) {
            marker.bindPopup(resultado.address.LongLabel)
            //Volcar datos en los campos del form
            //solo lectura
            document.querySelector('.calle').textContent = resultado.address.Address ?? '';
            //esto se almacenará en la bbdd
            document.querySelector('#calle').value = resultado.address.Address ?? '';
            document.querySelector('#lat').value = resultado.latlng.lat ?? '';
            document.querySelector('#lng').value = resultado.latlng.lng ?? '';
        })

    })

})()