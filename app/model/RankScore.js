const rankScore = (dataSet) => {
    var score = 0.0;
    var numOfTotalDP = 0.0;
    var numOfValidDP = 0.0;
    for( var i  = 0, keys = Object.keys(dataSet), ii = keys.length; i < ii; i++) {
      for( var j  = 0, ikeys = Object.keys(dataSet(keys[i])), jj = ikeys.length; j < jj; j++) {
        score += Math.pow(Math.log(dataSet(keys[i])(ikeys[j])), 3 );
        numOfTotalDP ++;
        numOfValidDP += keys[i][ikeys[j]] > 0? 1 : -1;
      }
    }
    score *= Math.pow((numofValidDP / numOfTotalDP), 3);
    return score;
}

export default rankScore;