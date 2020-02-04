; (function () {
  'use strict'

  const api = {}

  api.start = function start() {

    document.querySelector('[data-btn-form]')
      .addEventListener('click', function (event) {
        event.preventDefault()
        if (getOrder().name && getOrder().email && getOrder().phone) {
          Model.saveOrder(getOrder())
          location.href = '02-crm-all-bids.html?id=all'
        }
      })
  }

  window.Form = api


  function getOrder() {
    const orderData = {}
    orderData.date = new Date
    orderData.product = document.querySelector('[data-product]').value
    orderData.name = document.querySelector('[data-name]').value
    orderData.email = document.querySelector('[data-email]').value
    orderData.phone = document.querySelector('[data-phone]').value
    orderData.status = 'new'
    return orderData
  }

})();
