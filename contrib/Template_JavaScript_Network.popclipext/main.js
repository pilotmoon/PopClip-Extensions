const axios = require("@popclip/axios");
const action = async (input) => {
    print('hello world!')  // Option(⌥)-click PopClip menu bar icon to see the print output
    const response = await axios.get('https://example.com');
    print(response.data);
};
exports.action = action;
