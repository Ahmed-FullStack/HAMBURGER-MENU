const template = document.createElement('template');
template.innerHTML = `

<style>
    .formatted-text {
		font-family:'Google Sans Display';
        color: hsl( 0 0% 100% / .3);
    }


</style>
<span class="formatted-text">
	<slot></slot>
</span>


`;

class CustomButton extends HTMLElement {
	constructor() {
		super();
		let shadow = this.attachShadow({ mode: 'open' });
		shadow.appendChild(template.content.cloneNode(true));
	}
}

customElements.define('formatted-text', CustomButton);
