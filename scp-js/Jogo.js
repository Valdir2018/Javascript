var timerId = null; // variavel que armazena a chamada da função Timeout

function iniciaJogo(){
  // Recuperar o nível do jogo passado pela Url
  var url = window.location.search;
  // Replace encontrar um caracter e substituir 
  var nivel_jogo = url.replace("?","");

  //alert(nivel_jogo);
   var tempo_segundo = 0;
   if(nivel_jogo == 1) {  // 1 Fácil ->  120 segundos;
     tempo_segundo = 120;
  }
   if(nivel_jogo == 2) {  // 2 Normal -> 60 segundos;
     tempo_segundo = 60;
  }
   if(nivel_jogo == 3) {  // 3 Difícil ->30 segundos;
    tempo_segundo = 30;
  }
  //Inserindo segundos no Span
  document.getElementById('cronometro').innerHTML = tempo_segundo;

  var qtde_baloes = 80;
  criar_baloes(qtde_baloes); // Chamada da Função

  // Imprimir quantidade de Balões inteiros
  document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
  document.getElementById('baloes_estourados').innerHTML = 0;

  contagem_tempo(tempo_segundo + 1);
}
function game_Over(){
	remove_eventos_baloes();
	alert('Fim de Jogo, você não conseguiu estourar todos os balões no tempo estimado! :( ');
}situacao_Jogo:
function contagem_tempo(segundos){
	segundos = segundos - 1; // decrementa
	if (segundos == -1) {
		clearTimeout(timerId);// Para a execução da função do settimeout
		game_Over();
		return false;
	}
  document.getElementById('cronometro').innerHTML = segundos;
	// Função JQuery-Executa essa funcao a cada 1000 milisegundos= 1s,chama a função contagem_tempo(+segundos+)
  timerId = setTimeout("contagem_tempo("+segundos+")",1000);

}
// Funções para manipular balões
function criar_baloes(qtde_baloes){
   for(var i = 1; i <= qtde_baloes; i++){
   	var balao = document.createElement("img"); //Método do DOM Cria elemento dentro da página Html
    balao.src = 'imagens/balao_azul_pequeno.png';
    document.getElementById('cenario').appendChild(balao);// Função DOM - Cria relação de parentesco
    balao.style.margin='10px';
    balao.id = 'b'+i;
    balao.onclick = function(){
    	estourar(this);
    }
   }
}
function estourar(e){
	var id_balao = e.id;//recebe o elemento passado como parâmetro
	document.getElementById(id_balao).setAttribute("onclick","");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	//alert(id_balao);
	pontuacao(-1);


}
function pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;
    
    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
    
    situacao_Jogo(baloes_inteiros);
}

function situacao_Jogo(baloes_inteiros){
	if (baloes_inteiros == 0) {
		alert('Parabéns, você conseguiu estourar todos os balões a tempo.');
        parar_jogo();
	}
}

function remove_eventos_baloes(){
	var i =1; // contado para recuperar balões por id

	while(document.getElementById('b'+i)){
		//Retira o evento onclick do elemento
        document.getElementById('b'+i).onclick = '';
        i++;// Faz a iteração da variável i
	}
}

function parar_jogo(){ // responsável por parar o jogo
	clearTimeout(timerId);// elimina a contagem do tempo

}