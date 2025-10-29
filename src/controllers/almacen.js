import { productos } from '../models/productos.js';
import { filtrarPorCategoria, buscarProducto, ordenarPorPrecio, comprobarStockMinimo } from './funciones.js';
import {renderizarTabla } from '../views/ui.js'

const inputBusqueda = document.querySelector('#busqueda');
const btnBuscar = document.querySelector('#btnBuscar');
const btnStock = document.querySelector('#btnStock');
const btnMostrarTodos = document.querySelector('#btnMostrarTodos');
const selectCategoria = document.querySelector('#categoriaSelect');
const selectOrden = document.querySelector('#ordenSelect');

const eventMap = [
  {selector: '#btnBuscar', event:"click", handler: onBuscar},
  {selector: '#ordenSelect', event:"change", handler: onOrdenar},
  {selector: '#btnMostrarTodos', event:"click", handler: onShowAll},
]


function inicializar(){
  let productosMostrados = [...productos];
  renderizarTabla(productosMostrados)
  bindEvents(eventMap)
}

function OnBuscar(){
  const termino = inputBusqueda.value.trim();
  productosMostrados = buscarProducto(productos,termino)
  renderizarTabla(productosMostrados)
}

function onOrdenar(){
  const orden = selectOrden.value;
  productosMostrados = ordenarPorPrecio(productos,orden);
  renderizarTabla(productosMostrados)

}

function onShowAll(){
  productosMostrados = [...productos];
  inputBusqueda.value = '';
  selectCategoria.value = '';
  renderizarTabla(productosMostrados);

}


btnMostrarTodos.addEventListener('click', () => {
  productosMostrados = [...productos];
  inputBusqueda.value = '';
  selectCategoria.value = '';
  renderizarTabla(productosMostrados);
});

function bindEvents(events){
  for (const {selector,event,handler,options} of events) {
    const el = document.querySelector(selector)
    if(el) el.addEventListener(event,handler,options)
    
  }
}

renderizarTabla(productos);

inicializar()