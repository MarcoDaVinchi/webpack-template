const arr = [1, -2, 15, 2, 0, 8];
const sortedA = arr.sort((a, b) => a - b);
// console.log(sortedA);

const obj = {
  className: 'open menu',
};

function addClass(objToCheck, cls) {
  let items = objToCheck.className ? objToCheck.className.split(' ') : [];
  const res = objToCheck;
  const store = {};
  for (let i = 0; i <= items.length; i += 1) {
    const key = items[i];
    store[key] = true;
  }
  if (store[cls] !== true) {
    items.push(cls);
  }
  items = items.join(' ');
  res.className = items;
  return res;
}

console.log(obj.className.split(' '));
console.log(Object.keys(obj.className.split(' ')));

addClass(obj, 'men');
