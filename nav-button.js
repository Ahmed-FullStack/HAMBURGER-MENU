const template = document.createElement('template');
template.innerHTML = `

<style>
    .nav-button {
		font-family:'Google Sans';
		position: relative;
        outline: none;
        border: none;
        padding: 0.5rem 0.8rem;
		background-color: transparent;
        color: inherit;
        border-radius: 12rem;
		z-index: 1;
		transition: color 100ms ease-out;
    }
	.default-btn{
		font-family:'Google Sans';
		position: relative;
        outline: none;
        border: none;
		background-color: transparent;
        color: inherit;
	}
	.nav-button::before{
		content: '';
		position: absolute;
		inset: 0;
		margin: 0;
		background-color: var(--nav-button-bg);
		border-radius: inherit;
		z-index: -1;
		transition: background-color 130ms ease-out 50ms;
	}
    .nav-button:hover::before,     .nav-button:focus-visible::before{
		transition-delay: 0s;
        background-color: var(--nav-button-bg-hover);
    }
    .nav-button:active::before {
		transition-delay: 0s;
        background-color: var(--nav-button-bg-active);
    }
    .nav-button:active {
		color: var(--nav-button-active-clr)
    }
	.default{
		display: inline-block;
		z-index: -2;
	}

</style>
<button class="default-btn">
	<slot name="default"></slot>
</button>

<button class="nav-button">
	<slot></slot>
</button>


`;

function defaultClickEvent(el, func) {
	el.addEventListener('pointerdown', event => {
		el.addEventListener(
			'pointerup',
			e => {
				if (e.button != 0) return;
				func.bind(null, e)();
			},
			{ once: true }
		);
	});
	el.addEventListener('keydown', event => {
		el.addEventListener(
			'keyup',
			e => {
				if (e.key != 'Enter' && e.key != ' ') return;
				func();
			},
			{ once: true }
		);
	});
}

class CustomButton extends HTMLElement {
	constructor() {
		super();
		let shadow = this.attachShadow({ mode: 'open' });
		shadow.appendChild(template.content.cloneNode(true));
	}
	connectedCallback() {
		const host = this.shadowRoot;
		window.onload = () => {
			const targetEl = document.querySelector(window.history.state);
			this.targetElSetup(targetEl);
			window.scrollTo(0, targetEl.offsetTop + this.getScrollPaddingTop());
		};
		const button = host.querySelector('.nav-button');
		const defaultSlot = host.querySelector('slot[name="default"]');
		const buttonSlot = button.querySelector('slot');
		const buttonSlotContent = buttonSlot.assignedNodes()[0].textContent;
		if (buttonSlotContent.trim() === '') {
			console.log(button);
			button.remove();
		}
		if (defaultSlot.assignedNodes().length === 0) {
			defaultSlot.parentElement.remove();
		}
		defaultClickEvent(host, e => {
			const target = this;
			const href = target.getAttribute('href');
			const targetEl = document.querySelector(href);
			window.targetEl?.classList.remove?.('nav-button-target');
			this.targetElSetup(targetEl);
			if (!targetEl) return;
			window.history.pushState(href, 'link', `${href}`);
			targetEl?.offsetTop &&
				window.scrollTo(0, targetEl.offsetTop + this.getScrollPaddingTop());
		});
	}
	getScrollPaddingTop() {
		const root = document.querySelector(':root');
		const headerWrapper = document.querySelector('.header-wrapper');
		const headerWrapperHeight = headerWrapper.getBoundingClientRect().height;
		const scrollPaddingTop = window
			.getComputedStyle(root)
			.getPropertyValue('--scroll-padding-top');
		return -headerWrapperHeight - scrollPaddingTop;
	}
	targetElSetup(targetEl) {
		window.targetEl = targetEl;
		targetEl.classList.add('nav-button-target');
	}
}

customElements.define('nav-button', CustomButton);
