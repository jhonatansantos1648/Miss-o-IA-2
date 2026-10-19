import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

// Ouvintes de evento registrados apenas uma vez
botaoIniciar.addEventListener('click', iniciaJogo);
botaoJogarNovamente.addEventListener("click", jogaNovamente);

function substituiNome() {
  for (const pergunta of perguntas) {
    pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);
  }
}

substituiNome();

function iniciaJogo() {
  atual = 0;
  historiaFinal = "";
  telaInicial.style.display = 'none';
  
  // Exibe as caixas de perguntas e alternativas ao iniciar
  caixaPerguntas.classList.add("mostrar");
  caixaAlternativas.classList.add("mostrar");
  caixaResultado.classList.remove("mostrar");
  
  mostraPergunta();
}

function mostraPergunta() {
  if (atual >= perguntas.length) {
    mostraResultado();
    return;
  }
  perguntaAtual = perguntas[atual];
  caixaPerguntas.textContent = perguntaAtual.enunciado;
  caixaAlternativas.textContent = "";
  mostraAlternativas();
}

function mostraAlternativas() {
  for (const alternativa of perguntaAtual.alternativas) {
    const botaoAlternativas = document.createElement("button");
    botaoAlternativas.textContent = alternativa.texto;
    botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
    caixaAlternativas.appendChild(botaoAlternativas);
  }
}

function respostaSelecionada(opcaoSelecionada) {
  const afirmacoes = aleatorio(opcaoSelecionada.afirmacao);
  if (Array.isArray(afirmacoes)) {
    historiaFinal += afirmacoes.join(" ") + " ";
  } else if (afirmacoes) {
    historiaFinal += afirmacoes + " ";
  }

  // Define qual será a próxima pergunta
  if (opcaoSelecionada.proxima !== undefined) {
    atual = opcaoSelecionada.proxima;
  } else {
    atual++;
  }

  mostraPergunta();
}

function mostraResultado() {
  caixaPerguntas.textContent = `Sua Jornada Musical, ${nome}`;
  textoResultado.textContent = historiaFinal.trim();
  caixaAlternativas.textContent = "";
  caixaResultado.classList.add("mostrar");
}

function jogaNovamente() {
  atual = 0;
  historiaFinal = "";
  caixaResultado.classList.remove("mostrar");
  iniciaJogo();
}