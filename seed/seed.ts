const data = require('/Users/matthewdavis/workspace/convictions.ai/data/bible/json/en_kjv.json');

for (let i = 0; i < data.length; i++) {
    console.log(`${data[i].name} (${data[i].abbrev}) = ${data[i].chapters.length} chapters`);
    for (let c = 0; c < data[i].chapters.length; c++) {
        console.log(`    ${c} = ${data[i].chapters[c].length} verses`);
        for (let v = 0; v < data[i].chapters[c].length; v++) {
            console.log(`        ${i}:${c}:${v}: ${data[i].chapters[c][v]}`);
        }
        // console.log(`    ${data[i].chapters[c]}\n`);
    }
}
