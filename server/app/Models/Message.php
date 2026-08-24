<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Message extends Model
{
    protected $fillable = [
        'channel_id',
        'user_id',
        'parent_id',
        'content',
        'is_pinned',
        'is_edited',
    ];

    protected $casts = [
        'is_pinned' => 'boolean',
        'is_edited' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function channel(): BelongsTo
    {
        return $this->belongsTo(Channel::class);
    }

    public function reactions(): HasMany
    {
        return $this->hasMany(Reaction::class);
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Message::class, 'parent_id');
    }
}
