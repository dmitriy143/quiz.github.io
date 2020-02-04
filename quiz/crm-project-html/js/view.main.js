; (function () {
  'use strict'

  const api = {}

  window.View = api

  api.getOrdersTable = function getOrdersTable(orders) {
    const tbodyElement = document.createElement('tbody')

    for (const order of orders) {
      const trElement = document.createElement('tr')
      const date = new Date(order.date)
      const day = String(date.getDate()).padStart(2, 0)
      const month = String(date.getMonth() + 1).padStart(2, 0)
      const year = String(date.getFullYear())
      const format = `${day}.${month}.${year}`

      trElement.innerHTML = templateTrElement
        .replace(/%ID%/g, order.id)
        .replace(/%PRODUCT%/g, order.product)
        .replace(/%NAME%/g, order.name)
        .replace(/%EMAIL%/g, order.email)
        .replace(/%PHONE%/g, order.phone)
        .replace(/%DATE%/g, format)

      const statusElement = getStatusElement(order.status)
      const statusTdElement = trElement.querySelector('[data-status]')
      statusTdElement.append(statusElement)
      statusTdElement.removeAttribute('data-status')
      tbodyElement.append(trElement)
    }
    return tbodyElement
  }

  function getStatusElement(status) {
    const divElement = document.createElement('div')
    divElement.className = 'badge badge-pill'
    switch (status) {
      case 'new':
        divElement.classList.add('badge-danger')
        divElement.textContent = 'Новый'
        break
      case 'process':
        divElement.classList.add('badge-warning')
        divElement.textContent = 'В работе'
        break
      case 'complite':
        divElement.classList.add('badge-success')
        divElement.textContent = 'Завершенный'
        break
    }
    return divElement
  }

  const templateTrElement =
    `<th scope="row">%ID%</th>
      <td>%DATE%</td>
      <td>%PRODUCT%</td>
      <td>%NAME%</td>
      <td>%EMAIL%</td>
      <td>%PHONE%</td>
      <td data-status></td>
      <td><a href="03-crm-edit-bid.html?id=%ID%">Редактировать</a></td>`

})();