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

    // get first and second form inputs for validation
    const allinputs = document.querySelectorAll('select, .coordination-input, textarea, #toLangList, #exp');
    //covid page validation 
    const radiobtns = document.querySelectorAll('.radiobtn');
    const dates = document.querySelectorAll('.date');
    const dateInputs = document.querySelectorAll('.date-input');
    // devtalks validation
    const devinputs = document.querySelectorAll('.devtalks');

    // error objects for validation
    let err = {};
    let covid_err = {};
    let devtalks_err = {};

    let count = 0;
    let skill_arr = [0, 1];
    let skills = [];
    let skill = {};

    // let bools
    let selected = false;
    let iterated = false;

    document.getElementById('start').onclick = () => {
        document.body.style.background = 'unset';
        document.querySelector('.home-view').classList.add('hidden');
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

    const validator = (errobj) => {
        if(Object.keys(errobj).length == 0) {
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
            <span id="expYears">years of experience: ${skill_arr[0]}</span>
            <div class="removeLang">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C19.9939 15.5203 15.5203 19.9939 10 20ZM2 10.172C2.04732 14.5732 5.64111 18.1095 10.0425 18.086C14.444 18.0622 17.9995 14.4875 17.9995 10.086C17.9995 5.68451 14.444 2.10977 10.0425 2.086C5.64111 2.06246 2.04732 5.59876 2 10V10.172ZM15 11H5V9H15V11Z" fill="#EB3535"/>
                </svg>                                
            </div>
        </div>
        `
        delete err.exppoints;

        // pushing skill data into main object
        skills.push(skill);
        data.skills = [skills];

        // inner declarations for added skills
        const removers = document.querySelectorAll('.removeLang');
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
            e.addEventListener('click', function(){
                for(let i = 0; i < options.length; i++) {
                    if(e.parentNode.childNodes[1].innerText == options[i].innerText) {
                        options[i].removeAttribute('disabled');
                        languageAddBtn.style.pointerEvents = 'all';
                    }
                }
                e.parentNode.remove();
                if(document.querySelectorAll('.removeLang').length < 1) {
                    err.exppoints = false;
                    validator(err);
                }
            });
        });
        validator(err);
    });

    
    // validation
    allinputs.forEach(e => {
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

            if(e.id == 'exp') {
                if(e.value.length == 0) {
                    err.exp = false;
                } else {
                    console.log(e.value);
                    skill_arr.splice(0, 1, e.value);
                    skill.experience = parseInt(e.value);
                    delete err.exp;
                }
            }

            selectors.forEach(e => {
                if(e.offsetParent !== null && selected == false) {
                    err.exppoints = false;
                }
                e.onchange = (c) => {
                    languageAddBtn.style.pointerEvents = 'all';
                    selected = true;
                    Object.values(skill_data).find(key => {
                        if(key.title === c.target.value) {
                            skill_arr.splice(1, 1, c.target.value);
                            skill.id = key.id;
                        }
                    });
                    if(document.querySelectorAll('.removeLang').length < 1) {
                        err.exppoints = false;
                        validator(err);
                    }
                }
            });

            const options = document.querySelectorAll('option');
            options.forEach(i => {
                if(typeof(skill_arr[1]) === 'string' && selectors[0].value == i.innerText) {
                    if(i.disabled != true) {
                        languageAddBtn.style.pointerEvents = 'all';
                        languageAddBtn.style.cursor = 'pointer'; 
                    } else {
                        languageAddBtn.style.pointerEvents = 'none';
                        languageAddBtn.style.cursor = 'pointer';
                    }
                }
            });
            validator(err)
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
                            } else {
                                covid_err.coviddate = false;
                                delete data.had_covid_at;
                                // do your validation magic
                            }
                            validator(covid_err)
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
                            } else {
                                covid_err.vaccdate = false;
                                delete data.vaccinated_at;
                                // do your validation magic
                            }
                            validator(covid_err)
                        }
                    } else {
                        delete covid_err.vaccdate;
                        delete covid_err.vaccinated;
                        data.vaccinated = false;
                        delete data.vaccinated_at;
                        dates[1].classList.add('hidden');
                    }
                }
                validator(covid_err)
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
                } else if(e.value == 'no') {
                    delete devtalks_err.attend;
                    data.will_organize_devtalk = false;
                } else {
                    devtalks_err.attend = false;
                }
                console.log(devtalks_err);
                validator(devtalks_err);
            }
        } else {
            e.onchange = () => {
                if(e.name == 'devtalk') {
                    if(e.value.length > 0) {
                        delete devtalks_err.speaker;
                        data.devtalk_topic = `${e.value}`;
                    } else {
                        devtalks_err.speaker = false;
                        delete data.devtalk_topic;
                    }
                } else {
                    if(e.value.length > 0) {
                        delete devtalks_err.special;
                        data.something_special = `${e.value}`;
                    } else {
                        devtalks_err.special = false;
                        delete data.devtalk_topic;
                    }
                }
                console.log(devtalks_err);
                validator(devtalks_err);
            }
        }
    });
    dotbox.forEach((e, i) => {
        e.addEventListener('click', () => {
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
                if(i == 4) {
                    document.querySelector('.form-section').classList.add('hidden');
                    document.querySelector('.submit-section').classList.remove('hidden');
                    document.body.style.background = '$primary-bg';
                }
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