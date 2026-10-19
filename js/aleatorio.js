const nomes = ["Jhonatan", "Marlon", "Daniel", "Mauro", "Gabriel", "Gustavo", "Murilo"];

export function aleatorio (lista){
const posicao = Math.floor(Math.random()* lista.length);
return lista[posicao];
}

export const nome = aleatorio(nomes); 