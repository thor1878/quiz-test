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

async function createQuiz() {
    console.clear();
    let quiz = new Quiz();
    const quizName = await prompt('Enter name of the quiz: ');
    quiz.name = quizName;

    let finished = false;

    while (!finished) {
        printQuiz(quiz);
        const input = await prompt('a: add question     b: back to menu:     ');
        if (input === 'a') {
            let question = await createQuestion();
            quiz.questions.push(question);
        } else if (input === 'b') {
            finished = true;
        }
    }
}

async function createQuestion() {
    console.clear();
    let answers = [];

    const question = await prompt('Enter question: ');

    while (answers.length < MAX_ANSWERS) {

        const answer = await prompt(`\nEnter answer ${answers.length + 1}: `);
        answers.push(answer);
    }

    const correctAnswer = await prompt(`\nEnter number of correct answer (1 - ${MAX_ANSWERS}): `);

    return new Question(question, answers, correctAnswer);
}

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

function printQuizList() {

}














module.exports = { Quiz, Question, createQuiz, printQuiz }