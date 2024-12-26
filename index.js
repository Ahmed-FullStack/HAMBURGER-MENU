import rippleElement from './paperRipple/ripple.js';
const body = document.body;
const root = document.querySelector(':root');
const hamBtn = document.querySelector('.ham-btn');
const navUl = document.querySelector('.nav-ul');
const backdrop = document.querySelector('.backdrop');
const navClickable = navUl.querySelectorAll('button, a, nav-button');
const linkButtons = document.querySelectorAll('.link-btn');
const headerWrapper = document.querySelector('.header-wrapper');
const headerWrapperHeight = headerWrapper.getBoundingClientRect().height;
body.style.setProperty('--header-height', `${headerWrapperHeight.toFixed(2)}`);
const navBtn = document.querySelectorAll('nav-button');
navBtn.forEach(btn => {
	rippleElement(btn);
});
navUl.setAttribute('menu-closed', 'true');
backdrop.addEventListener('click', e => {
	body.classList.remove('overflow-hidden');
	navUl.setAttribute('menu-closed', 'true');
});
hamBtn.addEventListener('click', e => {
	const menuClosed = navUl.getAttribute('menu-closed');
	if (menuClosed) {
		body.classList.add('overflow-hidden');
		navUl.removeAttribute('menu-closed');
	}
	if (!menuClosed) {
		body.classList.remove('overflow-hidden');
		navUl.setAttribute('menu-closed', 'true');
	}
});
navClickable.forEach(click => {
	click.addEventListener('click', e => {
		body.classList.remove('overflow-hidden');
		navUl.setAttribute('menu-closed', 'true');
	});
});
