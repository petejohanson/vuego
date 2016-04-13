
export function matrix (colCount, rowCount, initial) {
  let columns = [];

  for (let i = 0; i < colCount; ++i) {
    let rows = [];
    for (let j = 0; j < rowCount; ++j) {
      rows[j] = initial;
    }

    columns[i] = rows;
  }

  return columns;
}
