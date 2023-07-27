interface configType {
    API_URL: string;
    BASE_URL: string;
    CHAT_URL: string;
    NOTIFICATION_URL: string;
}

const API_URL = window?._env_?.REACT_APP_API_URL
    ? `${window?._env_?.REACT_APP_API_URL}/api`
    : 'https://testapi.reelcruit.com/api';
const CHAT_URL = window?._env_?.REACT_APP_API_URL
    ? `${window?._env_?.REACT_APP_API_URL}/chat`
    : 'https://localhost:5001/chat';
const NOTIFICATION_URL = window?._env_?.REACT_APP_API_URL
    ? `${window?._env_?.REACT_APP_API_URL}/notifications`
    : 'https://localhost:5001/notifications';

const config: configType = {
    API_URL: API_URL,
    BASE_URL: window?.location.origin || 'http://localhost:3000/',
    CHAT_URL: CHAT_URL,
    NOTIFICATION_URL: NOTIFICATION_URL,
};

declare global {
    interface Window {
        _env_: any;
    }
}

export default config;
