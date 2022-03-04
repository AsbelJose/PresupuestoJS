// es constante la referencia ingresos que contiene un arreglo, no el contenido del arreglo
const ingresos = [
    new Ingreso('sueldo', 2000.00),
    new Ingreso('venta coche', 1500.00),
];

const egresos = [
    new Egreso('Renta Departamento', 900),
    new Egreso('zapato', 500),
];

let cargarApp = () =>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () =>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () =>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

//internacionalizacion formato moneda
const formatoMoneda = (valor) =>{
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}

//formato porcentaje
const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

// *- funciones para el detalle de los ingresos/egresos -*
const cargarIngresos = () =>{
    //ingresos con formato HTML
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return ingresoHTML;
}

const eliminarIngreso = (id)=>{
    //findIndex es como for que va a iterar sobre array ingresos y va a buscar cada ingreso el ingreso.id y al igualarlo al id retorna el indice dentro del array
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    //ojo elimina un elemento
    ingresos.splice(indiceEliminar, 1);
    //actualizamos la información
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () =>{
    //egresos con formato HTML
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) =>{
    let egresoHtml = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>    
    `;
    return egresoHtml;
}

const eliminarEgreso = (id)=>{
    //findIndex es como for que va a iterar sobre array ingresos y va a buscar cada ingreso el ingreso.id y al igualarlo al id retorna el indice dentro del array
    let indiceEliminar = egresos.findIndex( egreso => egreso.id === id);
    //ojo elimina un elemento
    egresos.splice(indiceEliminar, 1);
    //actualizamos la información
    cargarCabecero();
    cargarEgresos();
}

// * formulario *
let agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value != ''){
        if(tipo.value === 'ingreso'){
            //el + convierte una cadena en valor numerico
            ingresos.push( new Ingreso(descripcion.value, +valor.value) );
            cargarCabecero();
            cargarIngresos();
        }else if(tipo.value === 'egreso'){
            egresos.push( new Egreso(descripcion.value, +valor.value) );
            cargarCabecero();
            cargarEgresos();
        }
    }
}

    

