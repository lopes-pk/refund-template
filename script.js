const amount = document.querySelector('#amount')
const form = document.querySelector('form')
const expense = document.querySelector('#expense')
const category = document.querySelector('#category')
const ul = document.querySelector('ul')
const totalSpent = document.querySelector('#totalExpense')
const exclude = document.querySelector('.remove-icon')
const expenseQuantity = document.querySelector('#expense-quantity')

const listaDeGastos = []

expense.oninput = () => {

   expense.value = expense.value.replace(/\d/g, "")

}
amount.oninput = () => {
   let value = amount.value.replace(/\D/g, "")

   value = Number(value) / 100

   amount.value = formatCurrencyBRL(value)

}

form.onsubmit = (e) => {
   e.preventDefault()

   const expenses = {
      nameExpense: expense.value,
      categoryExpense: category.value,
      moneySpent: amount.value
   }
   const expenseAlreadyExist = listaDeGastos.some(item => {
      return item.nameExpense === expenses.nameExpense &&
         item.categoryExpense === expenses.categoryExpense &&
         item.moneySpent === expenses.moneySpent
   })

   if (expenseAlreadyExist) {
      alert('voce ja fez isso')
   } else {
      listaDeGastos.push(expenses)
   }

   expense.value = ''
   category.value = ''
   amount.value = ''

   addExpense()
   updateTotalAmount()

}

exclude.addEventListener('click', removeExpense);

function addExpense() {
   let itemOfList = ''

   listaDeGastos.forEach((item, index) => {
      itemOfList = itemOfList + `
   <li class="expense">
              <img src="./img/${item.categoryExpense}.svg" alt="Ícone de tipo da despesa" />

              <div class="expense-info">
                <strong>${item.nameExpense}</strong>
                <span>${item.categoryExpense}</span>
              </div>

              <span class="expense-amount"><small>R$</small>${item.moneySpent}</span>

              <img src="./img/remove.svg" alt="remover" class="remove-icon" onclick="removeExpense(${index})"/>
   </li>`
   })

   ul.innerHTML = itemOfList
   showExpense()
}

function removeExpense(index) {
   listaDeGastos.splice(index, 1)
   addExpense()
   updateTotalAmount()
}

function formatCurrencyBRL(amount) {
   const amountFormatted = amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: 'BRL'
   })


   return amountFormatted
}

function updateTotalAmount() {
   let valorTotal = 0

   listaDeGastos.forEach(item => {
      const valueConverted = parseFloat(item.moneySpent.replace(/[^0-9,-]/g, ''))
      valorTotal = valorTotal + valueConverted

   })

   const valueFormatted = valorTotal.toLocaleString("pt-BR", {
      currency: "BRL"
   })

   totalSpent.innerHTML = `<small>R$</small> ${valueFormatted}`
}

function showExpense() {
   expenseQuantity.textContent = `${listaDeGastos.length} despesas`
}