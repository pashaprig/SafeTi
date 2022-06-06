const btns = document.querySelectorAll('.values__more');

const handleClick = ( evt ) => {
  const btn =  evt.target;
  btn.closest( '.values__item').classList.toggle( 'active' );
}

btns.forEach( btn => {
  btn.addEventListener( 'click', handleClick )
})
