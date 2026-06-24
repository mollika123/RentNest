import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
// await client.connect();
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
 
    client
  }),
   emailAndPassword: { 
    enabled: true, 
  }, 
    user: {
       additionalFields: {
          role: {
              default:"tenant"
            } 
            
      //  plan: {
      //           default:'tenant_free'
      //         }
            
        }
  },
      session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 24 * 60,
    },
  },
  plugins: [jwt()],
  
    
  // socialProviders: { 
  //   github: { 
  //     clientId: process.env.GITHUB_CLIENT_ID as string, 
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
  //   }, 
  // }, 
});