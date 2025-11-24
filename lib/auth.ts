import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { anonymous, magicLink } from "better-auth/plugins"
import { headers } from "next/headers"
import { createTransport } from "nodemailer"
import { Role } from "./generated/prisma/enums"
import prisma from "./prisma/accelerate"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 10 * 60,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "line", "apple"],
    },
  },
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: false,
      },
      lastName: {
        type: "string",
        required: false,
      },
      role: {
        type: Object.values(Role),
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    anonymous(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        console.log(`${email} にメールを送信します...`)
        const host = new URL(url).host

        const transporter = createTransport({
          host: process.env.EMAIL_SERVER_HOST,
          port: Number(process.env.EMAIL_SERVER_PORT),
          secure: Number(process.env.EMAIL_SERVER_PORT) === 465,
          auth: {
            user: process.env.EMAIL_NOREPLY_USER,
            pass: process.env.EMAIL_NOREPLY_PASSWORD,
          },
        })
        const mailOptions = {
          from: "おいで家",
          to: email,
          subject: `${host} にログイン`,
          text: text({ url, host }),
          html: html({ url, host }),
        }
        try {
          const result = await transporter.sendMail(mailOptions)

          const failed = [
            ...(result.rejected || []),
            ...(result.pending || []),
          ].filter(Boolean)
          if (failed.length) {
            throw new Error(`Email (${failed.join(", ")}) could not be sent`)
          }

          console.log(`${email} にメールを送信しました ✅`)
        } catch (error) {
          console.error("❌ メール送信に失敗しました:", error)
          throw error
        }
      },
      expiresIn: 900,
    }),
    nextCookies(),
  ],
})

function html({ url, host }: { url: string; host: string }) {
  const escapedHost = host.replace(/\./g, "&#8203;.")
  const htmlStr = `
  <!DOCTYPE html>
  <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="x-apple-disable-message-reformatting">
      <title>ログイン通知</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff;">
              <tr>
                <td style="padding:40px 24px; text-align:left;">
                  <h1 style="margin:0 0 20px; font-size:22px; color:#333333;">${escapedHost} にログイン</h1>
                  <p style="margin:0 0 20px; font-size:16px; color:#555555; line-height:1.5;">
                    アカウントにログインするには、以下のボタンをクリックしてください。セキュリティ上の理由から、このリンクは15分間で期限切れとなります。
                  </p>
                  <p style="margin:0 0 30px; text-align:center;">
                    <a href="${url}" target="_blank" style="display:inline-block; padding:14px 28px; background-color:#4F46E5; color:#ffffff; font-size:16px; font-weight:bold; text-decoration:none; border-radius:6px;">
                      ログインする
                    </a>
                  </p>
                  <p style="margin:0 0 10px; font-size:14px; color:#555555; line-height:1.5;">
                    ボタンが機能しない場合は、以下のURLをブラウザにコピー＆ペーストしてください：
                  </p>
                  <p style="margin:0; font-size:14px; word-break:break-all;">
                    <a href="${url}" style="color:#4F46E5; text-decoration:underline;">${url}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#eeeeee" style="padding:20px 24px; font-size:12px; color:#777777; line-height:1.5;">
                  このメールにお心当たりがない場合は、無視していただいて構いません。<br/>
                  本メールは送信専用です。ご返信いただいても対応いたしかねますのでご了承ください。
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `
  return htmlStr
}

function text({ url, host }: { url: string; host: string }) {
  return `${host}にログインします。\n${url}\n\n`
}

export async function getSessionUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const user = session?.user
  return user
}

export type Session = typeof auth.$Infer.Session
