const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.static(path.join(__dirname, './')));

//Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});



app.get('/temperatura', (req, res) => {
    const datosTemperatura = [
        { mes: 'Enero', valor: 24},
     { mes: 'Febrero', valor: 25},
     { mes: 'Marzo', valor: 26},
     { mes: 'Abril', valor: 27},
     { mes: 'Mayo', valor: 28},
     { mes: 'Junio', valor: 27},
     { mes: 'Julio', valor: 25},
     { mes: 'Agosto', valor: 35},
     { mes: 'Septiembre', valor: 20},
     { mes: 'Octubre', valor: 22},
     { mes: 'Noviembre', valor: 26},
     { mes: 'Diciembre', valor: 30},
    ];
    res.json(datosTemperatura);
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});