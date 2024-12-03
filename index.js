class Tabuleiro {
    constructor() {
        this.nome = "Tabuleiro";
        this.tabuleiro = [];
        this.selecionada = null;

        // Criação do tabuleiro
        for (let linha = 0; linha < 8; linha++) {
            this.tabuleiro[linha] = [];
            for (let coluna = 0; coluna < 8; coluna++) {
                this.tabuleiro[linha][coluna] = new Casa(linha, coluna);
            }
        }

        console.log("Tabuleiro inicializado:", this.tabuleiro);
    }

    colocarPeca(peca, linha, coluna) {
        const casa = this.tabuleiro[linha][coluna];
        casa.setPeca(peca);
    }

    clicarCasa(casa) {
        if (this.selecionada) {
            const pecaSelecionada = this.selecionada.peca;

            // Verifica se o movimento é válido
            if (!casa.peca || casa.peca.cor !== pecaSelecionada.cor) {
                casa.setPeca(pecaSelecionada); // Move a peça para a nova casa
                this.selecionada.setPeca(null); // Limpa a peça da casa anterior
                this.selecionada = null; // Desmarca a seleção
            } else {
                this.selecionada = null; // Desmarca a seleção caso seja a mesma cor
            }
        } else if (casa.peca) {
            this.selecionada = casa; // Seleciona a casa clicada
        }
    }
}

class Casa {
    constructor(linha, coluna) {
        this.linha = linha;
        this.coluna = coluna;
        this.peca = null;

        // Criação do elemento HTML da casa
        this.elementoHtml = document.createElement('div');
        this.elementoHtml.classList.add('casa');
        this.elementoHtml.classList.add((linha + coluna) % 2 === 0 ? 'clara' : 'escura');
        document.getElementById('tabuleiro').appendChild(this.elementoHtml);

        // Adiciona evento de clique
        this.elementoHtml.addEventListener('click', () => {
            tabuleiro.clicarCasa(this);
        });
    }

    setPeca(peca) {
        this.peca = peca;
        this.elementoHtml.innerHTML = peca ? peca.simbolo : ''; // Atualiza o conteúdo da casa
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

// Classes de peças com seus símbolos
class Peao extends Peca {
    constructor(cor, linha, coluna) {
        super(cor, linha, coluna);
        this.simbolo = cor === 'branca' ? '&#9817;' : '&#9823;';
    }
}

class Torre extends Peca {
    constructor(cor, linha, coluna) {
        super(cor, linha, coluna);
        this.simbolo = cor === 'branca' ? '&#9814;' : '&#9820;';
    }
}

class Cavalo extends Peca {
    constructor(cor, linha, coluna) {
        super(cor, linha, coluna);
        this.simbolo = cor === 'branca' ? '&#9816;' : '&#9822;';
    }
}

class Bispo extends Peca {
    constructor(cor, linha, coluna) {
        super(cor, linha, coluna);
        this.simbolo = cor === 'branca' ? '&#9815;' : '&#9821;';
    }
}

class Rei extends Peca {
    constructor(cor, linha, coluna) {
        super(cor, linha, coluna);
        this.simbolo = cor === 'branca' ? '&#9812;' : '&#9818;';
    }
}

class Rainha extends Peca {
    constructor(cor, linha, coluna) {
        super(cor, linha, coluna);
        this.simbolo = cor === 'branca' ? '&#9813;' : '&#9819;';
    }
}

// Instancia o tabuleiro
const tabuleiro = new Tabuleiro();

// Função para inicializar as peças
function inicializarPecas() {
    const pecasBrancas = [
        new Torre('branca', 0, 0), new Cavalo('branca', 0, 1), new Bispo('branca', 0, 2),
        new Rainha('branca', 0, 3), new Rei('branca', 0, 4), new Bispo('branca', 0, 5),
        new Cavalo('branca', 0, 6), new Torre('branca', 0, 7),
        ...Array.from({ length: 8 }, (_, i) => new Peao('branca', 1, i))
    ];

    const pecasPretas = [
        new Torre('preta', 7, 0), new Cavalo('preta', 7, 1), new Bispo('preta', 7, 2),
        new Rainha('preta', 7, 3), new Rei('preta', 7, 4), new Bispo('preta', 7, 5),
        new Cavalo('preta', 7, 6), new Torre('preta', 7, 7),
        ...Array.from({ length: 8 }, (_, i) => new Peao('preta', 6, i))
    ];

    // Coloca peças no tabuleiro
    [...pecasBrancas, ...pecasPretas].forEach(peca => {
        tabuleiro.colocarPeca(peca, peca.linha, peca.coluna);
    });
}

// Inicializa as peças
inicializarPecas();
