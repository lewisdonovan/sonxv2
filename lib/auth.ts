import { NextAuthOptions } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { firebaseConfig } from "@/config/firebase.config";

export const authOptions: NextAuthOptions = {
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    })
  }), 
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID || "",
      clientSecret: env.FACEBOOK_CLIENT_SECRET || "",
    }),
    // EmailProvider({
    //   from: env.SMTP_FROM,
    //   sendVerificationRequest: async ({ identifier, url, provider }) => {
    //     const user = await db.user.findUnique({
    //       where: {
    //         email: identifier,
    //       },
    //       select: {
    //         emailVerified: true,
    //       },
    //     })

    //     const templateId = user?.emailVerified
    //       ? env.POSTMARK_SIGN_IN_TEMPLATE
    //       : env.POSTMARK_ACTIVATION_TEMPLATE
    //     if (!templateId) {
    //       throw new Error("Missing template id")
    //     }

    //     const result = await postmarkClient.sendEmailWithTemplate({
    //       TemplateId: parseInt(templateId),
    //       To: identifier,
    //       From: provider.from as string,
    //       TemplateModel: {
    //         action_url: url,
    //         product_name: siteConfig.name,
    //       },
    //       Headers: [
    //         {
    //           // Set this to prevent Gmail from threading emails.
    //           // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
    //           Name: "X-Entity-Ref-ID",
    //           Value: new Date().getTime() + "",
    //         },
    //       ],
    //     })

    //     if (result.ErrorCode) {
    //       throw new Error(result.Message)
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async session({ token, session }) {
      // console.log({token, session});
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      // const dbUser = await db.user.findFirst({
      //   where: {
      //     email: token.email,
      //   },
      // })

      // if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      // }

      // return {
      //   id: dbUser.id,
      //   name: dbUser.name,
      //   email: dbUser.email,
      //   picture: dbUser.image,
      // }
    },
  },
}
