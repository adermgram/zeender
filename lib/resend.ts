import nodemailer from 'nodemailer'

// Gmail SMTP transport — uses an App Password, not your real Gmail password.
// Setup: Google Account → Security → 2-Step Verification → App Passwords → create one
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendResumeEmail({
  to,
  name,
  pdfUrl,
}: {
  to: string
  name: string
  pdfUrl: string
}) {
  await transporter.sendMail({
    from: `"Zeender" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Your Resume is Ready — ${name}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#1e293b;padding:32px 40px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-left:0;">
                    <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Zeender</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#0f172a;">
                Your resume is ready! 🎉
              </p>
              <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.6;">
                Hi ${name}, your AI-powered resume has been generated and is ready to download.
                It has been tailored to your target job description and optimised for ATS systems.
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#6366f1;border-radius:12px;">
                    <a href="${pdfUrl}"
                       style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                      Download My Resume PDF →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Tips -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td>
                    <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#374151;">
                      Quick tips for your application:
                    </p>
                    <ul style="margin:0;padding-left:18px;color:#64748b;font-size:13px;line-height:1.8;">
                      <li>Submit the PDF as-is — it's already ATS-optimised</li>
                      <li>Personalise the summary slightly for each application</li>
                      <li>Keep your LinkedIn profile consistent with this resume</li>
                      <li>Follow up 5–7 business days after applying</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <p style="font-size:12px;color:#94a3b8;margin:0;">
                If the button above doesn't work, copy and paste this link:<br/>
                <a href="${pdfUrl}" style="color:#6366f1;word-break:break-all;">${pdfUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:11px;color:#94a3b8;text-align:center;">
                © 2025 Zeender &middot; Sent because you generated a resume on Zeender.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  })
}
