const ORDER_STATUS_CREATE = 0;
const ORDER_STATUS_CONFIRMED = 1;
const ORDER_STATUS_ACCEPTED = 2;
const ORDER_STATUS_CANCELLED = 3;
const ORDER_STATUS_DELIVERED = 4;

export const generateStatusID = (status) => {
  switch (status) {
    case "Create order":
      return ORDER_STATUS_CREATE;
    case "Confirm payment method":
      return ORDER_STATUS_CONFIRMED;
    case "Accepted":
      return ORDER_STATUS_ACCEPTED;
    case "Cancelled":
      return ORDER_STATUS_CANCELLED;
    case "Delivered":
      return ORDER_STATUS_DELIVERED;
    default:
      return 0;
  }
};
