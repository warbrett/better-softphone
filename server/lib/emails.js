const sgMail = require('@sendgrid/mail');

const config = require('../server-config');

sgMail.setApiKey(config.sendgridApiKey);

module.exports = {
  sendReset(to, token) {
    const html = `
    <html>
      <p>
        Please click the link below to reset your password. If you did not request this, please disregard.
      </p>
      <p>
        <a href='${config.siteUrl}/reset?token=${token}'>Click Here To Reset</a>
      </p>
    </html>
    `;

    const message = {
      to,
      from: config.fromEmail,
      subject: 'Better Softphone Password Reset',
      html,
    };

    return sgMail.send(message);
  },
};
