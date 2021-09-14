// first letter uppercase, other lowercase
function capitalizeWord(text) {    
    text = text.toLowerCase();
    return text.substr(0, 1).toUpperCase() + text.substr(1);
}

// captilize each word of input
function capitalizeAll(text) {    
    // regex to split into works. this is the same regex as the old Capitalize extension .... 
    // I'm not sure exactly why this regex...
    const regex=/[^\s,.;:!\-–—\(\)\[\]\{\}"]+/ug; 
    return text.replaceAll(regex, (match) => capitalizeWord(match));
}

if (typeof(define)!=='undefined') { // when running in popclip, export the function
    define(() => {
        return (selection) => {
            print('one', 'two', 'three');
            popclip.pasteText(capitalizeAll(selection.text));
        }
    })
}
else { // when running in jsc, perform tests
    function test() {
        const data=[
            ["blah", "Blah"],
            ["BLAH", "Blah"],
            ["BLAH blah", "Blah Blah"],
            ["BLAH (blah-more", "Blah (Blah-More"],
            ["élan написанная!", "Élan Написанная!"],
            ["Nick's best dog's fur", "Nick's Best Dog's Fur"],
            ["Nick's   best dog's fur", "Nick's   Best Dog's Fur"],
        ];
        data.forEach((pair)=>{
            const [input, output]=pair;
            const result=capitalizeAll(input);
            print(`${output===result?'pass  ':'fail *'} ${input} => ${result} (expected: ${output})`);
        });
    }
    test();
}
