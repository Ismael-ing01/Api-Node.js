const express = require("express");
const router = express.Router();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/send", async (req, res) => {
  try {
    const { to, subject, message, name } = req.body;
    console.log("Solicitud de email recibida", { to, subject, message, name });

    if (!to || !subject || !message) {
      return res.status(400).json({
        error: "Faltan campos obligatorios",
        required: ["to", "subject", "message"],
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({
        error: "El formato del email no es válido",
      });
    }

    const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #10B981; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
                    ${subject}
                </h2>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    ${name ? `<p><strong>👤 De:</strong> ${name}</p>` : ""}
                    
                    <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #10B981; margin-top: 15px;">
                        ${message.replace(/\n/g, "<br>")}
                    </div>
                    
                    <p style="margin-top: 15px; color: #666;">
                        <strong>📅 Fecha:</strong> ${new Date().toLocaleString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                    </p>
                </div>
                
                <p style="color: #999; font-size: 12px; text-align: center;">
                    Enviado desde API Rest Node.js
                </p>
            </div>
        `;

    console.log("📤 Enviando email a Resend API...");

    const { data, error } = await resend.emails.send({
      from: "Practicas API <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error("❌ Error de Resend:", error);
      return res.status(400).json({
        success: false,
        error: "Error al enviar el email",
        details: error,
      });
    }

    console.log("✅ Email enviado correctamente:", data);

    return res.json({
      success: true,
      message: "Email enviado correctamente",
      emailId: data.id,
      data: data,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

module.exports = router;
