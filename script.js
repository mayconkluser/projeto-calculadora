"use strict";

const display = document.getElementById("display");
const limparDisplay = document.getElementById("limparDisplay");
const limparCalculo = document.getElementById("limparCalculo");
const backspace = document.getElementById("backspace");
const inverter = document.getElementById("inverter");
const decimal = document.getElementById("decimal");

const igual = document.getElementById("igual");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");

// ===========================================================
// LET PARA ADICIONAR NUMEROS E OPERADORES EM MEMORIA, ADICIONADO NA FUNCAO: selecionarOperador
let operador;
let numeroAnterior;

// ===========================================================
// LET PARA REMOVER CONTEUDO NO DISPLAY QUANDO FOR SELECIONADO ALGUM OPERADOR
let novoNumero = true;

const operacaoPendente = () => operador !== undefined;

// ===========================================================
// FUNCAO CRIADA PARA FAZER OS CALCULOS NUMEROS E OPERADORES
const calcular = () => {
  if (operacaoPendente()) {
    const numeroAtual = parseFloat(display.textContent);
    novoNumero = true;
    const resultado = eval(`${numeroAnterior} ${operador} ${numeroAtual}`);
    atualizarDisplay(resultado);
    // FUNCAO DE CIMA SERVE PARA SUBSTITUIR (IF/ELSE IF) COM MUITAS REPETICOES
    // NO CASO OS IF E ELSE IF DE BAIXO

    // if (operador === "+") {
    //   atualizarDisplay(numeroAnterior + numeroAtual);
    // } else if (operador === "-") {
    //   atualizarDisplay(numeroAnterior - numeroAtual);
    // } else if (operador === "*") {
    //   atualizarDisplay(numeroAnterior - numeroAtual);
    // } else if (operador === "/") {
    //   atualizarDisplay(numeroAnterior - numeroAtual);
    // }
  }
};

// ===========================================================
// FUNCAO CRIADA PARA ATUALIZAR O DISPLAY
const atualizarDisplay = (texto) => {
  if (novoNumero) {
    display.textContent = texto;
    novoNumero = false;
  } else {
    display.textContent += texto;
  }
};

// ===========================================================
// SELECIONAR NUMEROS E ADICIONAR NO DISPLAY
const inserirNumero = (event) => {
  atualizarDisplay(event.target.textContent);
};
numeros.forEach((numero) => numero.addEventListener("click", inserirNumero));

// ===========================================================
// SELECIONAR OPERADOR E APAGAR CONTEUDO DO DISPLAY
// ADICIONAR NUMEROS E OPERADORES EM MEMORIA
// CALCULAR ETAPA
const selecionarOperador = (event) => {
  if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = event.target.textContent;
    numeroAnterior = parseFloat(display.textContent);
  }
};
operadores.forEach((operadore) =>
  operadore.addEventListener("click", selecionarOperador)
);

// ===========================================================
// FUNCAO PARA ATIVAR O IGUAL, ENQUANTO DESATIVER OS DEMAIS OPEDADORES
const ativarIgual = () => {
  calcular();
  operador = undefined;
};
igual.addEventListener("click", ativarIgual);

// ===========================================================
// FUNCAO PARA LIMPAR CAMPO NA TELA DO DISPLAY (SEM LIMPAR MEMORIA)
const limparDisplayFuncao = () => (display.textContent = "");
limparDisplay.addEventListener("click", limparDisplayFuncao);

// ===========================================================
// FUNCAO PARA LIMPAR CAMPO NA TELA DO DISPLAY E LIMPAR MEMORIA
const limparCalculoFuncao = () => {
  limparDisplayFuncao();
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
};
limparCalculo.addEventListener("click", limparCalculoFuncao);

// ===========================================================
// FUNCAO PARA REMOVER ULTIMO NUMERO ADICIONADO
const removerUltimoNumero = () =>
  (display.textContent = display.textContent.slice(0, -1));
backspace.addEventListener("click", removerUltimoNumero);

// ===========================================================
// FUNCAO PARA INVERTER "-" E "+"
const inverterSinal = () => {
  novoNumero = true;
  atualizarDisplay(display.textContent * -1);
};
inverter.addEventListener("click", inverterSinal);

const existeDecimal = () => display.textContent.indexOf(",") !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
  if (!existeDecimal()) {
    if (existeValor()) {
      atualizarDisplay(",");
    } else {
      atualizarDisplay("0,");
    }
  }
};
decimal.addEventListener("click", inserirDecimal);
