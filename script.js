const settingsBtn = document.querySelector(".settings-btn");
const panel = document.getElementById("settingsPanel");

const particlesBtn = document.getElementById("particlesBtn");
const freezeBtn = document.getElementById("freezeBtn");

const nomeInput = document.getElementById("nome");
const mensagemInput = document.getElementById("mensagem");
const enviarMensagem = document.getElementById("enviarMensagem");

let particlesEnabled = true;
let particlesFrozen = false;

/* Abrir painel de configurações */
settingsBtn.onclick = () => {
    panel.classList.toggle("active");
};

/* Enviar mensagem para WhatsApp */
enviarMensagem.onclick = () => {
    const nome = nomeInput.value.trim();
    const msg = mensagemInput.value.trim();

    if (nome === "" || msg === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const texto = `${nome}, ${msg}`;
    const url = `https://wa.me/5511941500004?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
};

/* CONFIGURAÇÃO DO CANVAS */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

/* Ajusta canvas ao redimensionar */
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    initParticles();
});

/* CLASSE PARTICLE */
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
    }

    update() {
        if (!particlesFrozen) {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

/* INICIALIZAÇÃO DAS PARTICULAS */
let particlesArray = [];
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 120; i++) particlesArray.push(new Particle());
}

/* ANIMAÇÃO */
function animateParticles() {
    if (!particlesEnabled) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* BOTÃO LIGAR/DESLIGAR PARTICULAS */
particlesBtn.onclick = () => {
    particlesEnabled = !particlesEnabled;

    particlesBtn.style.background =
        particlesEnabled ? "#0033ff" : "#550000";

    if (particlesEnabled) animateParticles();
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
};

/* BOTÃO CONGELAR PARTICULAS */
freezeBtn.onclick = () => {
    particlesFrozen = !particlesFrozen;

    freezeBtn.style.background =
        particlesFrozen ? "#ffaa00" : "#0033ff";
};
