let budgetValue = 0
let expensesValue = 0
let balanceValue = 0

const itemList = []
const budgetInput = document.getElementById('budget-input')
const nameInput = document.getElementById('input-name')
const costInput = document.getElementById('input-value')

const btnBudget = document.getElementById('btn-budget')
const btnExpense = document.getElementById('btn-expense')

const btnMode = document.querySelector('#switch')

btnMode.addEventListener('click', () => {
	document.body.classList.toggle('dark')
	btnMode.classList.toggle('active')
})

const regexInput = {
	number: /^\d+$/,
	text: /^[a-zA-Z]+$/,
}
budgetInput.addEventListener('input', () => {
	if (!/^\d+$/.test(budgetInput.value)) {
		document.querySelector('#group-budget small').classList.add('visible')
		document.querySelector('#group-budget small').textContent =
			'* Solo debe ingresar numeros'
	}
	if (!budgetInput.value) {
		document.querySelector('#group-budget small').classList.add('visible')
		document.querySelector('#group-budget small').textContent =
			'* Este Campo es requerido'
	}
	if (budgetInput.validity.valid && /^\d+$/.test(budgetInput.value)) {
		document.querySelector('#group-budget small').classList.remove('visible')
		btnBudget.disabled = false
	}
})

function validateForm() {
	if (!nameInput.value) {
		document.querySelector('#group-name small').classList.add('visible')
		document.querySelector('#group-name small').textContent =
			'* Este Campo es requerido'
	}
	if (!costInput.value) {
		document.querySelector('#group-cost small').classList.add('visible')
		document.querySelector('#group-cost small').textContent =
			'* Este Campo es requerido'
	}
	if (!/^\d+$/.test(costInput.value)) {
		document.querySelector('#group-cost small').classList.add('visible')
		document.querySelector('#group-cost small').textContent =
			'* Solo debe ingresar numeros'
	}
	if (
		nameInput.validity.valid &&
		costInput.validity.valid &&
		/^\d+$/.test(costInput.value)
	) {
		document.querySelector('#group-name small').classList.remove('visible')
		document.querySelector('#group-cost small').classList.remove('visible')
		btnExpense.disabled = false
	}
}
nameInput.addEventListener('input', validateForm)
costInput.addEventListener('input', validateForm)

function toCurrency(number) {
	const formatter = new Intl.NumberFormat('es-CL', {
		style: 'currency',
		currency: 'CLP',
	})
	return formatter.format(number)
}

function sumValues(array) {
	let sum = 0
	array.length > 0 &&
		array.forEach((item) => {
			sum += item.value
		})
	return sum
}

function editItem(index) {
	Swal.fire({
		title: 'Editar Gasto',
		html:
			'<div class="swal-content">' +
            '<input id="input1" class="swal-input" placeholder="Nombre del gasto">' +
			'<input id="input2" class="swal-input" placeholder="Valor del gasto">' +
            '</div>',
		showCancelButton: true,
		confirmButtonText: 'Guardar',
		confirmButtonColor: '#09a',
		cancelButtonText: 'Cancelar',
		preConfirm: () => {
			const nameEdited = document.getElementById('input1').value
			const valueEdited = document.getElementById('input2').value
			return {
				val1: nameEdited,
				val2: parseInt(valueEdited),
			}
		},
	}).then((result) => {
		if (result.isConfirmed) {
			itemList[index].name = result.value.val1
			itemList[index].value = result.value.val2
			setItemList(itemList)
			setResultsView()
		}
	})
}
function deleteItem(index) {
	itemList.splice(index)
	setItemList(itemList)
	setResultsView()
}

const operations = () => {
	expensesValue = sumValues(itemList)
	balanceValue = budgetValue - expensesValue
}

const setResultsView = () => {
	btnBudget.disabled = true
	btnExpense.disabled = true
	const budgetResult = document.getElementById('badget')
	const expensesResult = document.getElementById('expenses')
	const balanceResult = document.getElementById('balance')
	operations()
	budgetResult.textContent = toCurrency(budgetValue)
	expensesResult.textContent = toCurrency(expensesValue)
	if (balanceValue < 0) {
		balanceResult.classList.add('negative')
	} else {
		balanceResult.classList.remove('negative')
	}
	balanceResult.textContent = toCurrency(balanceValue)
}

btnBudget.addEventListener('click', (e) => {
	e.preventDefault()
	const value = document.getElementById('budget-input')
	budgetValue = parseInt(value.value)
	document.getElementById('expenses-article').style.visibility = 'visible'
	setResultsView()
	value.value = ''
})

btnExpense.addEventListener('click', (e) => {
	e.preventDefault()
	const name = document.getElementById('input-name')
	const value = document.getElementById('input-value')
	itemList.push({ name: name.value, value: parseInt(value.value) })
	setItemList(itemList)
	setResultsView()
	name.value = ''
	value.value = ''
})

const setItemList = (array) => {
	const list = document.getElementById('item-values')
	let htmlList = ''
	list.innerHTML = htmlList
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
		list.innerHTML = htmlList
	})
}
setResultsView()
