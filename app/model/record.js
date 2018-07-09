import Papa from 'papaparse';

const retrieve = (file, headerFormat, groupby, identifier, modification) => {
  return new Promise((resolve, reject) => {
    const result = {
      items: {}
    };
    let columnIndexes = null;
    let groupByIndex = null;
    let identifierIndex = null;
    let modificationIndex = null;
    Papa.parse(file, {
      step: ({data: [row]}) => {
        if (!columnIndexes) {
          columnIndexes = [];
          const columns = [];
          row.forEach((col, index) => {
            if (col) {
              const r = headerFormat.exec(col);
              if (r) {
                columnIndexes.push(index);
                columns.push(`F${r[1]}`);
              }
              if (col.toLowerCase().indexOf(groupby.toLowerCase()) >= 0) {
                groupByIndex = index;
              }
              if (col.toLowerCase() === identifier.toLowerCase()) {
                identifierIndex = index;
              }
              if (col.toLowerCase() === modification.toLowerCase()) {
                modificationIndex = index;
              }
            }
            result.columns = columns;
          });
        } else if (row.length >= columnIndexes.length && row[groupByIndex] && row[identifierIndex]) {
          const groupName = row[groupByIndex];
          let group = result.items[groupName];
          if (!group) {
            group = {};
            result.items[groupName] = group;
          }
          const records = columnIndexes.reduce((obj, index, i) => {
            if (!!row[index]) {
              obj[i] = parseFloat(row[index]);
            }
            return obj;
          }, {});
          const subSequence = (row[identifierIndex] + " [" +  (row[modificationIndex] ? row[modificationIndex] : '  ') + "] ");
          group[subSequence] = records;
        }
      },
      complete: () => {
        result.orders = Object.keys(result.items);
        resolve(result);
      },
      error: (err) => reject(err)
    });
  });
}

export const rankScore = (dataSet) => {
  var score = 0.0;
  var numOfTotalDP = 1.0;
  var numOfValidDP = 0.0;
  const keys = Object.keys(dataSet);
  for( var i  = 0; i < keys.length; i++) {
    const seq = dataSet[keys[i]];
    const ikeys = Object.keys(seq);
    numOfSubunits ++;
    for( var j  = 0; j < ikeys.length; j++) {
      const value = seq[ikeys[j]];
      const sign = value > 1 ? 1 : -1;
      if(value > 10)
        score += 1;
      else if(value < 0.1)
        score -= 1;
      else if(value < 0.8 || value > 1.2)
        score += value - 1;
      numOfTotalDP ++;
      numOfValidDP += sign;
    }
  }
  if(Math.abs(numOfValidDP) < 3)
    score = 0;
  return score/numOfTotalDP;
}

export const rankMedian = (dataSet) => {
  var nums = [];
  const keys = Object.keys(dataSet);
  for( var i  = 0; i < keys.length; i++) {
    const seq = dataSet[keys[i]];
    const ikeys = Object.keys(seq);
    for( var j  = 0; j < ikeys.length; j++) {
      const value = seq[ikeys[j]];
      if(value > 0.02 && value < 50)
        nums.push(value);
    }
  }
  if(nums.length <= 3)
    return 1;
  nums.sort(function(a, b){return a-b});
  return nums.length % 2 === 0? (nums[nums.length/2 - 1] + nums[nums.length/2])/2 : nums[(nums.length - 1)/2];
}


/**
 * Given such data, return a sorted protein ids array.
 * data: {
        "Protein ID 1": {
          "Seq 1": {
            "1": 1.2,
            "2": 3
          },
          "Seq 2": [],
          ...
        },
        "Portein ID 2": {

        },
        ....
      }
 * @param {*} data 
 */
const persistedData = {};

export const sort = (data, rankingType) => {
  const keys = Object.keys(data);
  var length = keys.length;
  var idList = [];
  var scoreMap = [];
  for (var i = 0; i < keys.length; i++) {
    idList[i] = i;
    if(rankingType && rankingType == 'median') {
      scoreMap[i] = rankMedian(data[i]);
      
    }
    //else 
      //scoreMap[keys[i]] = rankScore(data[keys[i]]);
  }
  console.log("scoremap", scoreMap, "idlist", idList);
  persistedData.scores = scoreMap;
  return idList.sort((a,b) => scoreMap[b] - scoreMap[a]);
}

export {
  persistedData
}

export default retrieve;