import { site } from '../../content/site';
import { ContactForm } from '../ContactForm';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';

export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <Reveal className="contact__intro">
          <Eyebrow>Contact</Eyebrow>
          <h2 id="contact-title" className="display-2">
            Let's <em>talk.</em>
          </h2>
          <p className="lead">
            Choose what you're writing about, share a few details, and I'll take it from there.
          </p>
          <div className="contact__direct">
            <p className="contact__direct-label">Or write directly</p>
            <a href={`mailto:${site.email}`} className="contact__email">{site.email}</a>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
