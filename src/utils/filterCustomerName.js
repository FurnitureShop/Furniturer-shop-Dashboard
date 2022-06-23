export const filterCustomerName = (name, data) => {
  const filteredData = [];

  data.forEach((value) => {
    console.log(typeof value.customerName);
    if (value.customerName.includes(name)) {
      filteredData.push(value);
    }
  });

  return filteredData;
};
