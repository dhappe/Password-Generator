// Seleciona elementos HTML por seus IDs e armazena em variáveis
const pwEl = document.getElementById("pw"); // Elemento de exibição da senha gerada
const copyEl = document.getElementById("copy"); // Botão "Copiar"
const lenEl = document.getElementById("len"); // Campo de entrada para o comprimento da senha
const upperEl = document.getElementById("upper"); // Caixa de seleção para letras maiúsculas
const lowerEl = document.getElementById("lower"); // Caixa de seleção para letras minúsculas
const numberEl = document.getElementById("number"); // Caixa de seleção para números
const symbolEl = document.getElementById("symbol"); // Caixa de seleção para caracteres especiais
const generateEl = document.getElementById("generate"); // Botão "Gerar Senha"

// Define strings contendo os caracteres para letras maiúsculas, minúsculas, números e caracteres especiais
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

// Funções para obter caracteres aleatórios
function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Função para gerar uma senha com base nas seleções do usuário
function generatePassword() {
    const len = lenEl.value; // Obtém o comprimento da senha escolhido pelo usuário

    let password = ""; // Inicializa uma string vazia para a senha gerada

    // Verifica se o usuário escolheu incluir letras maiúsculas e, se sim, adiciona uma letra maiúscula à senha
    if (upperEl.checked) {
        password += getUppercase();
    }

    // Verifica se o usuário escolheu incluir letras minúsculas e, se sim, adiciona uma letra minúscula à senha
    if (lowerEl.checked) {
        password += getLowercase();
    }

    // Verifica se o usuário escolheu incluir números e, se sim, adiciona um número à senha
    if (numberEl.checked) {
        password += getNumber();
    }

    // Verifica se o usuário escolheu incluir caracteres especiais e, se sim, adiciona um caractere especial à senha
    if (symbolEl.checked) {
        password += getSymbol();
    }

    // Preenche o restante da senha com caracteres aleatórios até atingir o comprimento desejado
    for (let i = password.length; i < len; i++) {
        const x = generateX();
        password += x;
    }

    // Exibe a senha gerada no elemento HTML
    pwEl.innerText = password;
}

// Função para gerar um caractere aleatório com base nas seleções do usuário
function generateX() {
    const xs = [];

    // Adiciona letras maiúsculas à lista de caracteres possíveis se o usuário escolheu incluí-las
    if (upperEl.checked) {
        xs.push(getUppercase());
    }

    // Adiciona letras minúsculas à lista de caracteres possíveis se o usuário escolheu incluí-las
    if (lowerEl.checked) {
        xs.push(getLowercase());
    }

    // Adiciona números à lista de caracteres possíveis se o usuário escolheu incluí-los
    if (numberEl.checked) {
        xs.push(getNumber());
    }

    // Adiciona caracteres especiais à lista de caracteres possíveis se o usuário escolheu incluí-los
    if (symbolEl.checked) {
        xs.push(getSymbol());
    }

    // Se a lista de caracteres possíveis estiver vazia, retorna uma string vazia
    if (xs.length === 0) return "";

    // Escolhe aleatoriamente um caractere da lista de caracteres possíveis
    return xs[Math.floor(Math.random() * xs.length)];
}

// Adiciona um evento de clique ao botão "Gerar Senha" para chamar a função generatePassword()
generateEl.addEventListener("click", generatePassword);

// Adiciona um evento de clique ao botão "Copiar" para copiar a senha gerada para a área de transferência
copyEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea"); // Cria um elemento <textarea>
    const password = pwEl.innerText; // Obtém a senha gerada

    if (!password) {
        return; // Se não houver senha, sai da função
    }

    textarea.value = password; // Define o valor da <textarea> como a senha
    document.body.appendChild(textarea); // Adiciona a <textarea> ao corpo do documento
    textarea.select(); // Seleciona o conteúdo da <textarea>
    document.execCommand("copy"); // Copia o conteúdo selecionado para a área de transferência
    textarea.remove(); // Remove a <textarea> do documento
    alert("Password copied to clipboard"); // Exibe uma mensagem de alerta informando que a senha foi copiada
});
