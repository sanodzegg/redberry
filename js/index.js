// regex
const mail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

document.addEventListener("DOMContentLoaded", () => {
    // declaration
    const dotbox = document.querySelectorAll('.page-dot');
    const inputs = document.querySelectorAll('input');
    const selectors = document.querySelectorAll('select');
    const textareas = document.querySelectorAll('textarea');
    const formbox = document.querySelectorAll('.form-box');
    const displaybox = document.querySelectorAll('.display-wrapper');

    document.getElementById('start').onclick = () => {
        document.body.style.background = 'unset';
        document.querySelector('.home-view').style.display = 'none';
        document.querySelector('.form-section').classList.remove('hidden');
        formbox[0].classList.remove('hidden');
        displaybox[0].classList.remove('hidden');
    }

    document.getElementById('number').addEventListener('keyup', function(){
        this.childNodes[3].value = this.childNodes[3].value.replace(/-/g, "").match(/.{1,3}/g).join('-');
    });
    let err = {};
    // validation
    inputs.forEach(e => {
        err.textval = false;
        err.email = false;
        e.onblur = () => {
            if(e.id == 'fname' || e.id == 'lname'){
                if(e.value.length == 0) {
                    err.textval = false;
                    e.style.border = '1px #FE3B1F solid';
                } else if (e.value.length <= 2) {
                    err.textval = false;
                } else {
                    delete err.textval;
                }
            }
            if(e.type == 'email') {
                if(mail.test(e.value)) {
                    delete err.email;
                } else if (e.value.length == 0) {
                    err.email = false;
                    e.style.border = '1px #FE3B1F solid';
                } else {
                    delete err.email;
                }
            }
            if(e.id == 'number') {
                if(e.value.length == 0) {
                    delete err.number;
                    e.style.border = '1px #525557 solid';
                } else if (e.value.length > 1 && e.value.length != 11) {
                    err.number = false;
                } else if(e.value[0] != '5') {
                    err.number = false;
                } else {
                   delete err.number;
                }
            }
            if(e.type == 'number') {
                if(e.value.length == 0) {
                    err.exp = false;
                } else {
                   delete err.exp;
                }
            }
            if(Object.keys(err).length == 0) {
                dotbox[1].classList.add('available');
            } else {
                dotbox[1].classList.remove('available');
            }
        }
    });
    selectors.forEach(e => {
        e.onchange = (c) => {
            err.selector = true;
            console.log(err);
        }
    })
    let count = 0;
    dotbox.forEach((e, i) => {
        e.addEventListener('click', function(){
            count = i;
            if(e.classList.contains('available')) {
                e.classList.add('active');
                for(let i = 0; i < formbox.length; i++) {
                    formbox[i].classList.add('hidden');
                    displaybox[i].classList.add('hidden');
                }
                formbox[i].classList.remove('hidden');
                displaybox[i].classList.remove('hidden');
            }
        })
    });
    // document.getElementById('prev').addEventListener('click', function(){
    //     if(count > 0) {
    //         count--;
    //         dotbox[count].classList.add('active');
    //     }
    // });
    // document.getElementById('next').addEventListener('click', function(){
    //     if(count < 4) {
    //         count++;
    //         dotbox[count].classList.add('active');
    //     }
    // });
});