import z from "zod";

const smsProviderSchema = z.object({
  phoneNumber: z.string({ message: "Phone Number is required" }),
  name: z.string({ message: "Name is required" }),
  password: z.string({ message: "Password is required" }),
});

const smsProviderVerifySchema = z.object({
  phoneNumber: z.string({ message: "Phone Number is required" }),
  otp: z.number({ message: "Otp is required" }).min(0),
});

export { smsProviderSchema, smsProviderVerifySchema };
