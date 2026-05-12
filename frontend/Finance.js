document.addEventListener('DOMContentLoaded', () => {
    
    const API_URL = 'http://localhost:3000/api/transactions';
    const TYPES = { INCOME: 'plus', EXPENSE: 'minus' };

    const DOM = {
        balance: document.getElementById('balance'),
        amount: document.getElementById('amount'),
        category: document.getElementById('category'),
        btnIncome: document.getElementById('btn-income'),
        btnExpense: document.getElementById('btn-expense'),
        incomeList: document.getElementById('income-list'),
        expenseList: document.getElementById('expense-list')
    };

    let transactions = [];

    async function fetchTransactions() {
        try {
            const response = await fetch(API_URL);
            transactions = await response.json();
            renderUI();
        } catch (error) {
            console.error("Помилка завантаження даних:", error);
        }
    }

    async function addTransaction(type) {
        const amount = Number(DOM.amount.value);
        if (!amount || amount <= 0) return alert("Введіть коректну суму!");

        const newTransaction = {
            type,
            amount,
            category: DOM.category.value,
            date: new Date().toLocaleDateString('uk-UA', { hour: '2-digit', minute: '2-digit' })
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTransaction)
            });
            
            const savedTransaction = await response.json();
            transactions.unshift(savedTransaction); 
            
            DOM.amount.value = ''; 
            renderUI();
        } catch (error) { 
            console.error("Помилка збереження:", error); 
        }
    }

    async function deleteTransaction(id) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            transactions = transactions.filter(t => t.id !== id);
            renderUI();
        } catch (error) {
            console.error("Помилка видалення:", error);
        }
    }

    function renderUI() {
        DOM.incomeList.innerHTML = '';
        DOM.expenseList.innerHTML = '';
        let totalBalance = 0;

        transactions.forEach(transaction => {
            const isIncome = transaction.type === TYPES.INCOME;
            
            isIncome ? totalBalance += transaction.amount : totalBalance -= transaction.amount;

            const card = createTransactionCard(transaction);
            isIncome ? DOM.incomeList.appendChild(card) : DOM.expenseList.appendChild(card);
        });

        DOM.balance.textContent = `${totalBalance} ₴`;
    }

    function createTransactionCard(transaction) {
        const div = document.createElement('div');
        div.className = `transaction-item ${transaction.type}`;
        
        div.innerHTML = `
            <div class="transaction-info">
                <span class="transaction-amount">${transaction.amount} ₴</span>
                <span class="transaction-meta">${transaction.category} | ${transaction.date}</span>
            </div>
            <button class="btn-delete" data-id="${transaction.id}">✖</button>
        `;
        return div;
    }

    DOM.btnIncome.addEventListener('click', () => addTransaction(TYPES.INCOME));
    DOM.btnExpense.addEventListener('click', () => addTransaction(TYPES.EXPENSE));

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-delete')) {
            const id = Number(event.target.getAttribute('data-id'));
            deleteTransaction(id);
        }
    });

    fetchTransactions();
});