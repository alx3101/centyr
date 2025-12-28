export type Language = 'en' | 'it'

export interface Translations {
  // Common
  common: {
    loading: string
    error: string
    success: string
    cancel: string
    confirm: string
    save: string
    delete: string
    edit: string
    close: string
    back: string
    next: string
    logout: string
    login: string
    signup: string
    email: string
    password: string
    fullName: string
  }

  // Navigation
  nav: {
    home: string
    features: string
    pricing: string
    dashboard: string
    upload: string
    settings: string
  }

  // Auth
  auth: {
    loginTitle: string
    loginSubtitle: string
    signupTitle: string
    signupSubtitle: string
    forgotPassword: string
    rememberMe: string
    noAccount: string
    hasAccount: string
    signupButton: string
    loginButton: string
    confirmPassword: string
    passwordMismatch: string
    passwordTooShort: string
    loginSuccess: string
    loginFailed: string
    signupSuccess: string
    signupFailed: string
    logoutSuccess: string
  }

  // Dashboard
  dashboard: {
    welcomeBack: string
    subtitle: string
    plan: string
    usage: string
    remaining: string
    imagesPerMonth: string
    imagesLeft: string
    upgradePlan: string
    processingImages: string
    uploadNew: string
    recentJobs: string
    noJobs: string
    uploadFirst: string
    images: string
    download: string
    jobId: string
    estimatedTime: string
    seconds: string
  }

  // Upload
  upload: {
    title: string
    subtitle: string
    dragDrop: string
    orClick: string
    supported: string
    maxSize: string
    selected: string
    remove: string
    removeAll: string
    process: string
    processing: string
    monthlyUsage: string
    remainingImages: string
    warningLow: string
    upgradeNow: string
    quotaExceeded: string
    maxFiles: string
  }

  // Pricing
  pricing: {
    title: string
    subtitle: string
    monthly: string
    perMonth: string
    free: string
    basic: string
    growth: string
    scale: string
    selectPlan: string
    currentPlan: string
    upgrade: string
    features: {
      images: string
      processing: string
      support: string
      api: string
      priority: string
      watermark: string
      noWatermark: string
      emailSupport: string
      prioritySupport: string
      standardProcessing: string
      fastProcessing: string
      noApi: string
      basicApi: string
      fullApi: string
    }
  }

  // Quota
  quota: {
    exceeded: string
    remaining: string
    resetDate: string
    upgradeMessage: string
    dailyLimit: string
    monthlyLimit: string
  }

  // Notifications
  notifications: {
    uploadStarted: string
    uploadFailed: string
    processingComplete: string
    processingFailed: string
    downloadStarted: string
    downloadFailed: string
    copied: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      logout: 'Logout',
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
    },

    nav: {
      home: 'Home',
      features: 'Features',
      pricing: 'Pricing',
      dashboard: 'Dashboard',
      upload: 'Upload',
      settings: 'Settings',
    },

    auth: {
      loginTitle: 'Welcome back',
      loginSubtitle: 'Sign in to your account to continue',
      signupTitle: 'Create your account',
      signupSubtitle: 'Start aligning your product photos today',
      forgotPassword: 'Forgot password?',
      rememberMe: 'Remember me',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      signupButton: 'Create Account',
      loginButton: 'Sign In',
      confirmPassword: 'Confirm Password',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 8 characters',
      loginSuccess: 'Login successful!',
      loginFailed: 'Login failed',
      signupSuccess: 'Account created! Please login.',
      signupFailed: 'Signup failed',
      logoutSuccess: 'Logged out successfully',
    },

    dashboard: {
      welcomeBack: 'Welcome back',
      subtitle: "Here's what's happening with your images",
      plan: 'Plan',
      usage: 'Usage This Month',
      remaining: 'Remaining',
      imagesPerMonth: 'images/month',
      imagesLeft: 'images left',
      upgradePlan: 'Upgrade plan →',
      processingImages: 'Processing Images...',
      uploadNew: 'Upload New Images',
      recentJobs: 'Recent Jobs',
      noJobs: 'No processing jobs yet',
      uploadFirst: 'Upload your first images →',
      images: 'images',
      download: 'Download',
      jobId: 'Job ID',
      estimatedTime: 'Estimated time remaining',
      seconds: 'seconds',
    },

    upload: {
      title: 'Upload Images',
      subtitle: 'Drag and drop your product photos to get started',
      dragDrop: 'Drag & drop images here',
      orClick: 'or click to browse',
      supported: 'Supported: JPG, PNG, WEBP',
      maxSize: 'Max 50MB per file',
      selected: 'selected',
      remove: 'Remove',
      removeAll: 'Remove All',
      process: 'Process Images',
      processing: 'Processing...',
      monthlyUsage: 'Monthly Usage',
      remainingImages: 'Remaining',
      warningLow: "⚠️ You're running low on images!",
      upgradeNow: 'Upgrade now',
      quotaExceeded: 'Monthly limit exceeded. Please upgrade your plan.',
      maxFiles: 'Maximum files per upload',
    },

    pricing: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the plan that fits your needs',
      monthly: 'Monthly',
      perMonth: '/month',
      free: 'Free',
      basic: 'Basic',
      growth: 'Growth',
      scale: 'Scale',
      selectPlan: 'Select Plan',
      currentPlan: 'Current Plan',
      upgrade: 'Upgrade',
      features: {
        images: 'images/month',
        processing: 'Processing speed',
        support: 'Support',
        api: 'API Access',
        priority: 'Priority processing',
        watermark: 'Watermark on images',
        noWatermark: 'No watermark',
        emailSupport: 'Email support',
        prioritySupport: 'Priority support',
        standardProcessing: 'Standard',
        fastProcessing: 'Fast',
        noApi: 'No API access',
        basicApi: 'Basic API',
        fullApi: 'Full API access',
      },
    },

    quota: {
      exceeded: 'Quota exceeded',
      remaining: 'remaining',
      resetDate: 'Resets on',
      upgradeMessage: 'Upgrade your plan for more images',
      dailyLimit: 'Daily limit reached',
      monthlyLimit: 'Monthly limit reached',
    },

    notifications: {
      uploadStarted: 'Upload started! Processing images...',
      uploadFailed: 'Upload failed',
      processingComplete: 'Processing completed!',
      processingFailed: 'Processing failed',
      downloadStarted: 'Download started!',
      downloadFailed: 'Download failed',
      copied: 'Copied to clipboard!',
    },
  },

  it: {
    common: {
      loading: 'Caricamento...',
      error: 'Errore',
      success: 'Successo',
      cancel: 'Annulla',
      confirm: 'Conferma',
      save: 'Salva',
      delete: 'Elimina',
      edit: 'Modifica',
      close: 'Chiudi',
      back: 'Indietro',
      next: 'Avanti',
      logout: 'Esci',
      login: 'Accedi',
      signup: 'Registrati',
      email: 'Email',
      password: 'Password',
      fullName: 'Nome Completo',
    },

    nav: {
      home: 'Home',
      features: 'Funzionalità',
      pricing: 'Prezzi',
      dashboard: 'Dashboard',
      upload: 'Carica',
      settings: 'Impostazioni',
    },

    auth: {
      loginTitle: 'Bentornato',
      loginSubtitle: 'Accedi al tuo account per continuare',
      signupTitle: 'Crea il tuo account',
      signupSubtitle: 'Inizia ad allineare le tue foto prodotto oggi',
      forgotPassword: 'Password dimenticata?',
      rememberMe: 'Ricordami',
      noAccount: 'Non hai un account?',
      hasAccount: 'Hai già un account?',
      signupButton: 'Crea Account',
      loginButton: 'Accedi',
      confirmPassword: 'Conferma Password',
      passwordMismatch: 'Le password non corrispondono',
      passwordTooShort: 'La password deve essere di almeno 8 caratteri',
      loginSuccess: 'Login riuscito!',
      loginFailed: 'Login fallito',
      signupSuccess: 'Account creato! Effettua il login.',
      signupFailed: 'Registrazione fallita',
      logoutSuccess: 'Logout effettuato con successo',
    },

    dashboard: {
      welcomeBack: 'Bentornato',
      subtitle: 'Ecco cosa sta succedendo con le tue immagini',
      plan: 'Piano',
      usage: 'Utilizzo Questo Mese',
      remaining: 'Rimanenti',
      imagesPerMonth: 'immagini/mese',
      imagesLeft: 'immagini rimanenti',
      upgradePlan: 'Aggiorna piano →',
      processingImages: 'Elaborazione Immagini...',
      uploadNew: 'Carica Nuove Immagini',
      recentJobs: 'Lavori Recenti',
      noJobs: 'Nessun lavoro di elaborazione ancora',
      uploadFirst: 'Carica le tue prime immagini →',
      images: 'immagini',
      download: 'Scarica',
      jobId: 'ID Lavoro',
      estimatedTime: 'Tempo stimato rimanente',
      seconds: 'secondi',
    },

    upload: {
      title: 'Carica Immagini',
      subtitle: 'Trascina e rilascia le tue foto prodotto per iniziare',
      dragDrop: 'Trascina e rilascia le immagini qui',
      orClick: 'o clicca per sfogliare',
      supported: 'Supportati: JPG, PNG, WEBP',
      maxSize: 'Max 50MB per file',
      selected: 'selezionate',
      remove: 'Rimuovi',
      removeAll: 'Rimuovi Tutte',
      process: 'Elabora Immagini',
      processing: 'Elaborazione...',
      monthlyUsage: 'Utilizzo Mensile',
      remainingImages: 'Rimanenti',
      warningLow: '⚠️ Stai esaurendo le immagini!',
      upgradeNow: 'Aggiorna ora',
      quotaExceeded: 'Limite mensile superato. Aggiorna il tuo piano.',
      maxFiles: 'Massimo file per caricamento',
    },

    pricing: {
      title: 'Prezzi Semplici e Trasparenti',
      subtitle: 'Scegli il piano adatto alle tue esigenze',
      monthly: 'Mensile',
      perMonth: '/mese',
      free: 'Gratis',
      basic: 'Base',
      growth: 'Crescita',
      scale: 'Scala',
      selectPlan: 'Seleziona Piano',
      currentPlan: 'Piano Attuale',
      upgrade: 'Aggiorna',
      features: {
        images: 'immagini/mese',
        processing: 'Velocità elaborazione',
        support: 'Supporto',
        api: 'Accesso API',
        priority: 'Elaborazione prioritaria',
        watermark: 'Watermark sulle immagini',
        noWatermark: 'Nessun watermark',
        emailSupport: 'Supporto email',
        prioritySupport: 'Supporto prioritario',
        standardProcessing: 'Standard',
        fastProcessing: 'Veloce',
        noApi: 'Nessun accesso API',
        basicApi: 'API Base',
        fullApi: 'Accesso API completo',
      },
    },

    quota: {
      exceeded: 'Quota superata',
      remaining: 'rimanenti',
      resetDate: 'Si resetta il',
      upgradeMessage: 'Aggiorna il tuo piano per più immagini',
      dailyLimit: 'Limite giornaliero raggiunto',
      monthlyLimit: 'Limite mensile raggiunto',
    },

    notifications: {
      uploadStarted: 'Caricamento iniziato! Elaborazione immagini...',
      uploadFailed: 'Caricamento fallito',
      processingComplete: 'Elaborazione completata!',
      processingFailed: 'Elaborazione fallita',
      downloadStarted: 'Download iniziato!',
      downloadFailed: 'Download fallito',
      copied: 'Copiato negli appunti!',
    },
  },
}
