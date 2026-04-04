'use strict'


function selectNavLink() {
  const navLinks = document.querySelectorAll('.header__nav-link')


  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((navLink) => {
        navLink.classList.remove('header__nav-link-active')
      })
      link.classList.add('header__nav-link-active')
    })
  })
}

selectNavLink()
