export type Lang = "en" | "ru" | "de";

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Hero
    "hero.title_1": "CALCUL",
    "hero.title_1_accent": "ATED",
    "hero.title_2": "CORPO",
    "hero.title_2_accent": "REA",
    "hero.title_2_end": "LITY",
    "hero.ref": "SPECIMEN_REF: CC-2025 / SHADOW_ARCHIVE",
    "hero.status": "STATUS: ACTIVE",
    "hero.subtitle": "CALCULATED CORPOREALITY / 2025",
    "hero.scroll": "↓ SCROLL TO ENTER ARCHIVE",
    "hero.canvas": "SURFACE_DEFORMATION_MODULE / MOVE CURSOR",

    // Section 01 - Manifesto
    "s01.label": "SECTION 01 / MANIFESTO",
    "s01.title_1": "DIGITAL",
    "s01.title_2": "BODY",
    "s01.body": "In an era of total visibility, even a shadow becomes an object of control. Today, the act of observation is delegated to machine code, yet the algorithm does not seek a hidden truth — it produces its own reality. Faced with a data deficit in the form of a flat silhouette, AI turns to the latent space — a colossal archive of digitized human forms and textures. Falling into algorithmic hallucination, the machine forcibly reconstructs volume where there is none. The subject is reduced to the state of digital biomass — raw material from which the system, like Frankenstein, stitches together an algorithmic chimera (simulacrum). This synthetic construct has nothing in common with your genuine anatomy, but to the machine, it becomes more real than you are. The project literalizes the basic mechanics of digital violence. The simple act of casting a shadow on a wall transforms into an act of non-consensual exposure. Our informational vulnerability is exploited by the system: the algorithmic gaze, historically shaped as patriarchal and objectifying, forcibly imposes flesh onto the shadow. The practices of creating deepfakes and generating naked bodies are not a system failure, but a direct consequence of this new technological paradigm. Software code evolves, automating the mechanisms of violence and turning our physical presence into a weapon against ourselves.",
    "s01.body_1": "In an era of total visibility, even a shadow becomes an object of control. Today, the act of observation is delegated to machine code, yet the algorithm does not seek a hidden truth — it produces its own reality.",
    "s01.body_2": "Faced with a data deficit in the form of a flat silhouette, AI turns to the latent space — a colossal archive of digitized human forms and textures. Falling into algorithmic hallucination, the machine forcibly reconstructs volume where there is none.",
    "s01.body_3": "The subject is reduced to the state of digital biomass — raw material from which the system, like Frankenstein, stitches together an algorithmic chimera. This synthetic construct has nothing in common with your genuine anatomy, but to the machine, it becomes more real than you are.",
    "s01.body_4": "The project literalizes the basic mechanics of digital violence. The simple act of casting a shadow on a wall transforms into an act of non-consensual exposure. The practices of creating deepfakes and generating naked bodies are not a system failure, but a direct consequence of this new technological paradigm. Software code evolves, automating the mechanisms of violence and turning our physical presence into a weapon against ourselves.",
    "s01.scan": "SCANNING...",

    // Section 02 - Terms
    "s02.label": "SECTION 02 / THEORY",
    "s02.title_1": "TERM",
    "s02.title_2": "S",
    
    "term1.label": "ABJECTION (DIGITAL REJECTION)",
    "term1.def": "The process of turning a living human into an alien object. Your shadow is part of you, but when the algorithm forcibly reconstructs a 3D model from it, this double ceases to be you. It becomes a terrifying 'data cadaver'. This confronts the viewer with the fact that the system sees us not as individuals, but as raw biomass devoid of humanity.",
    
    "term2.label": "ALGORITHMIC VOYEURISM",
    "term2.def": "A system of total surveillance where observation is automated. Importantly: the machine has no desires; there is always a human behind its architecture. Developers and corporations encoded the 'right' to analyze and classify other people's bodies. Algorithmic voyeurism is a patriarchal and objectifying gaze translated into mathematics, spying on you by the will of its creators.",
    
    "term3.label": "HALLUCINATION MECHANISM",
    "term3.def": "A technical glitch turned into a method. When a neural network receives a flat shadow (a silhouette without depth details), it lacks the data for an accurate response. Instead of stopping, the algorithm mathematically 'completes' reality. It randomly stitches together fragments of hundreds of thousands of other bodies, creating unnatural volume and hallucinating flesh where there was only emptiness.",
    
    "term4.label": "LATENT SPACE",
    "term4.def": "A hidden multidimensional archive on which the neural network was trained. It is a colossal database containing millions of human forms, poses, and textures dismantled into pixels. This mathematical 'graveyard' of images is the reservoir from which the algorithm blindly draws foreign fragments to stretch over the contour of your shadow.",
    
    "term5.label": "NON-CONSENSUALITY",
    "term5.def": "The foundational principle of modern machine vision systems. Data is extracted, processed, and sexualized (as in deepfakes) without the conscious consent of the subject. Your mere presence in the camera's field of view is automatically interpreted by the system's architecture as consent to a digital autopsy.",

    // Section 03 - Archive
    "s03.label": "SECTION 03 / THE ARCHIVE",
    "s03.title_1": "ARCHIVE",
    "s03.title_2": "OF IMPRINTS",
    "s03.empty": "NO IMPRINTS IN ARCHIVE",
    "s03.source": "SOURCE SHADOW",
    "s03.result": "FINAL MANIFESTATION",

    // Footer
    "footer.left": "CALCULATED CORPOREALITY / 2025",
    "footer.right": "SHADOW ARCHIVE v2.0.0",

    // Nav & Admin UI
    "nav.hero": "00",
    "nav.trace": "01",
    "nav.theory": "02",
    "nav.archive": "03",

    "admin.title": "ADMIN PANEL",
    "admin.login": "AUTHENTICATE",
    "admin.email": "EMAIL",
    "admin.password": "PASSWORD",
    "admin.signin": "SIGN IN",
    "admin.logout": "LOGOUT",
    "admin.upload_title": "TITLE",
    "admin.upload_desc": "DESCRIPTION",
    "admin.shadow": "SOURCE SHADOW",
    "admin.result": "FINAL MANIFESTATION",
    "admin.submit": "UPLOAD IMPRINT",
    "admin.uploading": "UPLOADING...",
    "admin.success": "IMPRINT ARCHIVED",
    "admin.error": "ERROR",
    "admin.manage": "MANAGE IMPRINTS",
    "admin.delete": "DELETE",
    "admin.no_imprints": "NO IMPRINTS YET",
  },
  ru: {
    "hero.title_1": "ВЫЧИСЛ",
    "hero.title_1_accent": "ЕННАЯ",
    "hero.title_2": "ТЕЛ",
    "hero.title_2_accent": "ЕСН",
    "hero.title_2_end": "ОСТЬ",
    "hero.ref": "ЭКЗЕМПЛЯР: CC-2025 / АРХИВ_ТЕНЕЙ",
    "hero.status": "СТАТУС: АКТИВЕН",
    "hero.subtitle": "ВЫЧИСЛЕННАЯ ТЕЛЕСНОСТЬ / 2025",
    "hero.scroll": "↓ ПРОКРУТИТЕ ДЛЯ ВХОДА В АРХИВ",
    "hero.canvas": "МОДУЛЬ_ДЕФОРМАЦИИ_ПОВЕРХНОСТИ / ДВИГАЙТЕ КУРСОР",

    "s01.label": "РАЗДЕЛ 01 / МАНИФЕСТ",
    "s01.title_1": "ЦИФРОВОЕ",
    "s01.title_2": "ТЕЛО",
    "s01.body": "В эпоху тотальной видимости даже тень становится объектом контроля. Сегодня акт наблюдения делегирован машинному коду, однако алгоритм не ищет скрытую истину — он производит собственную реальность. Столкнувшись с дефицитом данных в виде плоского силуэта, ИИ обращается к латентному пространству — колоссальному архиву оцифрованных человеческих форм и текстур. Впадая в алгоритмическую галлюцинацию, машина принудительно реконструирует объем там, где его нет. Субъект при этом низводится до состояния цифровой биомассы — сырья, из которого система, как Франкенштейн, сшивает алгоритмическую химеру (симулякр). Этот синтетический конструкт не имеет ничего общего с вашей подлинной анатомией, но для машины он становится реальнее вас самих. Проект буквализирует базовую механику цифрового насилия. Обычное отбрасывание тени на стену трансформируется в акт неконсенсуального обнажения. Наша информационная уязвимость эксплуатируется системой: алгоритмический взгляд, исторически сформированный как патриархальный и объективирующий, насильно навязывает тени плоть. Практики создания дипфейков и генерации обнаженных тел — это прямое следствие этой новой технологической парадигмы. Программный код эволюционирует, автоматизируя механизмы насилия и превращая наше физическое присутствие в оружие против нас самих.",
    "s01.body_1": "В эпоху тотальной видимости даже тень становится объектом контроля. Сегодня акт наблюдения делегирован машинному коду, однако алгоритм не ищет скрытую истину — он производит собственную реальность.",
    "s01.body_2": "Столкнувшись с дефицитом данных в виде плоского силуэта, ИИ обращается к латентному пространству — колоссальному архиву оцифрованных человеческих форм и текстур. Впадая в алгоритмическую галлюцинацию, машина принудительно реконструирует объем там, где его нет.",
    "s01.body_3": "Субъект при этом низводится до состояния цифровой биомассы — сырья, из которого система, как Франкенштейн, сшивает алгоритмическую химеру. Этот синтетический конструкт не имеет ничего общего с вашей подлинной анатомией, но для машины он становится реальнее вас самих.",
    "s01.body_4": "Проект буквализирует базовую механику цифрового насилия. Обычное отбрасывание тени на стену трансформируется в акт неконсенсуального обнажения. Практики создания дипфейков и генерации обнаженных тел — это прямое следствие этой новой технологической парадигмы. Программный код эволюционирует, автоматизируя механизмы насилия и превращая наше физическое присутствие в оружие против нас самих.",
    "s01.scan": "СКАНИРОВАНИЕ...",

    "s02.label": "РАЗДЕЛ 02 / ТЕОРИЯ",
    "s02.title_1": "ТЕРМ",
    "s02.title_2": "ИНЫ",
    
    "term1.label": "АБЪЕКЦИЯ (ЦИФРОВОЕ ОТТОРЖЕНИЕ)",
    "term1.def": "Процесс превращения живого человека в чужеродный объект. Ваша тень — это часть вас, но когда алгоритм принудительно реконструирует из неё 3D-модель, этот двойник перестает быть вами. Он становится пугающим «информационным трупом». Это столкновение зрителя с тем фактом, что система видит в нас не личность, а лишь сырьевую биомассу, лишенную человечности.",
    
    "term2.label": "АЛГОРИТМИЧЕСКИЙ ВУАЙЕРИЗМ",
    "term2.def": "Система тотального надзора, в которой автоматизирован процесс наблюдения. Важно понимать: машина не обладает желаниями, за её архитектурой всегда стоит человек. Это разработчики и корпорации заложили в код «право» анализировать и классифицировать чужие тела. Алгоритмический вуайеризм — это переведенный в математику патриархальный и объективирующий взгляд, который подсматривает за вами по воле своих создателей.",
    
    "term3.label": "МЕХАНИЗМ ГАЛЛЮЦИНАЦИИ",
    "term3.def": "Технический сбой, превращенный в метод. Когда нейросеть получает на вход плоскую тень (силуэт без деталей глубины), ей не хватает данных для точного ответа. Вместо того чтобы остановиться, алгоритм математически «достраивает» реальность. Он случайным образом сшивает фрагменты сотен тысяч других тел, создавая неестественный объем и галлюцинируя плоть там, где была только пустота.",
    
    "term4.label": "ЛАТЕНТНОЕ ПРОСТРАНСТВО",
    "term4.def": "Скрытый многомерный архив, на котором обучалась нейросеть. Это колоссальная база данных, содержащая миллионы разобранных на пиксели человеческих форм, поз и текстур. Это математическое «кладбище» изображений является тем самым резервуаром, из которого алгоритм слепо черпает чужие фрагменты, чтобы натянуть их на контур вашей тени.",
    
    "term5.label": "НЕКОНСЕНСУАЛЬНОСТЬ",
    "term5.def": "Базовый принцип работы современных систем машинного зрения. Данные извлекаются, обрабатываются и сексуализируются (как в случае с дипфейками) без осознанного согласия субъекта. Само ваше присутствие в поле зрения камеры автоматически трактуется архитектурой системы как согласие на цифровое вскрытие.",

    "s03.label": "РАЗДЕЛ 03 / АРХИВ",
    "s03.title_1": "АРХИВ",
    "s03.title_2": "ОТПЕЧАТКОВ",
    "s03.empty": "В АРХИВЕ НЕТ ОТПЕЧАТКОВ",
    "s03.source": "ИСХОДНАЯ ТЕНЬ",
    "s03.result": "ФИНАЛЬНОЕ ПРОЯВЛЕНИЕ",

    "footer.left": "ВЫЧИСЛЕННАЯ ТЕЛЕСНОСТЬ / 2025",
    "footer.right": "АРХИВ ТЕНЕЙ v2.0.0",

    "nav.hero": "00",
    "nav.trace": "01",
    "nav.theory": "02",
    "nav.archive": "03",

    "admin.title": "ПАНЕЛЬ УПРАВЛЕНИЯ",
    "admin.login": "АУТЕНТИФИКАЦИЯ",
    "admin.email": "EMAIL",
    "admin.password": "ПАРОЛЬ",
    "admin.signin": "ВОЙТИ",
    "admin.logout": "ВЫХОД",
    "admin.upload_title": "НАЗВАНИЕ",
    "admin.upload_desc": "ОПИСАНИЕ",
    "admin.shadow": "ИСХОДНАЯ ТЕНЬ",
    "admin.result": "ФИНАЛЬНОЕ ПРОЯВЛЕНИЕ",
    "admin.submit": "ЗАГРУЗИТЬ ОТПЕЧАТОК",
    "admin.uploading": "ЗАГРУЗКА...",
    "admin.success": "ОТПЕЧАТОК АРХИВИРОВАН",
    "admin.error": "ОШИБКА",
    "admin.manage": "УПРАВЛЕНИЕ ОТПЕЧАТКАМИ",
    "admin.delete": "УДАЛИТЬ",
    "admin.no_imprints": "ОТПЕЧАТКОВ ПОКА НЕТ",
  },
  de: {
    "hero.title_1": "BERE",
    "hero.title_1_accent": "CHNETE",
    "hero.title_2": "KÖRPER",
    "hero.title_2_accent": "LICH",
    "hero.title_2_end": "KEIT",
    "hero.ref": "PROBEN_REF: CC-2025 / SCHATTEN_ARCHIV",
    "hero.status": "STATUS: AKTIV",
    "hero.subtitle": "BERECHNETE KÖRPERLICHKEIT / 2025",
    "hero.scroll": "↓ SCROLLEN ZUM ARCHIV",
    "hero.canvas": "OBERFLÄCHENDEFORMATIONSMODUL / CURSOR BEWEGEN",

    "s01.label": "ABSCHNITT 01 / MANIFEST",
    "s01.title_1": "DIGITALER",
    "s01.title_2": "KÖRPER",
    "s01.body": "In einer Ära totaler Sichtbarkeit wird selbst ein Schatten zum Objekt der Kontrolle. Heute wird der Akt der Beobachtung an Maschinencode delegiert, doch der Algorithmus sucht nicht nach der verborgenen Wahrheit — er produziert seine eigene Realität. Konfrontiert mit einem Datendefizit in Form einer flachen Silhouette greift die KI auf den latenten Raum zurück — ein kolossales Archiv digitalisierter menschlicher Formen und Texturen. In algorithmische Halluzinationen verfallend, rekonstruiert die Maschine gewaltsam Volumen, wo keines ist. Das Subjekt wird dabei auf den Zustand digitaler Biomasse reduziert — Rohmaterial, aus dem das System wie Frankenstein eine algorithmische Schimäre (Simulakrum) zusammennäht. Dieses synthetische Konstrukt hat nichts mit Ihrer wahren Anatomie gemein, aber für die Maschine wird es realer als Sie selbst. Das Projekt buchstabiert die grundlegende Mechanik digitaler Gewalt aus. Der einfache Akt, einen Schatten auf eine Wand zu werfen, verwandelt sich in einen Akt nicht-konsensueller Entblößung. Unsere informationelle Verwundbarkeit wird vom System ausgenutzt: Der algorithmische Blick, der historisch als patriarchalisch und objektivierend geformt wurde, zwingt dem Schatten gewaltsam Fleisch auf. Die Praktiken der Erstellung von Deepfakes und der Generierung nackter Körper sind kein Systemfehler, sondern eine direkte Folge dieses neuen technologischen Paradigmas. Softwarecode entwickelt sich weiter, automatisiert die Mechanismen der Gewalt und verwandelt unsere physische Präsenz in eine Waffe gegen uns selbst.",
    "s01.body_1": "In einer Ära totaler Sichtbarkeit wird selbst ein Schatten zum Objekt der Kontrolle. Heute wird der Akt der Beobachtung an Maschinencode delegiert, doch der Algorithmus sucht nicht nach der verborgenen Wahrheit — er produziert seine eigene Realität.",
    "s01.body_2": "Konfrontiert mit einem Datendefizit in Form einer flachen Silhouette greift die KI auf den latenten Raum zurück — ein kolossales Archiv digitalisierter menschlicher Formen und Texturen. In algorithmische Halluzinationen verfallend, rekonstruiert die Maschine gewaltsam Volumen, wo keines ist.",
    "s01.body_3": "Das Subjekt wird dabei auf den Zustand digitaler Biomasse reduziert — Rohmaterial, aus dem das System wie Frankenstein eine algorithmische Schimäre zusammennäht. Dieses synthetische Konstrukt hat nichts mit Ihrer wahren Anatomie gemein, aber für die Maschine wird es realer als Sie selbst.",
    "s01.body_4": "Das Projekt buchstabiert die grundlegende Mechanik digitaler Gewalt aus. Der einfache Akt, einen Schatten auf eine Wand zu werfen, verwandelt sich in einen Akt nicht-konsensueller Entblößung. Die Praktiken der Erstellung von Deepfakes und der Generierung nackter Körper sind kein Systemfehler, sondern eine direkte Folge dieses neuen technologischen Paradigmas. Softwarecode entwickelt sich weiter, automatisiert die Mechanismen der Gewalt und verwandelt unsere physische Präsenz in eine Waffe gegen uns selbst.",
    "s01.scan": "SCANNEN...",

    "s02.label": "ABSCHNITT 02 / THEORIE",
    "s02.title_1": "BEGRI",
    "s02.title_2": "FFE",
    
    "term1.label": "ABJEKTION (DIGITALE ABLEHNUNG)",
    "term1.def": "Der Prozess, einen lebenden Menschen in ein fremdes Objekt zu verwandeln. Ihr Schatten ist ein Teil von Ihnen, aber wenn der Algorithmus gewaltsam ein 3D-Modell daraus rekonstruiert, hört dieser Doppelgänger auf, Sie zu sein. Er wird zu einer erschreckenden 'Datenleiche'. Dies konfrontiert den Betrachter mit der Tatsache, dass das System in uns keine Individuen, sondern nur rohe Biomasse ohne Menschlichkeit sieht.",
    
    "term2.label": "ALGORITHMISCHER VOYEURISMUS",
    "term2.def": "Ein System totaler Überwachung, in dem der Beobachtungsprozess automatisiert ist. Wichtig zu verstehen: Die Maschine hat keine Wünsche; hinter ihrer Architektur steht immer ein Mensch. Entwickler und Konzerne haben das 'Recht', fremde Körper zu analysieren und zu klassifizieren, in den Code einprogrammiert. Algorithmischer Voyeurismus ist ein in Mathematik übersetzter patriarchalischer und objektivierender Blick, der Sie nach dem Willen seiner Schöpfer ausspioniert.",
    
    "term3.label": "HALLUZINATIONSMECHANISMUS",
    "term3.def": "Ein technischer Fehler, der zur Methode wurde. Wenn ein neuronales Netzwerk einen flachen Schatten (eine Silhouette ohne Tiefendetails) erhält, fehlen ihm die Daten für eine genaue Antwort. Anstatt anzuhalten, 'vervollständigt' der Algorithmus die Realität mathematisch. Er näht zufällig Fragmente von Hunderttausenden anderer Körper zusammen, erzeugt unnatürliches Volumen und halluziniert Fleisch, wo nur Leere war.",
    
    "term4.label": "LATENTER RAUM",
    "term4.def": "Ein verborgenes, mehrdimensionales Archiv, in dem das neuronale Netzwerk trainiert wurde. Es ist eine kolossale Datenbank, die Millionen von in Pixel zerlegten menschlichen Formen, Posen und Texturen enthält. Dieser mathematische 'Friedhof' von Bildern ist das Reservoir, aus dem der Algorithmus blind fremde Fragmente schöpft, um sie über die Kontur Ihres Schattens zu spannen.",
    
    "term5.label": "FEHLENDER KONSENS (NON-KONSENSUALITÄT)",
    "term5.def": "Das Grundprinzip moderner maschineller Sichtsysteme. Daten werden extrahiert, verarbeitet und sexualisiert (wie bei Deepfakes), ohne die bewusste Zustimmung des Subjekts. Allein Ihre Anwesenheit im Sichtfeld der Kamera wird von der Systemarchitektur automatisch als Zustimmung zu einer digitalen Autopsie interpretiert.",

    "s03.label": "ABSCHNITT 03 / DAS ARCHIV",
    "s03.title_1": "ARCHIV",
    "s03.title_2": "DER ABDRÜCKE",
    "s03.empty": "KEINE ABDRÜCKE IM ARCHIV",
    "s03.source": "QUELLSCHATTEN",
    "s03.result": "FINALE MANIFESTATION",

    "footer.left": "BERECHNETE KÖRPERLICHKEIT / 2025",
    "footer.right": "SCHATTENARCHIV v2.0.0",

    "nav.hero": "00",
    "nav.trace": "01",
    "nav.theory": "02",
    "nav.archive": "03",

    "admin.title": "ADMIN-PANEL",
    "admin.login": "AUTHENTIFIZIERUNG",
    "admin.email": "E-MAIL",
    "admin.password": "PASSWORT",
    "admin.signin": "ANMELDEN",
    "admin.logout": "ABMELDEN",
    "admin.upload_title": "TITEL",
    "admin.upload_desc": "BESCHREIBUNG",
    "admin.shadow": "QUELLSCHATTEN",
    "admin.result": "FINALE MANIFESTATION",
    "admin.submit": "ABDRUCK HOCHLADEN",
    "admin.uploading": "WIRD HOCHGELADEN...",
    "admin.success": "ABDRUCK ARCHIVIERT",
    "admin.error": "FEHLER",
    "admin.manage": "ABDRÜCKE VERWALTEN",
    "admin.delete": "LÖSCHEN",
    "admin.no_imprints": "NOCH KEINE ABDRÜCKE",
  },
};
