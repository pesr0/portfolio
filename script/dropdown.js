const dropdownBtn = document.querySelector('.dropdown_btn');
const dropdownMenu = document.querySelector('.dropdown_menu');

dropdownBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

dropdownMenu.addEventListener('mouseleave', () => {
  dropdownMenu.classList.remove('show');
});
