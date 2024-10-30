class Tabuleiro {
    constructor() {
        this.nome = "Tabuleirooooooo;"

        this.tabuleiro = [];
        for (let linha=0; linha < 8; linha++) {
            this.tabuleiro[linha] = [];
            for (let coluna = 0; coluna < 8; coluna++) {
                this.tabuleiro[linha][coluna] = new Casa(linha, coluna);
            }
        }
        console.log(this.tabuleiro);
    }
}

class Casa {
    constructor(linha, coluna) {
        this.linha = linha;
        this.coluna = coluna;
        this.peca = null;

        this.elementoHtml = document.createElement('div');
        this.elementoHtml.classList.add('casa');

        if((linha + coluna) % 2 == 0) {
            this.elementoHtml.classList.add('clara')
        } else {
            this.elementoHtml.classList.add('escura')
        }
        document.getElementById('tabuleiro').appendChild(this.elementoHtml);
        console.log("foi");
    }
}

class Peca {
    constructor(cor, linha, coluna) {
        this.cor = cor;
        this.linha = linha;
        this.coluna = coluna;
        this.simbolo = "";
    }

    movimentosPossiveis() {
        return [];
    }

    moverPara(novaLinha, novaColuna) {
        this.linha = novaLinha;
        this.coluna = novaColuna;
    }
}


class Peao extends Peca {
    constructor(cor, linha, coluna) {
        super(cor, linha,coluna);
        this.simbolo = cor === 'branca' ? '♙' : '♟︎';
    }
}

peao = new Peao('branca', 1, 1);
console.log(peao);

const tabuleiro = new Tabuleiro();
alert(tabuleiro.nome);
