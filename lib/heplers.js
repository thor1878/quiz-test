const readline = require('readline');

async function prompt(msg) {

    return new Promise((resolve, reject) => {
        const rl = readline.createInterface( process.stdin, process.stdout );
        rl.question(msg, input => {
            resolve(input)
            rl.close();
        })
    })
}


module.exports = { prompt };