import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Kun POST støttes' });
  }

  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Manglende påkrevde felter' });
  }

  try {
    await resend.emails.send({
      from: 'Fortolker Kontaktskjema <kontakt@fortolker.no>',
      to: 'hei@fortolker.no',
      subject: `Ny henvendelse: ${subject}`,
      reply_to: email,
      html: `
        <h3>Ny melding fra ${name}</h3>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Ikke oppgitt'}</p>
        <p><strong>Melding:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({ message: 'Melding sendt' });
  } catch (error) {
    console.error('Feil ved sending av e-post:', error);
    return res.status(500).json({ message: 'Feil ved sending av e-post' });
  }
}
