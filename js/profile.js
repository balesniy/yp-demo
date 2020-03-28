import ProfileFormPopup from './profile-form-popup.js';

class Profile {
  constructor({ buttonEdit, userInfoName, userInfoJob }) {
    this.buttonEdit = buttonEdit;
    this.userInfoName = userInfoName;
    this.userInfoJob = userInfoJob;
  }

  init() {
    this.buttonEdit.addEventListener('click', () => {
      new ProfileFormPopup({
        name: this.userInfoName.textContent,
        job: this.userInfoJob.textContent,
        onSubmit: ({ name, job }) => {
          this.userInfoName.textContent = name.value;
          this.userInfoJob.textContent = job.value;
        },
      }).open();
    });
  }
}

export default Profile;
