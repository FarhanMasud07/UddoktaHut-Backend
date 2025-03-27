import bcrypt from "bcrypt";

function generateOtp() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

const otpMap = new Map();

function saveOtp({ identifier, name, password }, otp, ttl = 60 * 1000) {
  otpMap.has(identifier) && otpMap.delete(identifier);
  otpMap.set(identifier, {
    otp,
    expiresAt: Date.now() + ttl,
    name,
    password,
  });
}

function verifyOtp(identifier, inputOtp) {
  const record = otpMap.get(identifier);
  if (!record) return null;

  const isValid = record.otp === inputOtp;
  const isExpire = Date.now() > record.expiresAt;

  if (isExpire || !isValid) return null;

  otpMap.delete(identifier);
  return record;
}

async function passwordHashing(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return { hashedPassword };
}

export { generateOtp, saveOtp, verifyOtp, passwordHashing };
