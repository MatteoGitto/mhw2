/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function display_Personality(){
    if(final_Answers.one === final_Answers.two || final_Answers.one === final_Answers.three)
        return final_Answers.one;
    else if(final_Answers.two === final_Answers.one || final_Answers.two === final_Answers.three)
        return final_Answers.two;
    else if(final_Answers.three === final_Answers.one || final_Answers.three === final_Answers.two)
        return final_Answers.three;
    else
        return final_Answers.one;
}


function show_Answer(Image_Selected){
    final_Answers[Image_Selected.dataset.questionId] = Image_Selected.dataset.choiceId;
    let j = 0;

    for(let i in final_Answers){
        j++;

        if(j == 3){
            for(const div_Img of All_div_img){
                div_Img.removeEventListener('click', select);
            }
            
            let personality = display_Personality();

            result.querySelector('h1').textContent = RESULTS_MAP[personality].title;
            result.querySelector('p').textContent = RESULTS_MAP[personality].contents;
            result.classList.remove('hidden');

            let button = result.querySelector('#button');
            button.addEventListener('click', reset);
            
        }
    }
}


function Style_Opacity(selectedImg){
    let Answer_Select = selectedImg.dataset.choiceId; 
    let All_Answers = selectedImg.parentNode.querySelectorAll('div'); 

    for (let Answer_Unselected of All_Answers){
        if(Answer_Unselected.dataset.choiceId !== Answer_Select){ 
            const NO_check = Answer_Unselected.querySelector('.checkbox')
            NO_check.src = IMAGE_UNCHECKED; //metti l'uncheck
            Answer_Unselected.classList.add('Style_Opacity'); 
        }
    }
}


function reset() {
    console.log(final_Answers);

    for (let i = 0; i < All_div_img.length; i++) {
      All_div_img[i].addEventListener('click', select);
      All_div_img[i].classList.remove('Style_Opacity');
      let checkbox = All_div_img[i].querySelector('.checkbox');
      checkbox.src = IMAGE_UNCHECKED;
    }

    result.classList.add('hidden');

    for (let key in final_Answers) {
        delete final_Answers[key];
    }

    window.scrollTo(0, 0);
}

function select(event){
    const Image_Selected = event.currentTarget; 
    Image_Selected.classList.remove('Style_Opacity');

    const check_True = Image_Selected.querySelector('.checkbox');
    check_True.src = IMAGE_CHECK;

    show_Answer(Image_Selected);
    Style_Opacity(Image_Selected);
}


const All_div_img = document.querySelectorAll('.choice-grid div');

for (const box of All_div_img)
{
    box.addEventListener('click', select);
}

const final_Answers = [];

const result = document.querySelector("#result");

const IMAGE_CHECK = "./images/checked.png"
const IMAGE_UNCHECKED = "./images/unchecked.png"


