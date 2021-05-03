import { config, createSchema } from "@keystone-next/keystone/schema";
import "dotenv/config";

import { User } from "./schemas/User";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

export default config({
  // @ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: "mongoose",
    url: databaseURL,
    // TODO: Add seeding here
  },
  lists: createSchema({
    User,
  }),
  ui: {
    // TODO: Change this for roles
    isAccessAllowed: () => true,
  },
  // TODO: Add session values here
});