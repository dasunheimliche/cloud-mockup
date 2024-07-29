const zodTrans = {
  user: {
    nameRequired: {
      uk: "Name is required",
      es: "El nombre es obligatorio",
      it: "Il nome è obbligatorio",
      fr: "Le nom est requis",
      de: "Name ist erforderlich",
      pt: "O nome é obrigatório",
    },
    lastnameRequired: {
      uk: "Lastname is required",
      es: "El apellido es obligatorio",
      it: "Il cognome è obbligatorio",
      fr: "Le nom de famille est requis",
      de: "Nachname ist erforderlich",
      pt: "O sobrenome é obrigatório",
    },
    companyRequired: {
      uk: "Company is required",
      es: "La empresa es obligatoria",
      it: "L'azienda è obbligatoria",
      fr: "L'entreprise est requise",
      de: "Firma ist erforderlich",
      pt: "A empresa é obrigatória",
    },
    tagRequired: {
      uk: "Tag is required",
      es: "La etiqueta es obligatoria",
      it: "Il tag è obbligatorio",
      fr: "Le tag est requis",
      de: "Tag ist erforderlich",
      pt: "A etiqueta é obrigatória",
    },
    priorityMin: {
      uk: "Priority must be at least 1",
      es: "La prioridad debe ser al menos 1",
      it: "La priorità deve essere almeno 1",
      fr: "La priorité doit être d'au moins 1",
      de: "Priorität muss mindestens 1 sein",
      pt: "A prioridade deve ser pelo menos 1",
    },
    priorityMax: {
      uk: "Priority must be at most 4",
      es: "La prioridad debe ser como máximo 4",
      it: "La priorità deve essere al massimo 4",
      fr: "La priorité doit être au maximum de 4",
      de: "Priorität darf höchstens 4 sein",
      pt: "A prioridade deve ser no máximo 4",
    },
    usernameRequired: {
      uk: "Username is required",
      es: "El nombre de usuario es obligatorio",
      it: "Il nome utente è obbligatorio",
      fr: "Le nom d'utilisateur est requis",
      de: "Benutzername ist erforderlich",
      pt: "O nome de usuário é obrigatório",
    },
    passwordRequired: {
      uk: "Password is required",
      es: "La contraseña es obligatoria",
      it: "La password è obbligatoria",
      fr: "Le mot de passe est requis",
      de: "Passwort ist erforderlich",
      pt: "A senha é obrigatória",
    },
  },
  charger: {
    nameRequired: {
      uk: "Charger name is required",
      es: "El nombre del cargador es obligatorio",
      it: "Il nome del caricatore è obbligatorio",
      fr: "Le nom du chargeur est requis",
      de: "Der Name des Ladegeräts ist erforderlich",
      pt: "O nome do carregador é obrigatório",
    },
    idRequired: {
      uk: "Charger ID is required",
      es: "El ID del cargador es obligatorio",
      it: "L'ID del caricatore è obbligatorio",
      fr: "L'ID du chargeur est requis",
      de: "Die ID des Ladegeräts ist erforderlich",
      pt: "O ID do carregador é obrigatório",
    },
    vendorRequired: {
      uk: "Charger vendor is required",
      es: "El proveedor del cargador es obligatorio",
      it: "Il fornitore del caricatore è obbligatorio",
      fr: "Le fournisseur du chargeur est requis",
      de: "Der Anbieter des Ladegeräts ist erforderlich",
      pt: "O fornecedor do carregador é obrigatório",
    },
    modelRequired: {
      uk: "Charger model is required",
      es: "El modelo del cargador es obligatorio",
      it: "Il modello del caricatore è obbligatorio",
      fr: "Le modèle du chargeur est requis",
      de: "Das Modell des Ladegeräts ist erforderlich",
      pt: "O modelo do carregador é obrigatório",
    },
    serialRequired: {
      uk: "Charger serial number is required",
      es: "El número de serie del cargador es obligatorio",
      it: "Il numero di serie del caricatore è obbligatorio",
      fr: "Le numéro de série du chargeur est requis",
      de: "Die Seriennummer des Ladegeräts ist erforderlich",
      pt: "O número de série do carregador é obrigatório",
    },
    ocppRequired: {
      uk: "OCPP version is required",
      es: "La versión de OCPP es obligatoria",
      it: "La versione OCPP è obbligatoria",
      fr: "La version OCPP est requise",
      de: "Die OCPP-Version ist erforderlich",
      pt: "A versão OCPP é obrigatória",
    },
    phaseRequired: {
      uk: "Charger phase is required",
      es: "La fase del cargador es obligatoria",
      it: "La fase del caricatore è obbligatoria",
      fr: "La phase du chargeur est requise",
      de: "Die Phase des Ladegeräts ist erforderlich",
      pt: "A fase do carregador é obrigatória",
    },
    priorityRequired: {
      uk: "Charger priority is required",
      es: "La prioridad del cargador es obligatoria",
      it: "La priorità del caricatore è obbligatoria",
      fr: "La priorité du chargeur est requise",
      de: "Die Priorität des Ladegeräts ist erforderlich",
      pt: "A prioridade do carregador é obrigatória",
    },
    powerPositive: {
      uk: "Charger power must be a positive number",
      es: "La potencia del cargador debe ser un número positivo",
      it: "La potenza del caricatore deve essere un numero positivo",
      fr: "La puissance du chargeur doit être un nombre positif",
      de: "Die Leistung des Ladegeräts muss eine positive Zahl sein",
      pt: "A potência do carregador deve ser um número positivo",
    },
    effiencyMin: {
      uk: "Charger efficiency must be at least 0",
      es: "La eficiencia del cargador debe ser al menos 0",
      it: "L'efficienza del caricatore deve essere almeno 0",
      fr: "L'efficacité du chargeur doit être d'au moins 0",
      de: "Die Effizienz des Ladegeräts muss mindestens 0 betragen",
      pt: "A eficiência do carregador deve ser pelo menos 0",
    },
    effiencyMax: {
      uk: "Charger efficiency must be at most 100",
      es: "La eficiencia del cargador debe ser como máximo 100",
      it: "L'efficienza del caricatore deve essere al massimo 100",
      fr: "L'efficacité du chargeur doit être au maximum de 100",
      de: "Die Effizienz des Ladegeräts darf höchstens 100 betragen",
      pt: "A eficiência do carregador deve ser no máximo 100",
    },
    connectorIdMin: {
      uk: "Connector ID must be at least 0",
      es: "El ID del conector debe ser al menos 0",
      it: "L'ID del connettore deve essere almeno 0",
      fr: "L'ID du connecteur doit être d'au moins 0",
      de: "Die ID des Steckverbinders muss mindestens 0 sein",
      pt: "O ID do conector deve ser pelo menos 0",
    },
    connectorIdMax: {
      uk: "Connector ID must be at most 10",
      es: "El ID del conector debe ser como máximo 10",
      it: "L'ID del connettore deve essere al massimo 10",
      fr: "L'ID du connecteur doit être au maximum de 10",
      de: "Die ID des Steckverbinders darf höchstens 10 sein",
      pt: "O ID do conector deve ser no máximo 10",
    },
  },
};

export default zodTrans;