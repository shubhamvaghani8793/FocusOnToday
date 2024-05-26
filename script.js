const checkList = document.querySelectorAll('.custom-checkbox');
const inputfield = document.querySelectorAll('.type-goal');
const err = document.querySelector('.error-label'); 
const progressBar = document.querySelector('.outter-bar');
const barValue = document.querySelector('.progress-value');
const TaskTital = document.querySelector('.task-title');

const len = inputfield.length;
const allQuotes = [
    "Raise the bar by completing your goals! 🎯",
    "Well begun is half done! 👍",
    "Just a step away, Keep going 🚶",
    "Whoa! You just completed all the goals, time for chill 💯"
]

const GoalData = JSON.parse(localStorage.getItem('AllData')) || {};
let completedGoalCount = Object.values(GoalData).filter((val) => val.result).length;
barValue.style.width = `${completedGoalCount / len * 100}%`;
barValue.firstElementChild.innerText = `${completedGoalCount}/${len} Completed`;
TaskTital.innerText = allQuotes[completedGoalCount];

checkList.forEach((checkBox) => {
    checkBox.addEventListener('click', (e) => {
        const allFieldFull = [...inputfield].every((input) => {
            return input.value;
        })

        if(allFieldFull){
            checkBox.parentElement.classList.toggle('completed');
            const inputId = checkBox.nextElementSibling.id;
            GoalData[inputId].result = !GoalData[inputId].result;
            completedGoalCount = Object.values(GoalData).filter((val) => val.result).length;
            barValue.style.width = `${completedGoalCount / len * 100}%`;
            barValue.firstElementChild.innerText = `${completedGoalCount}/${len} Completed`;
            localStorage.setItem('AllData', JSON.stringify(GoalData));
            TaskTital.innerText = allQuotes[completedGoalCount];

        }else{
            progressBar.classList.add('showError');
        }
    })
})

inputfield.forEach((input) => {
    if(GoalData[input.id]){
        input.value = GoalData[input.id].name;

        if(GoalData[input.id].result){
            input.parentElement.classList.add('completed')
        }
    }

    input.addEventListener('focus',() => {
        progressBar.classList.remove('showError');
    })

    input.addEventListener('input', (e) => {

        if(GoalData[input.id] && GoalData[input.id].result){
            input.value = GoalData[input.id].name;
            return;
        }

        GoalData[input.id] = {
            name : input.value,
            result : false
        }
        localStorage.setItem('AllData', JSON.stringify(GoalData));
    })
})
