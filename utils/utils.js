const { createHash } = require('crypto')
const today = new Date();

function hash(input){
    /* Reuturns an md5 hash from the input */
    return createHash('md5').update(input).digest('hex');
}

function getDate(){
    /* Returns the date in YY-MM-DD format */
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    return date;
}

function getTime(){
    /* Returns the time */
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
    };
}

const exporting = {
    todaysHash: todaysHash,
    getDate: getDate,
    getTime: getTime,
    completeDateTime: completeDateTime
}

module.exports = exporting