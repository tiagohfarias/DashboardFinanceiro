let financeData = { Receita: 0, Despesa: 0, Investimento: 0 };

let transactions = [];

let savedData = 
    localStorage.getItem('financeData');
if (savedData) {
    financeData = JSON.parse(savedData);
    }

function addTransaction() {
    let receita = parseFloat(document.getElementById("valor").value);
    let categoria = document.getElementById("categoria").value;

    if (!receita || receita <= 0) {
        alert("Por favor, insira um valor válido para a receita.");
        return;
    }
    financeData[categoria] += receita;

    transactions.push({
        valor: receita,
        categoria: categoria
    });
    updateUI();

    document.getElementById("valor").value = "";
}

function updateUI() {
    document.getElementById("receitaTotal").innerText = "R$ " + financeData.Receita;
    document.getElementById("despesaTotal").innerText = "R$ " + financeData.Despesa;
    document.getElementById("investimentoTotal").innerText = "R$ " + financeData.Investimento;

    let saldo = financeData.Receita - financeData.Despesa - financeData.Investimento;

    document.getElementById("saldoTotal").innerText = "R$ " + saldo;

    localStorage.setItem(
        'financeData',
        JSON.stringify(financeData)
    );
    updateHistory();
    updateChart();
}

let ctx = document
    .getElementById('graficoFinanceiro')
    .getContext('2d');

let graficoFinanceiro = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Receita', 'Despesa', 'Investimento'],
        datasets: [{
            label:'Valores Financeiros',
            data: [0 , 0 , 0],
            backgroundColor: ['#22c55e', '#ef4444', '#3b82f6']
        }]
    },
    options: {

        responsive: true,

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateChart() {
    graficoFinanceiro.data.datasets[0].data = [
        financeData.Receita,
        financeData.Despesa,
        financeData.Investimento
    ];

    graficoFinanceiro.update();
}

function updateHistory() {
    let historico = document.getElementById("historico");
    historico.innerHTML = "";

    transactions.forEach(function(transacao) {
        let item = document.createElement("p");
        item.innerText = transacao.categoria + ": R$ " + transacao.valor;
        historico.appendChild(item);
    });
}

updateUI();
