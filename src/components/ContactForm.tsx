import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { enquiryTypes, type ExtraField } from '../content/contact';
import { site } from '../content/site';

/**
 * Context-aware contact form. Messages are sent through Web3Forms (web3forms.com), which emails them
 * to the address the access key was created with. The key is meant to be public, so it lives here.
 */
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '98474d37-0627-43f0-93de-da77359ac877';

type Values = Record<string, string>;
type Errors = Record<string, string>;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const [params] = useSearchParams();
  const preset = enquiryTypes.find((t) => t.id === params.get('enquiry'))?.id ?? '';
  const [typeId, setTypeId] = useState(preset);
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  useEffect(() => {
    if (preset) setTypeId(preset);
  }, [preset]);

  const type = enquiryTypes.find((t) => t.id === typeId);

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!type) e.enquiry = 'Please choose what your message is about.';
    if (!values.name?.trim()) e.name = 'Please enter your full name.';
    if (!values.email?.trim()) e.email = 'Please enter your email address.';
    else if (!EMAIL_RE.test(values.email.trim())) e.email = 'Please enter a valid email address.';
    type?.fields.forEach((f) => {
      const v = values[f.name]?.trim() ?? '';
      if (f.required && !v) e[f.name] = `Please add the ${f.label.toLowerCase()}.`;
      if (f.type === 'url' && v && !/^https?:\/\/\S+\.\S+/.test(v)) e[f.name] = 'Please enter a full link, starting with https://';
    });
    if (!values.message?.trim()) e.message = 'Please write a short message.';
    else if (values.message.trim().length < 10) e.message = 'A little more detail would help (at least 10 characters).';
    return Object.fromEntries(Object.entries(e).filter(([, m]) => m));
  };

  const payload = () => {
    const extra = Object.fromEntries((type?.fields ?? []).map((f) => [f.label, values[f.name]?.trim() || '—']));
    return {
      enquiry: type?.label ?? '',
      name: values.name.trim(),
      email: values.email.trim(),
      organisation: values.organisation?.trim() || '—',
      ...extra,
      message: values.message.trim(),
    };
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (values._gotcha) return; // spam trap
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
      el?.focus();
      return;
    }

    const data = payload();
    const subject = `${data.enquiry} — ${data.name}`;

    try {
      setStatus('sending');
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New enquiry: ${subject}`,
          from_name: `${data.name} via awuraamadadson site`,
          replyto: data.email, // so pressing Reply in your inbox answers the sender
          ...data,
        }),
      });
      const result = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !result.success) throw new Error(String(res.status));
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues({});
    setErrors({});
    setTypeId('');
    setStatus('idle');
  };

  if (status === 'sent') {
    const first = values.name?.trim().split(' ')[0];
    return (
      <div className="form-done" role="status" aria-live="polite">
        <p className="form-done__mark" aria-hidden="true">✦</p>
        <h3 className="form-done__title">Thank you{first ? `, ${first}` : ''}.</h3>
        <p>Your message has been sent. I'll reply to {values.email} as soon as I can.</p>
        <button type="button" className="text-button" onClick={reset}>Write another message</button>
      </div>
    );
  }

  const fieldId = (n: string) => `${uid}-${n}`;
  const err = (n: string) =>
    errors[n] ? (
      <span className="field__error" id={`${fieldId(n)}-err`}>{errors[n]}</span>
    ) : null;
  const a11y = (n: string) => ({
    id: fieldId(n),
    'data-field': n,
    'aria-invalid': errors[n] ? true : undefined,
    'aria-describedby': errors[n] ? `${fieldId(n)}-err` : undefined,
  });

  const renderExtra = (f: ExtraField) => {
    const common = { ...a11y(f.name), value: values[f.name] ?? '', placeholder: f.placeholder };
    return (
      <div key={f.name} className={`field${f.type === 'textarea' ? ' field--wide' : ''}`}>
        <label htmlFor={fieldId(f.name)}>
          {f.label}
          {!f.required && <span className="field__optional"> (optional)</span>}
        </label>
        {f.type === 'textarea' ? (
          <textarea rows={3} {...common} onChange={(e) => set(f.name, e.target.value)} />
        ) : f.type === 'select' ? (
          <select {...common} onChange={(e) => set(f.name, e.target.value)}>
            <option value="">Select…</option>
            {f.options?.map((o) => <option key={o}>{o}</option>)}
          </select>
        ) : (
          <input type={f.type} {...common} onChange={(e) => set(f.name, e.target.value)} />
        )}
        {err(f.name)}
      </div>
    );
  };

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
      <fieldset className="form__types">
        <legend className="form__legend">
          <span className="form__step">I.</span> What are you writing about?
        </legend>
        <div className="types" role="radiogroup" aria-describedby={errors.enquiry ? `${fieldId('enquiry')}-err` : undefined}>
          {enquiryTypes.map((t, i) => (
            <label key={t.id} className={`type${typeId === t.id ? ' is-selected' : ''}`}>
              <input
                type="radio"
                name="enquiry"
                value={t.id}
                checked={typeId === t.id}
                onChange={() => {
                  setTypeId(t.id);
                  setErrors((e) => ({ ...e, enquiry: '' }));
                }}
                data-field={i === 0 ? 'enquiry' : undefined}
              />
              <span className="type__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="type__text">
                <span className="type__label">{t.label}</span>
                <span className="type__hint">{t.hint}</span>
              </span>
            </label>
          ))}
        </div>
        {err('enquiry')}
      </fieldset>

      <fieldset className="form__details">
        <legend className="form__legend">
          <span className="form__step">II.</span> A few details
        </legend>
        <div className="fields">
          <div className="field">
            <label htmlFor={fieldId('name')}>Full name</label>
            <input type="text" autoComplete="name" {...a11y('name')} value={values.name ?? ''} onChange={(e) => set('name', e.target.value)} />
            {err('name')}
          </div>
          <div className="field">
            <label htmlFor={fieldId('email')}>Email address</label>
            <input type="email" autoComplete="email" {...a11y('email')} value={values.email ?? ''} onChange={(e) => set('email', e.target.value)} />
            {err('email')}
          </div>
          <div className="field field--wide">
            <label htmlFor={fieldId('organisation')}>
              Organisation / Company <span className="field__optional">(optional)</span>
            </label>
            <input type="text" autoComplete="organization" {...a11y('organisation')} value={values.organisation ?? ''} onChange={(e) => set('organisation', e.target.value)} />
          </div>

          {type && type.fields.length > 0 && (
            <div key={type.id} className="fields fields--extra field--wide">
              {type.fields.map(renderExtra)}
            </div>
          )}

          <div className="field field--wide">
            <label htmlFor={fieldId('message')}>{type ? type.messagePrompt : 'Message'}</label>
            <textarea rows={5} {...a11y('message')} value={values.message ?? ''} onChange={(e) => set('message', e.target.value)} />
            {err('message')}
          </div>

          {/* Spam trap: hidden from people, often filled by bots */}
          <div className="visually-hidden" aria-hidden="true">
            <label>
              Leave this empty
              <input type="text" tabIndex={-1} autoComplete="off" value={values._gotcha ?? ''} onChange={(e) => set('_gotcha', e.target.value)} />
            </label>
          </div>
        </div>
      </fieldset>

      {status === 'error' && (
        <p className="form__alert" role="alert">
          Something went wrong sending your message. Please try again, or email me at{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}

      <div className="form__submit">
        <button type="submit" className="button" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
