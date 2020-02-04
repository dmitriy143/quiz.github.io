
showCard(1)
// данные
const data = {
  card2: null,
  card3: [],
  card4: null,
  card5: {
    email: null,
    checked: false
  }
}

progressChange('0%')

// все кнопки вперед
document
  .querySelector('[data-card1-btn-next]')
  .addEventListener('click', () => showCard(2))

document
  .querySelector('[data-card2-btn-next]')
  .addEventListener('click', () => {
    checkData(data.card2, 3)
  })

document
  .querySelector('[data-card3-btn-next]')
  .addEventListener('click', () => {
    checkData(data.card3.length, 4)
  })

document
  .querySelector('[data-card4-btn-next]')
  .addEventListener('click', () => {
    checkData(data.card4, 5)
  })

btnBack('[data-card-btn-back]')

// карта 2
document
  .querySelector('[data-card2-question]')
  .addEventListener('click', function (event) {
    event.preventDefault()
    if (event.target.closest('label')) {
      const labelElement = event.target.closest('label')
      const inputElement = labelElement.querySelector('input')

      data.card2 = inputElement.value

      this
        .querySelectorAll('label')
        .forEach(element => element.classList.remove('radio-block--active'))

      labelElement.classList.add('radio-block--active')

      this
        .querySelectorAll('input')
        .forEach(element => element.checked = false)

      labelElement.querySelector('input').checked = true
      document.querySelector('[data-card2-btn-next]').classList.remove('button--back')

      progressChange('33%')
    }
  })
// Карта 3
document
  .querySelector('[data-card3-question]')
  .addEventListener('click', function (event) {
    event.preventDefault()
    if (event.target.closest('label')) {
      const labelElement = event.target.closest('label')
      const inputElement = labelElement.querySelector('input')

      toggleItem(data.card3, inputElement.value)

      this
        .querySelectorAll('label')
        .forEach(labelElement => {
          const inputElement = labelElement.querySelector('input')

          labelElement.classList.remove('checkbox-block--active')
          inputElement.checked = false

          if (data.card3.includes(inputElement.value)) {
            labelElement.classList.add('checkbox-block--active')
            inputElement.checked = true
          }
        })
      document.querySelector('[data-card3-btn-next]').classList.remove('button--back')

      if (data.card3.length && !data.card4) {
        progressChange('66%')
      }
      else if (data.card3.length && data.card4) {
        progressChange('100%')
      }
      else if (data.card4 && data.card2) {
        progressChange('66%')
      }
      else {
        progressChange('33%')
      }

    }
  })
// карта 4
document
  .querySelector('[data-card4-question]')
  .addEventListener('click', function (event) {
    event.preventDefault()
    if (event.target.closest('label')) {
      const labelElement = event.target.closest('label')
      const inputElement = labelElement.querySelector('input')

      data.card4 = inputElement.value

      this
        .querySelectorAll('input')
        .forEach(element => element.checked = false)

      labelElement.querySelector('input').checked = true

      document.querySelector('[data-card4-btn-next]').classList.remove('button--back')

      progressChange('100%')
    }
  })
// карта 5
document
  .querySelector('[data-btn-result]')
  .addEventListener('click', () => {
    const inputEmail = document.querySelector('[data-email]')
    const inputAgree = document.querySelector('[data-agree]')

    if (inputEmail.value.trim() && inputAgree.checked === true) {
      data.card5.email = inputEmail.value
      data.card5.checked = true
      showCard(6)
    }
    else if (inputAgree.checked === false && inputEmail.value.trim()) {
      alert('Ознакомьтесь политикой конфеденциальности')
    }
    else if (!inputEmail.value.trim() && inputAgree.checked) {
      alert('Введите Ваш email')
    }
    else {
      alert('Введите Ваш email и ознакомьтесь политикой конфеденциальности')
    }
  })
// показать карту
function showCard(n) {
  document
    .querySelectorAll('[data-card-number]')
    .forEach(element => element.style.display = 'none')

  document
    .querySelector(`[data-card-number="${n}"]`)
    .style.display = ''
}
// добавляем или убираем данные из карты 3
function toggleItem(array, item) {
  if (array.includes(item)) {
    const index = array.indexOf(item)
    array.splice(index, 1)
  }
  else {
    array.push(item)
  }
}
// все кнопики назад
function btnBack(flag) {
  document
    .querySelectorAll(flag)
    .forEach(function (element, index) {
      element.addEventListener('click', () => showCard(index + 1))
    })
}
// проверка заполнены ли данные
function checkData(data, n) {
  if (!data) {
    alert('Чтобы продолжить опрос нужно ответить на этот вопрос.')
    return
  }
  showCard(n)
}
//  шкала прогресса
function progressChange(length) {
  document.querySelectorAll('.progress__line-bar')
    .forEach(element => {
      element.style.width = length
    })
  document.querySelectorAll('.progress__label > strong')
    .forEach(element => {
      element.textContent = length
    })
}