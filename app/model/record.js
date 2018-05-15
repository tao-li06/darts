import Papa from 'papaparse';

const retrieve = (file, headerFormat, groupby, identifier) => {
  return new Promise((resolve, reject) => {
    const result = {
      items: {}
    };
    let columnIndexes = null;
    let groupByIndex = null;
    let identifierIndex = null;
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
              if (col.toLowerCase().indexOf(identifier.toLowerCase()) >= 0) {
                identifierIndex = index;
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
          group[row[identifierIndex]] = records;
        }
      },
      complete: () => {
        // TODO: order the keys
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
  var numOfSubunits = 1.0;
  const keys = Object.keys(dataSet);
  for( var i  = 0; i < keys.length; i++) {
    const seq = dataSet[keys[i]];
    const ikeys = Object.keys(seq);
    numOfSubunits ++;
    for( var j  = 0; j < ikeys.length; j++) {
      const value = seq[ikeys[j]];
      const sign = value > 1 ? 1 : -1;
      score += (Math.pow(Math.log(value), 1 ) * sign);
      numOfTotalDP ++;
      numOfValidDP += sign;
    }
  }
  score *= Math.pow((Math.abs(numOfValidDP) / numOfTotalDP), 2);
  score /= numOfSubunits;
  if(Math.abs(numOfTotalDP) <= 3)
    score = -1;
  return score;
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

export const sort = (data) => {
  const keys = Object.keys(data)
  var length = keys.length;
  var idList = [];
  var scoreMap = {};
  for (var i = 0; i < keys.length; i++) {
    idList[i] = keys[i];
    scoreMap[keys[i]] = rankScore(data[keys[i]]);
  }
  persistedData.scores = scoreMap;
  return idList.sort((a,b) => scoreMap[b] - scoreMap[a]);
}

export {
  persistedData
}

export default retrieve;