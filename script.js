document.addEventListener('DOMContentLoaded',onDomLoad);
const xmlHttpRequestObject = new XMLHttpRequest();
let score = 0;
function onDomLoad(){
    xmlHttpRequestObject.open("GET", 'https://5d76bf96515d1a0014085cf9.mockapi.io/quiz')
    xmlHttpRequestObject.responseType = 'json';
    xmlHttpRequestObject.send();
    xmlHttpRequestObject.onload = ()=>{
        console.log(xmlHttpRequestObject.response);
        const data = xmlHttpRequestObject.response
        const body = document.querySelector('body');
        const mainBody = createMainBody(data);
        body.append(mainBody);
    }
}

function createMainBody(data){
    const data1 = data;
    const mainBody = document.createElement('div');
    mainBody.classList.add('main-body');
    mainBody.id = 'mainBody';
    console.log(data1.length);
    const heading = createQuizHeading();
    const body = createQuizBody(data1);
    const score = createQuizScore(data1);
    mainBody.append(heading, body, score);
    return mainBody;
}

function createQuizHeading(){
    const quizHeading = document.createElement('h1');
    quizHeading.classList.add('quiz-heading');
    quizHeading.id = 'quizHEading';
    quizHeading.innerText = 'The Quiz App';
    return quizHeading;
}

function createQuizBody(data1){
    const data2 = data1;
    const quizBody = document.createElement('div');
    quizBody.classList.add('quiz-body');
    quizBody.id = 'quizBody';
    for(let i=0; i<data2.length; i++){
        const quizQuestion = document.createElement('h3');
        quizQuestion.classList.add('quiz-question');
        quizQuestion.id = `question${i+1}`;
        quizQuestion.innerText = `Q${i+1}.${data2[i]['question']}`;
        const br = document.createElement('div');
        br.classList.add('line-break');
        for(let j=0; j<data2[i]['options'].length; j++){
            const label = document.createElement('label');
            label.classList.add('label');
            label.style.display = 'block';
            const option = document.createElement('input');
            option.classList.add('answer-options');
            option.type = 'radio';
            option.name = `question${i+1}`;
            option.value = data2[i]['options'][j];
            const span = document.createElement('span');
            span.classList.add('span-options')
            span.innerText = data2[i]['options'][j]
            label.append(option, span);
            quizQuestion.append(label)
        }
        quizQuestion.append(br)
        quizBody.append(quizQuestion);
    }
    const button = createSubmitButton(data2);
    quizBody.append(button);
    return quizBody;
}

function createSubmitButton(data2){
    const data3 = data2;
    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-button');
    submitButton.id = 'submitButton';
    submitButton.innerText = 'Submit';
    submitButton.addEventListener('click', ()=>{
        onButtonClick(data3);
    })
    return submitButton;
}

function createQuizScore(data1){
    const data5 = data1;
    const length = data5.length;
    const scoreWrapper = document.createElement('div');
    scoreWrapper.classList.add('score-wrapper');
    scoreWrapper.id = 'scoreWrapper';
    const scoreHeading = document.createElement('p');
    scoreHeading.classList.add('score-heading');
    scoreHeading.innerText = 'Score:';
    const totalScore = document.createElement('p');
    totalScore.classList.add('score');
    totalScore.innerText = `${score}/${length}`;
    scoreWrapper.append(scoreHeading, totalScore);
    return scoreWrapper;
}

function onButtonClick(data3){
    const data4 = data3;
    for(let i=0; i<data4.length; i++){
        const checkedResult = document.getElementsByName(`question${i+1}`);
        for(let j=0; j<checkedResult.length; j++){
            const ansNo = data4[i]['answer'];
            const answer = data4[i]['options'][ansNo-1];
            if(checkedResult[j].value === answer){
                const label = checkedResult[j].parentElement;
                const correct = document.createElement('span');
                correct.classList.add('correct');
                correct.innerText = 'correct';
                label.append(correct);
            }
            if(checkedResult[j].checked){
                const val = checkedResult[j].value;
                if(val === answer){
                    score+=1;
                    refreshScroe(data4);
                }
                else if(val != answer){
                    const label = checkedResult[j].parentElement;
                    const inCorrect = document.createElement('span');
                    inCorrect.classList.add('incorrect');
                    inCorrect.innerText = 'incorrect';
                    label.append(inCorrect);
                }
            }
        }
    }
    console.log(score);
    const button = document.getElementById('submitButton');
    button.disabled = 'true';
}

function refreshScroe(data4){
    const score = document.getElementById('scoreWrapper');
    const mBody = document.getElementById('mainBody');
    mBody.removeChild(score);
    const scoreData = createQuizScore(data4);
    mBody.append(scoreData);
}