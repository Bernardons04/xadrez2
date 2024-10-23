/* Detectar empate por afogamento */
/* Captura en-passant */

let hasBlackKingMoved = false;
let hasWhiteKingMoved = false;
let hasBlackLeftRookMoved = false;
let hasBlackRightRookMoved = false;
let hasWhiteLeftRookMoved = false;
let hasWhiteRightRookMoved = false;
let ultimoMovimentoPeao = { xInicial: null, yInicial: null, xFinal: null, yFinal: null };

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
    var c = 0; // contador para o array de possíveis movimentos
    var i; // contador para os loops
    x = movimenta['selecionada']['x'];
    y = movimenta['selecionada']['y'];

    function possivel(px, py) {
        // Verifica se a posição está dentro dos limites do tabuleiro
        if (px < 1 || px > 8 || py < 1 || py > 8) {
            return false; // Retorna falso para posições inválidas
        }

        // Lógica especial para roque: verifica se a peça é o rei
        if (movimenta['selecionada']['peca'] === 'rei') {
            // Verifica o roque para o lado das brancas (rei na linha 8)
            if (movimenta['selecionada']['cor'] === 'branco' && px === 8) {
                // Roque menor para as brancas (rei para g8, torre para f8)
                if (!hasWhiteKingMoved && !hasWhiteRightRookMoved) {
                    if (!peca[8][6]['peca'] && !peca[8][7]['peca']) { // Verifica se as casas estão vazias
                        const emChequeDireita = verifica_se_em_cheque(8, 5, 'branco') || verifica_se_em_cheque(8, 6, 'branco');
                        if (!emChequeDireita) {
                            // Marca a casa correta para o roque menor
                            document.getElementById('t87').style.backgroundColor = "#3C9";
                            possiveis[c] = "t87"; // Movimentação do rei para g8
                            c++;
                            return true;
                        }
                    }
                }
                // Roque maior para as brancas (rei para c8, torre para d8)
                if (!hasWhiteKingMoved && !hasWhiteLeftRookMoved) {
                    if (!peca[8][2]['peca'] && !peca[8][3]['peca'] && !peca[8][4]['peca']) {
                        const emChequeEsquerda = verifica_se_em_cheque(8, 3, 'branco') || verifica_se_em_cheque(8, 4, 'branco');
                        if (!emChequeEsquerda) {
                            document.getElementById('t83').style.backgroundColor = "#3C9";
                            possiveis[c] = "t83"; // Movimentação do rei para c8
                            c++;
                            return true;
                        }
                    }
                }
            }

            // Verifica o roque para o lado das pretas (rei na linha 1)
            if (movimenta['selecionada']['cor'] === 'preto' && px === 1) {
                // Roque menor para as pretas (rei para g1, torre para f1)
                if (!hasBlackKingMoved && !hasBlackRightRookMoved) {
                    if (!peca[1][6]['peca'] && !peca[1][7]['peca']) {
                        const emChequeDireita = verifica_se_em_cheque(1, 5, 'preto') || verifica_se_em_cheque(1, 6, 'preto');
                        if (!emChequeDireita) {
                            document.getElementById('t17').style.backgroundColor = "#3C9";
                            possiveis[c] = "t17"; // Movimentação do rei para g1
                            c++;
                            return true;
                        }
                    }
                }
                // Roque maior para as pretas (rei para c1, torre para d1)
                if (!hasBlackKingMoved && !hasBlackLeftRookMoved) {
                    if (!peca[1][2]['peca'] && !peca[1][3]['peca'] && !peca[1][4]['peca']) {
                        const emChequeEsquerda = verifica_se_em_cheque(1, 3, 'preto') || verifica_se_em_cheque(1, 4, 'preto');
                        if (!emChequeEsquerda) {
                            document.getElementById('t13').style.backgroundColor = "#3C9";
                            possiveis[c] = "t13"; // Movimentação do rei para c1
                            c++;
                            return true;
                        }
                    }
                }
            }
        }

        // Verifica se há uma peça na casa (independente da cor)
        if (peca[px][py]['peca']) {
            // Se a peça for da mesma cor, para o loop e retorna false
            if (peca[px][py]['cor'] === movimenta['selecionada']['cor']) {
                return 'break'; // Peça da mesma cor no caminho
            }

            // Se a peça for de cor diferente, permite a captura mas para o loop depois
            const emCheque = verifica_se_em_cheque(px, py, movimenta['selecionada']['cor']);
            if (!emCheque) {
                // Marca a casa como um movimento possível (captura)
                document.getElementById('t' + px + py).style.backgroundColor = "#3C9";
                possiveis[c] = "t" + px + py;
                c++;
            }
            return false; // Para o loop após a captura
        }

        // Se a casa estiver vazia, prossegue normalmente
        const emCheque = verifica_se_em_cheque(px, py, movimenta['selecionada']['cor']);
        if (!emCheque) {
            // Marca a casa como um movimento possível
            document.getElementById('t' + px + py).style.backgroundColor = "#3C9";
            possiveis[c] = "t" + px + py;
            c++;
            return true; // Movimento válido
        }

        return false; // Movimento inválido
    }

    function verifica_se_em_cheque(destinoX, destinoY, cor) {
        const pecaOriginal = peca[destinoX][destinoY];
        const pecaSelecionada = peca[x][y];

        // Simula o movimento
        peca[destinoX][destinoY] = pecaSelecionada;
        peca[x][y] = { peca: false, cor: false }; // remove a peça da posição original

        // Verifica se o rei está em cheque após o movimento
        const estaEmCheque = esta_em_cheque(cor);

        // Reverte o movimento
        peca[x][y] = pecaSelecionada;
        peca[destinoX][destinoY] = pecaOriginal;

        return estaEmCheque;
    }

    if (peca[x][y]['peca'] === 'peao') {
        if (peca[x][y]['cor'] === "branco") {
            if (x === 4) {
                if (ultimoMovimentoPeao.xFinal == 4 && Math.abs(ultimoMovimentoPeao.yFinal - y) == 1) {
                    possivel(3, ultimoMovimentoPeao.yFinal); // Captura en passant para peão branco
                }
            }
            if (!peca[x - 1][y]['peca']) {
                possivel(x - 1, y);
            }
            // Capturas diagonais
            if (peca[x - 1][y - 1] && peca[x - 1][y - 1]['cor'] === "preto") {
                possivel(x - 1, y - 1);
            }
            if (peca[x - 1][y + 1] && peca[x - 1][y + 1]['cor'] === "preto") {
                possivel(x - 1, y + 1);
            }
            // Movimento inicial de 2 casas
            if (x === 7 && !peca[x - 2][y]['peca'] && !peca[x - 1][y]['peca']) {
                possivel(x - 2, y);
            }
        } else if (peca[x][y]['cor'] === "preto") {
            if (x === 5) {
                if (ultimoMovimentoPeao.xFinal == 5 && Math.abs(ultimoMovimentoPeao.yFinal - y) == 1) {
                    possivel(6, ultimoMovimentoPeao.yFinal); // Captura en passant para peão preto
                }
            }
            if (!peca[x + 1][y]['peca']) {
                possivel(x + 1, y);
            }
            // Capturas diagonais
            if (peca[x + 1][y - 1] && peca[x + 1][y - 1]['cor'] === "branco") {
                possivel(x + 1, y - 1);
            }
            if (peca[x + 1][y + 1] && peca[x + 1][y + 1]['cor'] === "branco") {
                possivel(x + 1, y + 1);
            }
            // Movimento inicial de 2 casas
            if (x === 2 && !peca[x + 2][y]['peca'] && !peca[x + 1][y]['peca']) {
                possivel(x + 2, y);
            }
        }
    }

    if (peca[x][y]['peca'] === 'cavalo') {
        const movimentosCavalo = [
            [x - 1, y - 2], [x + 1, y + 2], [x + 1, y - 2], [x - 1, y + 2],
            [x - 2, y - 1], [x + 2, y + 1], [x + 2, y - 1], [x - 2, y + 1]
        ];

        movimentosCavalo.forEach(([nx, ny]) => {
            possivel(nx, ny);
        });
    }

    if (peca[x][y]['peca'] === 'rei') {
        const movimentosRei = [
            [x - 1, y], [x, y - 1], [x - 1, y - 1],
            [x + 1, y], [x, y + 1], [x + 1, y + 1],
            [x - 1, y + 1], [x + 1, y - 1]
        ];

        movimentosRei.forEach(([nx, ny]) => {
            possivel(nx, ny);
        });

        // Verifica o roque menor (rei se movendo duas casas para a direita)
        if (movimenta['selecionada']['cor'] === 'branco' && x === 8 && !hasWhiteKingMoved && !hasWhiteRightRookMoved) {
            if (!peca[8][6]['peca'] && !peca[8][7]['peca']) {
                possivel(8, 7);  // Casa do roque menor
            }
        } else if (movimenta['selecionada']['cor'] === 'preto' && x === 1 && !hasBlackKingMoved && !hasBlackRightRookMoved) {
            if (!peca[1][6]['peca'] && !peca[1][7]['peca']) {
                possivel(1, 7);  // Casa do roque menor para o rei preto
            }
        }

        // Verifica o roque maior (rei se movendo duas casas para a esquerda)
        if (movimenta['selecionada']['cor'] === 'branco' && x === 8 && !hasWhiteKingMoved && !hasWhiteLeftRookMoved) {
            if (!peca[8][2]['peca'] && !peca[8][3]['peca'] && !peca[8][4]['peca']) {
                possivel(8, 3);  // Casa do roque maior
            }
        } else if (movimenta['selecionada']['cor'] === 'preto' && x === 1 && !hasBlackKingMoved && !hasBlackLeftRookMoved) {
            if (!peca[1][2]['peca'] && !peca[1][3]['peca'] && !peca[1][4]['peca']) {
                possivel(1, 3);  // Casa do roque maior para o rei preto
            }
        }
    }

    if (peca[x][y]['peca'] === 'torre') {
        for (let i = 1; i <= 8; i++) {
            if (possivel(x - i, y) === 'break') {
                break;
            }
        }
        for (let i = 1; i <= 8; i++) {
            if (possivel(x + i, y) === 'break') {
                break;
            }
        }
        for (let i = 1; i <= 8; i++) {
            if (possivel(x, y - i) === 'break') {
                break;
            }
        }
        for (let i = 1; i <= 8; i++) {
            if (possivel(x, y + i) === 'break') {
                break;
            }
        }
    }

    if (peca[x][y]['peca'] === 'bispo') {
        for (let i = 1; i <= 8; i++) {
            if (possivel(x - i, y - i) === 'break') {
                break;
            }
        }

        for (let i = 1; i <= 8; i++) {
            if (possivel(x + i, y + i) === 'break') {
                break;
            }
        }

        for (let i = 1; i <= 8; i++) {
            if (possivel(x - i, y + i) === 'break') {
                break;
            }
        }

        for (let i = 1; i <= 8; i++) {
            if (possivel(x + i, y - i) === 'break') {
                break;
            }
        }
    }

    if (peca[x][y]['peca'] === 'rainha') {
        for (let i = 1; i <= 8; i++) {
            if (possivel(x - i, y - i) === 'break') {
                break;
            }
        }

        for (let i = 1; i <= 8; i++) {
            if (possivel(x + i, y + i) === 'break') {
                break;
            }
        }

        for (let i = 1; i <= 8; i++) {
            if (possivel(x - i, y + i) === 'break') {
                break;
            }
        }

        for (let i = 1; i <= 8; i++) {
            if (possivel(x + i, y - i) === 'break') {
                break;
            }
        }
        for (let i = 1; i <= 8; i++) {
            if (possivel(x - i, y) === 'break') {
                break;
            }
        }
        for (let i = 1; i <= 8; i++) {
            if (possivel(x + i, y) === 'break') {
                break;
            }
        }
        for (let i = 1; i <= 8; i++) {
            if (possivel(x, y - i) === 'break') {
                break;
            }
        }
        for (let i = 1; i <= 8; i++) {
            if (possivel(x, y + i) === 'break') {
                break;
            }
        }
    }

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

    for (cp = 0; cp < c; cp++) { // corrigido para cp começar em 0
        if (possiveis[cp] == div) {
            return true; // Encontra um movimento válido
        }
    }
    return false; // Nenhum movimento válido encontrado
}
function seleciona(x, y) {
    if ((movimenta['selecionada']['x'] == 0 || peca[x][y]['cor'] == movimenta['selecionada']['cor']) && peca[x][y]['cor'] == vez) {
        if (movimenta['selecionada']['x'] != 0) {
            volta_fundo(); // Volta a cor de fundo normal
        }
        if (peca[x][y]['peca']) { // Se tiver uma peça nessa posição
            movimenta['selecionada']['x'] = x;	// Recebe x selecionado
            movimenta['selecionada']['y'] = y;  // Recebe y selecionado
            movimenta['selecionada']['peca'] = peca[x][y]['peca']; // Recebe a peça selecionada
            movimenta['selecionada']['cor'] = peca[x][y]['cor'];	// Recebe a cor selecionada

            const estaEmCheque = esta_em_cheque(vez);

            if (estaEmCheque) {
                // Chama o método verifica_cheque_mate para obter os movimentos que podem tirar o rei do cheque
                movimentosPossiveis = verifica_cheque_mate();
                console.log('movimentosPossiveis: ', movimentosPossiveis);


                // Filtra os movimentos possíveis da peça selecionada
                movimentosDaPecaSelecionada = movimentosPossiveis.filter(mov =>
                    mov.de[0] === movimenta['selecionada']['x'] &&
                    mov.de[1] === movimenta['selecionada']['y']
                );
                console.log('movimentosDaPecaSelecionada: ', movimentosDaPecaSelecionada);

                // Se a peça selecionada não tiver movimentos válidos que tirem o rei do cheque, exibe uma mensagem
                if (movimentosDaPecaSelecionada.length === 0) {
                    alert("Você está em cheque! Não pode mover essa peça.");
                    return; // Impede que o jogador faça o movimento
                }
            }
            // Se houver movimentos válidos, atualiza os possíveis movimentos para a peça selecionada
            cont_possiveis = possiveis_movimentos();
        }
    } else if (verifica_possivel(x, y, cont_possiveis)) { // Se for segundo clique e a cor da peça destino for diferente da selecionada

        // Se o rei se mover, atualize a variável de controle
        if (movimenta['selecionada']['peca'] === 'rei') {
            if (movimenta['selecionada']['cor'] === 'branco') {
                hasWhiteKingMoved = true;
            } else {
                hasBlackKingMoved = true;
            }

            // Verifica se o movimento é um roque
            if (movimenta['selecionada']['cor'] === 'branco' && x === 8 && (y === 7 || y === 3)) {
                if (y === 7 && !hasWhiteRightRookMoved) { // Roque menor
                    document.getElementById("t88").innerHTML = "";
                    peca[8][8] = { peca: false, cor: false };

                    document.getElementById("t86").innerHTML = il['branco']['torre'];
                    peca[8][6] = { peca: 'torre', cor: 'branco', movida: true };
                } else if (y === 3 && !hasWhiteLeftRookMoved) { // Roque maior
                    document.getElementById("t81").innerHTML = "";
                    peca[8][1] = { peca: false, cor: false };

                    document.getElementById("t84").innerHTML = il['branco']['torre'];
                    peca[8][4] = { peca: 'torre', cor: 'branco', movida: true };
                }
            } else if (movimenta['selecionada']['cor'] === 'preto' && x === 1 && (y === 7 || y === 3)) {
                if (y === 7 && !hasBlackRightRookMoved) { // Roque menor
                    document.getElementById("t18").innerHTML = "";
                    peca[1][8] = { peca: false, cor: false };

                    document.getElementById("t16").innerHTML = il['preto']['torre'];
                    peca[1][6] = { peca: 'torre', cor: 'preto', movida: true };
                } else if (y === 3 && !hasBlackLeftRookMoved) { // Roque maior
                    document.getElementById("t11").innerHTML = "";
                    peca[1][1] = { peca: false, cor: false };

                    document.getElementById("t14").innerHTML = il['preto']['torre'];
                    peca[1][4] = { peca: 'torre', cor: 'preto', movida: true };
                }
            }
        }

        // Se uma torre se mover, atualize a variável de controle
        if (movimenta['selecionada']['peca'] === 'torre') {
            if (movimenta['selecionada']['cor'] === 'branco') {
                if (movimenta['selecionada']['x'] === 8 && movimenta['selecionada']['y'] === 1) {
                    hasWhiteLeftRookMoved = true;
                } else if (movimenta['selecionada']['x'] === 8 && movimenta['selecionada']['y'] === 8) {
                    hasWhiteRightRookMoved = true;
                }
            } else {
                if (movimenta['selecionada']['x'] === 1 && movimenta['selecionada']['y'] === 1) {
                    hasBlackLeftRookMoved = true;
                } else if (movimenta['selecionada']['x'] === 1 && movimenta['selecionada']['y'] === 8) {
                    hasBlackRightRookMoved = true;
                }
            }
        }

        // Captura en passant
        if (movimenta['selecionada']['peca'] === 'peao') {
            ultimoMovimentoPeao.xInicial = movimenta['selecionada']['x'];
            ultimoMovimentoPeao.yInicial = movimenta['selecionada']['y'];

            // Verifica captura en passant para peão branco
            if (movimenta['selecionada']['cor'] === 'branco' &&
                x === ultimoMovimentoPeao.xFinal - 1 &&
                y === ultimoMovimentoPeao.yFinal &&
                peca[ultimoMovimentoPeao.xFinal][ultimoMovimentoPeao.yFinal]['peca'] === 'peao' &&
                peca[ultimoMovimentoPeao.xFinal][ultimoMovimentoPeao.yFinal]['cor'] === 'preto') {
                console.log('entra no if aptura en passant para peão branco');

                // Captura o peão preto
                document.getElementById("t" + ultimoMovimentoPeao.xFinal + "" + ultimoMovimentoPeao.yFinal).innerHTML = ""; // Remove o peão preto capturado
                peca[ultimoMovimentoPeao.xFinal][ultimoMovimentoPeao.yFinal] = { peca: false, cor: false }; // Atualiza o tabuleiro

                // Verifica captura en passant para peão preto
            } else if (movimenta['selecionada']['cor'] === 'preto' &&
                x === ultimoMovimentoPeao.xFinal + 1 &&
                y === ultimoMovimentoPeao.yFinal &&
                peca[ultimoMovimentoPeao.xFinal][ultimoMovimentoPeao.yFinal]['peca'] === 'peao' &&
                peca[ultimoMovimentoPeao.xFinal][ultimoMovimentoPeao.yFinal]['cor'] === 'branco') {
                console.log('entra no if aptura en passant para peão preto');
                // Captura o peão branco
                document.getElementById("t" + ultimoMovimentoPeao.xFinal + "" + ultimoMovimentoPeao.yFinal).innerHTML = ""; // Remove o peão branco capturado
                peca[ultimoMovimentoPeao.xFinal][ultimoMovimentoPeao.yFinal] = { peca: false, cor: false }; // Atualiza o tabuleiro
            }
            ultimoMovimentoPeao.xFinal = x;
            ultimoMovimentoPeao.yFinal = y;
        }

        // Promover peão
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
            movimenta['destino']['x'] = x; // Recebe o x do destino (segundo clique)
            movimenta['destino']['y'] = y;  // Recebe y do destino (segundo clique)

            if (peca[x][y]['peca']) {  // Se tiver alguma peça nessa posição
                movimenta['destino']['peca'] = peca[x][y]['peca']; // Destino recebe a peça
                movimenta['destino']['cor'] = peca[x][y]['cor']; // Destino recebe a cor
            }

            document.getElementById("t" + movimenta['selecionada']['x'] + "" + movimenta['selecionada']['y']).innerHTML = ""; // Remove a imagem da peça selecionada
            document.getElementById("t" + x + "" + y).innerHTML = il[movimenta['selecionada']['cor']][movimenta['selecionada']['peca']]; // Atualiza a imagem da peça no destino
            peca[x][y]['peca'] = movimenta['selecionada']['peca']; // Atualiza a peça no destino
            peca[x][y]['cor'] = movimenta['selecionada']['cor']; // Atualiza a cor no destino

            peca[movimenta['selecionada']['x']][movimenta['selecionada']['y']]['peca'] = false; // Remove a peça da origem
            peca[movimenta['selecionada']['x']][movimenta['selecionada']['y']]['cor'] = false; // Remove a cor da origem

            movimenta['selecionada']['x'] = 0; // Reseta a seleção de peça
            movimenta['selecionada']['y'] = 0; // Reseta a seleção de peça
            movimenta['selecionada']['peca'] = "0"; // Reseta a peça selecionada
            movimenta['selecionada']['cor'] = "0"; // Reseta a cor selecionada
        }

        volta_fundo(); // Volta o fundo normal

        if (vez == "branco") {
            vez = "preto";
            pecasAgora = 'Pretas'
        } else {
            vez = "branco";
            pecasAgora = 'Brancas'
        }

        if (vez == "preto") {
            vezAdversaria = "branco"
        } else {
            vezAdversaria = "preto";
        }

        document.getElementById('vezDoJogador').innerHTML = 'Vez das peças ' + pecasAgora
        // verificar cheque e cheque-mate aqui
        let estaEmCheque = esta_em_cheque(vez)

        if (estaEmCheque) {

            let chequeMate = verifica_cheque_mate(vez);

            if (chequeMate.length == 0) {
                alert("Cheque-mate! " + vezAdversaria + " venceu!");
            } else {
                alert(vez + ' está em cheque');
            }
        } else if (verifica_cheque_mate(vez).length == 0) {
            alert('Empate por afogamento');
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
function encontrarRei(cor) {
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

    const corRei = corAtual === "branco" ? "preto" : "branco"; // Altera a cor do rei a ser verificada
    movimentos = movimentos.filter(([xDestino, yDestino]) => movimentoTiraCheque(x, y, xDestino, yDestino, corRei));


    return movimentos;
}
function movimentoTiraCheque(xOrigem, yOrigem, xDestino, yDestino, corRei) {
    // Simula o movimento
    const movimentoFeito = simula_movimento(xOrigem, yOrigem, xDestino, yDestino);

    // Verifica se o rei está em cheque após o movimento
    const estaEmCheque = esta_em_cheque(corRei);

    // Desfaz o movimento para restaurar o estado do tabuleiro
    desfaz_movimento(movimentoFeito);

    return !estaEmCheque; // Retorna true se o movimento tira o rei do cheque
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
        if (x == 4) {
            if (ultimoMovimentoPeao.xFinal == 4 && Math.abs(ultimoMovimentoPeao.yFinal - y) == 1) {
                movimentos.push([3, ultimoMovimentoPeao.yFinal]);
            }
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
        if (x == 5) {
            if (ultimoMovimentoPeao.xFinal == 5 && Math.abs(ultimoMovimentoPeao.yFinal - y) == 1) {
                movimentos.push([6, ultimoMovimentoPeao.yFinal]);
            }
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
function comecar_nova_partida() {
    hasBlackKingMoved = false;
    hasWhiteKingMoved = false;
    hasBlackLeftRookMoved = false;
    hasBlackRightRookMoved = false;
    hasWhiteLeftRookMoved = false;
    hasWhiteRightRookMoved = false;
    ultimoMovimentoPeao = { xInicial: null, yInicial: null, xFinal: null, yFinal: null };
    inicia_jogo();
}