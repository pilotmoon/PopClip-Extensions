function personName(string) {
    // regex to match something like a name - (First [middle] [middle] [middle]) (Last)
    const regex=/^\s*([^\s]+(?:\s[^\s]+){0,3})(?:\s([^\s]+))\s*$/u;
    const result = regex.exec(string);
    if (result) {
        return [result[1], result[2]];
    }
}

if (typeof(define) !== 'undefined') { 
    define(() => {
        return (selection) => {        
            const parts = personName(selection.text);
            if (parts) { // only return an action if the regex matches
                return () => {   
                    const [first, last] = parts.map(encodeURIComponent);
                    popclip.openUrl(`https://www.linkedin.com/pub/dir/?first=${first}+&last=${last}&search=Go`);
                };
            }
        }
    });
}
else { // when running in jsc, perform tests
    function test() {
        const data = [
            ["John Smith", ["John","Smith"]],
            ["John J Smith", ["John J","Smith"]],
            ["a b c d", ["a b c","d"]],
            ["a", undefined],
        ];
        data.forEach((pair) => {
            const [input, output]=pair;
            const result=personName(input);
            print(`${JSON.stringify(output)==JSON.stringify(result)?'pass  ':'fail *'} ${input} => ${result} (expected: ${output})`);
        });
    }
    test();
}
