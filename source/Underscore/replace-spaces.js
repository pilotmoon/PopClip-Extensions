function replaceSpaces(text, character) {        
    // preserve spaces at start and end of each line
    return text.replace(/^(\s*)(.*?)(\s*)$/gm, (match, before, middle, after) => {        
        if (/[^\S\r\n]/.test(middle)) {
            // replace each run of spaces with the replacement character
            return before + middle.replace(/([^\S\r\n]+)/g, character) + (after?after:'');  
        }
        else {
            // replace each run of hyphens with the replacement character
            let regex = new RegExp(`[${character}]+`, 'g');
            return before + middle.replace(regex, ' ') + (after?after:'');  
        }
    });
}

if (typeof(define) !== 'undefined') { 
    define(() => replaceSpaces);
}
else { // when running in jsc, perform tests
    function test() {
        const data = [
            ["John Smith", "John_Smith"],
            ["   ", "   "],
            [" John J Smith   \n  Next line", " John_J_Smith   \n  Next_line"],
            ["a b c d", ["a_b_c_d"]],
            ["a_b c d", ["a_b_c_d"]],
            ["  a_b_c__d", ["  a b c d"]],
            ["", ""],
        ];
        data.forEach((pair) => {
            const [input, output]=pair;
            const result=replaceSpaces(input, "_");
            print(`${output==result?'pass  ':'fail *'} ${input} => ${result} (expected: ${output})`);
        });
    }
    test();
}