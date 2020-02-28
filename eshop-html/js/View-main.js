; (function () {
  'use strict'

  const api = {}

  api.getShowcase = function getShowcase(flats) {
    const rootElement = document.createElement('div')
    rootElement.classList.add('cards-wrapper')

    const containerElement = document.createElement('div')
    containerElement.classList.add('container', 'p-0')
    rootElement.append(containerElement)

    const rowElement = document.createElement('div')
    rowElement.classList.add('row')
    containerElement.append(rowElement)

    rowElement.append(...flats.map(getFlatCard))

    return rootElement
  }

  api.getTable = function getTable(flats) {
    const divElement = document.createElement('div')
    divElement.innerHTML = tableTemplate
    divElement.querySelector('[data-items]').append(...flats.map(getTabalItem))

    return divElement.firstElementChild
  }

  window.View = api

  function getFlatCard(data) {
    const divElement = document.createElement('div')

    divElement.innerHTML = cardTemplate
      .replace(/%ID%/g, data.id)
      .replace(/%LABEL%/g, data.label)
      .replace(/%PRICE%/g, data.price)
      .replace(/%PRICE_PRE_SQUARE%/g, data.squareM)
      .replace(/%ROOMS%/g, data.rooms)
      .replace(/%SQUARE%/g, data.square)
      .replace(/%NOMENCLATURE%/g, data.nomenclature)
      .replace(/%FLOOR%/g, data.floor)
      .replace(/%COMMON_FLOOR%/g, data.commonFloor)
      .replace(/%CARD_LIKE_ACTIVE%/g, data.favorite ? 'card__like--active' : '')


    return divElement.firstElementChild
  }

  function getTabalItem(flat) {
    const divElement = document.createElement('div')
    divElement.innerHTML = tableItemTemplate
      .replace(/%ID%/g, flat.id)
      .replace(/%LABEL%/g, flat.label)
      .replace(/%PRICE%/g, flat.price)
      .replace(/%PRICE_PRE_SQUARE%/g, flat.squareM)
      .replace(/%ROOMS%/g, flat.rooms)
      .replace(/%SQUARE%/g, flat.square)
      .replace(/%NOMENCLATURE%/g, flat.nomenclature)
      .replace(/%FLOOR%/g, flat.floor)
      .replace(/%CARD_LIKE_ACTIVE%/g, flat.favorite ? 'panel__favourite-btn--active' : '')

    return divElement.firstElementChild
  }

  const cardTemplate = `
  <div class="col-md-4">
  <div class="card">
  <div class="card__header">
    <a class="card__title" href="#">%LABEL%</a>
    <div class="card__like %CARD_LIKE_ACTIVE%" data-card-id="%ID%">
      <i class="fas fa-heart"></i>
    </div>
  </div>
  <div class="card__img">
    <img src="img/flat-plan.png" alt="План квартиры">
  </div>
  <div class="card__desc">
    <div class="card__price">
      <div class="card__price-total">%PRICE% ₽</div>
      <div class="card__price-per-meter">%PRICE_PRE_SQUARE% ₽/м2</div>
    </div>

    <!-- card__params params -->
    <div class="card__params params">
      <div class="params__item">
        <div class="params__definition">Комнат</div>
        <div class="params__value">%ROOMS%</div>
      </div>
      <div class="params__item">
        <div class="params__definition">Площадь</div>
        <div class="params__value">%SQUARE%</div>
      </div>
    </div>
    <!-- //card__params params -->

  </div>
  <div class="card__footer">
    <div class="card__art">%NOMENCLATURE%</div>
    <div class="card__floor">Этаж %FLOOR% из %COMMON_FLOOR%</div>
  </div>
</div>
</div>`

  const tableTemplate = `<div class="panels-wrapper">
  <div class="container p-0">
    <div class="panels-filter">
      <div class="panels-filter__element" style="width: 120px;">
        <div class="panels-filter__name">Артикул</div>
      </div>
      <div class="panels-filter__element" style="width: 160px;">
        <div class="panels-filter__name">ЖК</div>

      </div>
      <div class="panels-filter__element" style="width: 70px;">
        <div class="panels-filter__name">Корпус</div>

      </div>
      <div class="panels-filter__element" style="width: 70px;">
        <div class="panels-filter__name">Этаж</div>

      </div>
      <div class="panels-filter__element" style="width: 70px;">
        <div class="panels-filter__name">Комнат</div>
      </div>
      <div class="panels-filter__element" style="width: 80px;">
        <div class="panels-filter__name">Площадь</div>

      </div>
      <div class="panels-filter__element" style="width: 100px;">
        <div class="panels-filter__name">м2</div>

      </div>
      <div class="panels-filter__element" style="width: 100px;">
        <div class="panels-filter__name">Стоимость</div>
      </div>
      <div class="panels-filter__element" style="width: 120px;">
        <div class="panels-filter__name">Продавец</div>
      </div>
      <div class="panels-filter__element" style="width: 100px;">
        <div class="panels-filter__name">Избранное</div>
      </div>
    </div>

    <div data-items></div>
  </div>
</div>`
  const tableItemTemplate = `
  <div class="panel">
<div class="panel__artikul">%NOMENCLATURE%</div>
<div class="panel__name">
  <a href="#">%LABEL%</a>
</div>
<div class="panel__block">15</div>
<div class="panel__floor">%FLOOR%</div>
<div class="panel__rooms">%ROOMS%</div>
<div class="panel__sq">%SQUARE% м2</div>
<div class="panel__price-per-m">%PRICE_PRE_SQUARE% ₽</div>
<div class="panel__price">%PRICE% ₽</div>
<div class="panel__seller">Застройщик</div>
<div class="panel__favourite">
  <button class="panel__favourite-btn %CARD_LIKE_ACTIVE%" data-table-id="%ID%" style="outline: none">
    <i class="fas fa-heart"></i>
  </button>
</div>
</div>`
})();



