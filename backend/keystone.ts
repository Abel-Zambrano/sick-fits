import { config, createSchema } from "@keystone-next/keystone/schema";
import { createAuth } from "@keystone-next/auth";
import "dotenv/config";

import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";

import { User } from "./schemas/User";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    // TODO: Add in initial roles here
  },
});

export default withAuth(
  config({
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
      // Show the UI only for people who pass the test
      isAccessAllowed: ({ session }) => {
        console.log(session);
        return !!session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // *Grapgql query
      User: `id name email`,
    }),
  })
);
