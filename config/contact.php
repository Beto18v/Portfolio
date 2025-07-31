<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Contact Information
    |--------------------------------------------------------------------------
    |
    | Here you can configure your contact information that will be displayed
    | on your portfolio website. This includes email, phone, location, and
    | social media links.
    |
    */

    'email' => env('CONTACT_EMAIL', 'your-email@example.com'),
    'display_email' => env('CONTACT_DISPLAY_EMAIL', 'your-email@example.com'),
    'phone' => env('CONTACT_PHONE', ''),
    'location' => env('CONTACT_LOCATION', ''),

    /*
    |--------------------------------------------------------------------------
    | Social Media Links
    |--------------------------------------------------------------------------
    |
    | Configure your social media profiles. Leave empty to hide the links.
    |
    */

    'social' => [
        'github' => env('CONTACT_GITHUB', ''),
        'linkedin' => env('CONTACT_LINKEDIN', ''),
        'twitter' => env('CONTACT_TWITTER', ''),
        'instagram' => env('CONTACT_INSTAGRAM', ''),
        'facebook' => env('CONTACT_FACEBOOK', ''),
        'youtube' => env('CONTACT_YOUTUBE', ''),
        'behance' => env('CONTACT_BEHANCE', ''),
        'dribbble' => env('CONTACT_DRIBBBLE', ''),
    ],

    /*
    |--------------------------------------------------------------------------
    | Contact Form Settings
    |--------------------------------------------------------------------------
    |
    | Settings for the contact form functionality.
    |
    */

    'form' => [
        'rate_limit' => env('CONTACT_RATE_LIMIT', 5), // Max submissions per hour per IP
        'enable_honeypot' => env('CONTACT_HONEYPOT', true), // Anti-spam honeypot
        'enable_recaptcha' => env('CONTACT_RECAPTCHA', false), // Google reCAPTCHA
        'auto_reply' => env('CONTACT_AUTO_REPLY', true), // Send auto-reply to sender
    ],

];
