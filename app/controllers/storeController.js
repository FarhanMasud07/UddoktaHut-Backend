import { getVerifiedStore } from "../services/storeService.js";

const verifiedStore = async (req, res, next) => {
  try {
    const response = await getVerifiedStore(req.body);
    if (!response)
      return res.status(404).json({
        verifiedStore: false,
        message: "No Store found/ you need to subscribe to continue",
      });

    return res.status(200).json({
      verifiedStore: true,
      message: "Congratulations store found",
    });
  } catch (err) {
    next(err);
  }
};

export { verifiedStore };
