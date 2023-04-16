
let recibidos = [
    {
        emisor: 'Juan Perez',
        correoEmisor: 'jperez@gmail.com',
        asunto: 'Tarea primer parcial',
        mensaje: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, quam?',
        hora: '10:00am',
        leido: true,
        destacado: true,
        spam: false
    },
    {
        emisor: 'Daniel Jesus',
        correoEmisor: 'jesusdani@gmail.com',
        asunto: 'Tarea primer parcial',
        mensaje: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, quam?',
        hora: '12:00am',
        leido: false,
        destacado: true,
        spam: true
    },
    {
        emisor: 'Ana Donaire',
        correoEmisor: 'adona@gmail.com',
        asunto: 'Tarea primer parcial',
        mensaje: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, quam?',
        hora: '01:00pm',
        leido: true,
        destacado: false,
        spam: false
    }
];

let enviados = [
    {
        receptor: 'Pedro Martinez',
        emailReceptor: 'pmarti@gmail.com',
        asunto: 'Saludos desde Puerto Rico',
        mensaje: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, quam?',
        hora: '06:00pm'
    },
    {
        receptor: 'Tatiana Ferreira',
        emailReceptor: 'tatifer@gmail.com',
        asunto: 'Saludos desde intibuca',
        mensaje: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, quam?',
        hora: '08:00am'
    },
    {
        receptor: 'Elan Flores',
        emailReceptor: 'floreslan@gmail.com',
        asunto: 'Agenda pendiente',
        mensaje: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, quam?',
        hora: '04:00pm'
    }
];

let eliminados = [];
let spamMsj = [];

const contenidoTable = document.querySelector('#table-body');
const msjRecibidos = JSON.parse(localStorage.getItem('recibidos'));
const tableBody = document.querySelector('#table-body');

document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('recibidos', JSON.stringify(recibidos));
    localStorage.setItem('eliminados', JSON.stringify(eliminados));
    localStorage.setItem('enviados', JSON.stringify(enviados));
    itemActive(1);
    cargarMensajesRecibidos();
});

/**
 * Carga los mensaje recibidos
 */
function cargarMensajesRecibidos() {
    tableBody.innerHTML = ``;
    const recibidos = JSON.parse(localStorage.getItem('recibidos')); 
    recibidos.forEach((msj, index) => {
        if(msj.spam !== true){
            tableBody.innerHTML += `
            <tr class="table-active" >
                <th onclick="marcarLeido(${index})"><i id="marca-leido-${index}" class="fa-solid fa-check-double"></i></th>
                <th onclick="msjDestacado(${index})"><i id="star-recibidos-${index}" class="${destacado(msj.destacado)}"></i></th>
                <td onclick="msjSpam(${index})"><i id="spam-recibidos-${index}" class="fa-solid fa-triangle-exclamation"></i></td>
                <td class="${msjLeido(msj.leido)}">${msj.emisor}</td>
                <td class="${msjLeido(msj.leido)}">${msj.asunto}</td>
                <td>${msj.mensaje.substring(0,20)}</td>
                <td class="${msjLeido(msj.leido)}">${msj.hora}</td>
                <td onclick="eliminarMsj(${index})"><i class="fa-regular fa-trash-can" style="color: red;"></i></td>
            </tr>`;
        }
    });
}

/**
 * 
 */
function msjLeido(leido){
    let td = '';
    if(!leido){
        td = 'msj-leido';
        return td;
    }
    return td;
}

function marcarLeido(index){
    const iconoLeido = document.querySelector(`#marca-leido-${index}`);
    iconoLeido.classList.toggle('marcar-leido');
}

/**
 * 
 */
function cargarMsjEnviados(){
    tableBody.innerHTML = ``;
    const enviados = JSON.parse(localStorage.getItem('enviados'));
    enviados.forEach((msj, index) => {
        tableBody.innerHTML += `
            <tr class="table-active" >
                <td class="${msjLeido(msj.leido)}">${msj.receptor}</td>
                <td class="${msjLeido(msj.leido)}">${msj.asunto}</td>
                <td>${msj.mensaje.substring(0,20)}</td>
                <td class="${msjLeido(msj.leido)}">${msj.hora}</td>
                <td onclick="eliminarMsjEnviado(${index})"><i class="fa-regular fa-trash-can" style="color: red;"></i></td>
            </tr>`;
    });
}

/**
 * 
 */
function cargarMsjDestacados(){
    tableBody.innerHTML = ``;
    const recibidos = JSON.parse(localStorage.getItem('recibidos'));
    recibidos.forEach((msj, index) => {
        if(msj.destacado === true){
            tableBody.innerHTML += `
            <tr class="table-active" >
                <th scope="row" onclick="msjDestacado(${index})"><i id="star-recibidos-${index}" class="${destacado(msj.destacado)}"></i></th>
                <td onclick="msjSpam(${index})"><i id="spam-recibidos-${index}" class="fa-solid fa-triangle-exclamation"></i></td>
                <td class="${msjLeido(msj.leido)}">${msj.emisor}</td>
                <td class="${msjLeido(msj.leido)}">${msj.asunto}</td>
                <td>${msj.mensaje.substring(0,20)}</td>
                <td class="${msjLeido(msj.leido)}">${msj.hora}</td>
                <td onclick="eliminarMsj(${index})"><i class="fa-regular fa-trash-can" style="color: red;"></i></td>
            </tr>`;
        }
    });
}

/**
 * 
 */
function cargarMsjSpam(){
    tableBody.innerHTML = ``;
    const recibidos = JSON.parse(localStorage.getItem('recibidos'));
    recibidos.forEach((msj, index) => {
        if(msj.spam === true){
            tableBody.innerHTML += `
            <tr class="table-active" >
                <th scope="row" onclick="msjDestacado(${index})"><i id="star-recibidos-${index}" class="${destacado(msj.destacado)}"></i></th>
                <td onclick="msjSpam(${index})"><i id="spam-recibidos-${index}" class="fa-solid fa-triangle-exclamation gold-color"></i></td>
                <td class="${msjLeido(msj.leido)}">${msj.emisor}</td>
                <td class="${msjLeido(msj.leido)}">${msj.asunto}</td>
                <td>${msj.mensaje.substring(0,20)}</td>
                <td class="${msjLeido(msj.leido)}">${msj.hora}</td>
                <td onclick="eliminarMsj(${index})"><i class="fa-regular fa-trash-can" style="color: red;"></i></td>
            </tr>`;
        }
    });
}

/**
 * 
 */
function cargarMsjEliminados(){
    tableBody.innerHTML = ``;
    let msjEliminados = JSON.parse(localStorage.getItem('eliminados'));
    msjEliminados.forEach((msj, index) => {
            tableBody.innerHTML += `
            <tr class="table-active" >
                <th scope="row" onclick="msjDestacado(${index})"><i id="star-recibidos-${index}" class="${destacado(msj.destacado)}"></i></th>
                <td onclick="msjSpam(${index})"><i id="spam-recibidos-${index}" class="fa-solid fa-triangle-exclamation"></i></td>
                <td class="${msjLeido(msj.leido)}">${msj.emisor}</td>
                <td class="${msjLeido(msj.leido)}">${msj.asunto}</td>
                <td>${msj.mensaje.substring(0,20)}</td>
                <td class="${msjLeido(msj.leido)}">${msj.hora}</td>
                <td onclick="eliminarMsj(${index})"><i class="fa-regular fa-trash-can" style="color: red;"></i></td>
            </tr>`;
    });
}

/**
 * 
 */
function redactarMsj(){
    const enviados = JSON.parse(localStorage.getItem('enviados'));
    const inputDe= document.querySelector('#input-de');
    const inputPara = document.querySelector('#input-para');
    const inputAsunto = document.querySelector('#input-asunto');
    const inputTextArea = document.querySelector('#floatingTextarea');
    let today = new Date();
    let now = today.toLocaleTimeString('en-US');
    let msjEnvi = {
        receptor: inputDe.value,
        emailReceptor: inputPara.value,
        asunto: inputAsunto.value,
        mensaje: inputTextArea.value,
        hora: now
    }
    enviados.push(msjEnvi);
    localStorage.setItem('enviados', JSON.stringify(enviados));
}

/**
 * 
 * 
 */
function eliminarMsjEnviado(index){
    let msjEnv = JSON.parse(localStorage.getItem('enviados'));
    msjEnv.splice(index, 1);
    localStorage.setItem('enviados', JSON.stringify(msjEnv));
    cargarMsjEnviados();
}

/**
 * Funcion que elimina los mensajes y los muestra en la
 * seccion de eliminados
 */
function eliminarMsj(index){
    let msj = JSON.parse(localStorage.getItem('recibidos'));
    let msjEliminados = JSON.parse(localStorage.getItem('eliminados'));
    let msjeli = msj.splice(index, 1);
    msjEliminados.push(msjeli[0]);

    localStorage.setItem('recibidos', JSON.stringify(msj));
    localStorage.setItem('eliminados', JSON.stringify(msjEliminados));
    cargarMensajesRecibidos();
}

/**
 * Marca un mensaje como destacado al momento de cargar los mensajes
 */
function destacado(msjDestacado){
    if(msjDestacado){
        return "fa-regular fa-star gold-color"
    }
    return "fa-regular fa-star";
}

/**
 * Al dar click sobre el icono de spam (mensaje spma)
 * cambiara el estado, si es true el color del icono spam sera dorado
 * caso contrario el icono sera gris
 */
function msjSpam(index){
    let msj = JSON.parse(localStorage.getItem('recibidos'));
    const spam = document.querySelector(`#spam-recibidos-${index}`);
    if(spam.classList.contains('gold-color')){
        spam.classList.remove('gold-color');
        msj[index].spam = false;
    }else {
        spam.classList.add('gold-color');
        msj[index].spam = true;
    }
    localStorage.setItem('recibidos', JSON.stringify(msj));
    //cargarMensajesRecibidos();
}

/**
 * Al dar click sobre el icono de estrella (mensaje destacado)
 * cambiara el estado, si es true el color de la estrella es dorado
 * caso contrario la estrella sera gris
 */
function msjDestacado(index) {
    let msj = JSON.parse(localStorage.getItem('recibidos'));
    const star = document.querySelector(`#star-recibidos-${index}`);
    if(star.classList.contains('gold-color')){
        star.classList.remove('gold-color');
        msj[index].destacado = false;
    }else {
        star.classList.add('gold-color');
        msj[index].destacado = true;
    }
    //console.log(msj[index]);
    localStorage.setItem('recibidos', JSON.stringify(msj));
}

/**
 * Funcionalidad del navar
 * Al dar click en una opcion del navar se coloreara de fundo rojo esa opcion
 * y todas las demas deberan quedar sin colorear
 */
function itemActive(index){
    const listNav = document.querySelector('#list-nav');
    listNav.childNodes.forEach((elemente, i) => {
        if(i%2 !== 0){
            if(elemente.classList.contains('item-nav-active')){
                elemente.classList.remove('item-nav-active');
            }else if(i === index){
                elemente.classList.add('item-nav-active');
            }
        }
    });
}
