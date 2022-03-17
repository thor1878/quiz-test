const {createQuiz, selectQuiz, manageQuiz } = require('./lib/Quiz.js');
const { prompt } = require('./lib/heplers');


let quizzes = [];

main();

async function main() {
    let quit = false;
    
    while (!quit) {
        console.clear();
        const input = await prompt('c: Create quiz     s: Select quiz     q: quit:     ');

        switch (input) {
            case 'c': {
                const quiz = await createQuiz();
                await manageQuiz(quiz);
                quizzes.push(quiz);
                break;
            }

            case 's': {
                const quiz = await selectQuiz(quizzes);
                await manageQuiz(quiz);
                break;
            }

            case 'q':
                quit = true;
                break;

            default:
                break
        }
    }
}



