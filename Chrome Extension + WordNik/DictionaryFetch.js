let apiKey = 'YOUR_API_KEY_HERE';
console.log(sentences)
let word = sentences;
let url = `https://api.wordnik.com/v4/word.json/${word}/relatedWords?useCanonical=true&limitPerRelationshipType=10&api_key=${apiKey}`


fetch(url).then(resp => resp.json()).then(relationTypes => {
    relationTypes = relationTypes.filter(relation => relation.relationshipType == "synonym")
    return relationTypes[0].words;
}).then(results => elt('p', results.join(', '))).then(dom => document.body.appendChild(dom))

function elt(type, ...children) {
    let dom = document.createElement(type)
    for(child of children){
        if (typeof child != "string") dom.appendChild(child)
        else dom.appendChild(document.createTextNode(child))
    }
    return dom;
}