const formulario = document.querySelector("#formulario");
const contenedorTurnos = document.querySelector("#turnos");

const nombreInput = document.querySelector("#nombre");
const apellidoInput = document.querySelector("#apellido");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const infoAdInput = document.querySelector("#info-ad");
const btnEnviar = document.querySelector("#enviar");

const btnEditar = document.querySelector("#btnEditar");

let modoEdicion;

Listeners();

function Listeners(){

formulario.addEventListener("submit", nuevoTurno);

nombreInput.addEventListener("input", añadirAlObjeto);
apellidoInput.addEventListener("input", añadirAlObjeto);
telefonoInput.addEventListener("input", añadirAlObjeto);
fechaInput.addEventListener("input", añadirAlObjeto);
horaInput.addEventListener("input", añadirAlObjeto);
infoAdInput.addEventListener("input", añadirAlObjeto);

}

const objetoTurno = {nombre: "", apellido:"", telefono:"", fecha:"",  hora:"", infoAd:""};


function añadirAlObjeto(e){
	e.preventDefault();
	objetoTurno[e.target.name] = e.target.value;
	
}

class turnos{
	constructor(){
		this.turnos = [];
	}

	agregarTurno(turno){
		this.turnos = [...this.turnos, turno];
	}
	borrarTurno(id){
		this.turnos = this.turnos.filter( turno => turno.id !== id)
	}
	editarTurno(turnoEditado){
		this.turnos = this.turnos.map( turno => turno.id == turnoEditado.id ? turnoEditado : turno);
	}
}

class Interface{
	imprimirAlerta(texto, tipoAlerta){
		const msj = document.createElement("div");
		msj.classList.add("alert","text-center", "d-block", "col-12");

		if(tipoAlerta === "error"){
			msj.classList.add("alert-danger");
		}
		else{
			msj.classList.add("alert-success");
		}

		msj.textContent = texto;

		document.querySelector(".body-gestor").insertBefore(msj, document.querySelector("#contenedor"));

		setTimeout( () =>{
			msj.remove();
		}, 3000)
	}

	mostrarTurnos({turnos}){
		this.limpiarArray();
		turnos.forEach( turno => {

			const {nombre,apellido,telefono,hora,fecha,infoAd,id} = turno;
			const divTurno = document.createElement("div");
			divTurno.classList.add("card", "divTurno");
			divTurno.innerHTML = `<ul class="list-group list-group-flush">
    								<li class="list-group-item"><b>Nombre:</b> ${nombre}</li>
    								<li class="list-group-item"><b>Apellido:</b> ${apellido}</li>
    								<li class="list-group-item"><b>Telefono:</b> ${telefono}</li>
    								<li class="list-group-item"><b>Fecha:</b> ${fecha}</li>
    								<li class="list-group-item"><b>Hora:</b> ${hora}</li>
    								<li class="list-group-item"><b>Descripcion:</b> ${infoAd}</li>
 								 </ul>
 								 <div class="buttons">
 								
 								 </div>`
 			const divButtons = document.createElement("div");
 			divButtons.classList.add("buttons");

 			const btnBorrar = document.createElement("button");
 			const btnEditar = document.createElement("button");

 			btnBorrar.classList.add("btn","btn-secondary", "btn-sm", "edicion");
 			btnBorrar.innerText = "Borrar X";
 			btnEditar.innerText = "Editar";
 			btnEditar.classList.add("btn","btn-secondary", "btn-sm", "edicion");
 			btnBorrar.onclick = () => borrarTurno(id);
 			btnEditar.onclick = () => editarTurno(turno);

 			divButtons.appendChild(btnBorrar);
 			divButtons.appendChild(btnEditar);

 			divTurno.appendChild(divButtons);

			contenedorTurnos.appendChild(divTurno);
		});

		formulario.reset();

		vaciarInputs();
	}

	limpiarArray(){
		while(contenedorTurnos.firstChild){
			contenedorTurnos.removeChild(contenedorTurnos.firstChild);
		}
	}
}

const interface = new Interface();

const manejarTurnos = new turnos();

function nuevoTurno(e){
	const {nombre, apellido, telefono, fecha, hora, infoAd} = objetoTurno;

	e.preventDefault();

	if( nombre === "" || apellido === "" || telefono === "" || fecha === "" || hora === "" || infoAd === ""){
		interface.imprimirAlerta("Ningun campo puede estar vacio", "error");
		return;
	}

	if(modoEdicion){
		btnEnviar.textContent = "Agregar Turno";
		modoEdicion = false;
		manejarTurnos.editarTurno({...objetoTurno});
		interface.imprimirAlerta("Editado Correctamente");
	}
	else{
		
	objetoTurno.id = Date.now();

	manejarTurnos.agregarTurno({...objetoTurno});
	interface.imprimirAlerta("Turno Agregado Correctamente.");
	interface.mostrarTurnos(manejarTurnos);
	}

	vaciarInputs();

	formulario.reset();

	interface.mostrarTurnos(manejarTurnos);

}

function vaciarInputs(){
	objetoTurno.nombre = "";
	objetoTurno.apellido = "";
	objetoTurno.telefono = "";
	objetoTurno.fecha = "";
	objetoTurno.hora = "";
	objetoTurno.infoAd = "";
}

function borrarTurno(id){
	manejarTurnos.borrarTurno(id);
	interface.imprimirAlerta("Turno Eliminado Correctamente");
	interface.mostrarTurnos(manejarTurnos);
}

function editarTurno(turno){
	const {nombre, apellido, telefono, fecha, hora, infoAd,id} = turno;

	nombreInput.value = nombre;
	apellidoInput.value = apellido;
	telefonoInput.value = telefono;
	fechaInput.value = fecha;
	horaInput.value = hora;
	infoAdInput.value = infoAd;

	objetoTurno.nombre = nombre;
	objetoTurno.apellido = apellido;
	objetoTurno.telefono = telefono;
	objetoTurno.fecha = fecha;
	objetoTurno.hora = hora;
	objetoTurno.infoAd = infoAd;
	objetoTurno.id = id;

	btnEnviar.textContent = "Modificar Turno";
	modoEdicion = true;

}



