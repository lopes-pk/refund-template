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

   console.log(typeof (totalSpent.lastChild.data))
}

form.onsubmit = (e) => {
   e.preventDefault()

   const nameExpense = expense.value
   const categoryExpense = category.value
   const moneySpent = amount.value

   listaDeGastos.push({
      name: nameExpense,
      category: categoryExpense,
      spent: moneySpent
   })

   console.log(listaDeGastos)

   addExpense()
   showTotalAmount()

}

exclude.addEventListener('click', removeExpense)

function addExpense() {
   let itemOfList = ''

   listaDeGastos.forEach((item, index) => {
      itemOfList = itemOfList + `
   <li class="expense">
              <img src="./img/${item.category}.svg" alt="Ícone de tipo da despesa" />

              <div class="expense-info">
                <strong>${item.name}</strong>
                <span>${item.category}</span>
              </div>

              <span class="expense-amount"><small>R$</small>${item.spent}</span>

              <img src="./img/remove.svg" alt="remover" class="remove-icon" onclick="removeExpense(${index})"/>
   </li>`
   })

   ul.innerHTML = itemOfList
   showExpense()
}

function removeExpense(index) {
   listaDeGastos.pop(index)
   addExpense()
}

function formatCurrencyBRL(amount) {
   const amountFormatted = amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: 'BRL'
   })


   return amountFormatted
}

function showTotalAmount() {
   let valorTotal = 0

   listaDeGastos.forEach(item => {
      const valueConverted = parseFloat(item.spent.replace(/[^0-9,-]/g, ''))
      valorTotal = valorTotal + valueConverted

   })

   totalSpent.innerHTML = `<small>R$</small> ${valorTotal.toFixed(2).replace(".", ",")}`
}

function showExpense() {
   expenseQuantity.textContent = `${listaDeGastos.length} despesas`
}