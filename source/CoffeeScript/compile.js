try{
    var coffee = require('coffee-script');
    console.log(coffee.compile(process.env.POPCLIP_TEXT))
}catch(e){
    console.log(e)
}