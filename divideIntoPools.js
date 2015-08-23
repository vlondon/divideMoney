function divideIntoPools(money, percentage) {

    var roundNumber = function(num){
        return Math.round(num * 100) / 100;
    };

    var floorNumber = function(num){
        return Math.floor(num * 100) / 100;
    };

    // Check if percentage array sum is 100%
    var totalPersentageReceived = roundNumber(percentage.reduce(function(a, b){return a+b;}));
    if(totalPersentageReceived !== 1) {
        console.error('Wrong total percentage result passed to the function.', totalPersentageReceived);
        return false;
    }

    /*
    Summarize numbers and rounding them, if sum and
    next rounded number is greater than total money,
    then rounding down the number.
    ---------------------------------
    Explanation why this approach chosen:
    First and probably easiest way to solve this task,
    that came in my mind was to round each value and
    then add to the first(highest) result or extract form the last one
    the difference between "money" and "totalMoney".
    But it will fail some tests (ex.: case 4 and case 5)
    as there will be big difference of rounded numbers sum.
    */
    var res = [],
        totalMoney = 0;
    percentage.map(function(num){
        var nextNumber = roundNumber(money * num, true);
        if (nextNumber + totalMoney > money) {
            nextNumber = floorNumber(money * num, false);
        }
        totalMoney += nextNumber;
        res.push(nextNumber);
    });

    var diff = money - totalMoney;
    if (diff !== 0) {
        res[0] = roundNumber(res[0] + diff);
    }

    // First approach (failing additional tests with big amount of small numbers)
    /*
    percentage.map(function(num){
        res.push(Math.round(money * num * 100) / 100);
    });

    res.sort(function(a, b){return b-a});
    var totalMoney = res.reduce(function(a, b){return a+b;});
    var diff = roundNumber(money - totalMoney);
    if (diff > 0) {
        res[0] = roundNumber(res[0] + diff);
    } else if (diff < 0) {
        res[res.length - 1] = roundNumber(res[res.length - 1] + diff);
    }
    */

    console.log('result: ', res);
    return res;
}
