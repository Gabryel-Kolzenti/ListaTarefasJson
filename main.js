const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
  const li = document.createElement('li'); //para criar a tag <li/> do HTML
  return li;
}

inputTarefa.addEventListener('keypress', function(e) {  //keypress = clicar em uma tecla 
  if (e.keyCode === 13) {  // para utilizar uma tecla especifica (13 = enter).
//.                           podemos buscar esses valores na net ou utilizando console.log(e) (1-ir na página, 2-clicar na tecla desejada,
//.                           3-abrir o console no inspecionar da pg e verificar todas informações da tecla clicada, inclusive seu keycode
    //Mesma coisa do btnTarefa, porém utilizando o "enter" para enviar o valor 
    
    if (!inputTarefa.value) return;//se (!input...value = false (se vier vazio ele será = false)) não retornará nada(ou seja não contabilizará valores em branco "")
    criaTarefa(inputTarefa.value); // (parte 1) a função criaTarefa recebe p valor do input, inserido por nós la na página
  }
});

function limpaInput() { //para limpar o input laa na pg logo após enviarmos um valor
  inputTarefa.value = ''; //irá mudar o valor do input para vazio ''
  inputTarefa.focus(); //para manter selecionado o input após enviar o valor
}

function criaBotaoApagar(li) { //cria o botão de apagar que fica ao lado da tarefa criada, por isso é importante seguir a ordem la na função principal "criaTarefa"
  li.innerText += ' '; //para dar um espaço entre a tarefa e o botão apagar
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';// texto que fica dentro do botão
  // botaoApagar.classList.add('apagar');
  botaoApagar.setAttribute('class', 'apagar'); //Melhor que o classList e faz a mesma função
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');//definimos o atributo que queremos (class, href, src...) e seu valor
  li.appendChild(botaoApagar);
}
  
function criaTarefa(textoInput) { //Irá fazer a ação de criar a tarefa lá dentro da pg junto de todas outras funções (criadas ao longo do código)
//.             necessárias para o correto funcionamento dela.   Funciona como uma cadeia, vai ir executando comandos e funções na ordem que esta aqui em baixo
  const li = criaLi();
  li.innerText = textoInput; //(parte 2) irá inserir o item recebido do "inputTarefa" (receberá do btnTarefa ou inputTarefa)
  tarefas.appendChild(li); //vai criar filhos dentro da variavel(ul)
  limpaInput(); //ira realizar essa função 
  criaBotaoApagar(li);
  salvarTarefas(); //função que salvará nosso estado atual no localStorage (para quando voltarmos dnv nessa pg) quando executarmos essa nossa função atual (criar Tarefa)
}

//Enviar valor ao clicar no botão
btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return; //se (!input...value = false (se vier vazio ele será = false)) não retornará nada(ou seja não contabilizará valores em branco "")
  criaTarefa(inputTarefa.value); // (parte 1) a função criaTarefa recebe p valor do input, inserido por nós la na página.
});

document.addEventListener('click', function(e) { //ao clicar...
  const el = e.target; //irá "contabilizar/ identificar/ verificar" aonde estou clicando com o mouse

  if (el.classList.contains('apagar')) { //Se esse botão clicado possui a class apagar então...
    //Nesse caso usamos o .target para verificar a class da variavel (nesse caso verificar a class do elemento clicado)
    el.parentElement.remove();// .parentElement (para ver o pai do elemento em questão), remove (irá remover ne kk) ou seja remover o pai do elemnto em questão
    salvarTarefas(); //função que salvará nosso estado atual no localStorage (para quando voltarmos dnv nessa pg) quando executarmos essa nossa função atual (apagar Tarefa)
  }
});


function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li'); //busquei na const "tarefas" (esta linkada ao nosso <ul/>), todos os li (querySelectorALL) repare no ALL
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); //Utilizamos esse replace para trocar o 'apagar' que não queremos que apareça por '',
    //.                                                      porém isso gera um espaço entre as arrays, para isso usamos o trim() que retira esse espaço
    listaDeTarefas.push(tarefaTexto);
  }


  //JSON = Formato de texto utilizado para salvar dados entre sistemas
  /*Palavras do Profesor: ""foi criado uma string do meu array (array --> string) e então convertido para JSON (que esta em string)"
  JSON.stringify(listaDeTarefas); é uma string que depois eu posso pegar e converter de volta em um array, dessa forma salva os dados inseridos anteriormente em formato de string.
   *///                   .stringify(converte qualquer elemento JS em string)
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON); //localStorage: local no navegador para guardar informações
//onde eu quero salvar:'tarefas', valor= tarefasJSON
//'tarefas' será utilizado posteriormente para recuperar o valor salvo aoa brir novamente a pg
}

function adicionaTarefasSalvas() { //essa função irá ler as tarefas(<li/>) salvas no localStorage e depois colocar elas de volta na nossa <ul/>
  const tarefas = localStorage.getItem('tarefas'); //getItem(): para buscar as informações salvas em 'tarefas'
  const listaDeTarefas = JSON.parse(tarefas); //converter as tarefas de string para arrays
//.                          .parse(converte de volta para um objeto JS {nesse caso um array}) --> é como se ele tirasse as "" e tornasse novamente em algo que não seja string
  for(let tarefa of listaDeTarefas) {
    criaTarefa(tarefa); // para criar tarefas com os elementos salvos no localStorage obtidos e ja convertidos(string--> array), dessa forma elas serão criadas corretamente.
  }
}
adicionaTarefasSalvas();
