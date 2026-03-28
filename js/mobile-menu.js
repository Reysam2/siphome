"use strict"

const openBtn = document.querySelector('#mobile__menu-btn');
const menuContent = document.querySelector('.mobile-menu-blk');
const closeBtn = document.querySelector('#mobile__close-btn');


if (openBtn && menuContent) {
  openBtn.addEventListener('click', () => {
    menuContent.classList.toggle('active')
  })
}

if (closeBtn && menuContent) {
  closeBtn.addEventListener('click', () => {
    menuContent.classList.remove('active')
  })
}

