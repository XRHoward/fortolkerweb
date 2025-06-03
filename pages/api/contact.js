import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Kun POST støttes' });
  }

  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Manglende felter' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'hei@fortolker.no',
      subject: `Ny henvendelse: ${subject}`,
      html: `
        <p><strong>Navn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Ikke oppgitt'}</p>
        <p><strong>Melding:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    res.status(200).json({ message: 'Melding sendt' });
  } catch (error) {
    console.error('Feil ved sending:', error);
    res.status(500).json({ message: 'Klarte ikke å sende e-post' });
  }
}
