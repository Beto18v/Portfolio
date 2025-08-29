<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Contact Model
 * Represents contact form submissions stored in the database
 * Handles data validation and storage for portfolio contact messages
 *
 * @author Portfolio Project
 *
 * @version 1.0
 */
class Contact extends Model
{
    /**
     * The attributes that are mass assignable.
     * Only these fields can be filled using Contact::create() or fill()
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',     // Visitor's full name
        'email',    // Visitor's email address
        'message',  // Contact message content
    ];

    /**
     * The attributes that should be cast.
     * Automatic type conversion for database fields
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',  // Message submission timestamp
        'updated_at' => 'datetime',  // Last modification timestamp
    ];
}
