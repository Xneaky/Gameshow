var modal = document.getElementById('modal');
var loginBtn = document.getElementById('loginBtn');
var closeBtn = document.getElementsByClassName('closeBtn')[0];

loginBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOut);


function openModal(){
    modal.style.display = 'block';
}

function closeModal(){
    modal.style.display = 'none';
}

function clickOut(e){
    if(e.target == modal){
        modal.style.display = 'none';
    }
}
