'use strict'

if (document.getElementById('contact-form')) {
  const TOKEN = "6501537297:AAHj-coyF-J1NyLOLq68Tnnr97vJ5suyXpY";
  const CHAT_ID = "-1001634380605";
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  const thankMessage = document.getElementById('thank-message');

  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (this.name.value != "" &&
      this.surname.value != "" &&
      this.fatherName.value != "" &&
      this.number.value != "") {
      let message = `<b>Заявка з сайту </b>\n`;
      message += `<b>Ім'я ${this.name.value}</b>\n`;
      message += `<b>Прізвище ${this.surname.value}</b>\n`;
      message += `<b>По-батькові ${this.fatherName.value}</b>\n`;
      message += `<b>Мобільний телефон ${this.number.value}</b>\n`;

      axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message,
      })
        .then((res) => {
          this.name.value = "";
          this.surname.value = "";
          this.fatherName.value = "";
          this.number.value = "";
          // thankMessage.classList.add('show')
          $('.input-field').removeClass('field-error');
          setTimeout(function(){
            window.open('/insoles/thank.html')
          },1000)
        })
        .catch((err) => {
          console.warn(err)
        })
        .finally(() => {
          // console.log('Success');
        })
    } else {
      $('.input-field').addClass('field-error');
    }
    checkInput()
  });

  $('.input-field input').each(function (index, item) {
    $(item).on('blur', function () {
      checkInput()
    });
  });

}

function checkInput() {
  $('.input-field').each(function (index, item) {
    let itemValue = $(item).find('input').val();
    if (itemValue != "") {
      $(item).removeClass('field-error')
    } else {
      $(item).addClass('field-error');
    }
  });
}

// Scroll to anchor
$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();


  let offset = $('header').height();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top - offset
  }, 500);
});

window.addEventListener('load', function () {
  try {
    const statusSite = document.querySelector('meta[name="robots"]');

    if (statusSite.getAttribute('content').match(/noindex/)) {
      document.body.insertAdjacentHTML('afterbegin', `
            <div class="notification show">
              <div class="notification-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" preserveAspectRatio="none">
                      <path fill="#EA4E2C" d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
                      <path fill="#EA4E2C"
                          d="M10 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM10 8a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1Z" />
                  </svg>
              </div>
              <div class="notification-text">
                  We are sorry, the site is temporarily not indexed
              </div>
              <div class="notification-button">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" preserveAspectRatio="none">
                      <path fill="#000"
                          d="m10.41 9 6.3-6.29a1.004 1.004 0 1 0-1.42-1.42L9 7.59l-6.29-6.3a1.004 1.004 0 0 0-1.42 1.42L7.59 9l-6.3 6.29a1 1 0 0 0 0 1.42.998.998 0 0 0 1.42 0L9 10.41l6.29 6.3a.998.998 0 0 0 1.42 0 .997.997 0 0 0 .219-1.095.998.998 0 0 0-.22-.325L10.41 9Z" />
                  </svg>
              </div>
          </div>
      `);

      setTimeout(function () {
        document.querySelector('.notification').classList.add('show');
      }, 3000)

      document.querySelector('.notification-button').addEventListener('click', function () {
        document.querySelector('.notification').classList.remove('show');
      });

      setTimeout(function () {
        document.querySelector('.notification').classList.remove('show');
      }, 10000)
    }

  } catch (error) {
    console.log(error)
  }
});