<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ReactionUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public int|string $channelId,
        public int|string $messageId,
        public string $emoji,
        public int|string $userId,
        public string $action // 'added' | 'removed'
    ) {
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("chat.channel.{$this->channelId}")
        ];
    }

    public function broadcastAs(): string
    {
        return 'reaction.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'message_id' => $this->messageId,
            'emoji' => $this->emoji,
            'user_id' => $this->userId,
            'action' => $this->action,
        ];
    }
}
