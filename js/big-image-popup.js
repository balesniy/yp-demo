import Popup from './popup.js'

class BigImagePopup extends Popup {
    constructor(src) {
        super('#big-size-image');
        this.src = src;
    }

    open() {
        this.element = this.template.cloneNode(true).content.firstElementChild;
        const popupImage = this.element.querySelector('.popup__image');
        popupImage.src = this.src;
        super.open();
    }

}

export default BigImagePopup