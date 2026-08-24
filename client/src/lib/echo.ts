// Laravel Echo and Pusher Protocol Client for Laravel Reverb
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<any>;
  }
}

window.Pusher = Pusher;

export const createEchoClient = (options?: {
  wsHost?: string;
  wsPort?: number;
  appKey?: string;
}) => {
  const host = options?.wsHost || import.meta.env.VITE_REVERB_HOST || window.location.hostname;
  const port = options?.wsPort || Number(import.meta.env.VITE_REVERB_PORT) || 8080;
  const key = options?.appKey || import.meta.env.VITE_REVERB_APP_KEY || 'ping_reverb_key';

  try {
    const echoInstance = new Echo({
      broadcaster: 'reverb',
      key: key,
      wsHost: host,
      wsPort: port,
      wssPort: port,
      forceTLS: false,
      enabledTransports: ['ws', 'wss'],
      disableStats: true,
      cluster: 'mt1',
    });

    window.Echo = echoInstance;
    return echoInstance;
  } catch {
    return null;
  }
};
