import { productos } from "../services/apiServices.js";
import {
  filtrarPorCategoria,
  buscarProducto,
  ordenarPorPrecio,
  comprobarStockMinimo,
} from "../utils/funciones.js";

import { renderizarTabla } from "../views/economato-ui.js";
lolaso
const inputBusqueda = document.querySelector("#busqueda");
const btnBuscar = document.querySelector("#btnBuscar");
const btnStock = document.querySelector("#btnStock");
const btnMostrarTodos = document.querySelector("#btnMostrarTodos");
const selectCategoria = document.querySelector("#categoriaSelect");
const selectOrden = document.querySelector("#ordenSelect");

const eventMap = [
  { selector: "#btnBuscar", event: "click", handler: onBuscar },
  { selector: "#ordenSelect", event: "change", handler: onOrdenar },
  { selector: "#btnMostrarTodos", event: "click", handler: onShowAll },
  { selector: "#categoriaSelect", event: "change", handler: onFiltrar },
];
let productosMostrados;

function inicializar() {
  productosMostrados = [...productos];
  renderizarTabla(productosMostrados);
  bindEvents(eventMap);
}

function onBuscar() {
  const termino = inputBusqueda.value.trim();
  productosMostrados = buscarProducto(productos, termino);
  renderizarTabla(productosMostrados);
}

function onOrdenar() {
  const orden = selectOrden.value;
  productosMostrados = ordenarPorPrecio(productos, orden);
  renderizarTabla(productosMostrados);
}

function onShowAll() {
  productosMostrados = [...productos];
  inputBusqueda.value = "";
  selectCategoria.value = "";
  renderizarTabla(productosMostrados);
}
function onFiltrar() {
  const cat = selectCategoria.value;
  productosMostrados = filtrarPorCategoria(productos, cat);
  renderizarTabla(productosMostrados);
}

function bindEvents(events) {
  for (const { selector, event, handler, options } of events) {
    const el = document.querySelector(selector);
    if (el) el.addEventListener(event, handler, options);
  }
}

inicializar();
