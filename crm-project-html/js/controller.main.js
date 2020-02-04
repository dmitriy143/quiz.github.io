; (function () {
  'use strict'

  const api = {}

  // let filter = 'all'

  document.querySelectorAll('[data-button-filter]')
    .forEach(element => {
      element.href = location.pathname + '?id=' + element.getAttribute('data-button-filter')
      element.addEventListener('click', function (event) {
        // event.preventDefault()
        // filter = this.getAttribute('data-button-filter')

        update()

      })
    })


  api.start = function start() {
    update()
  }

  function update() {
    const originalOrders = Model.getOrders()

    const orders = originalOrders.filter(order => {
      // if (filter === 'all') {
      //   return order.status !== 'archived'
      // }
      // return order.status === filter

      const but = document.querySelectorAll('[data-button-filter]')
      but[0].classList.add('active')

      switch (getSearchObject().id) {
        case 'all':
          but.forEach(element => element.classList.remove('active'))
          but[0].classList.add('active')
          break
        case 'new':
          but.forEach(element => element.classList.remove('active'))
          but[1].classList.add('active')
          break
        case 'process':
          but.forEach(element => element.classList.remove('active'))
          but[2].classList.add('active')
          break
        case 'complite':
          but.forEach(element => element.classList.remove('active'))
          but[3].classList.add('active')
          break
        case 'archived':
          but.forEach(element => element.classList.remove('active'))
          but[4].classList.add('active')
          break
      }

      if (getSearchObject().id === 'all' || !getSearchObject().id) {
        return order.status !== 'archived'
      }
      else {
        return order.status === getSearchObject().id
      }

    })

    const ordersTable = View.getOrdersTable(orders)

    const tableElement = document.querySelector('table')
    // const tbodyElement = tableElement.querySelector('tbody')

    // if (tbodyElement) {
    //   tbodyElement.remove()
    // }

    tableElement.append(ordersTable)

  }

  function getSearchObject() {
    return location.search
      .slice(1)
      .split('&')
      .map(x => x.split('='))
      .reduce((obj, [key, value]) => {
        obj[key] = value
        return obj
      }, {})
  }

  window.Controller = api

})();