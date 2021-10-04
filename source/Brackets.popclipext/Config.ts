/// <reference path="../../popclip.d.ts" />
define(function () {
    const styles = [
        "(round)",
        "[square]",        
        "{curly}",
        "<angle>",    
    ];
    function makeIcon(index: number) {
        return ["brackets-round.png", "brackets-square.png", "brackets-curly.png", "brackets-angle.png"][index]
    }
    function makeIdentifier(index: number) {
        return `style-${index}`
    }
    let extension: Extension = {
        options: styles.map((style, index) => {
            return {
                identifier: makeIdentifier(index),
                label: style,
                type: "boolean",
                icon: makeIcon(index),
                defaultValue: index>0?false:true
            }
        }),
        actions(selection, context, options) {
            if (selection.text) {            
                return styles.map((style, index) => {
                    return {
                        title: style,
                        icon: makeIcon(index),
                        code(selection) {
                            popclip.pasteText(style[0] + selection.text + style[style.length-1])
                        }
                    }            
                }).filter((style, index) => options[makeIdentifier(index)])
            }
        }
    }    
    return extension;
});