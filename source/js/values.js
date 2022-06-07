const valuesBtns = document.querySelectorAll('.values__more');

const valuesHandleClick = (evt) => {
  const btn = evt.target;
  btn.closest('.values__item').classList.toggle('active');
}

valuesBtns.forEach(btn => {
  btn.addEventListener('click', valuesHandleClick)
})
