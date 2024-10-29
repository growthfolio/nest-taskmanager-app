export const jwtConstants = {
    // added in env variable JWT_SECRET with AES-256 encryption
  secret: process.env.JWT_SECRET || 'defaultSecret', // fallback to defaultSecret if no env variable is set
};
