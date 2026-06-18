import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
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
  // socialProviders: { 
  //   github: { 
  //     clientId: process.env.GITHUB_CLIENT_ID as string, 
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
  //   }, 
  // }, 
});