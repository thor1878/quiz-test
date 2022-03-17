const { Quiz, QA, createQuiz, printQuiz } = require('./lib/Quiz.js');
const { prompt } = require('./lib/heplers');


let quizzes = [];

main();

async function main() {
    let quit = false;
    
    while (!quit) {
        console.clear();
        const input = await prompt('c: Create quiz     p: Play quiz     q: quit:     ');

        switch (input) {
            case 'c':
                let quiz = await createQuiz();
                quizzes.push(quiz);
                break;

            case 'q':
                quit = true;
                break;

            default:
                break
        }
    }
}




