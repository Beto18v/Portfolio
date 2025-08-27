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
        // Validar los datos recibidos
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|min:10|max:2000',
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

            return response()->json([
                'success' => true,
                'message' => 'Message stored successfully! I will get back to you soon.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'There was an error storing your message. Please try again later or contact me directly.',
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
