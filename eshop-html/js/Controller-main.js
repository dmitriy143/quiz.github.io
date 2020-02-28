; (function () {
  'use strict'

  const FLATS_IN_PAGE = 3

  const filters = {
    label: '',
    rooms: [],
    square: {
      min: null,
      max: null
    },
    price: {
      min: null,
      max: null
    }
  }
  let viewMode = 'showcase'

  // showcase - таблица
  // table - список
  let sorter = 'priceAsc' // по возрастанию
  // priceAsc - по возрастанию
  // priceDesc - по убыванию
  // squareAsc - по возрастанию
  // squareDesc - по убыванию

  const getParams = location.search
    .slice(1)
    .split('&')
    .map(x => x.split('='))
    .reduce((p, [key, value]) => ({ ...p, [key]: value }), {})

  const currentPage = parseInt(getParams.page || 1)
  const commonPagesNumber = Math.ceil(Model.getFlats().length / FLATS_IN_PAGE)

  const dataPagesElement = document.querySelector('[data-pages]')
  for (let i = 1; i <= commonPagesNumber; i++) {
    const aElement = document.createElement('a')
    aElement.href = "?page=" + i
    aElement.classList.add('pagination__page')
    aElement.textContent = i

    if (i === currentPage) {
      aElement.classList.add('pagination__page--active')
    }

    dataPagesElement.insertBefore(aElement, dataPagesElement.lastElementChild)
  }

  const api = {}

  api.start = function start() {
    api.update()

    const filterLabelElement = document.querySelector('[data-filter-label]')

    filterLabelElement.append(
      ...Model.getLabels().map(label => {
        const optionElement = document.createElement('option')
        optionElement.setAttribute('value', label)
        optionElement.textContent = label

        return optionElement
      })
    )

    // сортировка по Label
    if (!localStorage.getItem('filtersLable')) {
      localStorage.setItem('filtersLable', '')
    }
    document.querySelector('[data-filter-label]').value = localStorage.getItem('filtersLable')
    filterLabelElement.addEventListener('change', function (event) {
      filters.label = this.value
      localStorage.setItem('filtersLable', this.value)

      location.search = '?page=1'

      api.update()
    })

    // сортировка по площади
    if (!localStorage.getItem('filtersSquareMin')) {
      localStorage.setItem('filtersSquareMin', '')
    }
    document
      .querySelector('[data-square-min]')
      .value = localStorage.getItem('filtersSquareMin')
    document
      .querySelector('[data-square-min]')
      .addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          filters.square.min = parseInt(this.value)
          localStorage.setItem('filtersSquareMin', this.value)
          location.search = '?page=1'
          api.update()
        }
      })
    if (!localStorage.getItem('filtersSquareMax')) {
      localStorage.setItem('filtersSquareMax', '')
    }
    document
      .querySelector('[data-square-max]')
      .value = localStorage.getItem('filtersSquareMax')
    document
      .querySelector('[data-square-max]')
      .addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          filters.square.max = parseInt(this.value)
          localStorage.setItem('filtersSquareMax', this.value)
          location.search = '?page=1'
          api.update()
        }
      })
    // сортировка по цене
    if (!localStorage.getItem('filtersPriceMin')) {
      localStorage.setItem('filtersPriceMin', '')
    }
    document
      .querySelector('[data-price-min]')
      .value = localStorage.getItem('filtersPriceMin')
    document
      .querySelector('[data-price-min]')
      .addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {

          filters.price.min = parseInt(this.value)
          localStorage.setItem('filtersPriceMin', this.value)
          location.search = '?page=1'
          api.update()
        }
      })
    if (!localStorage.getItem('filtersPriceMax')) {
      localStorage.setItem('filtersPriceMax', '')
    }
    document
      .querySelector('[data-price-max]')
      .value = localStorage.getItem('filtersPriceMax')
    document
      .querySelector('[data-price-max]')
      .addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          filters.price.max = parseInt(this.value)
          localStorage.setItem('filtersPriceMax', this.value)
          location.search = '?page=1'
          api.update()
        }
      })


    // фильтр по комнатам
    document
      .querySelectorAll('[data-filter-rooms]')
      .forEach(element => {
        const labelElement = element.nextElementSibling
        labelElement.classList.remove('rooms__btn--active')
        if (localStorage.getItem('filtersRooms').includes(parseInt(element.getAttribute('data-filter-rooms')))) {
          labelElement.classList.add('rooms__btn--active')
        }
      })
    document
      .querySelectorAll('[data-filter-rooms]')
      .forEach(element => {
        element.addEventListener('click', function (event) {
          const roomsNumber = parseInt(element.getAttribute('data-filter-rooms'))

          const labelElement = element.nextElementSibling
          localStorage.setItem('roomsNumber', roomsNumber)

          filters.rooms = localStorage.getItem('filtersRooms').split(',')
          toggleItem(filters.rooms, localStorage.getItem('roomsNumber'))
          localStorage.setItem('filtersRooms', filters.rooms)

          function toggleItem(array, item) {
            if (array.includes(item)) {
              array.splice(array.indexOf(item), 1)
            }
            else {
              array.push(item)
            }
          }

          labelElement.classList.remove('rooms__btn--active')

          if (localStorage.getItem('filtersRooms').includes(parseInt(localStorage.getItem('roomsNumber')))) {
            labelElement.classList.add('rooms__btn--active')
          }

          api.update()
        })
      });

    document
      .querySelector('[data-sorter]')
      .addEventListener('change', function (event) {
        sorter = this.value
        api.update()
      })

    document
      .querySelectorAll('[data-view-mode]')
      .forEach(element => {
        element.addEventListener('click', function (event) {
          event.preventDefault()

          localStorage.setItem('viewModeStorage', '')

          if (localStorage.getItem('viewModeStorage') !== this.getAttribute('data-view-mode')) {
            viewMode = this.getAttribute('data-view-mode')

            localStorage.setItem('viewModeStorage', viewMode)

            api.update()
          }
        })
      })
    // кнопка сбросить
    document
      .querySelector('[data-reset-btn]')
      .addEventListener('click', function () {
        // сбрасываем фильтр по label
        localStorage.setItem('filtersLable', '')
        if (localStorage.getItem('filtersLable') === '') {
          document.querySelector('[data-filter-label]').value = localStorage.getItem('filtersLable')
        }

        // сбрасываем фильтр по комнатам
        localStorage.setItem('filtersRooms', '')
        if (localStorage.getItem('filtersRooms').length === 0) {
          document
            .querySelectorAll('[data-filter-rooms]')
            .forEach(element => {
              element.nextElementSibling.classList.remove('rooms__btn--active')
            })
        }
        // сбрасываем фильтр по цене
        localStorage.setItem('filtersPriceMin', '')
        if (localStorage.getItem('filtersPriceMin') === '') {
          document.querySelector('[data-price-min]').value = ''
        }
        localStorage.setItem('filtersPriceMax', '')
        if (localStorage.getItem('filtersPriceMax') === '') {
          document.querySelector('[data-price-max]').value = ''
        }

        localStorage.setItem('filtersSquareMin', '')
        if (localStorage.getItem('filtersSquareMin') === '') {
          document.querySelector('[data-square-min]').value = ''
        }
        localStorage.setItem('filtersSquareMax', '')
        if (localStorage.getItem('filtersSquareMax') === '') {
          document.querySelector('[data-square-max]').value = ''
        }
        api.update()
      })

    Model.dispatch = function () {
      api.update()
    }
    api.update()
  }


  api.update = function update() {
    let flats = Model.getFlats()


    document
      .querySelector('[data-reset-btn]').style.display = 'none'
    if (localStorage.getItem('filtersLable') !== '' || localStorage.getItem('filtersRooms') !== '' || localStorage.getItem('filtersSquareMin') !== '' || localStorage.getItem('filtersSquareMax') !== '' || localStorage.getItem('filtersPriceMin') !== '' || localStorage.getItem('filtersPriceMax') !== '') {
      document
        .querySelector('[data-reset-btn]').style.display = 'inline-block'
    }

    // сортировка по площади
    if (localStorage.getItem('filtersSquareMin') !== '') {
      flats = flats.filter(x => x.square >= Number(localStorage.getItem('filtersSquareMin')))
    }
    if (localStorage.getItem('filtersSquareMax') !== '') {
      flats = flats.filter(x => x.square <= Number(localStorage.getItem('filtersSquareMax')))
    }

    // сортировка по Label
    if (localStorage.getItem('filtersLable') !== '') {
      flats = flats.filter(x => x.label === localStorage.getItem('filtersLable'))

    }
    // сортировка по комнатам
    if (!localStorage.getItem('filtersRooms')) {
      localStorage.setItem('filtersRooms', filters.rooms)
    }
    if (localStorage.getItem('filtersRooms').length) {
      flats = flats.filter(x => localStorage.getItem('filtersRooms').includes(x.rooms))
    }

    // сортировка по цене
    if (localStorage.getItem('filtersPriceMin') !== '') {
      flats = flats.filter(x => x.price >= Number(localStorage.getItem('filtersPriceMin')))
    }
    if (localStorage.getItem('filtersPriceMax') !== '') {
      flats = flats.filter(x => x.price <= Number(localStorage.getItem('filtersPriceMax')))
    }


    if (sorter === 'priceAsc') {
      flats = flats.sort((a, b) => a.price - b.price)
    }
    if (sorter === 'priceDesc') {
      flats = flats.sort((a, b) => b.price - a.price)
    }
    else if (sorter === 'squareAsc') {
      flats = flats.sort((a, b) => a.square - b.square)
    }
    else if (sorter === 'squareDesc') {
      flats = flats.sort((a, b) => b.square - a.square)
    }

    const showcaseMountPoint = document.querySelector('[data-showcase]')
    const tableMountPoint = document.querySelector('[data-table]')
    showcaseMountPoint.innerHTML = ''
    tableMountPoint.innerHTML = ''

    flats = flats.slice(
      (currentPage - 1) * FLATS_IN_PAGE,
      (currentPage - 1) * FLATS_IN_PAGE + FLATS_IN_PAGE
    )

    if (!localStorage.getItem('viewModeStorage')) {
      localStorage.setItem('viewModeStorage', 'showcase')
    }

    if (localStorage.getItem('viewModeStorage') === 'showcase') {
      const showcaseElement = View.getShowcase(flats)
      showcaseMountPoint.append(showcaseElement)

      showcaseElement
        .querySelectorAll('.card__like')
        .forEach(element => {
          element.addEventListener('click', function (event) {
            Model.toggleFavorite(parseInt(element.getAttribute('data-card-id')))
          })
        })

      document
        .querySelectorAll('[data-view-mode]')[0]
        .classList.add('view-options__type-item--active')
      document
        .querySelectorAll('[data-view-mode]')[1]
        .classList.remove('view-options__type-item--active')

    }
    else if (localStorage.getItem('viewModeStorage') === 'table') {
      const tableElement = View.getTable(flats)
      tableMountPoint.append(tableElement)

      tableElement
        .querySelectorAll('.panel__favourite-btn')
        .forEach(element => {
          element.addEventListener('click', function (event) {
            event.preventDefault()
            Model.toggleFavorite(parseInt(element.getAttribute('data-table-id')))
          })
        })
      document
        .querySelectorAll('[data-view-mode]')[1]
        .classList.add('view-options__type-item--active')
      document
        .querySelectorAll('[data-view-mode]')[0]
        .classList.remove('view-options__type-item--active')
    }
  }

  window.Controller = api


})();