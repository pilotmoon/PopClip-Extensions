function personName(string) {
    // regex to match something like a name - First [middle] [middle] [middle] Last
    const regex=/^\s*([^\s]+(?:\s[^\s]+){0,3})(?:\s([^\s]+))\s*$/u;
    const result = regex.exec(string);
    if (result) {
        return [result[1], result[2]];
    }
}

if (typeof(define) !== 'undefined') { // when running in jsc, perform tests
    define(() => {
        return personName;
    });
}
else {
    function test() {
        const data = [
            ["John Smith", ["John","Smith"]],
            ["John J Smith", ["John J","Smith"]],
            ["a b c d", ["a b c","d"]],
        ];
        data.forEach((pair) => {
            const [input, output]=pair;
            const result=personName(input);
            print(`${output.join()==result.join()?'pass  ':'fail *'} ${input} => ${result} (expected: ${output})`);
        });
    }
    test();
}
