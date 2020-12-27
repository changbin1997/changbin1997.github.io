var headerNavBar = document.querySelector('header .header-nav');

document.addEventListener('scroll', function() {
  if (document.documentElement.scrollTop >= 70) {
    headerNavBar.style.background = '#3D31BC';
  }

  if (document.documentElement.scrollTop < 70) {
    headerNavBar.style.background = 'none';
  }
});