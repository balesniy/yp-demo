import CardList from './card-list.js'
import AddFormPopup from './add-form-popup.js'

class PlacesList {
    constructor({ placesList, addCardButton }, initialCards) {
        this.placesList = placesList;
        this.addCardButton = addCardButton;
        this.initialCards = initialCards;
        this.cardList = null;
    }
    init() {
        this.cardList = new CardList(this.placesList, this.initialCards);
        this.cardList.render();
        this.addCardButton.addEventListener('click', () => {
            new AddFormPopup({ onSubmit: ({ name, link }) => this.cardList.addCard({ name: name.value, link: link.value }) }).open();
        });
    }
}

export default PlacesList