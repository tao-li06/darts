import Papa from 'papaparse';

const retrieve = (file, columns = [], groupby, identifier) => {
  return new Promise((resolve, reject) => {
    const result = {
      columns,
      items: {}
    };
    let columnIndexes = null;
    let groupByIndex = null;
    let identifierIndex = null;
    Papa.parse(file, {
      step: ({data: [row]}) => {
        if (!columnIndexes) {
          columnIndexes = columns.map((column) => row.indexOf(column));
          groupByIndex = row.indexOf(groupby);
          identifierIndex = row.indexOf(identifier);
        } else if (row.length >= columns.length && row[groupByIndex] && row[identifierIndex]) {
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

export default retrieve;