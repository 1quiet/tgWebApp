// src/types/telegram.d.ts
export { }; // Это нужно для модуля

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                initData: string;
                initDataUnsafe: {
                    user?: {
                        id: number;
                        first_name: string;
                        last_name?: string;
                        username?: string;
                        language_code?: string;
                        is_premium?: boolean;
                    };
                    query_id?: string;
                    auth_date?: string;
                    hash?: string;
                };
                version: string;
                platform: string;
                colorScheme: 'light' | 'dark';
                themeParams: {
                    bg_color?: string;
                    text_color?: string;
                    hint_color?: string;
                    link_color?: string;
                    button_color?: string;
                    button_text_color?: string;
                    secondary_bg_color?: string;
                };
                isExpanded: boolean;
                viewportHeight: number;
                viewportStableHeight: number;

                // Методы
                ready: () => void;
                expand: () => void;
                close: () => void;
                sendData: (data: string) => void;
                openLink: (url: string) => void;
                openTelegramLink: (url: string) => void;
                openInvoice: (url: string, callback?: (status: string) => void) => void;
                showPopup: (params: any, callback?: (button_id: string) => void) => void;
                showAlert: (message: string, callback?: () => void) => void;
                showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;

                // События
                onEvent: (eventType: string, eventHandler: Function) => void;
                offEvent: (eventType: string, eventHandler: Function) => void;

                // Вибрация
                HapticFeedback: {
                    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
                    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
                    selectionChanged: () => void;
                };

                // Дополнительно
                MainButton: any;
                BackButton: any;
                SettingsButton: any;
                cloudStorage: any;
                biometryManager: any;
            };
        };
    }
}