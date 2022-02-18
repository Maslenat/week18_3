
let comments=[];

// загрузка картинки img путем изменения инпута 
document.getElementById("avatar").addEventListener('change', (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()

  reader.onload = (function (file) {
      return function (e) {
          const r = e.target;
          const avatar = r.result;

          document.getElementById("card__image_input").src = avatar
      }
  })(file)

  reader.readAsDataURL(file)
}) 


//добавляем данные в массив и в  LocalStorage строкой JSON
addElementToLocalStorage = (name, avatar,newcomment) => {
  comments.push([name, avatar, newcomment])
  localStorage.setItem("messageCollection", JSON.stringify(comments)); 
}


 document.getElementById('forma').onsubmit = (e) =>{
  e.preventDefault()   // прерыввем отправку формы на сервер
  
  const avatar  = document.getElementById('card__image_input').src;
  const comment=document.getElementById('newcomment').value;
  const name=document.getElementById('name').value;
  const newcomment= comment.replace(/viagra|xxx/ig, "***");

  if(name && avatar && newcomment){
   
    const newCard = generateCard(name, avatar, newcomment);
    document.querySelector('#container-comment').appendChild(newCard);//добавляем карточку на сайт
    addElementToLocalStorage(name, avatar, newcomment);//добавляем  в LocalStorage
    document.getElementById('forma').reset() //Очистка формы и возврат картинки на место
    document.getElementById('card__image_input').src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvaDTNbW8gPjAVwm_z9I0ZM0cPAJlyPCJksw&usqp=CAU"
  
  
}
}
 //Рисуем карточку
 const generateCard = (name, avatar, comment) =>{
 
  let card = document.createElement('div');
  card.classList.add("card");

  let card__image = document.createElement('img');
  card__image.classList.add("card__image");
  card__image.src = avatar;

  let card__main = document.createElement('div');
  

  let h5 = document.createElement('h5');
  h5.innerText = name;

  let message = document.createElement('div');
   message.classList.add("card-break");
   message.innerText = comment;

  card__main.appendChild(h5);
  card__main.appendChild(message);

  card.appendChild(card__image);
  card.appendChild(card__main);

  return card;
 }

//Получили  из Local storage строку JSON и преобразовали в объект 
function getArrFromLocalStorage(){
  {
    let collection = JSON.parse(localStorage.getItem("messageCollection"));
    if(collection){
        comments = collection;
    }
}

}
 
// Генерация карточек из массива (сначала функция getArrFromLocalStorage)
function getMessage() {

  getArrFromLocalStorage()
 

  for( let i = 0; i < comments.length; i++){
    

      const newCard = generateCard(comments[i][0],comments[i][1], comments[i][2] )
      document.querySelector('#container-comment').appendChild(newCard)
  }
}

 //Загрузка страницы 

document.addEventListener("DOMContentLoaded",function(){
  getMessage()
})