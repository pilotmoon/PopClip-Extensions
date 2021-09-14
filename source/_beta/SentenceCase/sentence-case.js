// first letter uppercase, other lowercase
function capitalizeFirst(text) {    
    print(text)
    text = text.toLowerCase();
    return text.substr(0, 1).toUpperCase() + text.substr(1);
}

function sentenceCase(text) {    
    const regex=/(^\s*\p{L}{1}|[.?!]\s+\p{L}{1})/gum; // split into something approximating sentences
    text = text.toLowerCase();
    return text.replaceAll(regex, (match) => match.toUpperCase());
}

if (typeof(define)!=='undefined') { // when running in popclip, export the function
    define(() => {
        return (selection) => {
            popclip.pasteText(sentenceCase(selection.text));
        }
    })
}
else { // when running in jsc, perform tests
    function test() {
        const data=[
            ["blah", "Blah"],
            ["BLAH. blah.", "Blah. Blah."],
            ["  BLAH blah? BHAL.\nff", "  Blah blah? Bhal.\nFf"],
            ["BLAH (blah-more", "Blah (blah-more"],
            ["élan fdf? написанная! OK", "Élan fdf? Написанная! Ok"],
        
            ["Nick's   best dog's fur", "Nick's   best dog's fur"],
        ];
        data.forEach((pair)=>{
            const [input, output]=pair;
            const result=sentenceCase(input);
            print(`${output===result?'pass  ':'fail *'} ${input} => ${result} (expected: ${output})`);
        });
    }
    test();
}
