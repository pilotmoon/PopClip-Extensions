define(function () {
    const parser = require("parser.js");
    function findLinks(html) {
        var dom = parser.parse(html);
        var links = dom.getElementsByTagName('a').map(function (element) { return element.getAttribute('href'); });
        return links.filter(function (link) { return typeof (link) === 'string'; });
    }
    const extension = {
        action: function (selection) {
            const links = findLinks(selection.html);
            if (links.length > 0) {
                links.forEach(function (link) { return popclip.openUrl(link); });
            }
        },
        flags: {
            captureHtml: true
        }
    };
    return extension;
});
