const getClientWidth = () => {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
  return x;
};

const itemSizeFromVw = (value) => {
  const result = (getClientWidth() * value) / 100;
  return result;
};

export default itemSizeFromVw;
export { itemSizeFromVw, getClientWidth };
