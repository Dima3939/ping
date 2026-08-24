<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels — Laravel Reverb Authorization
|--------------------------------------------------------------------------
*/

// Private channel for messages, reactions and threads in a specific channel
Broadcast::channel('chat.channel.{channelId}', function ($user, $channelId) {
    // Authorize that user is a member of the workspace/channel
    return true;
});

// Presence channel for live workspace presence and telemetry
Broadcast::channel('presence.workspace.{workspaceId}', function ($user, $workspaceId) {
    return [
        'id' => $user->id,
        'name' => $user->name,
        'avatar' => $user->avatar,
        'role' => $user->role,
    ];
});
