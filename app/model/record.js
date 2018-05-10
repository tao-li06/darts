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
        } else if (row.length >= columns.length) {
          const groupName = row[groupByIndex];
          let group = result.items[groupName];
          if (!group) {
            group = [];
            result.items[groupName] = group;
          }
          const records = columnIndexes.map((index, i) => [i, parseFloat(row[index])]).filter(arr => !!arr[1]);
          group.push({
            id: row[identifierIndex],
            items: records
          });
          
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