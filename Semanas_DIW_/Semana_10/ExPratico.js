// Este código define uma constante chamada taxasCambio, que é um array de objetos
const taxasCambio = [
    { nome: "Real", codigo: "BRL", taxa: 1 },
    { nome: "Dólar", codigo: "USD", taxa: 5.6 },
    { nome: "Euro", codigo: "EUR", taxa: 6.1 },
    { nome: "Iene", codigo: "JPY", taxa: 0.037 },
    { nome: "Libra", codigo: "GBP", taxa: 7.3 }
];

// Esta função preenche os elementos <select> para a moeda de origem e a moeda de destino com opções baseadas no array taxasCambio.
function preencherOpcoesMoeda() {
    const moedaOrigemSelect = document.getElementById('moedaOrigem');
    const moedaDestinoSelect = document.getElementById('moedaDestino');

    taxasCambio.forEach(moeda => {
        const opcaoOrigem = document.createElement('option');
        opcaoOrigem.value = moeda.codigo;
        opcaoOrigem.textContent = `${moeda.nome} (${moeda.codigo})`;
        moedaOrigemSelect.appendChild(opcaoOrigem);

        const opcaoDestino = document.createElement('option');
        opcaoDestino.value = moeda.codigo;
        opcaoDestino.textContent = `${moeda.nome} (${moeda.codigo})`;
        moedaDestinoSelect.appendChild(opcaoDestino);
    });
}

// Esta função realiza a conversão entre moedas quando o botão "Converter" é clicado.
function converterMoeda() {
    const valorInput = document.getElementById('valor');
    const moedaOrigemSelect = document.getElementById('moedaOrigem');
    const moedaDestinoSelect = document.getElementById('moedaDestino');
    const resultadoDiv = document.getElementById('resultado');

    const valor = parseFloat(valorInput.value);
    const moedaOrigem = moedaOrigemSelect.value;
    const moedaDestino = moedaDestinoSelect.value;

    // Validação de entrada
    if (isNaN(valor) || valor <= 0) {
        resultadoDiv.textContent = "Por favor, insira um valor válido.";
        return;
    }

    if (moedaOrigem === moedaDestino) {
        resultadoDiv.textContent = "As moedas de origem e destino não podem ser iguais.";
        return;
    }

    // Calcula a taxa de câmbio para a moeda de origem e a moeda de destino usando find para buscar os objetos correspondentes no array taxasCambio.
    const taxaOrigem = taxasCambio.find(moeda => moeda.codigo === moedaOrigem).taxa;
    const taxaDestino = taxasCambio.find(moeda => moeda.codigo === moedaDestino).taxa;
    const valorConvertido = (valor * taxaDestino) / taxaOrigem;

    resultadoDiv.textContent = `${valor.toFixed(2)} ${moedaOrigem} = ${valorConvertido.toFixed(2)} ${moedaDestino}`;
}

// Este código adiciona um evento de clique ao botão "Converter".
document.getElementById('botaoConverter').addEventListener('click', converterMoeda);

// Chama a função preencherOpcoesMoeda para que as opções de moeda sejam preenchidas automaticamente ao carregar a página.
preencherOpcoesMoeda();
