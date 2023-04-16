// Variables
const modal = document.getElementById("myModal");
const btnAbrirModal = document.getElementById("myBtn");
const btnCerrar = document.getElementById('btn-cerrar');

document.addEventListener('DOMContentLoaded', () => {
    modal.style.display = "none";
});

//Abrir Modal
btnAbrirModal.onclick = function () {
    modal.style.display = "block";
}
//Cerrar Modal
btnCerrar.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}