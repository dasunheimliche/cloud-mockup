const metricsTrans = {
  header: {
    uk: "METRICS",
    es: "MÉTRICAS",
    it: "METRICHE",
    fr: "MÉTRIQUES",
    de: "KENNZAHLEN",
    pt: "MÉTRICAS",
  },
  gridPower: {
    title: {
      uk: "Grid Power",
      es: "Energía de Red",
      it: "Potenza della Rete",
      fr: "Puissance du Réseau",
      de: "Netzleistung",
      pt: "Energia da Rede",
    },
    sub: {
      uk: "Consumed vs. Max. Limit",
      es: "Consumido vs. Límite Máx.",
      it: "Consumato vs. Limite Max.",
      fr: "Consommé vs. Limite Max.",
      de: "Verbraucht vs. Max. Grenze",
      pt: "Consumido vs. Limite Máx.",
    },
    connected: {
      uk: "Connected",
      es: "Conectado",
      it: "Connesso",
      fr: "Connecté",
      de: "Verbunden",
      pt: "Conectado",
    },
  },
  pvPower: {
    title: {
      uk: "PV Power",
      es: "Energía FV",
      it: "Potenza FV",
      fr: "Puissance PV",
      de: "PV-Leistung",
      pt: "Energia FV",
    },
    sub: {
      uk: "Current vs. Max. Production",
      es: "Actual vs. Producción Máx.",
      it: "Attuale vs. Produzione Max.",
      fr: "Actuelle vs. Production Max.",
      de: "Aktuell vs. Max. Produktion",
      pt: "Atual vs. Produção Máx.",
    },
    connected: {
      uk: "Connected",
      es: "Conectado",
      it: "Connesso",
      fr: "Connecté",
      de: "Verbunden",
      pt: "Conectado",
    },
  },
  storage: {
    title: {
      uk: "Storage",
      es: "Almacenamiento",
      it: "Stoccaggio",
      fr: "Stockage",
      de: "Speicherung",
      pt: "Armazenamento",
    },
    sub: {
      uk: "Current charge percentage",
      es: "Porcentaje de carga actual",
      it: "Percentuale di carica attuale",
      fr: "Pourcentage de charge actuel",
      de: "Aktueller Ladeprozentsatz",
      pt: "Percentual de carga atual",
    },
    connected: {
      uk: "Connected",
      es: "Conectado",
      it: "Connesso",
      fr: "Connecté",
      de: "Verbunden",
      pt: "Conectado",
    },
  },
  totalUsage: {
    title: {
      uk: "Total Power Usage",
      es: "Uso Total de Energía",
      it: "Consumo Totale di Energia",
      fr: "Utilisation Totale de l'Énergie",
      de: "Gesamtenergieverbrauch",
      pt: "Uso Total de Energia",
    },
    sub: {
      uk: "Monthly Power Usage",
      es: "Uso Mensual de Energía",
      it: "Consumo Mensile di Energia",
      fr: "Utilisation Mensuelle de l'Énergie",
      de: "Monatlicher Energieverbrauch",
      pt: "Uso Mensal de Energia",
    },
  },
  production: {
    title: {
      uk: "Energy Production",
      es: "Producción de Energía",
      it: "Produzione di Energia",
      fr: "Production d'Énergie",
      de: "Energieproduktion",
      pt: "Produção de Energia",
    },
    sub: {
      uk: "Produced vs. Consumed Energy",
      es: "Energía Producida vs. Consumida",
      it: "Energia Prodotta vs. Consumato",
      fr: "Énergie Produite vs. Consommée",
      de: "Produzierte vs. Verbrauchte Energie",
      pt: "Energia Produzida vs. Consumida",
    },
  },
  selfStatus: {
    title: {
      uk: "Self Power Status",
      es: "Estado de Autonomía Energética",
      it: "Stato dell'Energia Autoprodotta",
      fr: "Statut d'Énergie Autoproduite",
      de: "Selbstversorgungsstatus",
      pt: "Estado da Autonomia Energética",
    },
    sub: {
      uk: "Energy Sources",
      es: "Fuentes de Energía",
      it: "Fonti di Energia",
      fr: "Sources d'Énergie",
      de: "Energiequellen",
      pt: "Fontes de Energia",
    },
  },
  energyLastDay: {
    title: {
      uk: "Energy Usage Last Day",
      es: "Uso de Energía en el Último Día",
      it: "Consumo di Energia dell'Ultimo Giorno",
      fr: "Utilisation de l'Énergie le Dernier Jour",
      de: "Energieverbrauch des letzten Tages",
      pt: "Uso de Energia no Último Dia",
    },
    sub: {
      uk: "Power consumption along the day",
      es: "Consumo de energía a lo largo del día",
      it: "Consumo di energia durante il giorno",
      fr: "Consommation d'énergie au cours de la journée",
      de: "Energieverbrauch im Tagesverlauf",
      pt: "Consumo de energia ao longo do dia",
    },
    perSix: {
      uk: "Per 6h",
      es: "Por 6h",
      it: "Ogni 6h",
      fr: "Par 6h",
      de: "Alle 6h",
      pt: "Por 6h",
    },
    perHour: {
      uk: "Per Hour",
      es: "Por Hora",
      it: "Ogni Ora",
      fr: "Par Heure",
      de: "Pro Stunde",
      pt: "Por Hora",
    },
    perMin: {
      uk: "Per Minute",
      es: "Por Minuto",
      it: "Ogni Minuto",
      fr: "Par Minute",
      de: "Pro Minute",
      pt: "Por Minuto",
    },
  },
  users: {
    title: {
      uk: "Users",
      es: "Usuarios",
      it: "Utenti",
      fr: "Utilisateurs",
      de: "Benutzer",
      pt: "Usuários",
    },
    users: {
      uk: "Users",
      es: "Usuarios",
      it: "Utenti",
      fr: "Utilisateurs",
      de: "Benutzer",
      pt: "Usuários",
    },
    admins: {
      uk: "Admins",
      es: "Administración",
      it: "Amministratori",
      fr: "Administrateurs",
      de: "Administratoren",
      pt: "Administradores",
    },
    mantainers: {
      uk: "Maintainers",
      es: "Mantenimiento",
      it: "Manutentori",
      fr: "Mainteneurs",
      de: "Wartungspersonal",
      pt: "Mantenedores",
    },
    username: {
      uk: "Username",
      es: "Nombre de usuario",
      it: "Nome utente",
      fr: "Nom d'utilisateur",
      de: "Benutzername",
      pt: "Nome de usuário",
    },
  },
  status: {
    title: {
      uk: "Chargers Status",
      es: "Estado de los Cargadores",
      it: "Stato dei Caricatori",
      fr: "État des Chargeurs",
      de: "Ladestatus",
      pt: "Estado dos Carregadores",
    },
    sub: {
      uk: "Quantity of chargers by state",
      es: "Cantidad de cargadores por estado",
      it: "Quantità di caricatori per stato",
      fr: "Quantité de chargeurs par état",
      de: "Anzahl der Ladegeräte nach Zustand",
      pt: "Quantidade de carregadores por estado",
    },
  },
  grid: {
    uk: "Grid",
    es: "Red",
    it: "Griglia",
    fr: "Grille",
    de: "Gitter",
    pt: "Grade",
  },
  pv: {
    uk: "PV",
    es: "FV",
    it: "FV",
    fr: "PV",
    de: "PV",
    pt: "FV",
  },
  directSolar: {
    uk: "Direct Solar",
    es: "Solar Directo",
    it: "Solare Diretto",
    fr: "Solaire Direct",
    de: "Direkte Solar",
    pt: "Solar Direto",
  },
  produced: {
    uk: "Produced",
    es: "Producido",
    it: "Prodotto",
    fr: "Produit",
    de: "Produziert",
    pt: "Produzido",
  },
  consumed: {
    uk: "Consumed",
    es: "Consumido",
    it: "Consumato",
    fr: "Consommé",
    de: "Verbraucht",
    pt: "Consumido",
  },
  available: {
    uk: "Available",
    es: "Disponible",
    it: "Disponibile",
    fr: "Disponible",
    de: "Verfügbar",
    pt: "Disponível",
  },
  unavailable: {
    uk: "Unavailable",
    es: "No Disponible",
    it: "Non Disponibile",
    fr: "Indisponible",
    de: "Nicht Verfügbar",
    pt: "Indisponível",
  },
  charging: {
    uk: "Charging",
    es: "Cargando",
    it: "Caricamento",
    fr: "En Charge",
    de: "Laden",
    pt: "Carregando",
  },
  faulted: {
    uk: "Faulted",
    es: "Fallado",
    it: "Guasto",
    fr: "En Panne",
    de: "Fehlerhaft",
    pt: "Com Falha",
  },
  jan: {
    uk: "Jan",
    es: "Ene",
    it: "Gen",
    fr: "Janv",
    de: "Jan",
    pt: "Jan",
  },
  feb: {
    uk: "Feb",
    es: "Feb",
    it: "Feb",
    fr: "Févr",
    de: "Feb",
    pt: "Fev",
  },
  mar: {
    uk: "Mar",
    es: "Mar",
    it: "Mar",
    fr: "Mars",
    de: "März",
    pt: "Mar",
  },
  apr: {
    uk: "Apr",
    es: "Abr",
    it: "Apr",
    fr: "Avr",
    de: "Apr",
    pt: "Abr",
  },
  may: {
    uk: "May",
    es: "May",
    it: "Mag",
    fr: "Mai",
    de: "Mai",
    pt: "Mai",
  },
  jun: {
    uk: "Jun",
    es: "Jun",
    it: "Giu",
    fr: "Juin",
    de: "Jun",
    pt: "Jun",
  },
  jul: {
    uk: "Jul",
    es: "Jul",
    it: "Lug",
    fr: "Juil",
    de: "Jul",
    pt: "Jul",
  },
};

export default metricsTrans;