const benefitsBtns = document.querySelectorAll('.benefits__more');

const benefitHandleClick = (evt) => {
  const btn = evt.target;
  btn.closest('.benefits__item').classList.toggle('active');
  btn.querySelector('span').innerText = ((btn.closest('.benefits__item').classList.contains('active')) ? 'Скрыть' : 'Подробнее');
}

benefitsBtns.forEach(btn => {
  btn.addEventListener('click', benefitHandleClick)
})
