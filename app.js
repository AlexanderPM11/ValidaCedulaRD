const cedulaInput = document.getElementById('cedulaInput');
const feedback = document.getElementById('feedback');
const resultCard = document.getElementById('resultCard');
const statusIcon = document.getElementById('statusIcon');
const statusText = document.getElementById('statusText');
const calculationSteps = document.getElementById('calculationSteps');
const copyBtn = document.getElementById('copyBtn');
const detailsBtn = document.getElementById('detailsBtn');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');
const infoBtn = document.getElementById('infoBtn');

let history = JSON.parse(localStorage.getItem('cedula_history') || '[]');

// Initialize
renderHistory();

cedulaInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Only digits
    
    // Format: 000-0000000-0
    if (value.length > 3 && value.length <= 10) {
        value = value.slice(0, 3) + '-' + value.slice(3);
    } else if (value.length > 10) {
        value = value.slice(0, 3) + '-' + value.slice(3, 10) + '-' + value.slice(10, 11);
    }
    
    e.target.value = value;
    validateCedula(value.replace(/\D/g, ''));
});

function validateCedula(cedula) {
    if (cedula.length === 0) {
        resetUI();
        return;
    }

    if (cedula.length < 11) {
        setUIState('pending', 'Escribe los 11 dígitos');
        return;
    }

    if (cedula.length > 11) {
        cedula = cedula.slice(0, 11);
    }

    const digits = cedula.split('').map(Number);
    const verifier = digits.pop();
    const multipliers = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    
    let sum = 0;
    let steps = [];

    digits.forEach((digit, i) => {
        let res = digit * multipliers[i];
        if (res > 9) {
            const originalRes = res;
            res = Math.floor(res / 10) + (res % 10);
            steps.push(`${digit}×${multipliers[i]}=${originalRes}→${res}`);
        } else {
            steps.push(`${digit}×${multipliers[i]}=${res}`);
        }
        sum += res;
    });

    const calculatedVerifier = (10 - (sum % 10)) % 10;
    const isValid = calculatedVerifier === verifier;

    calculationSteps.innerHTML = steps.join(' + ') + ` = ${sum} | Verificador: ${calculatedVerifier}`;
    
    if (isValid) {
        setUIState('valid', '✅ Cédula Válida');
        addToHistory(cedula, true);
        
        Swal.fire({
            title: '¡Cédula Válida!',
            text: `El número ${formatId(cedula)} es auténtico.`,
            icon: 'success',
            confirmButtonColor: '#4f46e5',
            confirmButtonText: 'Excelente'
        });
    } else {
        setUIState('invalid', '❌ Cédula Inválida');
        addToHistory(cedula, false);

        Swal.fire({
            title: 'Cédula Inválida',
            text: `El número ${formatId(cedula)} no es válido según el algoritmo.`,
            icon: 'error',
            confirmButtonColor: '#ef4444',
        });
    }
}

function setUIState(state, message) {
    statusText.innerText = message;
    resultCard.className = 'result-card ' + state;
    const isFinal = state === 'valid' || state === 'invalid';
    copyBtn.classList.toggle('hidden', !isFinal);
    detailsBtn.classList.toggle('hidden', !isFinal);
    
    if (state === 'valid') {
        statusIcon.innerText = '✔';
        statusIcon.style.background = 'var(--success)';
        cedulaInput.className = 'valid-state';
    } else if (state === 'invalid') {
        statusIcon.innerText = '✖';
        statusIcon.style.background = 'var(--error)';
        cedulaInput.className = 'invalid-state';
    } else {
        statusIcon.innerText = '?';
        statusIcon.style.background = 'var(--border)';
        cedulaInput.className = '';
        calculationSteps.innerHTML = '';
    }
}

function resetUI() {
    setUIState('pending', 'Introduce una cédula');
    cedulaInput.className = '';
    calculationSteps.innerHTML = '';
}

function addToHistory(cedula, isValid) {
    // Only add if not the same as last one to avoid spam
    if (history.length > 0 && history[0].id === cedula) return;

    const item = {
        id: cedula,
        valid: isValid,
        date: new Date().toLocaleTimeString()
    };

    history.unshift(item);
    if (history.length > 5) history.pop();
    
    localStorage.setItem('cedula_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    if (history.length === 0) {
        historyList.innerHTML = '<p class="empty-msg">No hay verificaciones recientes</p>';
        clearHistoryBtn.classList.add('hidden');
        return;
    }

    clearHistoryBtn.classList.remove('hidden');
    historyList.innerHTML = history.map(item => `
        <div class="history-item">
            <div>
                <span class="history-id">${formatId(item.id)}</span>
                <div style="font-size: 0.6rem; color: var(--text-light)">${item.date}</div>
            </div>
            <span class="history-tag ${item.valid ? 'valid' : 'invalid'}">
                ${item.valid ? 'Válida' : 'Inválida'}
            </span>
        </div>
    `).join('');
}

function formatId(id) {
    return id.slice(0, 3) + '-' + id.slice(3, 10) + '-' + id.slice(10);
}

copyBtn.addEventListener('click', () => {
    const text = `Cédula: ${cedulaInput.value} - Resultado: ${statusText.innerText}`;
    navigator.clipboard.writeText(text).then(() => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Copiado al portapapeles',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    });
});

infoBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'Sobre el Validador',
        html: `
            <div style="text-align: left; font-size: 0.9rem; line-height: 1.6; color: #1e293b;">
                <p>Este sistema valida la estructura de la <strong>Cédula de Identidad y Electoral</strong> de la República Dominicana usando el algoritmo de Luhn (Módulo 10).</p>
                <hr style="margin: 1rem 0; border: 0; border-top: 1px solid #e2e8f0;">
                <p><strong>¿Cómo se calcula?</strong></p>
                <ol style="margin-left: 1.2rem; margin-top: 0.5rem;">
                    <li>Se toman los primeros 10 dígitos.</li>
                    <li>Se multiplican alternadamente por <strong>1 y 2</strong> (empezando por 1).</li>
                    <li>Si un resultado es mayor que 9, se suman sus dígitos (ej. 12 → 1+2=3).</li>
                    <li>Se suman todos estos resultados.</li>
                    <li>El dígito verificador es lo que falta para llegar al siguiente múltiplo de 10.</li>
                </ol>
                <p style="margin-top: 1rem; font-size: 0.8rem; color: #64748b;">Desarrollado para ser rápido, privado (todo ocurre en tu dispositivo) y funcional sin conexión.</p>
            </div>
        `,
        confirmButtonColor: '#4f46e5',
        confirmButtonText: 'Entendido',
        icon: 'info'
    });
});

detailsBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'Pasos del Algoritmo',
        html: `
            <div style="text-align: left; font-family: monospace; font-size: 0.85rem; background: #f1f5f9; padding: 1rem; border-radius: 0.5rem; color: #1e293b;">
                ${calculationSteps.innerHTML.replace(/\|/g, '<br><hr style="margin: 0.5rem 0; border: 0; border-top: 1px solid #cbd5e1;">')}
            </div>
        `,
        confirmButtonColor: '#4f46e5',
        confirmButtonText: 'Entendido'
    });
});

clearHistoryBtn.addEventListener('click', () => {
    history = [];
    localStorage.removeItem('cedula_history');
    renderHistory();
});
