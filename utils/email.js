const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_APIKEY);
// new Email(user, url).sendWelcome();

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.from = `${process.env.EMAIL_FROM}`;
    this.firstName = user.fullName.split(' ')[0];
    this.url = url;
  }

  // Send the actual email
  async sendEmail(template, subject) {
    // 1. Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject: subject,
      year: new Date().getFullYear()
    });

    // 2. Define email options
    const emailOptions = {
      to: this.to,
      // from: this.from,
      from: {
        name: 'Competitor Analysis Dashboard',
        email: this.from
      },
      subject: subject,
      html: html,
      text: htmlToText(html)
    }

    // 3.Send email
    if (process.env.NODE_ENV === 'production') {
      await sgMail.send(emailOptions);
    }
    else {
      await nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      }).sendMail(emailOptions);
    }

  }

  async sendWelcome() {
    await this.sendEmail('welcome', 'Welcome to the Dashboard!');
  }

  async sendPasswordReset() {
    await this.sendEmail('passwordResetEmail', 'Your password reset token (valid for 24 hours)')
  }
}
