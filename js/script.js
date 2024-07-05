// Quiz Main Section
const quizMainButton = document.querySelector('.quiz__main__button')
const quizMain = document.querySelector('.quiz_main')

// Quiz Quiestions
const quizQuestionsWrapper = document.querySelector('.quiz_wrapper')
const quizQuestions = document.querySelector('.quiz_questions')
const quizQuestion = Array.from(document.querySelectorAll('.quiz_question'))

// Quiz Progressbar
const quizProgressbarFinished = document.querySelector('.progressbar_finished')
const waterDrop = document.querySelector('.progressbar__drop')
const progressbarGlass = document.querySelector('.progressbar__glass')
const quizMarkers = Array.from(document.querySelectorAll('.progressbar__mark'))

// Change progressbar gradient
const progressbarGradientChange = () => {
    if(quizProgressbarFinished.style.width === '8.5%') {
        quizProgressbarFinished.style.background = 'linear-gradient(90deg, #A504BF 0%, #6D04BF 100%)'
    }else if(quizProgressbarFinished.style.width === '25.2%'){
        quizProgressbarFinished.style.background = 'linear-gradient(90deg, #A504BF 0%, #6D04BF 50%, #6325E7 100%)'
    }else if(quizProgressbarFinished.style.width === '41.9%') {
        quizProgressbarFinished.style.background = 'linear-gradient(90deg, #A504BF 0%, #6D04BF 30%, #6325E7 60%, #484FFD 100%)'
    }else if(quizProgressbarFinished.style.width === '58.6%') {
        quizProgressbarFinished.style.background = 'linear-gradient(90deg, #A504BF 0%, #6D04BF 25%, #6325E7 50%, #484FFD 75%, #2498D9 100%)'
    }else if(quizProgressbarFinished.style.width === '75.3%') {
        quizProgressbarFinished.style.background = 'linear-gradient(90deg, #A504BF 0%, #6D04BF 20%, #6325E7 40%, #484FFD 60%, #2498D9 80%, #28D7EF 100%)'
    }
}

// Quiz Buttons
const quizButtons = document.querySelector('.quiz_buttons')
const quizHomeBtn = document.querySelector('.quiz_home')
const quizPreviousButton = document.querySelector('.quiz_previous')

// Quiz Answers
const quizAnswers = Array.from(document.querySelectorAll('.quiz_answers__item'))

// Quiz Form
const quizForm = document.querySelector('.quiz_question__end')

// Hidden inputs
const quizInputs = Array.from(document.querySelectorAll('.quiz_input'))

// Quiz Context to save previous value
let quizContext = []
let quizSelectedContext = []


// Move to first question
quizMainButton.addEventListener('click', ()=>{
    quizMain.classList.toggle('quiz_active__main')
    quizQuestionsWrapper.classList.toggle('quiz_active')
    quizQuestions.classList.toggle('quiz_wrapper_active')
    quizQuestion[0].classList.toggle('quiz_active')
    progressbarGradientChange()
})

// Move to previous question
quizPreviousButton.addEventListener('click', ()=> {
    progressbarGradientChange()
    const currentProgressbarWidth = quizProgressbarFinished.style.width

    if(quizContext.length > 0 && quizContext.length < 6) {

        // Hide all questions
        quizQuestion.forEach(item => {
            item.classList.remove('quiz_active')
        })

        // Change width of progressbar`s gradient
        quizProgressbarFinished.style.width = `${currentProgressbarWidth.slice(0, -1) - 16.7}%`

        const previousQuestionNumber = quizContext[quizContext.length - 1].dataset.question

        // Change markers
        quizMarkers[previousQuestionNumber - 1].src = 'images/mark-current.svg'
        quizMarkers[previousQuestionNumber].src = 'images/mark-next.svg'

        // Showe previous question
        quizContext[quizContext.length - 1].classList.toggle('quiz_active')
        quizContext.pop()

        // Select previous answer
        quizSelectedContext[quizSelectedContext.length - 1].classList.add('quiz_answer__selected')
        quizSelectedContext.pop()

    }else if(quizContext.length === 6){
        // Change progressbar
        quizProgressbarFinished.style.width = '92%'
        quizMarkers[quizMarkers.length - 1].src = 'images/mark-current.svg'

        // Change glass and hide waterdrop when move to previous question
        progressbarGlass.src = 'images/empty-glass.svg'
        waterDrop.style.display = 'none'
        
        // Select previous answer
        quizSelectedContext[quizSelectedContext.length - 1].classList.add('quiz_answer__selected')
        quizSelectedContext.pop()

        // Showe previous question
        quizContext[quizContext.length - 1].classList.toggle('quiz_active')
        quizContext.pop()

        // Hide Quiz Form Section
        quizForm.classList.toggle('quiz_active__main')

        // Change buttons parameters when moving back to previos question
        quizQuestions.style.maxWidth = '1400px'
        quizHomeBtn.style.display = 'none'
        quizButtons.style.padding = '0 30px'
        previousButtonPadding()
    }else {
        // Change markers
        quizMarkers[0].src = 'images/mark-current.svg'
        quizMarkers[1].src = 'images/mark-next.svg'

        // Hide question and showe quiz main section
        quizQuestionsWrapper.classList.toggle('quiz_active')
        quizQuestions.classList.toggle('quiz_wrapper_active')
        quizQuestion[0].classList.toggle('quiz_active')
        quizMain.classList.toggle('quiz_active__main')
    }
})

// Move to next question
quizAnswers.forEach(i => {
    i.addEventListener('click', ()=>{
        progressbarGradientChange()

        // Remowe selection properties for all question
        quizAnswers.forEach(item => item.classList.remove('quiz_answer__selected'))

        // Add selection properties for selected answer
        i.classList.toggle('quiz_answer__selected')
        quizSelectedContext.push(i)
        
        // Find parent question using the answer
        const question = i.parentNode.parentNode
        const questionNumber = question.dataset.question

        // Add question to context
        quizContext.push(question) 

        // Add answer`s value to input
        quizInputs[questionNumber - 1].value = i.dataset.answer

        if(questionNumber < 6) {

            //Change markers 
            quizMarkers[questionNumber - 1].src = 'images/mark-done.svg'
            quizMarkers[questionNumber].src = 'images/mark-current.svg'
    
            // Change progressbar`s gradient width
            quizProgressbarFinished.style.width = `${8.5 + (16.7 * +questionNumber)}%`

            // Hide current question
            question.classList.toggle('quiz_active')
    
            // Move to fork
            if(i.dataset.select) {
                quizQuestion.forEach(item => {
                    if(item.dataset.select === i.dataset.select) {
                        item.classList.toggle('quiz_active')
                    }
                })
            }else {
                quizQuestion[i.dataset.question].classList.toggle('quiz_active')
            }

        }else {
            // Change marker and progressbar
            quizMarkers[5].src = 'images/mark-done.svg'
            quizProgressbarFinished.style.width = '100%'
            waterDrop.style.display = 'block'
            progressbarGlass.src = 'images/full-glass.svg'

            // Hide the last question
            i.parentNode.parentNode.classList.toggle('quiz_active')

            // Change properties to display properly form section and buttons
            quizQuestions.style.maxWidth = '950px'
            quizButtons.style.padding = '0 10px'
            quizButtons.style.position = 'unset'

            // Show home button
            quizHomeBtn.style.display = 'block'

            // Show quiz form section
            quizForm.classList.toggle('quiz_active__main')
        }
    })
})

// Move to main section
quizHomeBtn.addEventListener('click', () => {

    // Show main section
    quizMain.classList.toggle('quiz_active__main')

    // Hide form section
    quizQuestionsWrapper.classList.toggle('quiz_active')
    quizQuestions.classList.toggle('quiz_wrapper_active')
    quizForm.classList.toggle('quiz_active__main')
    quizHomeBtn.style.display = 'none'

    // Change progressbar and markers
    quizProgressbarFinished.style.width = '8.5%'
    quizMarkers.forEach(i => {
        i.src = 'images/mark-next.svg'
    })
    quizMarkers[0].src = 'images/mark-current.svg'

    // Clear contexts
    quizContext = []
    quizSelectedContext = []

    // Change progressbar icons
    waterDrop.style.display = 'none'
    progressbarGlass.src = 'images/empty-glass.svg'

    quizQuestions.style.maxWidth = '1400px'
    previousButtonPadding()
})

// Mask for form input
const quizInput = document.querySelector('.quiz_form__input')
var maskOptions = {
    mask: '+38 (000) 000 0000 ',
    lazy: false
} 
var mask = new IMask(quizInput, maskOptions);


// Change previous button`s arrow
const quizArrowChanger = () => {
    const quizArrowPrevious = document.querySelector('.quiz_previous__arrow')
    if(window.innerWidth < 992) {
        quizArrowPrevious.src = 'images/arrow-mobile.svg'
    }else {
        quizArrowPrevious.src = 'images/arrow.svg'
    }
}
quizArrowChanger()

// Change padding for previous button
const previousButtonPadding = () => {
    const answerWidth = window.getComputedStyle(quizAnswers[0]).getPropertyValue("width").slice(0,-2)
    if(quizContext.length < 6) {
        if(window.innerWidth < 425) {
            quizButtons.style.padding = `0 ${(window.innerWidth - answerWidth*2)/2}px`
        }
    }else {
        quizButtons.style.padding = `0 10px`
    }
}
previousButtonPadding()

window.addEventListener('resize', ()=>{
    quizArrowChanger()
    previousButtonPadding()
})
