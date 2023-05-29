let budgetValue = 0;
let expensesValue = 0;
let balanceValue = 0;

const itemList = [];
const btnBudget = document.getElementById('btn-budget')
const btnExpense = document.getElementById('btn-expense')

function toCurrency(number) {
    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    });
    return formatter.format(number);
  }

const operations = () => {
    balanceValue = budgetValue - expensesValue;
}  



const setResultsView = () => {
    const budgetResult = document.getElementById('badget');
    const expensesResult = document.getElementById('expenses')
    const balanceResult = document.getElementById('balance')
    operations()
    budgetResult.textContent = toCurrency(budgetValue);
    expensesResult.textContent = toCurrency(expensesValue);
    balanceResult.textContent = toCurrency(balanceValue)
}

btnBudget.addEventListener('click', (e) => {
    e.preventDefault()
    const value = document.getElementById('budget-input')
    budgetValue = parseInt(value.value);
    setResultsView()
    value.value = '';
})

btnExpense.addEventListener('click', (e) => {
    e.preventDefault()
    const name = document.getElementById('input-name')
    const value = document.getElementById('input-value')
    itemList.push({name: name.value, value: parseInt(value.value)})
    setItemList(itemList)
    name.value = ''
    value.value = ''
})

const setItemList = (array) => {
    const list = document.getElementById('item-values')
    let htmlList = '';
    array.forEach((item, index) => {
       htmlList += `
        <li class="item">
            <p class="item__name">${item.name}</p>
            <p class="item__value">${toCurrency(item.value)}</p>
            <p class="item__edit">
                <span class="material-symbols-outlined edit" onclick="editItem(${index})">
                    edit_note
                </span>
                <span class="material-symbols-outlined delete" onclick="deleteItem(${index})">
                    delete
                </span>
            </p>
        </li>
        `
        list.innerHTML = htmlList;
    })
}
setResultsView()
