function login(e){
    e.preventDefault();
    const user = document.getElementById('usuario').value;
    const pass = document.getElementById('clave').value;
    const mensaje = document.getElementById('mensaje');

    if(user === "ideam" && pass === "123%"){
        window.location.href = "Principal.html";
    }else{
        mensaje.textContent="Credenciales incorrectas. Intente de nuevo";
    }
}   

let chartInstance = null;


async function mostrarDatos(tipo){
const res = await fetch(`/${tipo}`);
const datos = await res.json();

const tabla = document.getElementById('tabla');
tabla.innerHTML = "<tr><th>Mes</th><th>Valor</th></tr>" + datos.map(d => `<tr><td>${d.mes}</td><td>${d.valor}</td></tr>`).join("");
const ctx = document.getElementById('grafica');
if(chartInstance){
    chartInstance.destroy();//destruir grafica anterior
}

chartInstance = new Chart(ctx, {
    type:"bar",
    data:{
        labels: datos.map(d => d.mes),
        datasets: [{
            label: tipo,
            data: datos.map(d => d.valor),
            backgroundColor: 'rgba(255, 159, 64, 0.7)'
        }]
    }
});
}

function exportarExcel(){
    const tabla = document.getElementById('tabla');
    const wb = XLSX.utils.table_to_book(tabla, {sheet:"Datos"});
    XLSX.writeFile(wb, "datos.xlsx");
}

//prender la camara
function iniciarCamara() {
 const video = document.getElementById("video");
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => {
      console.error("Error al acceder a la cámara:", err);
    });
}

// Iniciar automáticamente
document.addEventListener("DOMContentLoaded", iniciarCamara);
 
//FUNCION TOMAR FOTO
function tomarFoto() {
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const foto = document.getElementById("foto");
 
  if (video.videoWidth > 0 && video.videoHeight > 0) {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
 
  foto.src = canvas.toDataURL("image/png");

  foto.classList.remove("foto-oculta");
    } else {
        console.warn("La cámara no está lista todavía.");
    }
}
