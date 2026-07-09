
import { getCheckoutData } from "./checkoutStorage";

const validateStep = (step) => {
  const data = getCheckoutData();

  switch (step) {
    case 1:
      if (!data.items || data.items.length === 0) {
        return {
          success: false,
          message: "Please add at least one item.",
        };
      }
      return { success: true };

    case 2:
      if (!data.address?.name && !data.address?.fullName) {
        return {
          success: false,
          message: "Please add your address.",
        };
      }
      return { success: true };

    case 3:
      if (!data.schedule?.date) {
        return {
          success: false,
          message: "Please select pickup date.",
        };
      }

      if (!data.schedule?.slot) {
        return {
          success: false,
          message: "Please select pickup time.",
        };
      }


      if (!data.schedule?.deliverySlot) {
        return {
          success: false,
          message: "Please select Delivery Date & Time.",
        };
      }

      return { success: true };

   
    default:
      return { success: true };
  }
};

export default validateStep;