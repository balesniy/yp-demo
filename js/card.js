class Card {
    constructor({ name, link }, index) {
        this.name = name;
        this.link = link;
        this.index = index;
        this._element = null;
        this.template = document.querySelector('#card');
    }

    like() {
        const likeButton = this.element.querySelector('.place-card__like-icon');
        likeButton.classList.toggle('place-card__like-icon_liked');
    }

    remove() {
        this._element.remove();
        this._element = null;
    }

    create() {
        this._element = this.template.cloneNode(true).content.firstElementChild;
        this._element.dataset.index = this.index;

        const imgCard = this._element.querySelector('.place-card__image');
        imgCard.style.backgroundImage = `url(${this.link})`;

        const name = this._element.querySelector('.place-card__name');
        name.textContent = this.name;
    }

    get element() {
        if (!this._element) {
            this.create();
        }
        return this._element;
    }
}

export default Card