import Papa from 'papaparse';

const retrieve = (file, normalize = v => v, columns = []) => {
  return new Promise((resolve, reject) => {
    const result = {
      max: Number.MIN_VALUE,
      min: Number.MAX_VALUE,
      columns,
      items: []
    };
    let columnIndexes = null;
    Papa.parse(file, {
      step: ({data: [row]}) => {
        if (!columnIndexes) {
          columnIndexes = columns.map((column) => row.indexOf(column));
        } else if (row.length >= columns.length) {
          const d = columnIndexes.map((index, i) => {
            const v = normalize(parseFloat(row[index]));
            if (v > result.max) result.max = v;
            if (v < result.min) result.min = v;
            return [i, v];
          }).filter(arr => !!arr[1]);
          result.items.push(d);
        }
      },
      complete: () => resolve(result),
      error: (err) => reject(err)
    });
  });
}

export default retrieve;