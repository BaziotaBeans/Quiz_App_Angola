var nome_usuario = '';
var btn_iniciar = document.querySelector('.btn-iniciar');
var btn_prox = document.querySelector('.btn-prox');
var btn_ant = document.querySelector('.btn-ant');
var parent = document.querySelector('.box');
var count;
var dados = {
        perguntas: [
            'Qual é a capital de Angola? ', 
            'Angola tem quantas provincias? ',
            'Qual é a maior provincia?',
            'Qual é a menor provincia?',
            'Em que ano angola teve o primeiro contacto com os Europeu?',
            'Em que ano portugal retomou e iniciou um processo de conquista militar dos estados do Congo e Ndongo?',
            'Quem foram os primeiros Habitantes de Angola?',
            'Em que data deu-se a Independência de Angola?',
            'Qual é a língua étnica falada na antiga capital e reino do Ndongo?',
            'Qual dessas linguás étnicas não tem o estatuto oficial de língua nacional?',
            'Qual desses países não faz fronteiras com Angola?',
        ],
        respostas: [
            'Luanda',
            '18',
            'Moxico',
            'Cabinda',
            '1482',
            '1648',
            'Bantu',
            '11 de novembro de 1975',
            'quimbundo',
            'fiote',
            'Zimbabué'
        ],
        alternativa: 
        [
            ['Luanda','Benguela','Lobito','Cabinda'],
            ['12','19','18','24'],
            ['Bengo','Huíla','Moxico','Uíge'],
            ['Bié','Cabinda','Cunene','Huambo'],
            ['1482','1209','1689','1483'],
            ['1700','1648','1809','1702'],
            ['Bantu','Ovambo','Berberes','Zulus'],
            ['11 de novembro de 1975','12 de julho de 1970','14 de março de 1975','20 de agosto de 2000'],
            ['quimbundo','umbundo','quicongo','Cuanhama'],
            ['quimbundo','fiote','quicongo','Cuanhama'],
            ['Zimbabué','Zâmbia','República Democrática do Congo','Namíbia']
        ]
    };

var respotas_usuario = [];
var scoreGeral;
//init();


//Reseta os dados e renderiza as fases
function init(){
    respotas_usuario = [];
    scoreGeral = 0;
    count = 1;
    render(1,'prox');
}
                
// Renderiza as próximas fases na tela                
function render(index, turno){

    var html_pergunta = '';
    var html_alternativa = '';
    var html_pergunta_num = '';
    var html_msg = '';

    if(turno === 'fim'){
        html_msg = '<h1 class="msg_jogo">Obrigado por jogar!</h1><h2 class="msg_nome">%nome_usuario%</h2><h3 class="sub_msg_jogo">Você acertou <span>%pergunta_certa%</span> das <span>%total_pergunta%</span> questões. </h3><button class="btn-reset">Recomeçar</button>';
        var pontuacoes = scoreGeral;
        html_msg = html_msg.replace('%pergunta_certa%',''+pontuacoes);
        html_msg = html_msg.replace('%nome_usuario%',''+nome_usuario);
        html_msg = html_msg.replace('%total_pergunta%',''+dados.respostas.length);
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
        parent.insertAdjacentHTML('beforeend', html_msg);
        if(document.querySelector('.btn-reset')){
            document.querySelector('.btn-reset').addEventListener('click', function(){
                /*while(parent.firstChild){
                    parent.removeChild(parent.firstChild);
                }
                var html_btn = '<button class="btn-prox">Próximo</button>';
                parent.insertAdjacentHTML('beforeend', html_btn);
                btn_prox.style.display = 'block';
                init();*/
                document.location.reload();   
            });
        }


    }else if(turno === 'prox'){

        html_pergunta_num = '<h1 id="pergunta_num">Pergunta <span class="num_pergunta">%numero_pergunta%</span></h1>';

        html_pergunta = '<h1 id="pergunta">%descricao%</h1>';

        html_alternativa = '<form><div class="respostas"><div class="respota-colection"><input type="radio" name="respota" value="%alternativa_1%"><label>%alternativa_1%</label></div><div class="respota-colection"><input type="radio" name="respota" value="%alternativa_2%"><label>%alternativa_2%</label></div><div class="respota-colection"><input type="radio" name="respota" value="%alternativa_3%"><label>%alternativa_3%</label></div><div class="respota-colection"><input type="radio" name="respota" value="%alternativa_4%"><label>%alternativa_4%</label></div></div></form>';


        html_pergunta_num = html_pergunta_num.replace('%numero_pergunta%', index);
        html_pergunta = html_pergunta.replace('%descricao%',dados.perguntas[index-1]);
        html_alternativa = html_alternativa.split('%alternativa_1%').join(dados.alternativa[index - 1][0]);
        html_alternativa = html_alternativa.split('%alternativa_2%').join(dados.alternativa[index - 1][1]);   
        html_alternativa = html_alternativa.split('%alternativa_3%').join(dados.alternativa[index - 1][2]);
        html_alternativa = html_alternativa.split('%alternativa_4%').join(dados.alternativa[index - 1][3]);

        if(document.querySelector('#pergunta_num')){
            parent.removeChild(document.querySelector('#pergunta_num'));
        }
        parent.insertAdjacentHTML('beforeend',html_pergunta_num);

        if(document.querySelector('#pergunta')){
            parent.removeChild(document.querySelector('#pergunta'));
        }
        document.querySelector('.box').insertAdjacentHTML('beforeend', html_pergunta); 

        if(document.querySelector('form')){
            parent.removeChild(document.querySelector('form'));
        }
        parent.insertAdjacentHTML('beforeend',html_alternativa);
    }   
}
                
// Calcula a pontuação                
function pontuacoes(arrUsuarioRespota, arrSistemaResposta){
    var score = 0;
    for (var i=0; i < arrUsuarioRespota.length; i++){
        if (arrUsuarioRespota[i] === arrSistemaResposta[i]){
            score++;
        }
    }
    return score;
}
                
                
function showList(){
    for(var i=0; i < respotas_usuario.length; i++){
        console.log('Respota: '+respotas_usuario[i]);
    }
}

//Inicia o jogo                
btn_iniciar.addEventListener('click', function(){
    document.querySelector('.msg_jogo').style.display = 'none';
    document.querySelector('.sub_msg_jogo').style.display = 'none';
    document.querySelector('.div-input').style.display = 'none';
    if(document.querySelector('#nome_usuario')){
        nome_usuario = document.querySelector('#nome_usuario').value;
        console.log('Nome do Jogador: '+nome_usuario);
    }
    btn_prox.style.display = 'block';
    init();

});
                
//Dispara o evento para o botão próximo                
btn_prox.addEventListener('click', function(){


    var radios = document.forms[0];
    //respotas_usuario.push(radios[index - 1].value); 
    for(var i=0; i < radios.length; i++){
        if(radios[i].checked){
            respotas_usuario[count - 1] = radios[i].value;        
        }
    }
    showList();

    if (count + 1 <= dados.perguntas.length + 1){
        if(count + 1 <= dados.perguntas.length){
            count++;
            render(count,'prox');
        }
        else if(count + 1 === dados.perguntas.length + 1){
            count++;
            console.log('Cheguei');
            scoreGeral = pontuacoes(respotas_usuario, dados.respostas);
            console.log('A sua pontuação é: '+scoreGeral);
            btn_prox.style.display = 'none';
            render(count,'fim');
        }

    }

});
                
//Não usei - Para adicionar a opção de retroceder   
/*
btn_ant.addEventListener('click', function(){
    if(count - 1 >= 1){
        count--;
        render(count,'ant');
    } 
});*/







