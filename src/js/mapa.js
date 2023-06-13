(function () {

    const lat = 37.6175227;
    const lng = -4.3275976;
    const mapa = L.map('mapa').setView([lat, lng], 15);
    let marker;


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //Pin para la localizacion

    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    })
        .addTo(mapa)


})()