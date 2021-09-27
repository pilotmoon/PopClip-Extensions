function preserveEndSpace(text, f) {        
    // preserve spaces at start and end of each line
    return text.replace(/^(\s*)(.*?)(\s*)$/gm, (match, before, middle, after) => {        
        return before + f(middle) + (after?after:'');  
    });
}

function replaceSpaces(text, character) {        
    if (/[^\S\r\n]/.test(text)) {
        // replace each run of spaces with the replacement character
        return text.replace(/([^\S\r\n]+)/g, character);  
    }
    else {
        // replace each run of hyphens with the replacement character
        let regex = new RegExp(`[${character}]+`, 'g');
        return text.replace(regex, ' ');  
    }
}

if (typeof(define) !== 'undefined') { 
    define({
        preserveEndSpace: preserveEndSpace,
        replaceSpaces: replaceSpaces,
    });
}
else { // when running in jsc, perform tests
    function test_replaceSpaces() {
        const data = [
            ["John Smith", "John_Smith"],
            ["John J Smith   \n  Next line", "John_J_Smith_\n_Next_line"],
            ["a b c d", ["a_b_c_d"]],
            ["a_b c d", ["a_b_c_d"]],
            ["a_b_c__d", ["a b c d"]],
            ["", ""],
        ];
        data.forEach((pair) => {
            const [input, output]=pair;
            const result=replaceSpaces(input, "_");
            print(`${output==result?'pass  ':'fail *'} ${input} => ${result} (expected: ${output})`);
        });
    }

    function test_preserveEndSpace() {
        const data = [
            ["foo", "bar"], 
            ["  foo", "  bar"], 
            ["  foo    ", "  bar    "], 
        ];
        data.forEach((pair) => {
            const [input, output]=pair;
            const result=preserveEndSpace(input, () => 'bar');
            print(`${output==result?'pass  ':'fail *'} ${input} => ${result} (expected: ${output})`);
        });
    }

    test_preserveEndSpace();
    test_replaceSpaces();
}