const { prompt } = require('./heplers')

const MAX_ANSWERS = 4;

class Quiz {
    constructor() {
        this.name;
        this.questions = [];
    }
}

class Question {
    constructor(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
}

// Create a new quiz object
async function createQuiz() {
    console.clear();
    let quiz = new Quiz();
    const quizName = await prompt('Enter name of the quiz: ');
    quiz.name = quizName;

    return quiz;
}

// Allow the user to manage a quiz (add questions, play the quiz, etc.)
async function manageQuiz(quiz) {
    let finished = false;

    while (!finished) {
        printQuiz(quiz);
        const input = await prompt('a: add question     p: play quiz     b: back:     ');

        switch (input) {
            case 'a': {
                const question = await createQuestion();
                quiz.questions.push(question);
                break;
            }
            case 'p': {
                await playQuiz(quiz);
                break;
            }
            case 'b': {
                finished = true;
                break;
            }
        }
    }
}

// Allow user to select a quiz from the list
async function selectQuiz(quizzes) {
    printQuizList(quizzes);
    let input = await prompt('Select quiz by number: ');

    return quizzes[parseInt(input) - 1];
}

// Create a question object from user input
async function createQuestion() {
    console.clear();
    let answers = [];

    const question = await prompt('Enter question: ');

    while (answers.length < MAX_ANSWERS) {

        const answer = await prompt(`\nEnter answer ${answers.length + 1}: `);
        answers.push(answer);
    }

    const correctAnswer = await prompt(`\nEnter id of correct answer (1 - ${MAX_ANSWERS}): `);

    return new Question(question, answers, correctAnswer);
}

// Allow a user to play a quiz
async function playQuiz(quiz) {
    let numCorrectAnswers = 0;

    for (let [i, question] of quiz.questions.entries()) {
        console.clear();
        console.log(`Question ${i + 1}:   ` + question.question + '\n');

        for (let [i, answer] of question.answers.entries()) {
            console.log(`[${i + 1}]     ${answer}`);
        }

        const userAnswer = await prompt('\nEnter id of answer: ');

        if (userAnswer == question.correctAnswer) {
            numCorrectAnswers++;
        }
    }

    console.clear()
    console.log(`Score: (${numCorrectAnswers} / ${quiz.questions.length})`);

    await prompt('\nPress Enter to go back...     '); // Another prompt here
}

// Print out a quiz including [name, all questions, correct answers]
function printQuiz(quiz) {
    console.clear()
    console.log(`[ QUIZ: ${quiz.name} ]\n`)

    for (let question of quiz.questions) {
        console.log(question.question);

        for (let [i, answer] of question.answers.entries()) {
            if (i + 1 == question.correctAnswer) {
                console.log('x   ' + answer);
            } else {
                console.log('    ' + answer);
            }
        }
        console.log('');
    }
}

// Print out all quizzes
function printQuizList(quizzes) {
    console.clear();
    for (let [i, quiz] of quizzes.entries()) {
        console.log(`[${i + 1}]   ${quiz.name}`);
    }
}






module.exports = {createQuiz, selectQuiz, manageQuiz }