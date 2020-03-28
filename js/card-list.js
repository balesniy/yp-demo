import Card from './card.js';
import BigImagePopup from './big-image-popup.js';

class CardList {
  constructor(container, cards = []) {
    this.container = container;
    this.cards = cards.reduce((acc, card, i) => ({ ...acc, [i]: new Card(card, i) }), {});
  }

  addCard({ name, link }) {
    const id = (Math.random() + Date.now()).toString(36);
    const card = new Card({ name, link }, id);
    this.cards[id] = card;
    this.container.append(card.element);
  }

  render() {
    const cardsElements = Object.values(this.cards).map((card) => card.element);
    this.container.append(...cardsElements);
    this.container.addEventListener('click', (event) => {
      const currentCard = event.target.closest('.place-card');
      if (!currentCard) {
        return;
      }
      const card = this.cards[currentCard.dataset.id];
      if (event.target.classList.contains('place-card__like-icon')) { // щёлкнули по лайку
        card.like();
      }

      if (event.target.classList.contains('place-card__delete-icon')) { // щёлкнули по иконке удаления
        card.remove();
        delete this.cards[currentCard.dataset.id];
      }

      if (event.target.classList.contains('place-card__image')) { // картинка, а не подписи внизу
        new BigImagePopup(card.link).open();
      }
    });
  }
}

export default CardList;
