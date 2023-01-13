var fs = require('fs').promises;

const ouputPath = 'data.csv';

(async function () {
    const data = await getData()
    if (!data) return

    // fs.writeFile("data.csv", JSON.stringify(data));

    await addHeaders()
    data.forEach(async (e: Element) => {
        await addLine(e)
    });
})();

async function getData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        return await data
    } catch (error) {
        console.log(error);
    }
}

async function addHeaders() {
    try {
        const csvHeaders = 'street,number,altitiude,longitude,region,name'
        await fs.writeFile(ouputPath, csvHeaders);
    } catch (error) {
        console.error(error);
    }
}

async function addLine(e: Element) {
    e.userId = e.userId.toString().replace(/\r?\n|\r/g, " ")
    e.id = e.id.toString().replace(/\r?\n|\r/g, " ")
    e.title = e.title.toString().replace(/\r?\n|\r/g, " ")
    e.body = e.body.toString().replace(/\r?\n|\r/g, " ")

    try {
        const csvLine = `\n${e.userId},${e.id},${e.title},${e.body},${'regionFiller'},${'nameFiller'}`
        await fs.writeFile(ouputPath, csvLine, { flag: 'a' });
    } catch (error) {
        console.error(error);
    }
}

interface Element {
    userId: string,
    id: string,
    title: string,
    body: string
}
