NEW CONTACT FORM SUBMISSION
===========================

From: {{ $contactData['name'] }}
Email: {{ $contactData['email'] }}
Subject: {{ $contactData['subject'] }}

Message:
--------
{{ $contactData['message'] }}

Details:
--------
Submitted: {{ $contactData['submitted_at']->format('M j, Y \a\t g:i A T') }}
IP Address: {{ $contactData['ip_address'] }}
User Agent: {{ $contactData['user_agent'] }}

---
You can reply directly to this email to respond to {{ $contactData['name'] }}.
This email was automatically generated from your portfolio contact form.