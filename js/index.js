// api
const TOKEN = '50db5af3-e8ff-4f9e-ab8f-d2a50fdb10aa';
// regex
const mail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const data = {
    token: TOKEN,
}

document.addEventListener("DOMContentLoaded", () => {
    // declaration
    const dotbox = document.querySelectorAll('.page-dot');
    const inputs = document.querySelectorAll('input');
    const selectors = document.querySelectorAll('select');
    const textareas = document.querySelectorAll('textarea');
    const formbox = document.querySelectorAll('.form-box');
    const displaybox = document.querySelectorAll('.display-wrapper');
    let count = 0;
    let err = {};

    let selected = false;

    document.getElementById('start').onclick = () => {
        document.body.style.background = 'unset';
        document.querySelector('.home-view').style.display = 'none';
        document.querySelector('.form-section').classList.remove('hidden');
        formbox[0].classList.remove('hidden');
        formbox[0].classList.add('available');
        displaybox[0].classList.remove('hidden');
    }

    document.getElementById('number').addEventListener('keyup', function(){
        this.childNodes[3].value = this.childNodes[3].value.replace(/-/g, "").match(/.{1,3}/g).join('-');
        data.phone = `+995${this.childNodes[3].value.replace(/-/g, "")}`
    });

    getSkills(selectors[0]);
    document.getElementById('toLangList').addEventListener('click', function(){
        if(null){} //fix
    });
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
                    if(e.id == 'fname') {
                        data.first_name = e.value;
                    } else if (e.id == 'lname') {
                        data.last_name = e.value;
                    }
                }
            }
            if(e.type == 'email') {
                if(mail.test(e.value)) {
                    delete err.email;
                    data.email = e.value;
                } else if (e.value.length == 0) {
                    err.email = false;
                    e.style.border = '1px #FE3B1F solid';
                } else {
                    delete err.email;
                    data.email = e.value;
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
                dotbox[count+1].classList.add('available');
            } else {
                for(let i = count+1; i < dotbox.length; i++) {
                    dotbox[i].classList.remove('active');
                }
                dotbox[count+1].classList.remove('available');
            }
            selectors.forEach(e => {
                if(e.offsetParent !== null && selected == false) {
                    err.selector = false;
                }
                e.onchange = (c) => {
                    selected = true;
                    delete err.selector
                }
            });
            console.log(data);
        }
    });
    dotbox.forEach((e, i) => {
        e.addEventListener('click', function(){
            if(e.classList.contains('available')) {
                count = i;
                err = {};
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

const getSkills = async (node) => {
    let res = await fetch('https://bootcamp-2022.devtest.ge/api/skills', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization : `Token ${TOKEN}`
        }
    });
    let data = await res.json();
    data.forEach(e => {
        node.innerHTML += 
        `
            <option value="${e.title}">${e.title}</option>
        `
    })
}

// function test() {
//     fetch('https://jsonplaceholder.typicode.com/todos', {
//         method: 'POST',
//         body: JSON.stringify(obj),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8'
//         }
//     })
//     .then(response => response.json())
//     .then(json => {
//         console.log(json);
//     });
// }

// test();