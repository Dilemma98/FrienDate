import React from "react";

class Contact extends React.Component {
  render() {
    return (
      <div className="contact-container">
        <h1 className="contact-header">Kontakta oss</h1>
        <p>
          Vi är alltid glada att höra från dig! Fyll i formuläret nedan så hör
          vi av oss så snart vi kan.
        </p>
        <form className="contact-form">
          <h1>Kontakta oss</h1>
          <input type="text" name="name" placeholder="Ditt namn" required />
          <input type="email" name="email" placeholder="Din e-post" required />
          <textarea
            name="message"
            placeholder="Ditt meddelande"
            required
          ></textarea>
          <button type="submit">Skicka</button>
        </form>
      </div>
    );
  }
}
export default Contact;
