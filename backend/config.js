import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL:'mongodb+srv://tenreck:tenreck@123@tenreck.ysmix.mongodb.net/Tenreck?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'ILoveEverythingTheWorldIsCurrepted0034',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'AXCn43bR2htx6LJ6BlnsTZeJmK23Pt77xZuPhGXJepmenW2AeAX1Ei9owV5rxsO2IEEDpk8qJb__YafD',
  accessKeyId: process.env.accessKeyId || 'IHaveNoIdea',
  secretAccessKey: process.env.secretAccessKey || 'KeyIsNotJustToOpenLocks',
};
