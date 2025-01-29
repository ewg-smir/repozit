const textInput = document.querySelector('input[type=text]');
const li = document.querySelectorAll('.drop__li');
const url = "https://api.github.com/search/repositories?q=";
const ul = document.querySelector('.drop');
const rep = document.querySelector('.repozit');
let timer;

function callback(evt) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    
    let count = 0;
    const value = textInput.value;
    const query = textInput.value.trim();
    if (query === "") {
      ul.style.display = "none";
      return;
    }
    else{
      ul.style.display = "block";
    }
    return fetch(url + value, {
      method: 'get',
    }).then((response) => {
      return response.json();
    })
      .then(json => {
        for (let element of li) {
          element.style.display = 'none';
        }
        for (let item of json.items) {
          li[count].textContent = item.name;
          li[count].dataset.name = item.name;
          li[count].dataset.owner = item.owner.login;
          li[count].dataset.stars = item.stargazers_count;
          li[count].style.display = 'block';
          count++;
          if (count > 5) {
            break;
          }
        }
      })
      .catch(error => {
        const e = new Error('Что-то пошло не так');
        e.data = error;
        throw e;
      });
  }, 600);
}

for(let element of li){
element.addEventListener('click', function(){
  textInput.value = "";
  ul.style.display = "none";
  const newLi = document.createElement('li');
  newLi.textContent = newLi.textContent = `Name: ${element.dataset.name} \nOwner: ${element.dataset.owner} \nStars: ${element.dataset.stars}`;
  rep.appendChild(newLi);
  const button = document.createElement('div');
  newLi.appendChild(button);
  const img = document.createElement('img');
  button.appendChild(img);
  img.src = 'img.png';
  button.addEventListener('click', function(){
    newLi.style.display = "none";
  })
})
}

textInput.addEventListener('input', callback);
