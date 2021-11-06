window.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.main-header__menu');
  const headerMenu = document.querySelector('.main-header__list');
  const userMenu = document.querySelector('.user-navigation');
  const promoSlides = document.querySelectorAll('.promo__slide')
  const promoButtons = document.querySelectorAll('.promo__button');
  const articleList = document.querySelector('.cards__list');
  const articlesMore = document.querySelector('.article-content__button');
  let prodQuantity = 10;
  let dataLength = null;
  const selectorForm = document.querySelector('#tel');
  const body = document.querySelector('body');

// Открытие меню-бургера

if (burger) {
  burger.addEventListener('click', () => {
    headerMenu.classList.toggle('active');
    userMenu.classList.toggle('active');
    body.classList.toggle('disable-scroll');
  })
}

if(headerMenu && userMenu) {
  headerMenu.classList.remove('main-header__list--nojs');
  userMenu.classList.remove('user-navigation--nojs');
}

// Реализация слайдера

promoSlides.forEach((slide) => {
  slide.classList.add('promo__slide--hidden');
});
promoButtons[0].classList.add('promo__button--active');
promoSlides[0].classList.remove('promo__slide--hidden');

const changeSlides = (index) => {
  promoButtons.forEach((button) => {
    button.classList.remove('promo__button--active');
  });
  promoSlides.forEach((slide) => {
    slide.classList.add('promo__slide--hidden');
  });

  promoButtons[index].classList.add('promo__button--active');
  promoSlides[index].classList.remove('promo__slide--hidden');
};

promoButtons.forEach((element, index) => {
  element.addEventListener('click', (evt) => {
    evt.preventDefault();
    changeSlides(index);
  });
});

// Реализация добавления статей в блоке .cards

if(articleList) {
  const loadArticles = (quantity = 10) => {
    fetch('../data/data.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        dataLength = data.length;

        articleList.innerHTML = '';

        for (let i = 0; i < dataLength; i++) {
          if (i < quantity) {
            let item = data[i];

            articleList.innerHTML += `
            <li class="cards__item">
              <article class="cards__content article-content">
                <div class="article-content__image">
                  <picture>
                    <source srcset="${item.mainImageWebp}, ${item.mainImageWebp2x}" type="image/webp">
                    <!-- 1х: 320px; 2x: 640px -->
                    <img src="${item.mainImage}" srcset="${item.mainImage2x}" width="320" height="185" alt="Картинка карточки">
                  </picture>
                </div>
                <div class="article-content__content">
                  <span>${item.caption}</span>
                  <h3>${item.title}</h3>
                  <blockquote>
                    <p>${item.quote}</p>
                    <p>Posted by <cite>${item.author}</cite>, on <time datetime="${item.datetime}">${item.date}</time></p>
                  </blockquote>
                  <a class="article-content__link" href="#">Continue reading</a>
                </div>
              </article>
            </li>
            `;
          }
        }
      })
  }

  loadArticles();

  articlesMore.addEventListener('click', (e) => {
    prodQuantity = prodQuantity + 6;

    loadArticles(prodQuantity);

    if (prodQuantity >= dataLength) {
      articlesMore.style.display = "none";
    } else {
      articlesMore.style.display = "flex";
    }
  });
}

// Реализация модального окна

const modal = new GraphModal({
isOpen: (modal) => {
  console.log(modal);
  console.log('opened');
},
isClose: () => {
  console.log('closed');
}
});

//Маска для поля tel
let im = new Inputmask('+7 (999) 999-99-99');

if(selectorForm) {
  im.mask(selectorForm);
};

//Local storage
const popupFormTel = document.querySelector('#tel');
const popupFormName = document.querySelector('#name');
const popupFormText = document.querySelector('#popup-text');
const popupFormMail = document.querySelector('#mail');
const button = document.querySelector('.form__button')
if(button) {
  button.addEventListener('click', function(){
    localStorage.setItem('questionsFormTelephone', popupFormTel.value);
    localStorage.setItem('questionsFormName', popupFormName.value);
    localStorage.setItem('questionsFormText', popupFormText.value);
    localStorage.setItem('questionsFormMail', popupFormMail.value);
  })
}

//Валидация формы popup
new JustValidate('#popup-form', {
  rules: {
    email: {
      required: true,
      email: true,
    },
    name: {
      required: true,
    },
    text: {
      required: true,
    },
  },
  colorWrong: 'red',
  messages: {
    name: {
      required: 'Поле необходимо заполнить!',
    },
    email: {
      required: 'Поле необходимо заполнить!',
      email: 'Пожалуйста, заполните поле правильно!',
    },
    text: {
      required: 'Поле необходимо заполнить!',
    }
  },

  submitHandler: function (form, values, ajax) {

    ajax({
      url: 'https://echo.htmlacademy.ru/',
      method: 'POST',
      data: values,
      async: true,
      callback: function(response)  {
        console.log(response)
      }
    });
    alert("Форма успешно отправлена!");
    form.reset();
  },
});

});
