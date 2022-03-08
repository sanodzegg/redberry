// api
const TOKEN = '50db5af3-e8ff-4f9e-ab8f-d2a50fdb10aa';
// regex
const mail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const data = {
    token: TOKEN,
}

let skill_data = {};

document.addEventListener("DOMContentLoaded", () => {
    // declaration
    const dotbox = document.querySelectorAll('.page-dot');
    const inputs = document.querySelectorAll('input');
    const selectors = document.querySelectorAll('select');
    const textareas = document.querySelectorAll('textarea');
    const formbox = document.querySelectorAll('.form-box');
    const displaybox = document.querySelectorAll('.display-wrapper');
    const languageAddBtn = document.getElementById('toLangList');

    const submit = document.getElementById('submitButton');
    const back = document.getElementById('goBackBtn');

    // coordination validation
    const coordinationVal = document.querySelectorAll('.coordination');
    // skills validation
    const skillsVal = document.querySelectorAll('.skills');
    //covid page validation 
    const radiobtns = document.querySelectorAll('.radiobtn');
    const dates = document.querySelectorAll('.date');
    const dateInputs = document.querySelectorAll('.date-input');
    // devtalks validation
    const devinputs = document.querySelectorAll('.devtalks');


    // error objects for validation
    let coord_err = {};
    let skills_err = {};
    let covid_err = {};
    let devtalks_err = {};

    let count = 0;
    let skill_arr = [0, 1];
    // this is for data object 
    let skills = [];

    document.getElementById('start').onclick = () => {
        document.body.style.background = 'unset';
        document.querySelector('.home-view').classList.add('hidden');
        document.querySelector('.form-section').classList.remove('hidden');
        formbox[0].classList.remove('hidden');
        formbox[0].classList.add('available');
        displaybox[0].classList.remove('hidden');
    }

    document.getElementById('number').addEventListener('keyup', function() {
        let node = this.childNodes[3];
        try {
            node.value = node.value.replace(/-/g, "").match(/.{1,3}/g).join('-');
            data.phone = `+995${node.value.replace(/-/g, "")}`
        } catch(err) {
            // maybe a popup?
        }
    });

    getSkills(selectors[0]);

    const validator = (errobj, value) => {
        if(Object.keys(errobj).length == value) {
            dotbox[count+1].classList.add('available');
        } else {
            for(let i = count+1; i < dotbox.length; i++) {
                dotbox[i].classList.remove('active');
            }
            dotbox[count+1].classList.remove('available');
        }
    }

    languageAddBtn.addEventListener('click', () => {
        document.querySelector('.langlist-wrapper').innerHTML += 
        `
        <div class="langlist-box">
            <span class="langName" id="langName">${skill_arr[1]}</span>
            <span class="experience">years of experience: ${skill_arr[0]}</span>
            <div class="removeLang">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C19.9939 15.5203 15.5203 19.9939 10 20ZM2 10.172C2.04732 14.5732 5.64111 18.1095 10.0425 18.086C14.444 18.0622 17.9995 14.4875 17.9995 10.086C17.9995 5.68451 14.444 2.10977 10.0425 2.086C5.64111 2.06246 2.04732 5.59876 2 10V10.172ZM15 11H5V9H15V11Z" fill="#EB3535"/>
                </svg>                                
            </div>
        </div>
        `
        delete skills_err.exppoints;

        // inner declarations for added skills
        let removers = document.querySelectorAll('.removeLang');
        const addedSkills = document.querySelectorAll('.langName');
        const options = document.querySelectorAll('option');

        for(let i = 0; i < options.length; i++) {
            addedSkills.forEach(e => {
                if(e.innerText == options[i].innerText) {
                    options[i].disabled = true;
                    languageAddBtn.style.pointerEvents = 'none';
                }
            });
        }
        removers.forEach((e, i) => {
            e.addEventListener('click', function() {
                for(let i = 0; i < options.length; i++) {
                    if(e.parentNode.childNodes[1].innerText == options[i].innerText) {
                        options[i].removeAttribute('disabled');
                        languageAddBtn.style.pointerEvents = 'all';
                    }
                }
                skills.splice(i, 1);
                skills = skills.filter((el) => {
                    return el != null;
                });
                // data.skills = [skills];
                e.parentNode.remove();
                // removers = document.querySelectorAll('.removeLang');
                
                if(document.querySelectorAll('.removeLang').length < 1) {
                    skills_err.exppoints = false;
                    validator(skills_err, 1);
                }
            });
        });
        validator(skills_err, 1);
    });

    let error_desc = document.createElement('span');
    error_desc.classList.add('err-text');

    // validation
    coordinationVal.forEach(e => {
        coord_err.textval = false;
        coord_err.email = false;
        e.onblur = () => {
            if(e.id == 'fname' || e.id == 'lname'){
                if(e.value.length == 0) {
                    coord_err.textval = false;
                    if(e.id == 'fname') {
                        e.style.border = '1px #FE3B1F solid';
                        error_desc.innerText = '* first name is required';
                        insertAfter(e, error_desc);
                    } else if (e.id == 'lname') {
                        e.style.border = '1px #FE3B1F solid';
                        error_desc.innerText = '* last name is required';
                        insertAfter(e, error_desc);
                    }
                } else if (e.value.length <= 2) {
                    coord_err.textval = false;
                    if(e.id == 'fname') {
                        e.style.border = '1px #FE3B1F solid';
                        error_desc.innerText = '* first name should include 3 or more characters';
                        insertAfter(e, error_desc);
                    } else if (e.id == 'lname') {
                        e.style.border = '1px #FE3B1F solid';
                        error_desc.innerText = '* last name should include 3 or more characters';
                        insertAfter(e, error_desc);
                    }
                } else {
                    delete coord_err.textval;
                    if(e.id == 'fname') {
                        data.first_name = e.value;
                        e.style.border = '';
                        error_desc.remove();
                    } else if (e.id == 'lname') {
                        data.last_name = e.value;
                        e.style.border = '';
                        error_desc.remove();
                    }
                }
            }
            if(e.type == 'email') {
                if(mail.test(e.value)) {
                    delete coord_err.email;
                    data.email = e.value;
                    e.style.border = '';
                    error_desc.remove();
                } else if (e.value.length == 0) {
                    coord_err.email = false;
                    e.style.border = '1px #FE3B1F solid';
                    error_desc.innerText = '* email is required';
                    insertAfter(e, error_desc);
                } else {
                    coord_err.email = false;
                    e.style.border = '1px #FE3B1F solid';
                    error_desc.innerText = '* email is incorrect';
                    insertAfter(e, error_desc);
                }
            }
            if(e.id == 'number') {
                let body = document.getElementById('number');
                if(e.value.length == 0) {
                    delete coord_err.number;
                    e.style.border = '';
                } else if (e.value.length > 1 && e.value.length != 11) {
                    coord_err.number = false;
                    e.style.border = '1px #FE3B1F solid';
                    error_desc.innerText = '* number is incorrect';
                    insertAfter(body, error_desc);
                } else if(e.value[0] != '5') {
                    coord_err.number = false;
                    e.style.border = '1px #FE3B1F solid';
                    error_desc.innerText = '* number is incorrect';
                    insertAfter(body, error_desc);
                } else if (parseInt(e.value.replace(/-/g, '')).toString().length < 9) {
                    e.style.border = '1px #FE3B1F solid';
                    error_desc.innerText = '* number is incorrect';
                    insertAfter(body, error_desc);
                } else {
                    delete coord_err.number;
                    e.style.border = '';
                    error_desc.remove();
                }
            }
            validator(coord_err, 0)
        }
    });
    skillsVal.forEach(e => {
        skills_err.exppoints = false;
        skills_err.values = {
            exp: false,
            selected: false
        };
        e.onchange = (c) => {
            if(e.id == 'skills') {
                delete skills_err.values.selected;
                Object.values(skill_data).find(key => {
                    if(key.title === c.target.value) {
                        skill_arr.splice(1, 1, c.target.value);
                        skillid = key.id;
                    }
                });
            }
            if(e.id == 'exp') {
                if(e.value.length == 0) {
                    skills_err.values.exp = false;
                    e.style.border = '1px #FE3B1F solid';
                } else {
                    skill_arr.splice(0, 1, e.value);
                    delete skills_err.values.exp;
                    e.style.border = '';
                }
            }
            if(document.querySelectorAll('.removeLang').length >= 1) {
                delete skills_err.exppoints;
                validator(skills_err, 1);
            } else {
                skills_err.exppoints = false;
            }
            const options = document.querySelectorAll('option');
            options.forEach(i => {
                if(typeof(skill_arr[1]) === 'string' && selectors[0].value == i.innerText) {
                    if(i.disabled != true && Object.values(skills_err.values).length == 0) {
                        languageAddBtn.style.pointerEvents = 'all';
                        languageAddBtn.style.cursor = 'pointer'; 
                    } else {
                        languageAddBtn.style.pointerEvents = 'none';
                        languageAddBtn.style.cursor = 'unset';
                    }
                }
            });
        }
    });
    radiobtns.forEach(e => {
        covid_err.location = false;
        covid_err.contacted = false;
        covid_err.vaccinated = false;
        if(e.type == 'radio') {
            e.onclick = () => {
                if(e.name == 'location') {
                    delete covid_err.location;
                    data.work_preference = e.value;
                }
                if(e.name == 'c19-status') {
                    if(e.value == 'yes') {
                        delete covid_err.contacted;
                        covid_err.coviddate = false;
                        data.had_covid = true;
                        dates[0].classList.remove('hidden');
                        dateInputs[0].onblur = (e) => {
                            if(`${Date.parse(e.target.value)}` !== `NaN`) {
                                delete covid_err.coviddate;
                                data.had_covid_at = `${e.target.value}`;
                                dateInputs[0].style.border = '';
                                error_desc.remove();
                            } else {
                                covid_err.coviddate = false;
                                delete data.had_covid_at;
                                // do your validation magic
                                dateInputs[0].style.border = '1px #FE3B1F solid';
                                error_desc.innerText = '* date is required';
                                insertAfter(dateInputs[0], error_desc);
                            }
                            validator(covid_err, 0)
                        }
                    } else {
                        delete covid_err.contacted;
                        delete covid_err.coviddate;
                        data.had_covid = false;
                        delete data.had_covid_at;
                        dates[0].classList.add('hidden');
                    }
                }
                if(e.name == 'vacc-status') {
                    if(e.value == 'yes') {
                        delete covid_err.vaccinated;
                        covid_err.vaccdate = false;
                        data.vaccinated = true;
                        dates[1].classList.remove('hidden');
                        dateInputs[1].onblur = (e) => {
                            if(`${Date.parse(e.target.value)}` != `NaN`) {
                                delete covid_err.vaccdate;
                                data.vaccinated_at = `${e.target.value}`;
                                dateInputs[1].style.border = '';
                                error_desc.remove();
                            } else {
                                covid_err.vaccdate = false;
                                delete data.vaccinated_at;
                                // do your validation magic
                                dateInputs[1].style.border = '1px #FE3B1F solid';
                                error_desc.innerText = '* date is required';
                                insertAfter(dateInputs[1], error_desc);
                            }
                            validator(covid_err, 0)
                        }
                    } else {
                        delete covid_err.vaccdate;
                        delete covid_err.vaccinated;
                        data.vaccinated = false;
                        delete data.vaccinated_at;
                        dates[1].classList.add('hidden');
                    }
                }
                validator(covid_err, 0)
            }
        }
    });
    devinputs.forEach(e => {
        devtalks_err.attend = false;
        devtalks_err.speaker = false;
        devtalks_err.special = false;

        if(e.type == 'radio') {
            e.onclick = () => {
                if(e.value == 'yes') {
                    delete devtalks_err.attend;
                    data.will_organize_devtalk = true;
                    document.querySelectorAll('.radio-box')[6].classList.remove('hidden');
                } else {
                    delete devtalks_err.attend;
                    data.will_organize_devtalk = false;
                    document.querySelectorAll('.radio-box')[6].classList.add('hidden');
                }
                validator(devtalks_err, 0);
            }
        } else {
            e.onchange = () => {
                if(e.name == 'devtalk') {
                    if(e.value.length > 0) {
                        delete devtalks_err.speaker;
                        data.devtalk_topic = `${e.value}`;
                        e.style.border = '';
                        error_desc.remove();
                    } else {
                        devtalks_err.speaker = false;
                        data.devtalk_topic = 'I would ...';
                        e.style.border = '1px #FE3B1F solid';
                        error_desc.innerText = '* this field is required';
                        insertAfter(e, error_desc);
                    }
                } else {
                    if(e.value.length > 0) {
                        delete devtalks_err.special;
                        data.something_special = `${e.value}`;
                        e.style.border = '';
                        error_desc.remove();
                    } else {
                        devtalks_err.special = false;
                        data.devtalk_topic = 'I am special!';
                        e.style.border = '1px #FE3B1F solid';
                        error_desc.innerText = '* this field is required';
                        insertAfter(e, error_desc);
                    }
                }
                validator(devtalks_err, 0);
            }
        }
    });
    dotbox.forEach((e, i) => {
        e.addEventListener('click', () => {
            if(e.classList.contains('available')) {
                if(i < 4) {
                        count = i;
                        err = {};
                        e.classList.add('active');
                        for(let i = 0; i < formbox.length; i++) {
                            formbox[i].classList.add('hidden');
                            displaybox[i].classList.add('hidden');
                        }
                        formbox[i].classList.remove('hidden');
                        displaybox[i].classList.remove('hidden');
                } else {
                    document.querySelector('.form-section').classList.add('hidden');
                    document.querySelector('.submit-section').classList.remove('hidden');
                    document.body.style.background = '$primary-bg';
                }
            }
        });
    });
    document.getElementById('prev').addEventListener('click', function(){
        if(count > 0) {
            count--;
            if(dotbox[count].classList.contains('available')) {
                dotbox[count].classList.add('active');
                for(let i = 0; i < formbox.length; i++) {
                    formbox[i].classList.add('hidden');
                    displaybox[i].classList.add('hidden');
                }
                formbox[count].classList.remove('hidden');
                displaybox[count].classList.remove('hidden');
            } else {
                count++;
            }
        }
    });
    document.getElementById('next').addEventListener('click', function(){
        if(count < 4) {
            count++;
            if(dotbox[count].classList.contains('available')) {
                dotbox[count].classList.add('active');
                for(let i = 0; i < formbox.length; i++) {
                    formbox[i].classList.add('hidden');
                    displaybox[i].classList.add('hidden');
                }
                formbox[count].classList.remove('hidden');
                displaybox[count].classList.remove('hidden');
            } else {
                count--;
            }
        }
    });
    submit.addEventListener('click', () => {
        let names = document.querySelectorAll('.langName');
        let exp = document.querySelectorAll('.experience');
        // pushing skill data into main object
        let skills = [];
        for(let i = 0; i < names.length; i++) {
            Object.values(skill_data).find(key => {
                if(key.title === names[i].innerText) {
                    skills.push({id: key.id, experience: parseInt(exp[i].innerText.charAt(exp[i].innerText.length - 1))});
                }
            });
        }
        data.skills = [skills];
        console.log(data);
    });
    back.addEventListener('click', () => {
        document.querySelector('.submit-section').classList.add('hidden');
        document.querySelector('.form-section').classList.remove('hidden');
    });
});

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const getSkills = async (node) => {
    let res = await fetch('https://bootcamp-2022.devtest.ge/api/skills', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let data = await res.json();
    skill_data = Object.assign({}, data)
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