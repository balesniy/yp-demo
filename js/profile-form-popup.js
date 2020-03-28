import Popup from './popup.js';
import { Validator } from './constants.js';

class ProfileFormPopup extends Popup {
  constructor({ onSubmit, name, job }) {
    super('#profile');
    this.onSubmit = onSubmit;
    this.name = name;
    this.job = job;
    this.validateProfileForm = this.validateProfileForm.bind(this);
  }

  open() {
    this.element = this.template.cloneNode(true).content.firstElementChild;
    const form = this.element.querySelector('form');
    // сабмит формы редактирования профиля
    form.addEventListener('submit', (evt) => this.submitForm(evt));
    // валидация редактирования профиля
    form.elements.name.addEventListener('input', this.validateProfileForm);
    form.elements.job.addEventListener('input', this.validateProfileForm);
    form.elements.name.value = this.name;
    form.elements.job.value = this.job;
    this.validateProfileForm();

    super.open();
  }

  validateProfileForm() {
    const form = this.element.querySelector('form');
    const formErrorProfileName = form.querySelector('#error-profile-name');
    const formErrorProfileJob = form.querySelector('#error-profile-job');

    const fields = [
      { name: 'name', validateBy: Validator.STRING, messageField: formErrorProfileName },
      { name: 'job', validateBy: Validator.STRING, messageField: formErrorProfileJob },
    ];

    this.validateForm(fields);
  }
}

export default ProfileFormPopup;
