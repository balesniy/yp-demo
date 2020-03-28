import Card from './card.js'
import BigImagePopup from './big-image-popup.js'

class CardList {
    constructor(container, cards = []) {
        this.container = container;
        this.cards = cards.map((card, index) => new Card(card, index));
    }

    addCard({ name, link }) {
        const card = new Card({ name, link }, this.cards.length);
        this.cards.push(card);
        this.container.append(card.element);
    }

    render() {
        const cardsElements = this.cards.map((card) => card.element);
        this.container.append(...cardsElements);
        this.container.addEventListener('click', (event) => {
            const currentCard = event.target.closest('.place-card');
            if (!currentCard) {
                return
            }
            const card = this.cards[currentCard.dataset.index];
            if (event.target.classList.contains('place-card__like-icon')) { // щёлкнули по лайку
                card.like();
            }

            if (event.target.classList.contains('place-card__delete-icon')) { // щёлкнули по иконке удаления
                card.remove();
                this.cards[currentCard.dataset.index] = null; // TODO удалить из массива cards
            }

            if (event.target.classList.contains('place-card__image')) { // картинка, а не подписи внизу
                new BigImagePopup(card.link).open()
            }

        });

    }
}

export default CardList