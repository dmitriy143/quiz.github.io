; (function () {
  'use strict'

  const api = {}

  api.start = function start() {
    const orders = Model.getOrders()
    const ordersTable = View.getOrdersTable(orders)

    document.querySelector('table').append(ordersTable)
  }

  window.Controller = api

})();