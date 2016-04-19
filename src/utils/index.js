export function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value.promise && typeof value.promise.then === 'function';
  }
}
export function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

/**
 * 把数字表示的权限转换为字符型，例如477=>r--rwxrwx
 * @param text
 * @returns {*}
 */
function formatPermission(text) {
  if( !row.isFile ){
    return '~';
  }
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'ZB'];
  let prev = 0, i = 0;
  while (Math.floor(text) > 0 && i < UNITS.length) {
    prev = text;
    text /= 1024;
    i += 1;
  }

  if (i > 0 && i < UNITS.length) {
    text = prev;
    i -= 1;
  }
  return Math.round(text * 100) / 100 + ' ' + UNITS[i];
}