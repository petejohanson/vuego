

function matrix(rowCount, columnCount, initial) {
  val ret = [];

  for(val i = 0; i < rowCount; ++i) {
    val columns = [];

    for(val j = 0; j < columnCount; ++j) {
      columns[j] = initial;
    }
    
    ret[i] = columns;
  }

  return ret;
}

export default matrix;
