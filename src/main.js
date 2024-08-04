const modalWrapper = document.getElementById('modal-wrapper');
const navBar = document.getElementById('nav-bar');
const navItems = navBar.children;
const moreGigsBtn = document.getElementById('modal-action');
const gigsCollapse = document.getElementById('gigs-collapseable');

function init() {
  // Force header to load first frame
  let interval = setInterval(function () {
    document.getElementById('header-img').src =
      document.getElementById('header-img').src;
  }, 1);
  // Then clear the interval so the gif can play when it's loaded.
  clearInterval(interval);

  // Event Listeners
  modalWrapper.addEventListener('click', handleOutsideModalClick);
  navItems[4].addEventListener('click', showModal);
  moreGigsBtn.addEventListener('click', showMoreGigs);
}

function showModal() {
  modalWrapper.style.display = 'flex';
}

function handleOutsideModalClick(e) {
  if (e.target.id === 'modal-wrapper') {
    e.currentTarget.style.display = 'none';
    gigsCollapse.style.display = 'none';
  }
}

function showMoreGigs() {
  gigsCollapse.style.display = 'block';
}

window.onload = init();
