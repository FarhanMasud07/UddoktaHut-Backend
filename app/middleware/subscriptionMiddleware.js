import { Store, Subscription } from "../models/RootModel.js";

function checkValidity(subscription, now) {
  return (
    (subscription.status === "trialing" &&
      new Date(subscription.trial_ends_at) > now) ||
    (subscription.status === "active" && new Date(subscription.end_date) > now)
  );
}

const validateStoreSubscription = async (store, isPublicRoute = false) => {
  if (!store) {
    return {
      error: true,
      status: isPublicRoute ? 404 : 403,
      message: isPublicRoute ? "Store not found" : "No store found",
    };
  }

  if (!store.Subscription) {
    return {
      error: true,
      status: 403,
      message: isPublicRoute
        ? "Store subscription not found."
        : "No subscription found. Please subscribe to continue.",
      code: "SUBSCRIPTION_REQUIRED",
    };
  }

  const now = new Date();
  const isActive = checkValidity(store.Subscription, now);

  if (!isActive) {
    const isTrialing = store.Subscription.status === "trialing";
    return {
      error: true,
      status: 403,
      message: isPublicRoute
        ? "Store is temporarily unavailable."
        : isTrialing
        ? "Free trial expired. Please subscribe to continue."
        : "Subscription expired. Please renew to continue.",
      code: isTrialing ? "TRIAL_EXPIRED" : "SUBSCRIPTION_EXPIRED",
    };
  }

  return { error: false };
};

const checkOwnerSubscription = async (req, res, next) => {
  try {
    const store = await Store.findOne({
      where: { user_id: req.user.id },
      include: [{ model: Subscription, required: false }],
    });

    const validation = await validateStoreSubscription(store, false);

    if (validation.error) {
      const response = { message: validation.message };
      if (validation.code) response.code = validation.code;
      return res.status(validation.status).json(response);
    }

    next();
  } catch (error) {
    console.error("Owner subscription check error:", error);
    return res.status(500).json({ message: "Error checking subscription" });
  }
};

const checkStoreSubscription = async (req, res, next) => {
  try {
    const storeName = req.params.storeName;
    const store = await Store.findOne({
      where: { store_name: storeName },
      include: [{ model: Subscription, required: false }],
    });

    const validation = await validateStoreSubscription(store, true);

    if (validation.error) {
      const response = { message: validation.message };
      if (validation.code) response.code = validation.code;
      return res.status(validation.status).json(response);
    }

    next();
  } catch (error) {
    console.error("Store subscription check error:", error);
    return res
      .status(500)
      .json({ message: "Error checking store subscription" });
  }
};

export { checkOwnerSubscription, checkStoreSubscription };
