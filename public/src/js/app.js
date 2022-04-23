function generateAdvice() {
  axios('https://api.adviceslip.com/advice')
    .then((res) => {
      const advice = res.data.slip.advice;
      const advice_id = res.data.slip.id;

      document.getElementById('advice').innerHTML = advice;
      document.getElementById('advice_id').innerHTML = advice_id;
    }).catch((err) => {
      console.log(err);
    });
}

function favoriteAdvice() {

  function setDisplayNone() {
    setTimeout(() => {
      document.querySelector('.alert').style.display = 'none';
    }, 2000);
  }

  const alert = document.querySelector('.alert')
  const actuallyAdvice = document.getElementById('advice_id').innerText;

  const favoriteAdvice = JSON.parse(localStorage.getItem('favoriteAdvice')) || [];

  if (favoriteAdvice.includes(actuallyAdvice)) {
    alert.innerHTML = 'This advice is already in your favorites';
    alert.style.color = "#e06656";
    alert.style.display = "block";
    setDisplayNone()
  } else {
    favoriteAdvice.push(actuallyAdvice);
    localStorage.setItem('favoriteAdvice', JSON.stringify(favoriteAdvice));
    alert.innerHTML = 'This advice has been added to your favorites';
    alert.style.color = "black";
    alert.style.display = "block";

    setDisplayNone()
    showFavorites()
  }

}

function removeAdvice(id) {
  const favoriteAdvice = JSON.parse(localStorage.getItem('favoriteAdvice')) || [];
  favoriteAdvice.splice(id, 1);
  localStorage.setItem('favoriteAdvice', JSON.stringify(favoriteAdvice));

  showFavorites();
}

function showFavorites() {

  const favoriteAdvice = JSON.parse(localStorage.getItem('favoriteAdvice')) || [];

  if (favoriteAdvice.length === 0) {
    console.log('You have no favorites yet')
  } else {
    var ul = document.getElementById('favorites-list');
    ul.innerHTML = ''
    for (let i = 0; i < favoriteAdvice.length; i++) {
      axios(`https://api.adviceslip.com/advice/${favoriteAdvice[i]}`)
        .then((res) => {
          const advice = res.data.slip.advice;
          var li = document.createElement('li');
          li.setAttribute('class', 'item');

          ul.appendChild(li);

          li.innerHTML = advice + `<button class="delete-button" onclick="removeAdvice(${i})"><ion-icon name="close-circle-outline"></ion-icon></button>`;
        }).catch((err) => {
          console.log(err);
        });
    }
  }
}

generateAdvice()
showFavorites()

const html = document.querySelector("html")
const checkbox = document.querySelector('input[name=theme]')
const checkboxColorMode = JSON.parse(localStorage.getItem('colorMode'))

checkbox.addEventListener("change", ({ target }) => {
  target.checked ? html.classList.add('white-mode') : html.classList.remove('white-mode')
  localStorage.setItem('colorMode', target.checked)
})

if (checkboxColorMode) {
  checkbox.checked = checkboxColorMode
  html.classList.add('white-mode')
}