; (function () {
  'use strict'

  const api = {
    dispatch() { }
  }

  api.setFormData = function setFormData(order) {
    const date = new Date(order.date)
    const day = String(date.getDate()).padStart(2, 0)
    const month = String(date.getMonth() + 1).padStart(2, 0)
    const year = String(date.getFullYear())
    const format = `${day}.${month}.${year}`

    document.querySelector('[data-id]').textContent = order.id
    document.querySelector('[data-date]').textContent = format
    document.querySelector('[data-field-product]').value = order.product
    document.querySelector('[data-field-name]').value = order.name
    document.querySelector('[data-field-email]').value = order.email
    document.querySelector('[data-field-phone]').value = order.phone
    document.querySelector('[data-field-status]').value = order.status

    document
      .querySelector('[data-button-save]')
      .addEventListener('click', function (event) {
        api.dispatch(this, event)
      })
  }

  api.getFormData = function getFormData() {
    const data = {}
    data.product = document.querySelector('[data-field-product]').value
    data.name = document.querySelector('[data-field-name]').value
    data.email = document.querySelector('[data-field-email]').value
    data.phone = document.querySelector('[data-field-phone]').value
    data.status = document.querySelector('[data-field-status]').value

    return data
  }

  window.View = api
})();
