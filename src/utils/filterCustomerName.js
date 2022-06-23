export const filterCustomerName = (name, key, data) => {
  const filteredData = [];

  data.forEach((value) => {
    console.log(typeof value.customerName);
    if (value[key].includes(name)) {
      filteredData.push(value);
    }
  });

  return filteredData;
};
