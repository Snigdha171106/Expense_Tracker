let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let limit = localStorage.getItem("limit") || 0;

if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark");
}

function addExpense() {
    let title = document.getElementById("title").value;
    let amount = Number(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    let month = document.getElementById("month").value;

    if (!title || !amount || !month) {
        alert("Fill all fields");
        return;
    }

    expenses.push({ title, amount, category, month });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
}

function displayExpenses() {
    let list = document.getElementById("expenseList");
    let categoryTotals = {};
    let search = document.getElementById("search").value.toLowerCase();
    let total = 0;

    list.innerHTML = "";

    expenses.forEach((e, i) => {
        if (!e.title.toLowerCase().includes(search)) return;

        total += e.amount;
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;

        let li = document.createElement("li");
        li.innerHTML = `${e.title} (${e.category}) - ₹${e.amount}
        <button onclick="deleteExpense(${i})">❌</button>`;
        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;
    showCategoryTotals(categoryTotals);

    if (limit > 0 && total > limit) {
        alert("🚨 Monthly limit exceeded!");
    }
}

function deleteExpense(index) {
    if (confirm("Delete this expense?")) {
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        displayExpenses();
    }
}

function sortExpenses() {
    expenses.sort((a, b) => b.amount - a.amount);
    displayExpenses();
}

function showCategoryTotals(data) {
    let ul = document.getElementById("categoryTotals");
    ul.innerHTML = "";
    for (let c in data) {
        let li = document.createElement("li");
        li.innerText = `${c}: ₹${data[c]}`;
        ul.appendChild(li);
    }
}

function setLimit() {
    limit = document.getElementById("limit").value;
    localStorage.setItem("limit", limit);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("dark", document.body.classList.contains("dark"));
}

displayExpenses();
