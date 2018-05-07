import Papa from 'papaparse';

const retrieve = (file, columns = [], groupby, identifier) => {
  return new Promise((resolve, reject) => {
    const result = {
      columns,
      items: []
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
          const last = result.items.length > 0 && result.items[result.items.length - 1];
          let group;
          if (last && last.group === groupName) {
            group = last;
          } else {
            group = { group: groupName, items: []};
            result.items.push(group);
          }
          const records = columnIndexes.map((index, i) => [i, parseFloat(row[index])]).filter(arr => !!arr[1]);
          group.items.push({
            id: row[identifierIndex],
            items: records
          });
          
        }
      },
      complete: () => resolve(result),
      error: (err) => reject(err)
    });
  });
}

export default retrieve;