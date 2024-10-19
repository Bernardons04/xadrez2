/* Implementação da detecção de cheque e cheque-mate
    Resumo:
    O rei está em cheque?
        não: ótimo, continue o jogo;

        sim: ele pode fazer algo para sair do cheque?
            sim: ótimo, continue o jogo;
            não, então é cheque mate

    1 - Detectar se o jogador 1 está em cheque, logo após a jogada do jogador 2, 
        e para isso é necessário verificar se alguma peça do jogador 1, está ameaçando o rei do jogador 2;                  ESTÁ FEITOOOOOOOOOOOOOOO

        1.1. IMPLEMENTAÇÃO: Depois de cada movimento, fazer uma iteração por todas as peças do oponente do jogador 2, para verificar se alguma delas
            pode alcançar o rei do jogador 1, se sim,o rei do jogador 1 está em cheque, então TRUE deve ser retornado, caso contrario, FALSE deve ser retornado.
            1.1.1. Fazer mais uma verificação para ver se o movimento feito na simulação nao resulta em cheque de alguma outra forma;

    2. Caso o jogador 1 esteja em cheque, deve ser rodado um metodo para verificar se é cheque-mate;
        2.1 IMPLEMENTAÇÃO: Iterar sobre todas as peças do jogador 1 (jogador em cheque) e fazer simulações para ver se algum dos movimentos resulta em ele sair do cheque.

    3. Caso seja um simples cheque de fato:
        3.1. Primeiro de tudo deve ser mostrado um alert avisando que determinado jogador está em cheque;
        3.2. Depois disso, toda peça que o jogador em cheque selecionar, so mostrará alguma possível casa de movimento se isso significar o impedimento do cheque de alguma, 
            como por exemplo: se o jogador em cheque for colocar uma peça entre o rei e a peça que está ameaçando o rei. Ou então se é possivel comer a peça que está ameaçando o rei, ou então simplesmente mover o rei;
*/

/* Implementação para fazer o jogador perder por cheque-mate
    1 - É bem simples, caso algum jogador 1 esteja em cheque-mate, disparar um modal ou alert com uma mensagem de que o jogador 2
        venceu e um botão que vai reiniciar a partida;

    2 - Quando o botão for clicado, o tabuleiro deve ser reiniciado e a div para escolha de peça deve ser mostrada novamente 
        para que uma nova partida possa ser iniciada;
*/

/* Detectar empate por afogamento */
/* Captura en-passant */

function inicia_jogo() {
    vez = "branco"; //vez de quem jogar
    vezAdversaria = "preto"

    zerarCasas()
    popularCasas()

    //cria array que var receber as posicoes do tabuleiro
    cria_array();
    function cria_array() {
        var x, y;

        peca = new Array();

        for (x = 1; x <= 8; x++) {

            peca[x] = new Array();

            for (y = 1; y <= 8; y++) {

                peca[x][y] = new Array();
                peca[x][y]['peca'] = false;
                peca[x][y]['cor'] = false;

            }
        }

        il = new Array();
        il['preto'] = new Array();
        il['branco'] = new Array();

    }

    //posiciona as pecas pretas no array
    peca[1][1]['peca'] = "torre"; peca[1][1]['cor'] = "preto"; peca[1][1]['mov'] = 0; il['preto']['torre'] = "&#9820;";
    peca[1][2]['peca'] = "cavalo"; peca[1][2]['cor'] = "preto"; peca[1][2]['mov'] = 0; il['preto']['cavalo'] = "&#9822;";
    peca[1][3]['peca'] = "bispo"; peca[1][3]['cor'] = "preto"; peca[1][3]['mov'] = 0; il['preto']['bispo'] = "&#9821;";
    peca[1][4]['peca'] = "rainha"; peca[1][4]['cor'] = "preto"; peca[1][4]['mov'] = 0; il['preto']['rainha'] = "&#9819;";
    peca[1][5]['peca'] = "rei"; peca[1][5]['cor'] = "preto"; peca[1][5]['mov'] = 0; il['preto']['rei'] = "&#9818;";
    peca[1][6]['peca'] = "bispo"; peca[1][6]['cor'] = "preto"; peca[1][6]['mov'] = 0;
    peca[1][7]['peca'] = "cavalo"; peca[1][7]['cor'] = "preto"; peca[1][7]['mov'] = 0;
    peca[1][8]['peca'] = "torre"; peca[1][8]['cor'] = "preto"; peca[1][8]['mov'] = 0;

    peca[2][1]['peca'] = "peao"; peca[2][1]['cor'] = "preto"; peca[2][1]['mov'] = 0; il['preto']['peao'] = "&#9823;";
    peca[2][2]['peca'] = "peao"; peca[2][2]['cor'] = "preto"; peca[2][2]['mov'] = 0;
    peca[2][3]['peca'] = "peao"; peca[2][3]['cor'] = "preto"; peca[2][3]['mov'] = 0;
    peca[2][4]['peca'] = "peao"; peca[2][4]['cor'] = "preto"; peca[2][4]['mov'] = 0;
    peca[2][5]['peca'] = "peao"; peca[2][5]['cor'] = "preto"; peca[2][5]['mov'] = 0;
    peca[2][6]['peca'] = "peao"; peca[2][6]['cor'] = "preto"; peca[2][6]['mov'] = 0;
    peca[2][7]['peca'] = "peao"; peca[2][7]['cor'] = "preto"; peca[2][7]['mov'] = 0;
    peca[2][8]['peca'] = "peao"; peca[2][8]['cor'] = "preto"; peca[2][8]['mov'] = 0;

    //posiciona as pecas brancas no array	
    peca[8][1]['peca'] = "torre"; peca[8][1]['cor'] = "branco"; peca[8][1]['mov'] = 0; il['branco']['torre'] = "&#9814;";
    peca[8][2]['peca'] = "cavalo"; peca[8][2]['cor'] = "branco"; peca[8][2]['mov'] = 0; il['branco']['cavalo'] = "&#9816;";
    peca[8][3]['peca'] = "bispo"; peca[8][3]['cor'] = "branco"; peca[8][3]['mov'] = 0; il['branco']['bispo'] = "&#9815;";
    peca[8][4]['peca'] = "rainha"; peca[8][4]['cor'] = "branco"; peca[8][4]['mov'] = 0; il['branco']['rainha'] = "&#9813;";
    peca[8][5]['peca'] = "rei"; peca[8][5]['cor'] = "branco"; peca[8][5]['mov'] = 0; il['branco']['rei'] = "&#9812;";
    peca[8][6]['peca'] = "bispo"; peca[8][6]['cor'] = "branco"; peca[8][6]['mov'] = 0;
    peca[8][7]['peca'] = "cavalo"; peca[8][7]['cor'] = "branco"; peca[8][7]['mov'] = 0;
    peca[8][8]['peca'] = "torre"; peca[8][8]['cor'] = "branco"; peca[8][8]['mov'] = 0;

    peca[7][1]['peca'] = "peao"; peca[7][1]['cor'] = "branco"; peca[7][1]['mov'] = 0; il['branco']['peao'] = "&#9817;";
    peca[7][2]['peca'] = "peao"; peca[7][2]['cor'] = "branco"; peca[7][2]['mov'] = 0;
    peca[7][3]['peca'] = "peao"; peca[7][3]['cor'] = "branco"; peca[7][3]['mov'] = 0;
    peca[7][4]['peca'] = "peao"; peca[7][4]['cor'] = "branco"; peca[7][4]['mov'] = 0;
    peca[7][5]['peca'] = "peao"; peca[7][5]['cor'] = "branco"; peca[7][5]['mov'] = 0;
    peca[7][6]['peca'] = "peao"; peca[7][6]['cor'] = "branco"; peca[7][6]['mov'] = 0;
    peca[7][7]['peca'] = "peao"; peca[7][7]['cor'] = "branco"; peca[7][7]['mov'] = 0;
    peca[7][8]['peca'] = "peao"; peca[7][8]['cor'] = "branco"; peca[7][8]['mov'] = 0;

    ///aray para movimentar as pecas
    movimenta = new Array();

    movimenta['selecionada'] = new Array();
    movimenta['selecionada']['x'] = 0;
    movimenta['selecionada']['y'] = 0;
    movimenta['selecionada']['peca'] = "0";
    movimenta['selecionada']['cor'] = "0";

    movimenta['destino'] = new Array();
    movimenta['destino']['x'] = 0;
    movimenta['destino']['y'] = 0;
    movimenta['destino']['peca'] = "0";
    movimenta['destino']['cor'] = "0";
    ///aray para os possiveis movimentos
    possiveis = new Array();
}

function possiveis_movimentos() {
    var x, y;
    var c = 0; //contador pro array possiveis
    var i; //contador pros for
    x = movimenta['selecionada']['x'];
    y = movimenta['selecionada']['y'];

    document.getElementById('t' + x + y).style.backgroundColor = "#3C9"; //muda cor de fundo
    possiveis[c] = "t" + x + y; c++;

    ///////////////////////////////////////////////////////////////////////////////////PEAO////////////////////////////////
    if (peca[x][y]['peca'] == 'peao') {
        if (peca[x][y]['cor'] == "branco") {

            if (!peca[x - 1][y]['peca']) {
                possivel(x - 1, y);
            } if (y - 1 > 0 && peca[x - 1][y - 1]['peca']) {
                possivel(x - 1, y - 1);
            }
            if (y + 1 < 9 && peca[x - 1][y + 1]['peca']) {
                possivel(x - 1, y + 1);
            }

            if (x == 7) {
                if (!peca[x - 2][y]['peca'] && !peca[x - 1][y]['peca']) {
                    possivel(x - 2, y);
                }
            }
        }

        if (peca[x][y]['cor'] == "preto") {
            if (!peca[x + 1][y]['peca']) {
                possivel(x + 1, y);
            } if (y - 1 > 0 && peca[x + 1][y - 1]['peca']) {
                possivel(x + 1, y - 1);
            }
            if (y + 1 < 9 && peca[x + 1][y + 1]['peca']) {
                possivel(x + 1, y + 1);
            }

            if (x == 2) {
                if (!peca[x + 2][y]['peca'] && !peca[x + 1][y]['peca']) {
                    possivel(x + 2, y);
                }
            }
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////CAVALO ////////////////////////////////
    if (peca[x][y]['peca'] == 'cavalo') {
        possivel(x - 1, y - 2);
        possivel(x + 1, y + 2);
        possivel(x + 1, y - 2);
        possivel(x - 1, y + 2);
        possivel(x - 2, y - 1);
        possivel(x + 2, y + 1);
        possivel(x + 2, y - 1);
        possivel(x - 2, y + 1);
    }

    //////////////////////////////////////////////////////////////////////////////////////REI ///////////////////////////////////
    if (peca[x][y]['peca'] == 'rei') {
        possivel(x - 1, y);
        possivel(x, y - 1);
        possivel(x - 1, y - 1);
        possivel(x + 1, y);
        possivel(x, y + 1);
        possivel(x + 1, y + 1);
        possivel(x - 1, y + 1);
        possivel(x + 1, y - 1);
    }

    //////////////////////////////////////////////////////////////////////////////////////TORRE ///////////////////////////////////
    if (peca[x][y]['peca'] == 'torre') {
        for (i = 1; possivel(x - i, y); i++);
        for (i = 1; possivel(x + i, y); i++);
        for (i = 1; possivel(x, y - i); i++);
        for (i = 1; possivel(x, y + i); i++);
    }

    //////////////////////////////////////////////////////////////////////////////////////BISPO ///////////////////////////////////
    if (peca[x][y]['peca'] == 'bispo') {
        for (i = 1; possivel(x - i, y - i); i++);
        for (i = 1; possivel(x + i, y + i); i++);
        for (i = 1; possivel(x - i, y + i); i++);
        for (i = 1; possivel(x + i, y - i); i++);
    }

    //////////////////////////////////////////////////////////////////////////////////////RAINHA ///////////////////////////////////
    if (peca[x][y]['peca'] == 'rainha') {
        for (i = 1; possivel(x - i, y - i); i++);
        for (i = 1; possivel(x + i, y + i); i++);
        for (i = 1; possivel(x - i, y + i); i++);
        for (i = 1; possivel(x + i, y - i); i++);
        for (i = 1; possivel(x - i, y); i++);
        for (i = 1; possivel(x + i, y); i++);
        for (i = 1; possivel(x, y - i); i++);
        for (i = 1; possivel(x, y + i); i++);
    }

    function possivel(px, py) {
        if (px > 0 && px < 9 && py > 0 && py < 9 && peca[px][py]['cor'] != movimenta['selecionada']['cor']) {
            document.getElementById('t' + (px) + (py)).style.backgroundColor = "#3C9"; //muda cor de fundo
            possiveis[c] = "t" + (px) + (py); c++;

            if (!peca[px][py]['peca']) {
                return true;
            }
        } else {
            return false;
        }
    }
    console.log('possiveis_movimentos return', c)
    return c;
}

function volta_fundo() {
    var cf;
    for (cf = 0; cf < possiveis.length; cf++) {
        document.getElementById(possiveis[cf]).style.backgroundColor = "";
    }
}

function verifica_possivel(x, y, c) {
    var pode = 0;
    var cp;
    var div = "t" + x + y;

    for (cp = 1; cp < c; cp++) {
        if (possiveis[cp] == div) {
            pode++;
        }
        if (pode > 0) {
            return 1;
        }
    }
}

function seleciona(x, y) {
    if ((movimenta['selecionada']['x'] == 0 || peca[x][y]['cor'] == movimenta['selecionada']['cor']) && peca[x][y]['cor'] == vez) {
        if (movimenta['selecionada']['x'] != 0) {
            volta_fundo(); //volta a cor de fundo normal
        }
        if (peca[x][y]['peca']) { //se tiver uma peça nessa posição
            movimenta['selecionada']['x'] = x;	//recebe x selecionado
            movimenta['selecionada']['y'] = y;  //recebe y selecionado
            movimenta['selecionada']['peca'] = peca[x][y]['peca']; //recebe a peça selecionada
            movimenta['selecionada']['cor'] = peca[x][y]['cor'];	//recebe a cor selecionada
    
            // Chama o método verifica_cheque_mate para obter os movimentos que podem tirar o rei do cheque
            let movimentosPossiveis = verifica_cheque_mate();
    
            // Filtra os movimentos possíveis da peça selecionada
            let movimentosDaPecaSelecionada = movimentosPossiveis.filter(mov => 
                mov.de[0] === movimenta['selecionada']['x'] && 
                mov.de[1] === movimenta['selecionada']['y']
            );
    
            // Se a peça selecionada não tiver movimentos válidos que tirem o rei do cheque, exibe uma mensagem
            if (movimentosDaPecaSelecionada.length === 0) {
                alert("Você está em cheque! Não pode mover essa peça.");
                return; // Impede que o jogador faça o movimento
            }
    
            // Se houver movimentos válidos, atualiza os possíveis movimentos para a peça selecionada
            cont_possiveis = possiveis_movimentos();
        }
    } else if (verifica_possivel(x, y, cont_possiveis)) { //se for segundo clique e a cor da peca destino for diferente da selecionada
        
        /*if (peca[x][y]['peca'] == "rei") {
            alert(movimenta['selecionada']['cor'] + " venceu (:");
        }*/

        //Pra trocar de peça quando o peão chegar do outro lado (PROMOVER PEAO)
        if (movimenta['selecionada']['peca'] == 'peao' && movimenta['selecionada']['cor'] == 'branco' && x == 1) {
            document.getElementById('escolhebranco').style.display = 'block';
            document.getElementById('fundo').style.display = 'block';
            xe = x; ye = y;
        }
        if (movimenta['selecionada']['peca'] == 'peao' && movimenta['selecionada']['cor'] == 'preto' && x == 8) {
            document.getElementById('escolhepreto').style.display = 'block';
            document.getElementById('fundo').style.display = 'block';
            xe = x; ye = y;
        }

        if (peca[x][y]['cor'] != movimenta['selecionada']['cor']) {
            movimenta['destino']['x'] = x; //recebe o x do destino(segundo clique)
            movimenta['destino']['y'] = y;  //recebe y do destino(segundo clique)

            if (peca[x][y]['peca']) {  //se tiver alguma peca nessa posição
                movimenta['destino']['peca'] = peca[x][y]['peca']; //destino recebe a peca selecionada
                movimenta['destino']['cor'] = peca[x][y]['cor']; //destino recebe a cor selecionada
            }

            document.getElementById("t" + movimenta['selecionada']['x'] + "" + movimenta['selecionada']['y']).innerHTML = ""; //selecionada fica sem imagem
            document.getElementById("t" + x + "" + y).innerHTML = il[movimenta['selecionada']['cor']][movimenta['selecionada']['peca']]; //destino recebe a imagem da peça selecinada
            peca[x][y]['peca'] = movimenta['selecionada']['peca']; //posicao destino recebe a peca
            peca[x][y]['cor'] = movimenta['selecionada']['cor']; //posicao destino recebe a cor

            peca[movimenta['selecionada']['x']][movimenta['selecionada']['y']]['peca'] = false; //peca selecionada recebe 0
            peca[movimenta['selecionada']['x']][movimenta['selecionada']['y']]['cor'] = false; //cor selecionada recebe 0

            movimenta['selecionada']['x'] = 0; //selecionada x recebe 0 (pra na proxima ver q é o primeiro movimento)
            movimenta['selecionada']['y'] = 0; //selecionada y recebe 0 (pra na proxima ver q é o primeiro movimento)
            movimenta['selecionada']['peca'] = "0"; //selecionada peca recebe 0 (pra na proxima ver q é o primeiro movimento)
            movimenta['selecionada']['cor'] = "0"; //selecionada cor recebe 0 (pra na proxima ver q é o primeiro movimento)
        }

        volta_fundo(); //volta a cor de fundo normal

        if (vez == "branco") { vez = "preto"; } else { vez = "branco"; } //troca a vez
        if (vez == "preto") { vezAdversaria = "branco" } else { vezAdversaria = "preto"; } //troca a vez adversaria

        // verificar cheque e cheque-mate aqui
        let estaEmCheque = esta_em_cheque(vez)
        if (estaEmCheque) {

            let chequeMate = verifica_cheque_mate(vez);
            console.log('chequeMate: ', chequeMate);
            
            if (chequeMate) {
                alert("Cheque-mate! " + vezAdversaria + " venceu!");
            } else {
                alert(vez + ' está em cheque');
            }
        }

    }
}

function verifica_cheque_mate() {
    let movimentosPossiveis = []; // Lista para armazenar os movimentos possíveis que tiram o rei do cheque

    // Itera sobre todas as peças no tabuleiro
    for (let x = 1; x <= 8; x++) {
        for (let y = 1; y <= 8; y++) {
            let pecaAtual = peca[x][y];

            // Verifica se a peça pertence ao jogador que está em cheque
            if (pecaAtual['cor'] === vez) {

                // Obtém os movimentos possíveis para a peça atual
                let movimentos = possiveis_movimentos_para_peca(x, y);

                // Para cada movimento possível, simula o movimento e verifica se tira o cheque
                for (let i = 0; i < movimentos.length; i++) {
                    let destinoX = movimentos[i][0];
                    let destinoY = movimentos[i][1];

                    // Simula o movimento da peça
                    let movimentoFeito = simula_movimento(x, y, destinoX, destinoY);

                    // Verifica se o movimento resultou em tirar o cheque
                    if (!esta_em_cheque(vez)) {
                        // Se tirou o cheque, adiciona o movimento à lista de movimentos possíveis
                        movimentosPossiveis.push({
                            de: [x, y],
                            para: [destinoX, destinoY]
                        });
                    }

                    // Reverte o movimento simulado
                    desfaz_movimento(movimentoFeito);
                }
            }
        }
    }

    return movimentosPossiveis;
}

function escolhe(pecae, core) {
    peca[xe][ye]['peca'] = pecae;
    document.getElementById("t" + xe + "" + ye).innerHTML = il[core][pecae];
    document.getElementById('escolhe' + core).style.display = 'none';
    document.getElementById('fundo').style.display = 'none';
}

function escolhecor_incio(cor) {
    document.getElementById('escolhecor-inicio').style.display = 'none';
    document.getElementById('fundo').style.display = 'none';
    vez = cor;
}

function encontrarRei(cor) { // PARECE QUE FUNCIONA PERFEITAMENTE
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            if (peca[i][j]['peca'] == "rei" && peca[i][j]['cor'] == cor) {
                return { x: i, y: j };
            }
        }
    }
}

function esta_em_cheque(corRei) {
    // Encontra a posição do rei do jogador de corRei
    let posicaoRei = encontrarRei(corRei);

    if (!posicaoRei) {
        return false; // Se o rei não for encontrado, não está em cheque
    }

    // Verifica se alguma peça adversária pode atingir a posição do rei
    for (let i = 1; i <= 8; i++) { // iterando sobre todas as linhas
        for (let j = 1; j <= 8; j++) { // iterando sobre todas as colunas
            if (peca[i][j]['cor'] !== corRei && peca[i][j]['peca']) { // se existe uma peça na div e se essa peça possui uma cor diferente da cor do rei que esta em cheque
                const movimentosPossiveis = possiveis_movimentos_para(i, j);

                if (verifica_possivel_cheque(posicaoRei.x, posicaoRei.y, movimentosPossiveis)) {
                    return true; // O rei está em cheque
                }
            }
        }
    }
    return false; // O rei não está em cheque
}

function possiveis_movimentos_para(i, j) {
    const movimentos = [];
    const tipoPeca = peca[i][j]['peca'];
    const corPeca = peca[i][j]['cor'];

    // Função que adiciona uma posição à lista de movimentos possíveis
    const adicionarMovimento = (px, py) => {
        if (px > 0 && px < 9 && py > 0 && py < 9) {
            if (peca[px][py]['cor'] != corPeca) {
                movimentos.push({ x: px, y: py });
            }
            if (!peca[px][py]['peca']) {
                return true; // Casa vazia, pode continuar
            }
        }
        return false; // Casa fora do tabuleiro ou bloqueada
    };

    // Movimentos do peão
    if (tipoPeca === 'peao') {
        const direcao = corPeca === "branco" ? -1 : 1;
        const linhaInicial = corPeca === "branco" ? 7 : 2;

        if (!peca[i + direcao][j]['peca']) {
            adicionarMovimento(i + direcao, j);
        }
        if (j - 1 > 0 && peca[i + direcao][j - 1]['peca']) {
            adicionarMovimento(i + direcao, j - 1);
        }
        if (j + 1 < 9 && peca[i + direcao][j + 1]['peca']) {
            adicionarMovimento(i + direcao, j + 1);
        }
        if (i === linhaInicial && !peca[i + direcao * 2][j]['peca'] && !peca[i + direcao][j]['peca']) {
            adicionarMovimento(i + direcao * 2, j);
        }
    }

    // Movimentos do cavalo
    if (tipoPeca === 'cavalo') {
        const movimentosCavalo = [
            { dx: -1, dy: -2 }, { dx: 1, dy: 2 },
            { dx: 1, dy: -2 }, { dx: -1, dy: 2 },
            { dx: -2, dy: -1 }, { dx: 2, dy: 1 },
            { dx: 2, dy: -1 }, { dx: -2, dy: 1 }
        ];
        movimentosCavalo.forEach(({ dx, dy }) => adicionarMovimento(i + dx, j + dy));
    }

    // Movimentos do rei
    if (tipoPeca === 'rei') {
        const movimentosRei = [
            { dx: -1, dy: 0 }, { dx: 0, dy: -1 }, { dx: -1, dy: -1 },
            { dx: 1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 1, dy: 1 },
            { dx: -1, dy: 1 }, { dx: 1, dy: -1 }
        ];
        movimentosRei.forEach(({ dx, dy }) => adicionarMovimento(i + dx, j + dy));
    }

    // Movimentos da torre
    if (tipoPeca === 'torre') {
        for (let dx = -1; adicionarMovimento(i + dx, j); dx--);
        for (let dx = 1; adicionarMovimento(i + dx, j); dx++);
        for (let dy = -1; adicionarMovimento(i, j + dy); dy--);
        for (let dy = 1; adicionarMovimento(i, j + dy); dy++);
    }

    // Movimentos do bispo
    if (tipoPeca === 'bispo') {
        for (let d = 1; adicionarMovimento(i - d, j - d); d++);
        for (let d = 1; adicionarMovimento(i + d, j + d); d++);
        for (let d = 1; adicionarMovimento(i - d, j + d); d++);
        for (let d = 1; adicionarMovimento(i + d, j - d); d++);
    }

    // Movimentos da rainha
    if (tipoPeca === 'rainha') {
        for (let d = 1; adicionarMovimento(i - d, j - d); d++);
        for (let d = 1; adicionarMovimento(i + d, j + d); d++);
        for (let d = 1; adicionarMovimento(i - d, j + d); d++);
        for (let d = 1; adicionarMovimento(i + d, j - d); d++);
        for (let d = 1; adicionarMovimento(i - d, j); d++);
        for (let d = 1; adicionarMovimento(i + d, j); d++);
        for (let d = 1; adicionarMovimento(i, j - d); d++);
        for (let d = 1; adicionarMovimento(i, j + d); d++);
    }

    return movimentos; // Retorna todos os movimentos possíveis
}

function verifica_possivel_cheque(posicaoX, posicaoY, movimentosPossiveis) {
    // Concatena as coordenadas do rei em uma string, no mesmo formato das posições dos movimentos
    const posicaoRei = "t" + posicaoX + posicaoY;

    // Itera pelos movimentos possíveis da peça adversária
    for (let i = 0; i < movimentosPossiveis.length; i++) {
        // Se algum dos movimentos possíveis coincide com a posição do rei
        const movimentoAtual = "t" + movimentosPossiveis[i].x + movimentosPossiveis[i].y;

        if (movimentoAtual === posicaoRei) {
            return true; // O rei está sob ataque
        }
    }

    // Se nenhum movimento atingir a posição do rei, o rei não está em cheque
    return false;
}

function possiveis_movimentos_para_peca(x, y) {
    let pecaAtual = peca[x][y]['peca'];
    let corAtual = peca[x][y]['cor'];
    let movimentos = [];

    switch (pecaAtual) {
        case "peao":
            movimentos = movimentos_peao(x, y, corAtual);
            break;
        case "torre":
            movimentos = movimentos_torre(x, y, corAtual);
            break;
        case "cavalo":
            movimentos = movimentos_cavalo(x, y, corAtual);
            break;
        case "bispo":
            movimentos = movimentos_bispo(x, y, corAtual);
            break;
        case "rainha":
            movimentos = movimentos_rainha(x, y, corAtual);
            break;
        case "rei":
            movimentos = movimentos_rei(x, y, corAtual);
            break;
        default:
            break;
    }

    return movimentos;
}

function desfaz_movimento(movimentoFeito) {

    // Restaura o estado da peça na posição de origem
    let xDestino = movimentoFeito.xDestino;
    let yDestino = movimentoFeito.yDestino;

    // Restaura a peça original na origem e no destino
    peca[movimentoFeito.xOrigem][movimentoFeito.yOrigem]['peca'] = peca[xDestino][yDestino]['peca'];
    peca[movimentoFeito.xOrigem][movimentoFeito.yOrigem]['cor'] = peca[xDestino][yDestino]['cor'];
    peca[xDestino][yDestino]['peca'] = movimentoFeito.pecaDestino;
    peca[xDestino][yDestino]['cor'] = movimentoFeito.corDestino;
}
function simula_movimento(xOrigem, yOrigem, xDestino, yDestino) {
    // Armazena as informações do movimento
    let movimentoFeito = {
        xOrigem: xOrigem,
        yOrigem: yOrigem,
        xDestino: xDestino,
        yDestino: yDestino,
        pecaDestino: peca[xDestino][yDestino]['peca'],  // Captura a peça que está sendo "substituída"
        corDestino: peca[xDestino][yDestino]['cor']     // Captura a cor da peça que está sendo "substituída"
    };

    // Executa a movimentação
    peca[xDestino][yDestino]['peca'] = peca[xOrigem][yOrigem]['peca'];
    peca[xDestino][yDestino]['cor'] = peca[xOrigem][yOrigem]['cor'];
    peca[xOrigem][yOrigem]['peca'] = false; // ou o valor padrão que você usa
    peca[xOrigem][yOrigem]['cor'] = false;

    // Retorna o objeto que armazena o movimento
    return movimentoFeito;
}















function movimentos_peao(x, y, corPeca) {
    var movimentos = [];
    if (corPeca == "branco") {
        if (!peca[x - 1][y]['peca']) {
            movimentos.push([x - 1, y]);
        }
        if (y - 1 > 0 && peca[x - 1][y - 1]['peca']) {
            movimentos.push([x - 1, y - 1]);
        }
        if (y + 1 < 9 && peca[x - 1][y + 1]['peca']) {
            movimentos.push([x - 1, y + 1]);
        }
        if (x == 7 && !peca[x - 2][y]['peca'] && !peca[x - 1][y]['peca']) {
            movimentos.push([x - 2, y]);
        }
    } else if (corPeca == "preto") {
        if (!peca[x + 1][y]['peca']) {
            movimentos.push([x + 1, y]);
        }
        if (y - 1 > 0 && peca[x + 1][y - 1]['peca']) {
            movimentos.push([x + 1, y - 1]);
        }
        if (y + 1 < 9 && peca[x + 1][y + 1]['peca']) {
            movimentos.push([x + 1, y + 1]);
        }
        if (x == 2 && !peca[x + 2][y]['peca'] && !peca[x + 1][y]['peca']) {
            movimentos.push([x + 2, y]);
        }
    }
    return movimentos.filter(m => m); // Retorna somente movimentos válidos
}
function movimentos_cavalo(x, y, corPeca) {
    var movimentos = [];
    movimentos.push([x - 1, y - 2]);
    movimentos.push([x + 1, y + 2]);
    movimentos.push([x + 1, y - 2]);
    movimentos.push([x - 1, y + 2]);
    movimentos.push([x - 2, y - 1]);
    movimentos.push([x + 2, y + 1]);
    movimentos.push([x + 2, y - 1]);
    movimentos.push([x - 2, y + 1]);
    return movimentos.filter(m => dentroLimite(m[0], m[1]) && (!peca[m[0]][m[1]]['peca'] || peca[m[0]][m[1]]['cor'] !== corPeca));
}
function movimentos_rei(x, y, corPeca) {
    var movimentos = [];
    movimentos.push([x - 1, y]);
    movimentos.push([x, y - 1]);
    movimentos.push([x - 1, y - 1]);
    movimentos.push([x + 1, y]);
    movimentos.push([x, y + 1]);
    movimentos.push([x + 1, y + 1]);
    movimentos.push([x - 1, y + 1]);
    movimentos.push([x + 1, y - 1]);
    return movimentos.filter(m => dentroLimite(m[0], m[1]) && (!peca[m[0]][m[1]]['peca'] || peca[m[0]][m[1]]['cor'] !== corPeca));
}
function movimentos_torre(x, y, corPeca) {
    var movimentos = [];
    for (var i = 1; dentroLimite(x - i, y) && !peca[x - i][y]['peca']; i++) {
        movimentos.push([x - i, y]);
    }
    if (dentroLimite(x - i, y) && peca[x - i][y]['cor'] !== corPeca) {
        movimentos.push([x - i, y]);
    }

    for (var i = 1; dentroLimite(x + i, y) && !peca[x + i][y]['peca']; i++) {
        movimentos.push([x + i, y]);
    }
    if (dentroLimite(x + i, y) && peca[x + i][y]['cor'] !== corPeca) {
        movimentos.push([x + i, y]);
    }

    for (var i = 1; dentroLimite(x, y - i) && !peca[x][y - i]['peca']; i++) {
        movimentos.push([x, y - i]);
    }
    if (dentroLimite(x, y - i) && peca[x][y - i]['cor'] !== corPeca) {
        movimentos.push([x, y - i]);
    }

    for (var i = 1; dentroLimite(x, y + i) && !peca[x][y + i]['peca']; i++) {
        movimentos.push([x, y + i]);
    }
    if (dentroLimite(x, y + i) && peca[x][y + i]['cor'] !== corPeca) {
        movimentos.push([x, y + i]);
    }

    return movimentos.filter(m => m);
}
function movimentos_bispo(x, y, corPeca) {
    var movimentos = [];
    for (var i = 1; dentroLimite(x - i, y - i) && !peca[x - i][y - i]['peca']; i++) {
        movimentos.push([x - i, y - i]);
    }
    if (dentroLimite(x - i, y - i) && peca[x - i][y - i]['cor'] !== corPeca) {
        movimentos.push([x - i, y - i]);
    }

    for (var i = 1; dentroLimite(x + i, y + i) && !peca[x + i][y + i]['peca']; i++) {
        movimentos.push([x + i, y + i]);
    }
    if (dentroLimite(x + i, y + i) && peca[x + i][y + i]['cor'] !== corPeca) {
        movimentos.push([x + i, y + i]);
    }

    for (var i = 1; dentroLimite(x - i, y + i) && !peca[x - i][y + i]['peca']; i++) {
        movimentos.push([x - i, y + i]);
    }
    if (dentroLimite(x - i, y + i) && peca[x - i][y + i]['cor'] !== corPeca) {
        movimentos.push([x - i, y + i]);
    }

    for (var i = 1; dentroLimite(x + i, y - i) && !peca[x + i][y - i]['peca']; i++) {
        movimentos.push([x + i, y - i]);
    }
    if (dentroLimite(x + i, y - i) && peca[x + i][y - i]['cor'] !== corPeca) {
        movimentos.push([x + i, y - i]);
    }

    return movimentos.filter(m => m);
}
function movimentos_rainha(x, y, corPeca) {
    return [...movimentos_torre(x, y, corPeca), ...movimentos_bispo(x, y, corPeca)];
}
function dentroLimite(x, y) {
    return x >= 1 && x <= 8 && y >= 1 && y <= 8; // Verifica se x e y estão entre 1 e 8
}
function simularMovimentoEVerificarCheque(xOrigem, yOrigem, xDestino, yDestino, corRei) {
    // Guardar o estado atual das peças
    const pecaDestinoOriginal = peca[xDestino][yDestino];
    const pecaOrigem = peca[xOrigem][yOrigem];
    
    // Simular o movimento
    peca[xDestino][yDestino] = pecaOrigem;
    peca[xOrigem][yOrigem] = { 'peca': false, 'cor': false };

    // Verificar se o rei ainda está em cheque
    const estaEmCheque = esta_em_cheque(corRei);

    // Reverter o movimento
    peca[xOrigem][yOrigem] = pecaOrigem;
    peca[xDestino][yDestino] = pecaDestinoOriginal;

    return !estaEmCheque; // Se o rei não está mais em cheque, o movimento é válido
}



























function zerarCasas() {
    let casasBrancas = document.querySelectorAll('.casaTabuleiroBranca')
    let casasPretas = document.querySelectorAll('.casaTabuleiroPreta')

    Array.from(casasBrancas).forEach(casaBranca => {
        casaBranca.innerHTML = "";
    })
    Array.from(casasPretas).forEach(casaPreta => {
        casaPreta.innerHTML = "";
    })
}

function popularCasas() {
    //muda a classe das pecas pretas(encima) para mostrar imgens das pecas
    document.getElementById("t11").innerHTML = "&#9820;";
    document.getElementById("t12").innerHTML = "&#9822;";
    document.getElementById("t13").innerHTML = "&#9821;";
    document.getElementById("t14").innerHTML = "&#9819;";
    document.getElementById("t15").innerHTML = "&#9818;";
    document.getElementById("t16").innerHTML = "&#9821;";
    document.getElementById("t17").innerHTML = "&#9822;";
    document.getElementById("t18").innerHTML = "&#9820;";

    document.getElementById("t21").innerHTML = "&#9823;";
    document.getElementById("t22").innerHTML = "&#9823;";
    document.getElementById("t23").innerHTML = "&#9823;";
    document.getElementById("t24").innerHTML = "&#9823;";
    document.getElementById("t25").innerHTML = "&#9823;";
    document.getElementById("t26").innerHTML = "&#9823;";
    document.getElementById("t27").innerHTML = "&#9823;";
    document.getElementById("t28").innerHTML = "&#9823;";

    //muda a classe das pecas brancas(embaixo) para mostrar imgens das pecas
    document.getElementById("t81").innerHTML = "&#9814;";
    document.getElementById("t82").innerHTML = "&#9816;";
    document.getElementById("t83").innerHTML = "&#9815;";
    document.getElementById("t84").innerHTML = "&#9813;";
    document.getElementById("t85").innerHTML = "&#9812;";
    document.getElementById("t86").innerHTML = "&#9815;";
    document.getElementById("t87").innerHTML = "&#9816;";
    document.getElementById("t88").innerHTML = "&#9814;";

    document.getElementById("t71").innerHTML = "&#9817;";
    document.getElementById("t72").innerHTML = "&#9817;";
    document.getElementById("t73").innerHTML = "&#9817;";
    document.getElementById("t74").innerHTML = "&#9817;";
    document.getElementById("t75").innerHTML = "&#9817;";
    document.getElementById("t76").innerHTML = "&#9817;";
    document.getElementById("t77").innerHTML = "&#9817;";
    document.getElementById("t78").innerHTML = "&#9817;";
}