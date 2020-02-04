; (function () {
  'use strict'

  let data = {
    idCounter: 5,

    orders: [
      {
        id: 1,
        date: new Date,
        product: 'Курс по верстке',
        name: 'Юрий',
        email: 'info1@rightblog.ru',
        phone: '89097755777',
        status: 'new'
      },
      {
        id: 2,
        date: new Date,
        product: 'Курс по JavaScript',
        name: 'Адексей',
        email: 'info2@rightblog.ru',
        phone: '89097712111',
        status: 'process'
      },
      {
        id: 3,
        date: new Date,
        product: 'Курс по PHP',
        name: 'Дмитрий',
        email: 'info3@rightblog.ru',
        phone: '89043941290',
        status: 'complite'
      },
      {
        id: 4,
        date: new Date,
        product: 'Курс по PHP',
        name: 'Дмитрий',
        email: 'info3@rightblog.ru',
        phone: '89043941290',
        status: 'archived'
      }
    ]
  }

  if (!load()) {
    save(data)
  }

  data = load()
  const getCoppy = x => JSON.parse(JSON.stringify(x))

  const api = {
    getOrders() {
      return getCoppy(data.orders)
    },

    getOrderById(id) {
      for (const order of data.orders) {
        if (order.id === id) {
          return getCoppy(order)
        }
      }
    },
    updateOrder(id, orderData) {
      let order = data.orders.find(x => x.id === id)
      order.product = orderData.product
      order.name = orderData.name
      order.email = orderData.email
      order.phone = orderData.phone
      order.status = orderData.status

      save(data)

    },

    saveOrder(orderData) {
      orderData.id = data.idCounter
      data.idCounter++
      data.orders.push(orderData)
      save(data)
      load()
    }
  }

  window.Model = api

  function save(data) {
    localStorage.setItem('__data__', JSON.stringify(data))
  }

  function load() {
    const result = localStorage.getItem('__data__')
    if (!result) {
      false
    }
    return JSON.parse(result)
  }

})();