<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

/**
 * Contact Controller
 * Handles contact form submissions from the portfolio website
 * Features validation, email sending, and error handling
 *
 * @author Portfolio Project
 *
 * @version 1.0
 */
class ContactController extends Controller
{
    /**
     * Handle contact form submission
     * Validates input data, stores in database, and sends notification email
     *
     * @param  Request  $request  HTTP request with form data
     * @return JsonResponse JSON response with success/error status
     */
    public function store(Request $request): JsonResponse
    {
        // Validar los datos recibidos
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        try {
            // Guardar en la base de datos
            \App\Models\Contact::create([
                'name' => strip_tags(trim($validated['name'])),
                'email' => strtolower(trim($validated['email'])),
                'message' => strip_tags(trim($validated['message'])),
            ]);

            // Enviar email de notificación (comentado por ahora)
            // Mail::to(config('mail.contact.display_email', 'contact@portfolio.dev'))
            //     ->send(new ContactFormMail($validated));

            return response()->json([
                'success' => true,
                'message' => 'Message stored successfully! I will get back to you soon.',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Contact form submission failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'There was an error storing your message. Please try again later or contact me directly.',
            ], 500);
        }
    }

    /**
     * Get contact information
     * Returns public contact information for display on the website
     *
     * @return JsonResponse JSON response with contact details
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
