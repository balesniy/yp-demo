import Popup from './popup.js'
import {Validator} from './constants.js'

class AddFormPopup extends Popup {
    constructor({ onSubmit }) {
        super('#add-card');
        this.onSubmit = onSubmit;
        this.validateAddCardForm = this.validateAddCardForm.bind(this);
    }
    open() {
        this.element = this.template.cloneNode(true).content.firstElementChild;
        const form = this.element.querySelector('form');
        // сабмит формы добавления карточки.
        form.addEventListener('submit', (evt) => this.submitForm(evt));
        //валидация добавления новой карточки
        form.elements.name.addEventListener('input', this.validateAddCardForm);
        form.elements.link.addEventListener('input', this.validateAddCardForm);
        this.validateAddCardForm();
        super.open();
    }
    validateAddCardForm() {
        const form = this.element.querySelector('form');
        const formErrorCardName = form.querySelector('#error-card-name');
        const formErrorCardLink = form.querySelector('#error-card-link');
        
        const fields = [
            {name: 'name', validateBy: Validator.STRING, messageField: formErrorCardName},
            {name: 'link', validateBy: Validator.URL, messageField: formErrorCardLink}
        ];

        this.validateForm(fields);
    }
}

export default AddFormPopup