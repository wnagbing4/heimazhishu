export const guid = () => {
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  };
  
  export const formatPrice = (str: Number | String) => {
    return String(str).split(``).reverse().reduce((prev, next, index) => {
      return (index % 3 ? next : next + `,`) + prev;
    })
  };