const { createHash } = require('crypto')
const today = new Date();

function hash(input){
    return createHash('md5').update(input).digest('hex');
}

function getDate(){
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    return date;
}

function getTime(){
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
}

function completeDateTime(){
    return getDate()+' '+getTime();
}

function todaysHash(){
    return {
        hash: hash(completeDateTime()),
        dateTime: getDate()
    }
}
module.exports = todaysHash()