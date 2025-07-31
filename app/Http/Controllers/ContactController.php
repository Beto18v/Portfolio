<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Mail\ContactFormMail;

/**
 * Contact Controller
 * Handles contact form submissions from the portfolio website
 * Features validation, email sending, and error handling
 */
class ContactController extends Controller
{
    /**
     * Handle contact form submission
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|min:5|max:255',
            'message' => 'required|string|min:10|max:2000',
        ], [
            'name.required' => 'Name is required',
            'name.min' => 'Name must be at least 2 characters',
            'name.max' => 'Name must not exceed 255 characters',
            'email.required' => 'Email is required',
            'email.email' => 'Please enter a valid email address',
            'email.max' => 'Email must not exceed 255 characters',
            'subject.required' => 'Subject is required',
            'subject.min' => 'Subject must be at least 5 characters',
            'subject.max' => 'Subject must not exceed 255 characters',
            'message.required' => 'Message is required',
            'message.min' => 'Message must be at least 10 characters',
            'message.max' => 'Message must not exceed 2000 characters',
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        try {
            // Sanitize and prepare data
            $contactData = [
                'name' => strip_tags(trim($validated['name'])),
                'email' => strtolower(trim($validated['email'])),
                'subject' => strip_tags(trim($validated['subject'])),
                'message' => strip_tags(trim($validated['message'])),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'submitted_at' => now(),
            ];

            // Send email notification
            Mail::to(config('mail.contact.to', 'your-email@example.com'))
                ->send(new ContactFormMail($contactData));

            // Log successful contact form submission
            Log::info('Contact form submitted successfully', [
                'name' => $contactData['name'],
                'email' => $contactData['email'],
                'subject' => $contactData['subject'],
                'ip' => $contactData['ip_address'],
            ]);

            // Optional: Store in database for future reference
            // ContactSubmission::create($contactData);

            return response()->json([
                'success' => true,
                'message' => 'Message sent successfully! I will get back to you soon.',
            ], 200);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Contact form submission failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->only(['name', 'email', 'subject']),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'There was an error sending your message. Please try again later or contact me directly.',
            ], 500);
        }
    }

    /**
     * Get contact information
     * Returns public contact information for display
     * 
     * @return JsonResponse
     */
    public function show(): JsonResponse
    {
        return response()->json([
            'contact_info' => [
                'email' => config('mail.contact.display_email', 'your-email@example.com'),
                'phone' => config('contact.phone', ''),
                'location' => config('contact.location', ''),
                'social_links' => [
                    'github' => config('contact.social.github', ''),
                    'linkedin' => config('contact.social.linkedin', ''),
                    'twitter' => config('contact.social.twitter', ''),
                ],
            ],
        ]);
    }
}
