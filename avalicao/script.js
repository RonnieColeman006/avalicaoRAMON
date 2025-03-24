const canvas = document.getElementById('jogoCanvas');
const ctx = canvas.getContext('2d');

const teclasPressionadas = {
    KeyW: false,
    KeyS: false,
    KeyD: false,
    KeyA: false
};

document.addEventListener('keydown', (e) => {
    teclasPressionadas[e.code] = true;
});

document.addEventListener('keyup', (e) => {
    teclasPressionadas[e.code] = false;
});

class Entidade {
    constructor(x, y, largura, altura, cor) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.cor = cor;
    }
    desenhar() {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Cobra extends Entidade {
    constructor(x, y, tamanho) {
        super(x, y, tamanho, tamanho, 'green');
        this.tamanho = tamanho;
        this.direcao = { x: tamanho, y: 0 };
    }

    atualizar() {
        this.x += this.direcao.x;
        this.y += this.direcao.y;

        if (this.x < 0 || this.x >= canvas.width || this.y < 0 || this.y >= canvas.height) {
            alert("Game Over!");
            document.location.reload();
        }
    }

    mudarDirecao(tecla) {
        if (tecla === 'KeyW') this.direcao = { x: 0, y: -this.tamanho };
        else if (tecla === 'KeyS') this.direcao = { x: 0, y: this.tamanho };
        else if (tecla === 'KeyA') this.direcao = { x: -this.tamanho, y: 0 };
        else if (tecla === 'KeyD') this.direcao = { x: this.tamanho, y: 0 };
    }
}

class Comida extends Entidade {
    constructor() {
        super(Math.floor(Math.random() * (canvas.width / 20)) * 20, Math.floor(Math.random() * (canvas.height / 20)) * 20, 20, 20, 'red');
    }
    reposicionar() {
        this.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
        this.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
    }
}

const cobra = new Cobra(100, 200, 20);
const comida = new Comida();

document.addEventListener('keydown', (e) => {
    cobra.mudarDirecao(e.code);
});

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cobra.atualizar();
    comida.desenhar();
    cobra.desenhar();
    setTimeout(() => requestAnimationFrame(loop), 75);
}

loop();
