const aboutmeBtn = document.querySelector('#aboutme_btn');
const projectsBtn = document.querySelector('.dropdown_btn');
const landingLnk = document.querySelector('#title_btn');
const aboutmePg = document.querySelector('#aboutme_page');
const projectsPg = document.querySelector('#projects_page');
const landingPg = document.querySelector('#landing_page');

aboutmeBtn.addEventListener('click', () => {
  aboutmePg.style.display='block';
  projectsPg.style.display='none';
  landingPg.style.display='none';
});

projectsBtn.addEventListener('click', () => {
  aboutmePg.style.display='none';
  projectsPg.style.display='block';
  landingPg.style.display='none';
});

landingLnk.addEventListener('click', () => {
  aboutmePg.style.display='none';
  projectsPg.style.display='none';
  landingPg.style.display='block';
});
