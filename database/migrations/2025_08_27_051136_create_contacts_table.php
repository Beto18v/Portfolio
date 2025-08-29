<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Create Contacts Table Migration
 * Creates the database table for storing portfolio contact form submissions
 * Stores visitor information and messages for later review
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     * Creates the contacts table with necessary fields for contact form data
     */
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();                           // Primary key
            $table->string('name');                 // Visitor's full name
            $table->string('email');                // Visitor's email address
            $table->text('message');                // Contact message content
            $table->timestamps();                   // Created and updated timestamps
        });
    }

    /**
     * Reverse the migrations.
     * Drops the contacts table if migration is rolled back
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
