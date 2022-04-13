const { createHash } = require('crypto')

function hash(input){
    return createHash('md5').update(input).digest('hex');
}

function todaysHash(){
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const complete = date+' '+time
    return {
        hash: hash(complete),
        dateTime: date
    }
}
module.exports = todaysHash()