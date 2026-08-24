<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Get paginated messages for a channel with cursor
     */
    public function index(Request $request, string $channelId): JsonResponse
    {
        $limit = $request->input('limit', 50);
        $before = $request->input('before');

        $query = Message::where('channel_id', $channelId)
            ->whereNull('parent_id')
            ->with(['user', 'reactions'])
            ->orderBy('created_at', 'desc');

        if ($before) {
            $query->where('created_at', '<', $before);
        }

        $messages = $query->limit($limit)->get()->reverse()->values();

        return response()->json([
            'data' => $messages,
            'has_more' => $messages->count() === (int)$limit,
        ]);
    }

    /**
     * Store new message and broadcast via Laravel Reverb
     */
    public function store(Request $request, string $channelId): JsonResponse
    {
        $validated = $request->validate([
            'content' => 'required|string|max:5000',
            'parent_id' => 'nullable|exists:messages,id',
        ]);

        $message = Message::create([
            'channel_id' => $channelId,
            'user_id' => $request->user()->id,
            'content' => $validated['content'],
            'parent_id' => $validated['parent_id'] ?? null,
        ]);

        $message->load('user');

        // Broadcast to WebSocket subscribers instantly
        broadcast(new MessageSent($message))->toOthers();

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $message,
        ], 201);
    }

    /**
     * Get thread discussion replies
     */
    public function getThread(string $id): JsonResponse
    {
        $parent = Message::with(['user', 'reactions'])->findOrFail($id);
        $replies = Message::where('parent_id', $id)
            ->with(['user', 'reactions'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'parent' => $parent,
            'replies' => $replies,
        ]);
    }
}
