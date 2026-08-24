<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'role',
        'role_color',
        'status',
        'status_text',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }
}
