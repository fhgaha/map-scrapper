(async function () {
    const data = await getData()
    var fs = require('fs').promises
    fs.writeFile("data.json", JSON.stringify(data), () => { });
})();

async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    return await data
}
