let balance = 0;
let income = 0;
let expense = 0;

// Function to update the displayed balance, income, and expenses
function updateBalance() {
    document.getElementById('balance').innerText = `$${balance.toFixed(2)}`;
    document.getElementById('money-plus').innerText = `+$${income.toFixed(2)}`;
    document.getElementById('money-minus').innerText = `-$${expense.toFixed(2)}`;
}

// Function to add a transaction
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    const textInput = document.getElementById('text').value;
    const amountInput = parseFloat(document.getElementById('amount').value);

    // Validate input
    if (textInput === '' || isNaN(amountInput)) {
        alert('Please enter valid text and amount.');
        return;
    }

    // Create new list item for transaction
    const list = document.getElementById('list');
    const li = document.createElement('li');
    li.classList.add(amountInput < 0 ? 'minus' : 'plus');
    li.innerHTML = `${textInput} <span>${amountInput < 0 ? amountInput : `+${amountInput}`}</span> <button class="delete-btn">x</button>`;
    list.appendChild(li);

    // Update balance, income, and expense
    if (amountInput < 0) {
        expense += Math.abs(amountInput);
    } else {
        income += amountInput;
    }
    balance += amountInput;

    // Update the displayed values
    updateBalance();

    // Clear input fields
    document.getElementById('text').value = '';
    document.getElementById('amount').value = '';
});

// Function to delete a transaction
document.getElementById('list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const item = e.target.parentElement;
        const amount = parseFloat(item.querySelector('span').innerText);

        // Remove the item from the list
        item.remove();

        // Update balance, income, and expense
        if (amount < 0) {
            expense -= Math.abs(amount);
        } else {
            income -= amount;
        }
        balance -= amount;

        // Update the displayed values
        updateBalance();
    }
});
