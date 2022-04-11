const { main } = require('../index.js');

test('wadwad <main>', async () => {
    const result = await main();
    expect(result).toEqual(segge);
})
