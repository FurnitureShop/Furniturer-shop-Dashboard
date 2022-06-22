export function filterDateObject(fromDate, toDate, data) {
  //Use this object data structure to easy to statistic product quantity
  let filterProductObject = {};
  //Then convert object to array with name
  let filterProduct = [];

  data.forEach((order) => {
    const createAt = new Date(order.createAt);
    if (fromDate.toDate() < createAt && createAt < toDate.toDate()) {
      order.products.forEach((product) => {
        filterProductObject[product.product] =
          (filterProductObject[product.product] || 0) + product.quantity;
      });
    }
  });

  console.log(filterProductObject);

  for (let key in filterProductObject) {
    const statisticProduct = {
      type: key,
      value: filterProductObject[key],
    };
    filterProduct.push(statisticProduct);
  }

  return filterProduct;
}
