const natoAlphabet = {
    A: 'Alpha',
    B: 'Bravo',
    C: 'Charlie',
    D: 'Delta',
    E: 'Echo',
    F: 'Foxtrot',
    G: 'Golf',
    H: 'Hotel',
    I: 'India',
    J: 'Juliett',
    K: 'Kilo',
    L: 'Lima',
    M: 'Mike',
    N: 'November',
    O: 'Oscar',
    P: 'Papa',
    Q: 'Quebec',
    R: 'Romeo',
    S: 'Sierra',
    T: 'Tango',
    U: 'Uniform',
    V: 'Victor',
    W: 'Whiskey',
    X: 'X-ray',
    Y: 'Yankee',
    Z: 'Zulu',
  };

  let natoText = '';
  let text = popclip.input.text

  for (let i = 0; i < text.length; i++) {
    const letter = text[i].toUpperCase();
    if (natoAlphabet.hasOwnProperty(letter)) {
      natoText += natoAlphabet[letter] + ' ';
    } else if (letter === ' ') {
      natoText += '/';
    } else {
      natoText += letter;
    }
  }

  popclip.pasteText(natoText.trim());