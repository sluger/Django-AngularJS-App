/* http://codereview.stackexchange.com/questions/
60128/removing-duplicates-from-an-array-quickly */
Array.prototype.unique = function() {
  return this.reduce(function(accum, current) {
    if (accum.indexOf(current) < 0) {
      accum.push(current);
    }
    return accum;
  }, []);
}
