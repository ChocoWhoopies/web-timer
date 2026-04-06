(function () {
    var THEME_KEY = 'webtimer.theme';
    var LANG_KEY = 'webtimer.language';
    var SUPPORTED_THEMES = ['knix', 'haswell'];
    var SUPPORTED_LANGS = ['en', 'pt', 'es', 'el', 'sq'];

    // ─── Translations ────────────────────────────────────────────────────────────

    window.WebTimerTranslations = {
        en: {
            landing_title: 'Welcome to Shared Timer',
            landing_subtitle: 'To start a session, simply add a name to the URL.',
            landing_example: 'Example:',
            landing_description: 'This will create a new timer session that anyone can join and control by visiting the same URL.',
            landing_source: 'Source code:',
            connected_to_room: 'Connected to this room:',
            personal_alarm: 'Personal Alarm',
            alarm_notify_minutes: 'Notify at minutes left',
            alarm_seconds_label: 'Seconds',
            alarm_save: 'Save alarm',
            alarm_browser_only: 'This alarm only applies in this browser.',
            alarm_set_for: 'Alarm set for {time} remaining.',
            alarm_notifications_blocked: ' Browser notifications are blocked, so only sound will play.',
            alarm_sound_enabled: 'Alarm sound enabled.',
            alarm_sound_disabled: 'Alarm sound disabled.',
            alarm_sound_file: 'Personal sound file',
            alarm_test_sound: 'Test sound',
            alarm_use_default: 'Use default sound',
            alarm_using_default: 'Using default alarm sound.',
            alarm_using_custom: 'Using personal sound: {name}. Stored only in this browser.',
            alarm_storage_unavailable: 'Custom sound storage is not available in this browser. Using default alarm sound.',
            alarm_load_error: 'Could not load a saved personal sound. Using default alarm sound.',
            alarm_invalid_file: 'Please choose a valid audio file.',
            alarm_save_error: 'Could not save that sound locally. Using default alarm sound.',
            alarm_remove_error: 'Could not remove the saved personal sound.',
            alarm_preview_blocked: 'Sound preview is blocked until you interact with the page.',
            shared_controls: 'Shared Controls',
            shared_controls_desc: 'These controls affect the timer for everyone in this room.',
            preset_minutes: 'Minutes',
            preset_seconds: 'Seconds',
            btn_subtract_30: 'Subtract 30 seconds',
            btn_add_30: 'Add 30 seconds',
            btn_copy_room: 'Copy room ID',
            btn_copied_room: 'Room ID copied',
            btn_pause: 'Pause or resume timer',
            btn_reset: 'Reset timer',
            btn_start_timer: 'Start timer',
            btn_remove_row: 'Remove timer row',
            btn_add_row: 'Add new timer row',
            btn_sound_enabled: 'Sound enabled',
            btn_sound_disabled: 'Sound disabled',
            btn_enable_sound: 'Enable timer sound',
            btn_disable_sound: 'Disable timer sound',
            signalr_connected: 'Connected',
            signalr_reconnecting: 'Reconnecting...',
            signalr_disconnected: 'Disconnected',
            notification_title: 'WebTimer alarm',
            notification_body: 'Timer reached {time} remaining.',
            nav_home: 'Home',
            nav_theme: 'Theme',
            nav_language: 'Language',
        },
        pt: {
            landing_title: 'Bem-vindo ao Temporizador Partilhado',
            landing_subtitle: 'Para iniciar uma sessão, basta adicionar um nome ao URL.',
            landing_example: 'Exemplo:',
            landing_description: 'Isto irá criar uma nova sessão de temporizador que qualquer pessoa pode entrar e controlar visitando o mesmo URL.',
            landing_source: 'Código fonte:',
            connected_to_room: 'Ligado a esta sala:',
            personal_alarm: 'Alarme Pessoal',
            alarm_notify_minutes: 'Notificar aos minutos restantes',
            alarm_seconds_label: 'Segundos',
            alarm_save: 'Guardar alarme',
            alarm_browser_only: 'Este alarme aplica-se apenas neste navegador.',
            alarm_set_for: 'Alarme definido para {time} restantes.',
            alarm_notifications_blocked: ' As notificações do navegador estão bloqueadas, apenas o som será reproduzido.',
            alarm_sound_enabled: 'Som do alarme ativado.',
            alarm_sound_disabled: 'Som do alarme desativado.',
            alarm_sound_file: 'Ficheiro de som pessoal',
            alarm_test_sound: 'Testar som',
            alarm_use_default: 'Usar som padrão',
            alarm_using_default: 'A usar o som de alarme padrão.',
            alarm_using_custom: 'A usar som pessoal: {name}. Guardado apenas neste navegador.',
            alarm_storage_unavailable: 'O armazenamento de som personalizado não está disponível neste navegador. A usar o som padrão.',
            alarm_load_error: 'Não foi possível carregar o som pessoal guardado. A usar o som padrão.',
            alarm_invalid_file: 'Por favor escolha um ficheiro de áudio válido.',
            alarm_save_error: 'Não foi possível guardar o som localmente. A usar o som padrão.',
            alarm_remove_error: 'Não foi possível remover o som pessoal guardado.',
            alarm_preview_blocked: 'A pré-visualização do som está bloqueada até interagir com a página.',
            shared_controls: 'Controlos Partilhados',
            shared_controls_desc: 'Estes controlos afetam o temporizador para todos nesta sala.',
            preset_minutes: 'Minutos',
            preset_seconds: 'Segundos',
            btn_subtract_30: 'Subtrair 30 segundos',
            btn_add_30: 'Adicionar 30 segundos',
            btn_copy_room: 'Copiar ID da sala',
            btn_copied_room: 'ID da sala copiado',
            btn_pause: 'Pausar ou retomar temporizador',
            btn_reset: 'Reiniciar temporizador',
            btn_start_timer: 'Iniciar temporizador',
            btn_remove_row: 'Remover linha do temporizador',
            btn_add_row: 'Adicionar nova linha do temporizador',
            btn_sound_enabled: 'Som ativado',
            btn_sound_disabled: 'Som desativado',
            btn_enable_sound: 'Ativar som do temporizador',
            btn_disable_sound: 'Desativar som do temporizador',
            signalr_connected: 'Ligado',
            signalr_reconnecting: 'A reconectar...',
            signalr_disconnected: 'Desligado',
            notification_title: 'Alarme WebTimer',
            notification_body: 'O temporizador atingiu {time} restantes.',
            nav_home: 'Início',
            nav_theme: 'Tema',
            nav_language: 'Idioma',
        },
        es: {
            landing_title: 'Bienvenido al Temporizador Compartido',
            landing_subtitle: 'Para iniciar una sesión, simplemente añade un nombre a la URL.',
            landing_example: 'Ejemplo:',
            landing_description: 'Esto creará una nueva sesión de temporizador que cualquiera puede unirse y controlar visitando la misma URL.',
            landing_source: 'Código fuente:',
            connected_to_room: 'Conectado a esta sala:',
            personal_alarm: 'Alarma Personal',
            alarm_notify_minutes: 'Notificar a los minutos restantes',
            alarm_seconds_label: 'Segundos',
            alarm_save: 'Guardar alarma',
            alarm_browser_only: 'Esta alarma solo aplica en este navegador.',
            alarm_set_for: 'Alarma configurada para {time} restantes.',
            alarm_notifications_blocked: ' Las notificaciones del navegador están bloqueadas, solo sonará el audio.',
            alarm_sound_enabled: 'Sonido de alarma activado.',
            alarm_sound_disabled: 'Sonido de alarma desactivado.',
            alarm_sound_file: 'Archivo de sonido personal',
            alarm_test_sound: 'Probar sonido',
            alarm_use_default: 'Usar sonido predeterminado',
            alarm_using_default: 'Usando el sonido de alarma predeterminado.',
            alarm_using_custom: 'Usando sonido personal: {name}. Guardado solo en este navegador.',
            alarm_storage_unavailable: 'El almacenamiento de sonido personalizado no está disponible en este navegador. Usando sonido predeterminado.',
            alarm_load_error: 'No se pudo cargar el sonido personal guardado. Usando sonido predeterminado.',
            alarm_invalid_file: 'Por favor elige un archivo de audio válido.',
            alarm_save_error: 'No se pudo guardar el sonido localmente. Usando sonido predeterminado.',
            alarm_remove_error: 'No se pudo eliminar el sonido personal guardado.',
            alarm_preview_blocked: 'La previsualización del sonido está bloqueada hasta que interactúes con la página.',
            shared_controls: 'Controles Compartidos',
            shared_controls_desc: 'Estos controles afectan el temporizador para todos en esta sala.',
            preset_minutes: 'Minutos',
            preset_seconds: 'Segundos',
            btn_subtract_30: 'Restar 30 segundos',
            btn_add_30: 'Agregar 30 segundos',
            btn_copy_room: 'Copiar ID de sala',
            btn_copied_room: 'ID de sala copiado',
            btn_pause: 'Pausar o reanudar temporizador',
            btn_reset: 'Restablecer temporizador',
            btn_start_timer: 'Iniciar temporizador',
            btn_remove_row: 'Eliminar fila del temporizador',
            btn_add_row: 'Agregar nueva fila de temporizador',
            btn_sound_enabled: 'Sonido activado',
            btn_sound_disabled: 'Sonido desactivado',
            btn_enable_sound: 'Activar sonido del temporizador',
            btn_disable_sound: 'Desactivar sonido del temporizador',
            signalr_connected: 'Conectado',
            signalr_reconnecting: 'Reconectando...',
            signalr_disconnected: 'Desconectado',
            notification_title: 'Alarma WebTimer',
            notification_body: 'El temporizador alcanzó {time} restantes.',
            nav_home: 'Inicio',
            nav_theme: 'Tema',
            nav_language: 'Idioma',
        },
        el: {
            landing_title: 'Καλώς ήρθατε στο Κοινόχρηστο Χρονόμετρο',
            landing_subtitle: 'Για να ξεκινήσετε μια συνεδρία, απλά προσθέστε ένα όνομα στο URL.',
            landing_example: 'Παράδειγμα:',
            landing_description: 'Αυτό θα δημιουργήσει μια νέα συνεδρία χρονομέτρου που ο καθένας μπορεί να συμμετάσχει και να ελέγξει επισκεπτόμενος το ίδιο URL.',
            landing_source: 'Πηγαίος κώδικας:',
            connected_to_room: 'Συνδεδεμένος σε αυτό το δωμάτιο:',
            personal_alarm: 'Προσωπικός Συναγερμός',
            alarm_notify_minutes: 'Ειδοποίηση στα λεπτά που απομένουν',
            alarm_seconds_label: 'Δευτερόλεπτα',
            alarm_save: 'Αποθήκευση συναγερμού',
            alarm_browser_only: 'Αυτός ο συναγερμός ισχύει μόνο σε αυτό το πρόγραμμα περιήγησης.',
            alarm_set_for: 'Συναγερμός ορίστηκε για {time} που απομένουν.',
            alarm_notifications_blocked: ' Οι ειδοποιήσεις του προγράμματος περιήγησης είναι αποκλεισμένες, θα παιχθεί μόνο ήχος.',
            alarm_sound_enabled: 'Ήχος συναγερμού ενεργοποιήθηκε.',
            alarm_sound_disabled: 'Ήχος συναγερμού απενεργοποιήθηκε.',
            alarm_sound_file: 'Προσωπικό αρχείο ήχου',
            alarm_test_sound: 'Δοκιμή ήχου',
            alarm_use_default: 'Χρήση προεπιλεγμένου ήχου',
            alarm_using_default: 'Χρήση προεπιλεγμένου ήχου συναγερμού.',
            alarm_using_custom: 'Χρήση προσωπικού ήχου: {name}. Αποθηκευμένο μόνο σε αυτό το πρόγραμμα περιήγησης.',
            alarm_storage_unavailable: 'Η αποθήκευση προσωπικού ήχου δεν είναι διαθέσιμη σε αυτό το πρόγραμμα περιήγησης. Χρήση προεπιλεγμένου ήχου.',
            alarm_load_error: 'Δεν ήταν δυνατή η φόρτωση του αποθηκευμένου προσωπικού ήχου. Χρήση προεπιλεγμένου ήχου.',
            alarm_invalid_file: 'Παρακαλώ επιλέξτε ένα έγκυρο αρχείο ήχου.',
            alarm_save_error: 'Δεν ήταν δυνατή η τοπική αποθήκευση του ήχου. Χρήση προεπιλεγμένου ήχου.',
            alarm_remove_error: 'Δεν ήταν δυνατή η αφαίρεση του αποθηκευμένου προσωπικού ήχου.',
            alarm_preview_blocked: 'Η προεπισκόπηση ήχου είναι αποκλεισμένη μέχρι να αλληλεπιδράσετε με τη σελίδα.',
            shared_controls: 'Κοινόχρηστοι Έλεγχοι',
            shared_controls_desc: 'Αυτοί οι έλεγχοι επηρεάζουν το χρονόμετρο για όλους σε αυτό το δωμάτιο.',
            preset_minutes: 'Λεπτά',
            preset_seconds: 'Δευτερόλεπτα',
            btn_subtract_30: 'Αφαίρεση 30 δευτερολέπτων',
            btn_add_30: 'Προσθήκη 30 δευτερολέπτων',
            btn_copy_room: 'Αντιγραφή ID δωματίου',
            btn_copied_room: 'Το ID δωματίου αντιγράφηκε',
            btn_pause: 'Παύση ή συνέχεια χρονομέτρου',
            btn_reset: 'Επαναφορά χρονομέτρου',
            btn_start_timer: 'Εκκίνηση χρονομέτρου',
            btn_remove_row: 'Αφαίρεση γραμμής χρονομέτρου',
            btn_add_row: 'Προσθήκη νέας γραμμής χρονομέτρου',
            btn_sound_enabled: 'Ήχος ενεργοποιημένος',
            btn_sound_disabled: 'Ήχος απενεργοποιημένος',
            btn_enable_sound: 'Ενεργοποίηση ήχου χρονομέτρου',
            btn_disable_sound: 'Απενεργοποίηση ήχου χρονομέτρου',
            signalr_connected: 'Συνδεδεμένος',
            signalr_reconnecting: 'Επανασύνδεση...',
            signalr_disconnected: 'Αποσυνδεδεμένος',
            notification_title: 'Συναγερμός WebTimer',
            notification_body: 'Το χρονόμετρο έφτασε στα {time} που απομένουν.',
            nav_home: 'Αρχική',
            nav_theme: 'Θέμα',
            nav_language: 'Γλώσσα',
        },
        sq: {
            landing_title: 'Mirë se vini në Kronometrin e Përbashkët',
            landing_subtitle: 'Për të nisur një sesion, thjesht shtoni një emër në URL.',
            landing_example: 'Shembull:',
            landing_description: 'Kjo do të krijojë një sesion të ri kronometri që kushdo mund ta bashkohet dhe kontrollojë duke vizituar të njëjtën URL.',
            landing_source: 'Kodi burimor:',
            connected_to_room: 'Lidhur me këtë dhomë:',
            personal_alarm: 'Alarmi Personal',
            alarm_notify_minutes: 'Njoftim në minutat e mbetura',
            alarm_seconds_label: 'Sekonda',
            alarm_save: 'Ruaj alarmin',
            alarm_browser_only: 'Ky alarm vlen vetëm në këtë shfletues.',
            alarm_set_for: 'Alarmi u caktua për {time} të mbetura.',
            alarm_notifications_blocked: ' Njoftimet e shfletuesit janë të bllokuara, do të luhet vetëm tingulli.',
            alarm_sound_enabled: 'Tingulli i alarmit u aktivizua.',
            alarm_sound_disabled: 'Tingulli i alarmit u çaktivizua.',
            alarm_sound_file: 'Skedari personal i tingullit',
            alarm_test_sound: 'Testo tingullin',
            alarm_use_default: 'Përdor tingullin parazgjedhur',
            alarm_using_default: 'Duke përdorur tingullin parazgjedhur të alarmit.',
            alarm_using_custom: 'Duke përdorur tingullin personal: {name}. Ruajtur vetëm në këtë shfletues.',
            alarm_storage_unavailable: 'Ruajtja e tingullit personal nuk është e disponueshme në këtë shfletues. Duke përdorur tingullin parazgjedhur.',
            alarm_load_error: 'Nuk u arrit të ngarkohej tingulli personal i ruajtur. Duke përdorur tingullin parazgjedhur.',
            alarm_invalid_file: 'Ju lutemi zgjidhni një skedar audio të vlefshëm.',
            alarm_save_error: 'Nuk u arrit të ruhet tingulli lokalisht. Duke përdorur tingullin parazgjedhur.',
            alarm_remove_error: 'Nuk u arrit të hiqet tingulli personal i ruajtur.',
            alarm_preview_blocked: 'Shikimi paraprak i tingullit është bllokuar derisa të ndërveproni me faqen.',
            shared_controls: 'Kontrollet e Përbashkëta',
            shared_controls_desc: 'Këto kontrolle ndikojnë kronometrin për të gjithë në këtë dhomë.',
            preset_minutes: 'Minuta',
            preset_seconds: 'Sekonda',
            btn_subtract_30: 'Zbrit 30 sekonda',
            btn_add_30: 'Shto 30 sekonda',
            btn_copy_room: 'Kopjo ID-n e dhomës',
            btn_copied_room: 'ID-ja e dhomës u kopjua',
            btn_pause: 'Ndërprit ose rifillo kronometrin',
            btn_reset: 'Rivendos kronometrin',
            btn_start_timer: 'Fillo kronometrin',
            btn_remove_row: 'Hiq rreshtin e kronometrit',
            btn_add_row: 'Shto rresht të ri kronometri',
            btn_sound_enabled: 'Tingulli aktivizuar',
            btn_sound_disabled: 'Tingulli çaktivizuar',
            btn_enable_sound: 'Aktivizo tingullin e kronometrit',
            btn_disable_sound: 'Çaktivizo tingullin e kronometrit',
            signalr_connected: 'Lidhur',
            signalr_reconnecting: 'Duke u rilidhur...',
            signalr_disconnected: 'Shkëputur',
            notification_title: 'Alarmi WebTimer',
            notification_body: 'Kronometri arriti në {time} të mbetura.',
            nav_home: 'Kreu',
            nav_theme: 'Tema',
            nav_language: 'Gjuha',
        },
    };

    // ─── i18n helpers ────────────────────────────────────────────────────────────

    // Set initial language from localStorage immediately so wt_t() works in page scripts
    window.WebTimerCurrentLang = (function () {
        var stored = localStorage.getItem(LANG_KEY);
        return SUPPORTED_LANGS.indexOf(stored) !== -1 ? stored : 'en';
    })();

    /**
     * Translate a key, optionally substituting {placeholder} tokens.
     * @param {string} key
     * @param {Object} [params]
     */
    window.wt_t = function (key, params) {
        var lang = window.WebTimerCurrentLang || 'en';
        var translations = window.WebTimerTranslations;
        var value =
            translations[lang] && translations[lang][key] !== undefined
                ? translations[lang][key]
                : translations.en && translations.en[key] !== undefined
                ? translations.en[key]
                : key;

        if (params && typeof value === 'string') {
            Object.keys(params).forEach(function (k) {
                value = value.replace('{' + k + '}', params[k]);
            });
        }
        return value;
    };

    // ─── Theme ───────────────────────────────────────────────────────────────────

    function applyTheme(theme) {
        if (SUPPORTED_THEMES.indexOf(theme) === -1) theme = 'knix';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        var sel = document.getElementById('themeSelect');
        if (sel) sel.value = theme;
    }

    // ─── Language ────────────────────────────────────────────────────────────────

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            el.textContent = wt_t(el.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
            var val = wt_t(el.getAttribute('data-i18n-label'));
            el.setAttribute('title', val);
            el.setAttribute('aria-label', val);
        });
        document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
            el.setAttribute('title', wt_t(el.getAttribute('data-i18n-title')));
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            el.setAttribute('aria-label', wt_t(el.getAttribute('data-i18n-aria')));
        });
    }

    function applyLanguage(lang) {
        if (SUPPORTED_LANGS.indexOf(lang) === -1) lang = 'en';
        window.WebTimerCurrentLang = lang;
        localStorage.setItem(LANG_KEY, lang);
        document.documentElement.lang = lang;
        applyTranslations();
        var sel = document.getElementById('languageSelect');
        if (sel) sel.value = lang;
        document.dispatchEvent(new CustomEvent('wt-language-changed', { detail: { lang: lang } }));
    }

    // ─── DOM ready ───────────────────────────────────────────────────────────────

    document.addEventListener('DOMContentLoaded', function () {
        // Theme (also applied early in <head>, this just syncs the select)
        var storedTheme = localStorage.getItem(THEME_KEY);
        var defaultTheme = (window.WebTimerDefaultTheme === 'haswell') ? 'haswell' : 'knix';
        applyTheme(SUPPORTED_THEMES.indexOf(storedTheme) !== -1 ? storedTheme : defaultTheme);

        var themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.addEventListener('change', function () {
                applyTheme(themeSelect.value);
            });
        }

        // Language
        applyLanguage(window.WebTimerCurrentLang);

        var langSelect = document.getElementById('languageSelect');
        if (langSelect) {
            langSelect.addEventListener('change', function () {
                applyLanguage(langSelect.value);
            });
        }
    });

    // Expose for page scripts
    window.WebTimerI18n = { applyTheme: applyTheme, applyLanguage: applyLanguage };
})();
