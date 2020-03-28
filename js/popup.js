import {StringLength, StringLengthValidity, Validator, DefaultStringLength} from './constants.js'

class Popup {
    constructor(templateSelector) {
        if (new.target === Popup) {
            throw new Error(`Can't instantiate AbstractPopup, only concrete one.`);
        }

        this.element = null;
        this.container = document.querySelector('.popup');
        this.template = document.querySelector(templateSelector);
    }

    onSubmit() {
        throw new Error(`Abstract method not implemented: onSubmit`);
    }
    open() {
        const closeButton = this.element.querySelector('.popup__close');
        closeButton.addEventListener('click', () => this.close());

        this.container.append(this.element);
        this.container.classList.add('popup_is-opened');
    }
    close() {
        this.container.classList.remove('popup_is-opened');
        this.element.remove();
        this.element = null;
    }

    submitForm(event) {
        const form = event.currentTarget;
        event.preventDefault();

        if (!form.querySelector('.popup__button').classList.contains('popup__button_enable')) {//кнопка 'выключена', т.е. данные в форме невалидные
            return;
        }
        this.onSubmit(form.elements);
        this.close();
    }

    validateForm(fields) {
        const validator = {
            [Validator.STRING]: Popup.validateStringLenght,
            [Validator.URL]: Popup.validURL
        };

        const form = this.element.querySelector('form');

        fields.forEach(field => {
            const { value } = form.elements[field.name];
            const validity = validator[field.validateBy](value);
            field.messageField.textContent = validity;
        })

        
        const isOk = !fields.some(({messageField}) => messageField.textContent);
        form.querySelector('.popup__button').classList.toggle('popup__button_enable', isOk);
    }

    static validateStringLenght(str, min = DefaultStringLength.MIN, max = DefaultStringLength.MAX) {
        if (str.length >= min && str.length <= max) {
            return StringLengthValidity[StringLength.VALID];
        }
        return StringLengthValidity[str.length ? StringLength.WRONG : StringLength.REQUIRED];
    }

    static validURL(str) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return pattern.test(str) ? '' : 'Здесь должна быть ссылка';
    }
}

export default Popup