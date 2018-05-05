import Papa from 'papaparse';

const retrieve = (file) => {
  return new Promise((resolve, reject) => {
    const result = [];
    Papa.parse(file, {
      step: (row) => {
        console.log(JSON.stringify(row.data, null, 2));
      },
      complete: () => resolve(result),
      error: (err) => reject(err)
    });
  });
}

export default retrieve;