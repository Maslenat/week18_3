let comments = [];

const checkSpam = (str) => {

  let newstr = str.replace(/viagra|xxx/ig, "***");
  return newstr;
        
}






function generate() {
 
    for (let c of comments) 
      { let p = document.createElement("p");
       p.innerHTML=`${c}<hr>`;
       document.getElementById('container-comment').appendChild(p);}
    

}

function newComment() {
    let newcomment = document.getElementById('newcomment').value;
    if (newcomment == 0) {
        return;
    }
    newcomment = checkSpam(newcomment);
    comments.push(newcomment);

    generate();
    document.getElementById("newcomment").value = "";
}






document.getElementById('btn').addEventListener("click", newComment);


/* В фунции checkSpam можно и не делать проверку а сразу вызвать функцию replace, если совпадения не найдутся, что она и так вернет ту же строку
Писать разметку в JS коде не очень хорошая практика block += `<div>${c}</div><hr>`;, лучше воспользовать функцией createElement  */