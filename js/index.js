let content = [
    {
        header : 'Hey, Rocketeer, what are your coordinates?',
        form : {
                fname : 'First Name',
                lname : 'Last Name',
                email : 'E Mail',
                number: '+995 5__ __ __ __'
            }
        ,
        about : 'Redberry Origins',
        text : `You watch “What? Where? When?” Yeah. 
                Our founders used to play it. That’s where they got a question about a 
                famous American author and screenwriter Ray Bradbury. Albeit, our CEO Gaga Darsalia 
                forgot the exact name and he answered Ray Redberry. 
                And at that moment, a name for a yet to be born company was inspired - Redberry 😇`,
    },
    {
        header : 'Tell us about your skills',
        form : {

        },
        about : 'A bit about our battles',
        text : `As we said, Redberry has been on the field for quite some time now, 
        and we have touched and embraced a variety of programming languages, technologies, 
        philosophies, and frameworks. We are battle-tested in PHP Laravel Stack with Vue.js, 
        refined in React, and allies with Serverside technologies like Docker and Kubernetes, 
        and now we have set foot in the web3 industry.`
    },
    {
        header : 'Covid Stuff',
        form : {

        },
        about : 'Redberry Covid Policies',
        text : `As this infamous pandemic took over the world, 
        we adjusted our working practices so that our employees 
        can be as safe and comfortable as possible. We have a hybrid 
        work environment, so you can either work from home or visit our 
        lovely office on Sairme Street. If it was up to us, we would love 
        you to see us in the office because we think face-to-face communications 
        > Zoom meetings. Both on the fun and productivity scales. `
    },
    {
        header : 'What about you?',
        form : {

        },
        about : 'Redberrian Insights',
        text : `We were soo much fun before the pandemic started! 
        Parties almost every weekend and lavish employee birthday 
        celebrations! Unfortunately, covid ruined that fun like it 
        did almost everything else in the world. But we try our best 
        to zhuzh it up a bit. For example, we host biweekly Devtalks where 
        our senior and lead developers talk about topics they are passionate 
        about. Previous topics have included Web3, NFT, Laravel 9, Kubernetes, 
        etc. We hold these talks in the office but you can join our Zoom broadcast 
        as well. Feel free to join either as an attendee or a speaker!`
    },
    {
        option1 : 'Submit',
        option2 : 'go back'
    },
];
document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll('input');
    // validation
    const mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    document.getElementById('number').addEventListener('keyup', function(){
        this.childNodes[3].value = this.childNodes[3].value.replace(/-/g, "").match(/.{1,3}/g).join('-');
    });
    inputs.forEach(e => {
        e.onblur = () => {
            if(e.id == 'fname') {
                if(e.value.length == 0) {
                    console.log('0ze meti');
                } else if (e.value.length > 0 && e.value.length <= 2) {
                    console.log('2ze meti');
                }
            } else if (e.id == 'lname') {
                if(e.value.length == 0) {
                    console.log('0ze meti');
                } else if (e.value.length > 0 && e.value.length <= 2) {
                    console.log('2ze meti');
                }
            } else if (e.id == 'email') {
                if(e.value.length == 0) {
                    console.log('0ze meti');
                } else if (mail.test(e.value)) {
                    console.log(true);
                } else {
                    console.log(false);
                }
            } else if(e.id == 'number') {
                
            }
        }
    });
    const dotbox = document.querySelectorAll('.page-dot');
    let count = 0;
    dotbox.forEach((e, i) => {
        e.addEventListener('click', function(){
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

const createForm = (header, form, about, text) => {
    const mainSection = document.querySelector('.form-section');
    mainSection.innerHTML = 
    `
    <div class="form-display">
        <h1>${header}</h1>
        <form>
            ${Object.entries(form).map(([e,i]) => {
                if(e == 'email') {
                    return `<input type="email" id="${e}" placeholder="${i}">`
                }
                if(e == 'number') {
                    return `<input type="number" id="${e}" placeholder="${i}">`
                } else {
                    return `<input type="text" id="${e}" placeholder="${i}">`
                }
            }).join('')}
        </form>
        <div class="pagination-parent">
            <img id="prev" src="./media/svg/Previous.svg" alt="previous form">
            <img id="next" src="./media/svg/Previous.svg" alt="next form">
        </div>
    </div>
    <div class="about-display">
        <h1>${about}</h1>
        <p>${text}</p>
    </div>
    `
}