<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: #ffffff;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }

        .content {
            padding: 30px;
        }

        .field {
            margin-bottom: 20px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 15px;
        }

        .field:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }

        .label {
            font-weight: 600;
            color: #374151;
            margin-bottom: 5px;
            display: block;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .value {
            color: #1f2937;
            font-size: 16px;
            word-wrap: break-word;
        }

        .message-content {
            background: #f9fafb;
            border-left: 4px solid #3b82f6;
            padding: 15px;
            border-radius: 0 4px 4px 0;
            white-space: pre-line;
        }

        .footer {
            background: #f9fafb;
            padding: 20px 30px;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }

        .metadata {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 20px;
            font-size: 12px;
            color: #6b7280;
        }

        .reply-note {
            background: #dbeafe;
            border: 1px solid #bfdbfe;
            border-radius: 6px;
            padding: 15px;
            margin-top: 20px;
            font-size: 14px;
            color: #1e40af;
        }

        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 4px;
            }

            .header,
            .content,
            .footer {
                padding: 20px;
            }

            .metadata {
                grid-template-columns: 1fr;
                gap: 10px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>📧 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone reached out through your portfolio website</p>
        </div>

        <div class="content">
            <div class="field">
                <span class="label">👤 Name</span>
                <div class="value">{{ $contactData['name'] }}</div>
            </div>

            <div class="field">
                <span class="label">📧 Email</span>
                <div class="value">
                    <a href="mailto:{{ $contactData['email'] }}" style="color: #3b82f6; text-decoration: none;">
                        {{ $contactData['email'] }}
                    </a>
                </div>
            </div>

            <div class="field">
                <span class="label">📝 Subject</span>
                <div class="value">{{ $contactData['subject'] }}</div>
            </div>

            <div class="field">
                <span class="label">💬 Message</span>
                <div class="message-content">{{ $contactData['message'] }}</div>
            </div>

            <div class="reply-note">
                <strong>💡 Quick Reply:</strong> You can reply directly to this email to respond to {{ $contactData['name'] }}.
            </div>

            <div class="metadata">
                <div>
                    <strong>📅 Submitted:</strong><br>
                    {{ $contactData['submitted_at']->format('M j, Y \a\t g:i A T') }}
                </div>
                <div>
                    <strong>🌐 IP Address:</strong><br>
                    {{ $contactData['ip_address'] }}
                </div>
            </div>
        </div>

        <div class="footer">
            <p style="margin: 0 0 10px 0;">
                This email was automatically generated from your portfolio contact form.
            </p>
            <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                <strong>User Agent:</strong> {{ Str::limit($contactData['user_agent'], 80) }}
            </p>
        </div>
    </div>
</body>

</html>