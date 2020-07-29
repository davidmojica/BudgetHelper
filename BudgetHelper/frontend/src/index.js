import { connect } from 'q2-tecton-sdk';

const title = document.getElementById('title');
const button = document.querySelector('q2-btn');
const input = document.querySelector('q2-input');
const messages = document.getElementById('messages');

connect().then(capabilities => {
  capabilities.sources
    .requestExtensionData({ route: 'default' })
    .then(response => {
      title.innerHTML = response.data.message;
    })
    .catch(error => showError(error))
    .finally(() => capabilities.actions.setFetching(false));

  button.addEventListener('click', submit);

  function submit() {
    let name = input.value;

    capabilities.sources
      .requestExtensionData({
        route: 'submit',
        body: { name: name }
      })
      .then(response => {
        messages.insertAdjacentHTML('beforeend',
          `<li>Hi ${response.data.name} the server date is ${response.data.date}.</li>`
        );
      })
      .catch(error => showError(error));
  }

  function showError(error) {
    capabilities.actions.showModal({
      title: 'Error',
      message: error.data.message,
      modalType: 'error'
    });
  }
});
