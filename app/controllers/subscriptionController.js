import {
  getSubscribedStore,
  getSubscriptionStatus,
} from "../services/subscriptionService.js";

const subscriptionStatus = async (req, res, next) => {
  try {
    const { user } = await getSubscriptionStatus(req.body);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

const subscribedStore = async (req, res, next) => {
  try {
    const { storeData } = await getSubscribedStore(req.params);
    res.status(200).json({ storeData });
  } catch (err) {
    next(err);
  }
};

export { subscriptionStatus, subscribedStore };
