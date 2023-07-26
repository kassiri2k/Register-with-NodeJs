const fs = require('fs');

function readF(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        return JSON.parse(data)
    });
}

function writeF(path, content) {
    fs.writeFile(path, content, err => {
        if (err) {
            console.error(err)
        }

    })
}

module.exports = {
    readF,
    writeF
}