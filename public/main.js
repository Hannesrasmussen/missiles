const modalWrapper = document.getElementById('modal-wrapper');
const navItems = document.getElementsByClassName('nav-item');

function init() {
  // Event Listeners
  modalWrapper.addEventListener('click', handleOutsideModalClick);

  navItems[3].addEventListener('click', showModal);
}

function showModal() {
  modalWrapper.style.display = 'flex';
}

function handleOutsideModalClick(e) {
  console.log(e.currentTarget);
  if (e.currentTarget.id === 'modal-wrapper') {
    e.currentTarget.style.display = 'none';
  }
}

window.onload = init();
