/*
  Arquivo: script.js
  Descrição: Lógica do botão, persistência e exibição da mensagem.
  Edite a constante 'ROMANTIC_MESSAGE' abaixo para personalizar.
*/

// --- Configurações ---
const CONFIG = {
    targetClicks: 10,
    scaleIncrement: 0.1, // Quanto cresce por clique
    maxScale: 2.5,       // Limite de tamanho
    debounceTime: 300,   // Tempo em ms para evitar cliques acidentais
    romanticMessage: "Cada clique é um motivo a mais para te amar. Obrigado por ser meu sorriso diário — eu te amo hoje e sempre Jhenifer. ❤️"
};

// --- Elementos do DOM ---
const btn = document.getElementById('loveBtn');
const messageArea = document.getElementById('messageArea');
const finalText = document.getElementById('finalText');
const resetBtn = document.getElementById('resetBtn');

// --- Estado ---
let state = {
    clicks: parseInt(localStorage.getItem('loveClickCount')) || 0,
    currentScale: 1.0,
    canClick: true
};

// --- Inicialização ---
function init() {
    // Restaurar escala baseada nos cliques salvos (se não passou do limite)
    if (state.clicks < CONFIG.targetClicks) {
        state.currentScale = 1.0 + (state.clicks * CONFIG.scaleIncrement);
        updateButtonVisuals();
    } else {
        // Se já completou, mostra direto
        completeSurprise();
    }
}

// --- Funções Principais ---
function handleInteraction() {
    if (!state.canClick || state.clicks >= CONFIG.targetClicks) return;

    // Debounce
    state.canClick = false;
    setTimeout(() => state.canClick = true, CONFIG.debounceTime);

    // Lógica de incremento
    state.clicks++;
    state.currentScale = Math.min(state.currentScale + CONFIG.scaleIncrement, CONFIG.maxScale);
    
    // Salvar
    localStorage.setItem('loveClickCount', state.clicks);
    
    // Atualizar tela
    updateButtonVisuals();

    // Checar vitória
    if (state.clicks >= CONFIG.targetClicks) {
        completeSurprise();
    }
}

function updateButtonVisuals() {
    btn.style.transform = `scale(${state.currentScale})`;
    btn.setAttribute('aria-label', `${state.clicks} cliques. Continue clicando!`);
}

function completeSurprise() {
    // Esconde botão suavemente (opcional) ou mantém grande
    btn.style.cursor = 'default';
    btn.setAttribute('disabled', 'true');
    
    // Preenche e mostra mensagem
    finalText.innerText = CONFIG.romanticMessage;
    messageArea.classList.remove('message-hidden');
    messageArea.classList.add('message-visible');
}

function resetProgress() {
    localStorage.clear();
    state.clicks = 0;
    state.currentScale = 1.0;
    state.canClick = true;
    
    messageArea.classList.remove('message-visible');
    messageArea.classList.add('message-hidden');
    
    // Atualizar UI
    updateButtonVisuals();
    setTimeout(() => alert('te amo meu amor❤️.'), 100);
}

// --- Event Listeners ---
btn.addEventListener('click', handleInteraction);
resetBtn.addEventListener('click', resetProgress);

// Iniciar
init();
