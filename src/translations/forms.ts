const formsTrans = {
  clone: {
    title: {
      uk: "CLONE CHARGER",
      es: "CLONAR CARGADOR",
      it: "CLONA CARICATORE",
      fr: "CLONER CHARGEUR",
      de: "LADERGERÄT KLONEN",
      pt: "CLONAR CARREGADOR",
    },
    submit: {
      uk: "Clone",
      es: "Clonar",
      it: "Clona",
      fr: "Cloner",
      de: "Klonen",
      pt: "Clonar",
    },
  },

  addCharger: {
    uk: "ADD CHARGER",
    es: "AÑADIR CARGADOR",
    it: "AGGIUNGI CARICABATTERIE",
    fr: "AJOUTER UN CHARGEUR",
    de: "LADEGERÄT HINZUFÜGEN",
    pt: "ADICIONAR CARREGADOR",
  },
  editCharger: {
    uk: "EDIT CHARGER",
    es: "EDITAR CARGADOR",
    it: "MODIFICA CARICABATTERIE",
    fr: "MODIFIER LE CHARGEUR",
    de: "LADEGERÄT BEARBEITEN",
    pt: "EDITAR CARREGADOR",
  },
  addUser: {
    uk: "ADD USER",
    es: "AÑADIR USUARIO",
    it: "AGGIUNGI UTENTE",
    fr: "AJOUTER UN UTILISATEUR",
    de: "BENUTZER HINZUFÜGEN",
    pt: "ADICIONAR USUÁRIO",
  },
  editUser: {
    uk: "EDIT USER",
    es: "EDITAR USUARIO",
    it: "MODIFICA UTENTE",
    fr: "MODIFIER L'UTILISATEUR",
    de: "BENUTZER BEARBEITEN",
    pt: "EDITAR USUÁRIO",
  },
  deleteCharger: {
    uk: "DELETE CHARGER",
    es: "ELIMINAR CARGADOR",
    it: "ELIMINA CARICABATTERIE",
    fr: "SUPPRIMER LE CHARGEUR",
    de: "LADEGERÄT LÖSCHEN",
    pt: "EXCLUIR CARREGADOR",
  },
  identificationData: {
    uk: "IDENTIFICATION DATA",
    es: "DATOS DE IDENTIFICACIÓN",
    it: "DATI DI IDENTIFICAZIONE",
    fr: "DONNÉES D'IDENTIFICATION",
    de: "IDENTIFIKATIONSDATEN",
    pt: "DADOS DE IDENTIFICAÇÃO",
  },
  name: {
    uk: "Name",
    es: "Nombre",
    it: "Nome",
    fr: "Nom",
    de: "Name",
    pt: "Nome",
  },
  nameTooltip: {
    uk: "A name that can be given to the loader, it can be any. It can be repeated in several chargers as it is not unique.",
    es: "Un nombre que se puede dar al cargador, puede ser cualquiera. Se puede repetir en varios cargadores ya que no es único.",
    it: "Un nome che può essere assegnato al caricabatterie, può essere qualsiasi. Può essere ripetuto in più caricabatterie poiché non è unico.",
    fr: "Un nom qui peut être donné au chargeur, il peut être n'importe lequel. Il peut être répété dans plusieurs chargeurs car il n'est pas unique.",
    de: "Ein Name, der dem Ladegerät gegeben werden kann, es kann beliebig sein. Er kann bei mehreren Ladegeräten wiederholt werden, da er nicht einzigartig ist.",
    pt: "Um nome que pode ser dado ao carregador, pode ser qualquer. Pode ser repetido em vários carregadores, pois não é único.",
  },
  namePlaceholder: {
    uk: "E.g. Parking Nº1",
    es: "Ej: Parking Nº1",
    it: "Es: Parcheggio Nº1",
    fr: "Ex: Parking Nº1",
    de: "Z.B. Parkplatz Nr. 1",
    pt: "Ex: Estacionamento Nº1",
  },
  idTooltip: {
    uk: "Unique charger identification.",
    es: "Identificación única del cargador.",
    it: "Identificazione unica del caricabatterie.",
    fr: "Identification unique du chargeur.",
    de: "Eindeutige Ladegerät-Identifikation.",
    pt: "Identificação única do carregador.",
  },
  idPlaceholder: {
    uk: "E.g. P01",
    es: "Ej: P01",
    it: "Es: P01",
    fr: "Ex: P01",
    de: "Z.B. P01",
    pt: "Ex: P01",
  },
  vendor: {
    uk: "Vendor",
    es: "Vendedor",
    it: "Venditore",
    fr: "Vendeur",
    de: "Verkäufer",
    pt: "Fornecedor",
  },
  vendorPlaceholder: {
    uk: "E.g. Tesla",
    es: "Ej: Tesla",
    it: "Es: Tesla",
    fr: "Ex: Tesla",
    de: "Z.B. Tesla",
    pt: "Ex: Tesla",
  },
  model: {
    uk: "Model",
    es: "Modelo",
    it: "Modello",
    fr: "Modèle",
    de: "Modell",
    pt: "Modelo",
  },
  modelPlaceholder: {
    uk: "E.g. T0123",
    es: "Ej: T0123",
    it: "Es: T0123",
    fr: "Ex: T0123",
    de: "Z.B. T0123",
    pt: "Ex: T0123",
  },
  serial: {
    uk: "Serial",
    es: "Número de serie",
    it: "Numero di serie",
    fr: "Numéro de série",
    de: "Seriennummer",
    pt: "Número de série",
  },
  select: {
    uk: "Select",
    es: "Seleccionar",
    it: "Selezionare",
    fr: "Sélectionner",
    de: "Auswählen",
    pt: "Selecionar",
  },
  serialPlaceholder: {
    uk: "E.g. T01257987",
    es: "Ej: T01257987",
    it: "Es: T01257987",
    fr: "Ex: T01257987",
    de: "Z.B. T01257987",
    pt: "Ex: T01257987",
  },
  specifications: {
    uk: "SPECIFICATIONS",
    es: "ESPECIFICACIONES",
    it: "SPECIFICHE",
    fr: "SPÉCIFICATIONS",
    de: "SPEZIFIKATIONEN",
    pt: "ESPECIFICAÇÕES",
  },
  voltage: {
    uk: "Voltage",
    es: "Voltaje",
    it: "Tensione",
    fr: "Tension",
    de: "Spannung",
    pt: "Voltagem",
  },
  effiency: {
    uk: "Efficiency",
    es: "Eficiencia",
    it: "Efficienza",
    fr: "Efficacité",
    de: "Effizienz",
    pt: "Eficiência",
  },
  effiencyTooltip: {
    uk: 'DC chargers have a related efficiency. It provides the efficiency value in real values, not in decimals. If your efficiency is "0.8", put "80".',
    es: 'Los cargadores DC tienen una eficiencia relacionada. Proporciona el valor de eficiencia en valores reales, no en decimales. Si tu eficiencia es "0.8", pon "80".',
    it: 'I caricabatterie DC hanno un\'efficienza correlata. Fornisce il valore di efficienza in valori reali, non in decimali. Se la tua efficienza è "0.8", metti "80".',
    fr: 'Les chargeurs DC ont une efficacité associée. Il fournit la valeur d\'efficacité en valeurs réelles, non en décimales. Si votre efficacité est "0.8", mettez "80".',
    de: 'DC-Ladegeräte haben eine damit verbundene Effizienz. Es liefert den Effizienzwert in realen Werten, nicht in Dezimalstellen. Wenn Ihre Effizienz "0,8" beträgt, geben Sie "80" ein.',
    pt: 'Os carregadores DC têm uma eficiência relacionada. Fornece o valor da eficiência em valores reais, não em decimais. Se a sua eficiência for "0.8", coloque "80".',
  },
  chargerType: {
    uk: "Charger Type",
    es: "Tipo de Cargador",
    it: "Tipo di Caricabatterie",
    fr: "Type de Chargeur",
    de: "Ladertyp",
    pt: "Tipo de Carregador",
  },
  singlePhase: {
    uk: "Single-Phase",
    es: "Monofásico",
    it: "Monofase",
    fr: "Monophasé",
    de: "Einphasig",
    pt: "Monofásico",
  },
  threePhase: {
    uk: "Three-Phase",
    es: "Trifásico",
    it: "Trifase",
    fr: "Triphasé",
    de: "Dreiphasig",
    pt: "Trifásico",
  },
  chargerPower: {
    uk: "Charger Power",
    es: "Potencia del Cargador",
    it: "Potenza del Caricabatterie",
    fr: "Puissance du Chargeur",
    de: "Ladeleistung",
    pt: "Potência do Carregador",
  },
  ocppVersion: {
    uk: "OCPP Version",
    es: "Versión OCPP",
    it: "Versione OCPP",
    fr: "Version OCPP",
    de: "OCPP-Version",
    pt: "Versão OCPP",
  },
  configuration: {
    uk: "Configuration",
    es: "Configuración",
    it: "Configurazione",
    fr: "Configuration",
    de: "Konfiguration",
    pt: "Configuração",
  },
  priority: {
    uk: "Priority",
    es: "Prioridad",
    it: "Priorità",
    fr: "Priorité",
    de: "Priorität",
    pt: "Prioridade",
  },
  priorityPlaceholder: {
    uk: "E.g. 3",
    es: "Ej: 3",
    it: "Es: 3",
    fr: "Ex: 3",
    de: "Z.B. 3",
    pt: "Ex: 3",
  },
  high: {
    uk: "High",
    es: "Alta",
    it: "Alta",
    fr: "Élevée",
    de: "Hoch",
    pt: "Alta",
  },
  medium: {
    uk: "Medium",
    es: "Media",
    it: "Media",
    fr: "Moyenne",
    de: "Mittel",
    pt: "Média",
  },
  low: {
    uk: "Low",
    es: "Baja",
    it: "Bassa",
    fr: "Basse",
    de: "Niedrig",
    pt: "Baixa",
  },
  veryLow: {
    uk: "Very Low",
    es: "Muy Baja",
    it: "Molto Bassa",
    fr: "Très Basse",
    de: "Sehr Niedrig",
    pt: "Muito Baixa",
  },
  multiconector: {
    uk: "Multiconector",
    es: "Multiconector",
    it: "Multiconnettore",
    fr: "Multiconnecteur",
    de: "Multistecker",
    pt: "Multiconector",
  },
  yes: {
    uk: "Yes",
    es: "Sí",
    it: "Sì",
    fr: "Oui",
    de: "Ja",
    pt: "Sim",
  },
  no: {
    uk: "No",
    es: "No",
    it: "No",
    fr: "Non",
    de: "Nein",
    pt: "Não",
  },
  connectorId: {
    uk: "Connector ID",
    es: "ID del Conector",
    it: "ID del Connettore",
    fr: "ID du Connecteur",
    de: "Stecker-ID",
    pt: "ID do Conector",
  },
  deleteUser: {
    uk: "DELETE USER",
    es: "ELIMINAR USUARIO",
    it: "ELIMINA UTENTE",
    fr: "SUPPRIMER UTILISATEUR",
    de: "BENUTZER LÖSCHEN",
    pt: "EXCLUIR USUÁRIO",
  },
  deleteUserText: {
    uk: [
      "The user with ",
      " and ",
      "name ",
      " will be deleted, do you want to continue?",
    ],
    es: [
      "El usuario con ",
      " y ",
      "nombre ",
      " será eliminado, ¿quieres continuar?",
    ],
    it: ["L'utente con ", " e ", "nome ", " verrà eliminato, vuoi continuare?"],
    fr: [
      "L'utilisateur avec ",
      " et ",
      "nom ",
      " sera supprimé, voulez-vous continuer?",
    ],
    de: [
      "Der Benutzer mit ",
      " und ",
      "Name ",
      " wird gelöscht, möchten Sie fortfahren?",
    ],
    pt: ["O usuário com ", " e ", "nome ", " será removido, deseja continuar?"],
  },
  deleteChargerText: {
    uk: [
      "The charger with ",
      " and ",
      "name ",
      " will be deleted, do you want to continue?",
    ],
    es: [
      "El cargador con ",
      " y ",
      "nombre ",
      " será eliminado, ¿desea continuar?",
    ],
    it: [
      "Il caricabatterie con ",
      " e ",
      "nome ",
      " sarà eliminato, vuoi continuare?",
    ],
    fr: [
      "Le chargeur avec ",
      " et ",
      "nom ",
      " sera supprimé, voulez-vous continuer?",
    ],
    de: [
      "Das Ladegerät mit ",
      " und ",
      "Name ",
      " wird gelöscht, möchten Sie fortfahren?",
    ],
    pt: [
      "O carregador com ",
      " e ",
      "nome ",
      " será excluído, deseja continuar?",
    ],
  },

  username: {
    uk: "Username",
    es: "Nombre de Usuario",
    it: "Nome Utente",
    fr: "Nom d'Utilisateur",
    de: "Benutzername",
    pt: "Nome de Usuário",
  },
  userData: {
    uk: "USER DATA",
    es: "DATOS DEL USUARIO",
    it: "DATI UTENTE",
    fr: "DONNÉES UTILISATEUR",
    de: "BENUTZERDATEN",
    pt: "DADOS DO USUÁRIO",
  },
  nameUserPlaceholder: {
    uk: "E.g. John",
    es: "Ej: John",
    it: "Es: John",
    fr: "Ex: John",
    de: "Z.B. John",
    pt: "Ex: John",
  },
  lastname: {
    uk: "Lastname",
    es: "Apellido",
    it: "Cognome",
    fr: "Nom de famille",
    de: "Nachname",
    pt: "Sobrenome",
  },
  lastnamePlaceholder: {
    uk: "E.g. Doe",
    es: "Ej: Doe",
    it: "Es: Doe",
    fr: "Ex: Doe",
    de: "Z.B. Doe",
    pt: "Ex: Doe",
  },
  company: {
    uk: "Company",
    es: "Compañía",
    it: "Azienda",
    fr: "Entreprise",
    de: "Firma",
    pt: "Empresa",
  },
  companyPlaceholder: {
    uk: "E.g. Company S.A",
    es: "Ej: Company S.A",
    it: "Es: Company S.A",
    fr: "Ex: Company S.A",
    de: "Z.B. Firma S.A",
    pt: "Ex: Company S.A",
  },
  tagId: {
    uk: "Tag ID",
    es: "ID de Etiqueta",
    it: "ID Tag",
    fr: "ID de Tag",
    de: "Tag-ID",
    pt: "ID da Etiqueta",
  },
  tagIdPlaceholder: {
    uk: "Ej: #yourtag",
    es: "Ej: #tuetiqueta",
    it: "Es: #iltuotag",
    fr: "Ex: #votretag",
    de: "Z.B. #deintag",
    pt: "Ex: #suatag",
  },
  role: {
    uk: "Role",
    es: "Rol",
    it: "Ruolo",
    fr: "Rôle",
    de: "Rolle",
    pt: "Função",
  },
  roleType: {
    uk: "Role Type",
    es: "Tipo de Rol",
    it: "Tipo di Ruolo",
    fr: "Type de Rôle",
    de: "Rollenart",
    pt: "Tipo de Função",
  },
  user: {
    uk: "User",
    es: "Usuario",
    it: "Utente",
    fr: "Utilisateur",
    de: "Benutzer",
    pt: "Usuário",
  },
  admin: {
    uk: "Admin",
    es: "Administrador",
    it: "Amministratore",
    fr: "Administrateur",
    de: "Administrator",
    pt: "Administrador",
  },
  mantainer: {
    uk: "Maintainer",
    es: "Mantenedor",
    it: "Manutentore",
    fr: "Mainteneur",
    de: "Wartung",
    pt: "Mantenedor",
  },
  owner: {
    uk: "Owner",
    es: "Propietario",
    it: "Proprietario",
    fr: "Propriétaire",
    de: "Besitzer",
    pt: "Proprietário",
  },
  security: {
    uk: "SECURITY",
    es: "SEGURIDAD",
    it: "SICUREZZA",
    fr: "SÉCURITÉ",
    de: "SICHERHEIT",
    pt: "SEGURANÇA",
  },
  password: {
    uk: "Password",
    es: "Contraseña",
    it: "Password",
    fr: "Mot de passe",
    de: "Passwort",
    pt: "Senha",
  },
  assignedCharger: {
    uk: "ASSIGNED CHARGER INFO",
    es: "INFORMACIÓN DE CARGADOR ASIGNADO",
    it: "INFORMAZIONI SUL CARICABATTERIE ASSEGNATO",
    fr: "INFO CHARGEUR ASSIGNÉ",
    de: "ZUWEISENDE LADEGERÄTE INFO",
    pt: "INFORMAÇÃO DO CARREGADOR ATRIBUÍDO",
  },
  allowOnly: {
    uk: "Allow Only in Selected Chargers",
    es: "Permitir Solo en Cargadores Seleccionados",
    it: "Consentire Solo nei Caricabatterie Selezionati",
    fr: "Autoriser Seulement dans les Chargeurs Sélectionnés",
    de: "Nur in Ausgewählten Ladegeräten Erlauben",
    pt: "Permitir Apenas em Carregadores Selecionados",
  },
  selectAllowed: {
    uk: "SELECT ALLOWED CHARGERS",
    es: "SELECCIONAR CARGADORES PERMITIDOS",
    it: "SELEZIONA I CARICABATTERIE CONSENTITI",
    fr: "SÉLECTIONNER LES CHARGEURS AUTORISÉS",
    de: "AUSGEWÄHLTE LADEGERÄTE AUSWÄHLEN",
    pt: "SELECIONAR CARREGADORES PERMITIDOS",
  },
  chargerId: {
    uk: "CHARGER ID",
    es: "ID DEL CARGADOR",
    it: "ID CARICABATTERIE",
    fr: "ID CHARGEUR",
    de: "LADEGERÄTE-ID",
    pt: "ID DO CARREGADOR",
  },
  add: {
    uk: "Add",
    es: "Añadir",
    it: "Aggiungi",
    fr: "Ajouter",
    de: "Hinzufügen",
    pt: "Adicionar",
  },
  update: {
    uk: "Update",
    es: "Actualizar",
    it: "Aggiorna",
    fr: "Mettre à jour",
    de: "Aktualisieren",
    pt: "Atualizar",
  },
  delete: {
    uk: "Delete",
    es: "Eliminar",
    it: "Elimina",
    fr: "Supprimer",
    de: "Löschen",
    pt: "Excluir",
  },
  next: {
    uk: "Next",
    es: "Siguiente",
    it: "Successivo",
    fr: "Suivant",
    de: "Weiter",
    pt: "Próximo",
  },
  previous: {
    uk: "Previous",
    es: "Volver",
    it: "Precedente",
    fr: "Précédent",
    de: "Zurück",
    pt: "Anterior",
  },
  chargerSelectorError: {
    uk: "You must select at least 1 charger.",
    es: "Debes seleccionar al menos 1 cargador.",
    it: "Devi selezionare almeno 1 caricatore.",
    fr: "Vous devez sélectionner au moins 1 chargeur.",
    de: "Sie müssen mindestens 1 Ladegerät auswählen.",
    pt: "Você deve selecionar pelo menos 1 carregador.",
  },
  toast: {
    chargerExists: {
      uk: "A charger with the same connector Id already exists.",
      es: "Ya existe un cargador con el mismo ID de conector.",
      it: "Esiste già un caricatore con lo stesso ID del connettore.",
      fr: "Un chargeur avec le même identifiant de connecteur existe déjà.",
      de: "Ein Ladegerät mit derselben Steckverbinder-ID existiert bereits.",
      pt: "Já existe um carregador com o mesmo ID de conector.",
    },
    tagExists: {
      uk: "Tag ID already exists",
      es: "El ID de etiqueta ya existe",
      it: "L'ID del tag esiste già",
      fr: "L'identifiant du tag existe déjà",
      de: "Tag-ID existiert bereits",
      pt: "ID da etiqueta já existe",
    },
    usernameExists: {
      uk: "Username already exists",
      es: "El nombre de usuario ya existe",
      it: "Il nome utente esiste già",
      fr: "Le nom d'utilisateur existe déjà",
      de: "Benutzername existiert bereits",
      pt: "Nome de usuário já existe",
    },
    successAddCharger: {
      uk: "Charger added successfully.",
      es: "Cargador añadido con éxito.",
      it: "Caricatore aggiunto con successo.",
      fr: "Chargeur ajouté avec succès.",
      de: "Ladegerät erfolgreich hinzugefügt.",
      pt: "Carregador adicionado com sucesso.",
    },
    failedAddCharger: {
      uk: "Something went wrong adding your charger.",
      es: "Algo salió mal al añadir tu cargador.",
      it: "Qualcosa è andato storto durante l'aggiunta del caricatore.",
      fr: "Une erreur s'est produite lors de l'ajout de votre chargeur.",
      de: "Beim Hinzufügen Ihres Ladegeräts ist ein Fehler aufgetreten.",
      pt: "Algo deu errado ao adicionar seu carregador.",
    },
    successEditCharger: {
      uk: "Charger updated successfully",
      es: "Cargador actualizado con éxito",
      it: "Caricatore aggiornato con successo",
      fr: "Chargeur mis à jour avec succès",
      de: "Ladegerät erfolgreich aktualisiert",
      pt: "Carregador atualizado com sucesso",
    },
    successAddUser: {
      uk: "User added successfully",
      es: "Usuario añadido con éxito",
      it: "Utente aggiunto con successo",
      fr: "Utilisateur ajouté avec succès",
      de: "Benutzer erfolgreich hinzugefügt",
      pt: "Usuário adicionado com sucesso",
    },
    failedAddUser: {
      uk: "Something went wrong adding user",
      es: "Hubo un problema al añadir el usuario",
      it: "Si è verificato un problema durante l'aggiunta dell'utente",
      fr: "Une erreur s'est produite lors de l'ajout de l'utilisateur",
      de: "Beim Hinzufügen des Benutzers ist ein Fehler aufgetreten",
      pt: "Ocorreu um problema ao adicionar o usuário",
    },
    successDeleteUser: {
      uk: "User removed successfully",
      es: "Usuario eliminado con éxito",
      it: "Utente rimosso con successo",
      fr: "Utilisateur supprimé avec succès",
      de: "Benutzer erfolgreich entfernt",
      pt: "Usuário removido com sucesso",
    },
    failedDeleteUser: {
      uk: "Something went wrong removing user",
      es: "Hubo un problema al eliminar el usuario",
      it: "Si è verificato un problema durante la rimozione dell'utente",
      fr: "Une erreur s'est produite lors de la suppression de l'utilisateur",
      de: "Beim Entfernen des Benutzers ist ein Fehler aufgetreten",
      pt: "Ocorreu um problema ao remover o usuário",
    },
    successUpdateUser: {
      uk: "User updated successfully",
      es: "Usuario actualizado con éxito",
      it: "Utente aggiornato con successo",
      fr: "Utilisateur mis à jour avec succès",
      de: "Benutzer erfolgreich aktualisiert",
      pt: "Usuário atualizado com sucesso",
    },
    failedUpdateUser: {
      uk: "Something went wrong updating user",
      es: "Hubo un problema al actualizar el usuario",
      it: "Si è verificato un problema durante l'aggiornamento dell'utente",
      fr: "Une erreur s'est produite lors de la mise à jour de l'utilisateur",
      de: "Beim Aktualisieren des Benutzers ist ein Fehler aufgetreten",
      pt: "Ocorreu um problema ao atualizar o usuário",
    },
    successDeleteCharger: {
      uk: "Charger removed successfully",
      es: "Cargador eliminado con éxito",
      it: "Caricatore rimosso con successo",
      fr: "Chargeur supprimé avec succès",
      de: "Ladegerät erfolgreich entfernt",
      pt: "Carregador removido com sucesso",
    },
    failedDeleteCharger: {
      uk: "Something went wrong removing your charger",
      es: "Hubo un problema al eliminar tu cargador",
      it: "Si è verificato un problema durante la rimozione del caricatore",
      fr: "Une erreur s'est produite lors de la suppression de votre chargeur",
      de: "Beim Entfernen Ihres Ladegeräts ist ein Fehler aufgetreten",
      pt: "Ocorreu um problema ao remover seu carregador",
    },
    successCloneCharger: {
      uk: "Charger cloned successfully",
      es: "Cargador clonado con éxito",
      it: "Caricatore clonato con successo",
      fr: "Chargeur cloné avec succès",
      de: "Ladegerät erfolgreich geklont",
      pt: "Carregador clonado com sucesso",
    },
    failedCloneCharger: {
      uk: "Something went wrong cloning your charger",
      es: "Hubo un problema al clonar tu cargador",
      it: "Si è verificato un problema durante il clonaggio del caricatore",
      fr: "Une erreur s'est produite lors du clonage de votre chargeur",
      de: "Beim Klonen Ihres Ladegeräts ist ein Fehler aufgetreten",
      pt: "Ocorreu um problema ao clonar seu carregador",
    },
  },
};

export default formsTrans;