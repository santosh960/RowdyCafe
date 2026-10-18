import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ContactForm() {
  const [notice, setNotice] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setNotice('This website is not connected to a messaging service yet, so your message was not sent. Please call the cafe instead.')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="contact-name">Your name</label>
        <input id="contact-name" name="name" type="text" placeholder="How should we call you?" autoComplete="name" required />
      </div>
      <div className="form-field">
        <label htmlFor="contact-phone">Phone number</label>
        <input id="contact-phone" name="phone" type="tel" placeholder="+91" autoComplete="tel" required />
      </div>
      <div className="form-field form-field-wide">
        <label htmlFor="contact-message">What’s on your mind?</label>
        <textarea id="contact-message" name="message" rows="3" placeholder="Ask us about the menu, hours, or anything else" required />
      </div>
      <button className="button button-primary form-submit" type="submit">
        Send an enquiry <Send size={16} />
      </button>
      <p className="form-note" aria-live="polite" role={notice ? 'status' : undefined}>
        {notice || 'This enquiry form is a preview and is not connected to a messaging service.'}
      </p>
    </form>
  )
}
