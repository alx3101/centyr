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
    testimonials: string
    getStarted: string
    signedInAs: string
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

  // Marketing components
  marketing: {
    hero: {
      badge: string
      title: string
      titleHighlight: string
      subtitle: string
      ctaPrimary: string
      ctaSecondary: string
      trustNoCreditCard: string
      trustFreeJobs: string
      trustMoneyBack: string
      before: string
      after: string
      dragToCompare: string
    }
    features: {
      title: string
      subtitle: string
      f1Title: string
      f1Desc: string
      f2Title: string
      f2Desc: string
      f3Title: string
      f3Desc: string
      f4Title: string
      f4Desc: string
    }
    howItWorks: {
      badge: string
      title: string
      subtitle: string
      step1Title: string
      step1Desc: string
      step2Title: string
      step2Desc: string
      step2Sub: string
      step3Title: string
      step3Desc: string
      bottomText: string
      ctaButton: string
    }
    valueProp: {
      title: string
      subtitle: string
      stat1Value: string
      stat1Label: string
      stat1Desc: string
      stat2Value: string
      stat2Label: string
      stat2Desc: string
      stat3Value: string
      stat3Label: string
      stat3Desc: string
    }
    pricing: {
      title: string
      subtitle: string
      monthly: string
      yearly: string
      billedYearly: string
      mostPopular: string
      perMonth: string
      startFree: string
      contactSales: string
      upgrade: string
      startTrial: string
      loading: string
      errorTitle: string
    }
    security: {
      badge: string
      title: string
      subtitle: string
      f1Title: string
      f1Desc: string
      f2Title: string
      f2Desc: string
      f3Title: string
      f3Desc: string
      f4Title: string
      f4Desc: string
      f5Title: string
      f5Desc: string
      f6Title: string
      f6Desc: string
      soc2Certified: string
      gdprCompliant: string
      sslEncrypted: string
      awsInfra: string
    }
    testimonials: {
      badge: string
      title: string
      subtitle: string
      t1Content: string
      t1Result: string
      t2Content: string
      t2Result: string
      t3Content: string
      t3Result: string
      t4Content: string
      t4Result: string
      stat1Label: string
      stat2Label: string
      stat3Label: string
      stat4Label: string
    }
    finalCta: {
      badge: string
      title: string
      titleLine2: string
      subtitle: string
      ctaPrimary: string
      ctaSecondary: string
      trustNoCreditCard: string
      trustFreeJobs: string
      trustMoneyBack: string
    }
    footer: {
      productCol: string
      resourcesCol: string
      companyCol: string
      legalCol: string
      features: string
      pricing: string
      apiDocs: string
      roadmap: string
      status: string
      blog: string
      helpCenter: string
      videoTutorials: string
      caseStudies: string
      community: string
      aboutUs: string
      careers: string
      contact: string
      pressKit: string
      partners: string
      privacyPolicy: string
      termsOfService: string
      gdprCompliance: string
      security: string
      sla: string
      copyright: string
      soc2Badge: string
      gdprBadge: string
      sslBadge: string
      stripeBadge: string
      uptimeBadge: string
    }
    trustBadges: {
      stat1Label: string
      stat2Label: string
      stat3Label: string
      stat4Label: string
    }
    trustedBy: {
      tagline: string
      title: string
      quote: string
      quoteAuthor: string
      quoteRole: string
      verified: string
      catFashion: string
      catElectronics: string
      catHome: string
      catSports: string
      catCosmetics: string
      catFood: string
    }
    liveStats: {
      badge: string
      imagesProcessed: string
      activeUsers: string
      avgProcessing: string
      onlineNow: string
      ultraFast: string
      joinText: string
    }
    socialProof: {
      from: string
      processedImages: string
      signedUp: string
      upgraded: string
      minAgo: string
    }
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
      testimonials: 'Testimonials',
      getStarted: 'Get Started',
      signedInAs: 'Signed in as',
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
      imagesPerMonth: 'jobs/month',
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
        images: 'jobs/month',
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

    marketing: {
      hero: {
        badge: 'Processing 1M+ images monthly',
        title: 'Perfect Product Photos,',
        titleHighlight: 'Automatically',
        subtitle: 'Professional AI that centers your products perfectly. Upload hundreds of images, get pixel-perfect results in seconds.',
        ctaPrimary: 'Try for Free',
        ctaSecondary: 'See Pricing',
        trustNoCreditCard: 'No credit card required',
        trustFreeJobs: '3 free jobs/month',
        trustMoneyBack: '30-day money-back guarantee',
        before: 'BEFORE',
        after: 'AFTER',
        dragToCompare: 'Drag to compare',
      },
      features: {
        title: 'Everything You Need',
        subtitle: 'Powerful features that make product photo editing effortless',
        f1Title: 'Smart AI Detection',
        f1Desc: 'Automatically centers your products perfectly. Just upload and our AI handles the rest.',
        f2Title: 'Bulk Processing',
        f2Desc: 'Upload hundreds of images at once. Get them all back perfectly centered in minutes, not hours.',
        f3Title: 'Secure Storage',
        f3Desc: 'Your images are encrypted, backed up, and delivered fast globally. Safe and always available.',
        f4Title: 'Easy Integration',
        f4Desc: 'Connect with Shopify, WooCommerce, or any platform. Full API for custom workflows.',
      },
      howItWorks: {
        badge: 'SO SIMPLE IT FEELS LIKE MAGIC',
        title: 'Three Steps to Perfection',
        subtitle: "Seriously, it's this easy. No training, no complex settings, no headaches.",
        step1Title: 'Upload Your Images',
        step1Desc: "Drag & drop your product photos. One or one thousand, we don't judge.",
        step2Title: 'AI Does Its Thing',
        step2Desc: 'Your images are queued as a job and processed by our AI in seconds.',
        step2Sub: "Grab a coffee. Actually, don't. It'll be done before you finish pouring.",
        step3Title: 'Download & Ship',
        step3Desc: "Get perfectly centered images ready for your store. That's it. Really.",
        bottomText: 'No Photoshop. No design skills. No waiting around.',
        ctaButton: 'See It In Action',
      },
      valueProp: {
        title: 'Built for Speed & Reliability',
        subtitle: 'Fast, reliable, and always ready when you need it',
        stat1Value: '<10s',
        stat1Label: 'Lightning Fast',
        stat1Desc: 'Process images in seconds, not minutes. Handle hundreds of photos at once effortlessly.',
        stat2Value: '99.9%',
        stat2Label: 'Always Available',
        stat2Desc: 'Process your images anytime, day or night. Reliable service you can count on.',
        stat3Value: 'Unlimited',
        stat3Label: 'Scale Freely',
        stat3Desc: 'From 10 to 10,000 images. Upload as many as you need, whenever you need.',
      },
      pricing: {
        title: 'Simple, Transparent Pricing',
        subtitle: 'Start free, scale as you grow. No hidden fees.',
        monthly: 'Monthly',
        yearly: 'Yearly',
        billedYearly: 'billed yearly',
        mostPopular: 'MOST POPULAR',
        perMonth: '/month',
        startFree: 'Start Free',
        contactSales: 'Contact Sales',
        upgrade: 'Upgrade',
        startTrial: 'Start 14-Day Trial',
        loading: 'Loading...',
        errorTitle: 'Failed to load pricing plans',
      },
      security: {
        badge: 'Enterprise-Grade Security',
        title: 'Your Data Is Safe',
        subtitle: "Security and privacy are our top priority. Here's how we protect your images.",
        f1Title: 'End-to-End Encryption',
        f1Desc: 'All images are encrypted in transit (TLS 1.3) and at rest (AES-256).',
        f2Title: 'EU Servers',
        f2Desc: 'Your data stays in Europe. AWS infrastructure with ISO 27001 certification.',
        f3Title: 'Privacy by Design',
        f3Desc: 'We never use your images for training. Your products remain yours.',
        f4Title: 'GDPR Compliant',
        f4Desc: 'Full GDPR compliance. DPA available for enterprise clients.',
        f5Title: 'Auto-deletion',
        f5Desc: 'Images are automatically deleted after 30 days.',
        f6Title: 'SOC 2 Type II',
        f6Desc: 'Annual independent audits to ensure the highest security standards.',
        soc2Certified: 'Type II Certified',
        gdprCompliant: 'EU Compliant',
        sslEncrypted: '256-bit Encrypted',
        awsInfra: 'AWS Infrastructure',
      },
      testimonials: {
        badge: '12,000+ satisfied e-commerce stores',
        title: 'Loved by Professionals',
        subtitle: 'Discover why thousands of e-commerce stores choose Centyr for their product photos',
        t1Content: "We save €500/month on photo editing. The ROI was immediate. Centyr completely transformed our workflow.",
        t1Result: 'ROI 15x in 3 months',
        t2Content: 'I used to spend 3 hours a day aligning product photos. Now I upload everything and in 5 minutes my catalog is ready.',
        t2Result: '90% time saved',
        t3Content: 'Works perfectly even with complex packaging. The quality is professional — customers notice the difference.',
        t3Result: '+40% conversions',
        t4Content: 'I manage 5 online stores with over 2000 products. Centyr let me standardize the entire catalog in a weekend.',
        t4Result: '2000+ photos processed',
        stat1Label: 'Active e-commerce stores',
        stat2Label: 'Photos processed',
        stat3Label: 'Guaranteed uptime',
        stat4Label: 'Customer rating',
      },
      finalCta: {
        badge: 'Start processing in under 60 seconds',
        title: 'Ready to Transform Your',
        titleLine2: 'Product Images?',
        subtitle: 'Join 1,000+ stores using professional AI to perfect their product photos. Start free, no credit card required.',
        ctaPrimary: 'Start Free Trial',
        ctaSecondary: 'View Pricing',
        trustNoCreditCard: 'No credit card required',
        trustFreeJobs: '3 free jobs/month',
        trustMoneyBack: '30-day money-back guarantee',
      },
      footer: {
        productCol: 'Product',
        resourcesCol: 'Resources',
        companyCol: 'Company',
        legalCol: 'Legal',
        features: 'Features',
        pricing: 'Pricing',
        apiDocs: 'API Docs',
        roadmap: 'Roadmap',
        status: 'Status',
        blog: 'Blog',
        helpCenter: 'Help Center',
        videoTutorials: 'Video Tutorials',
        caseStudies: 'Case Studies',
        community: 'Community',
        aboutUs: 'About Us',
        careers: 'Careers',
        contact: 'Contact',
        pressKit: 'Press Kit',
        partners: 'Partners',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        gdprCompliance: 'GDPR Compliance',
        security: 'Security',
        sla: 'SLA',
        copyright: 'All rights reserved.',
        soc2Badge: 'SOC 2 Type II',
        gdprBadge: 'GDPR Compliant',
        sslBadge: 'SSL/TLS Encrypted',
        stripeBadge: 'Stripe Secure',
        uptimeBadge: '99.9% Uptime SLA',
      },
      trustBadges: {
        stat1Label: 'Active stores',
        stat2Label: 'Images/month',
        stat3Label: 'Avg. processing',
        stat4Label: 'Uptime SLA',
      },
      trustedBy: {
        tagline: 'Trusted by 12,000+ e-commerce stores',
        title: 'Brands that trust us',
        quote: "\"Centyr revolutionized our workflow. We used to spend 2 hours a day aligning photos — now it's 5 minutes. The ROI was immediate.\"",
        quoteAuthor: 'Marco Rossi',
        quoteRole: 'CEO, ModaStyle - Milano',
        verified: 'Verified',
        catFashion: 'Fashion',
        catElectronics: 'Electronics',
        catHome: 'Home & Living',
        catSports: 'Sports',
        catCosmetics: 'Cosmetics',
        catFood: 'Food',
      },
      liveStats: {
        badge: 'Real-time Stats',
        imagesProcessed: 'Images processed',
        activeUsers: 'Active users now',
        avgProcessing: 'Avg. processing time',
        onlineNow: 'Online now',
        ultraFast: 'Ultra fast',
        joinText: 'Join thousands of e-commerce stores already using Centyr',
      },
      socialProof: {
        from: 'from',
        processedImages: 'processed {count} images',
        signedUp: 'signed up for Centyr',
        upgraded: 'upgraded to Premium',
        minAgo: 'min ago',
      },
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
      testimonials: 'Testimonianze',
      getStarted: 'Inizia Gratis',
      signedInAs: 'Accesso come',
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

    marketing: {
      hero: {
        badge: 'Elaborazione di 1M+ immagini al mese',
        title: 'Foto Prodotto Perfette,',
        titleHighlight: 'Automaticamente',
        subtitle: "L'AI professionale che centra i tuoi prodotti perfettamente. Carica centinaia di immagini, ottieni risultati pixel-perfect in pochi secondi.",
        ctaPrimary: 'Prova Gratis',
        ctaSecondary: 'Vedi Prezzi',
        trustNoCreditCard: 'Nessuna carta di credito richiesta',
        trustFreeJobs: '3 lavori gratuiti/mese',
        trustMoneyBack: 'Garanzia soddisfatti o rimborsati 30 giorni',
        before: 'PRIMA',
        after: 'DOPO',
        dragToCompare: 'Trascina per confrontare',
      },
      features: {
        title: 'Tutto Quello che Ti Serve',
        subtitle: 'Funzionalità potenti che rendono il fotoritocco dei prodotti senza sforzo',
        f1Title: 'Rilevamento AI Intelligente',
        f1Desc: 'Centra i tuoi prodotti automaticamente e perfettamente. Carica e lascia fare alla nostra AI.',
        f2Title: 'Elaborazione in Blocco',
        f2Desc: 'Carica centinaia di immagini contemporaneamente. Ricevile tutte perfettamente centrate in minuti, non ore.',
        f3Title: 'Archiviazione Sicura',
        f3Desc: 'Le tue immagini sono crittografate, con backup e consegnate velocemente in tutto il mondo. Sicure e sempre disponibili.',
        f4Title: 'Integrazione Facile',
        f4Desc: 'Collegati con Shopify, WooCommerce o qualsiasi piattaforma. API completa per flussi di lavoro personalizzati.',
      },
      howItWorks: {
        badge: 'COSÌ SEMPLICE CHE SEMBRA MAGIA',
        title: 'Tre Passi verso la Perfezione',
        subtitle: "Davvero, è così semplice. Niente formazione, nessuna impostazione complessa, nessun mal di testa.",
        step1Title: 'Carica le Tue Immagini',
        step1Desc: "Trascina le tue foto prodotto. Una o mille, non giudichiamo.",
        step2Title: "L'AI Fa il Suo Lavoro",
        step2Desc: 'Le tue immagini vengono accodate come un lavoro ed elaborate dalla nostra AI in pochi secondi.',
        step2Sub: "Prenditi un caffè. Anzi no. Finirà prima che tu finisca di versarlo.",
        step3Title: 'Scarica e Pubblica',
        step3Desc: "Ottieni immagini perfettamente centrate pronte per il tuo negozio. Tutto qui. Davvero.",
        bottomText: 'Niente Photoshop. Niente competenze grafiche. Niente attese.',
        ctaButton: 'Guarda Come Funziona',
      },
      valueProp: {
        title: 'Costruito per Velocità e Affidabilità',
        subtitle: 'Veloce, affidabile e sempre pronto quando ne hai bisogno',
        stat1Value: '<10s',
        stat1Label: 'Velocità Fulminea',
        stat1Desc: 'Elabora le immagini in secondi, non minuti. Gestisci centinaia di foto contemporaneamente senza sforzo.',
        stat2Value: '99,9%',
        stat2Label: 'Sempre Disponibile',
        stat2Desc: 'Elabora le tue immagini in qualsiasi momento, giorno o notte. Un servizio affidabile su cui puoi contare.',
        stat3Value: 'Illimitato',
        stat3Label: 'Scala Liberamente',
        stat3Desc: 'Da 10 a 10.000 immagini. Carica tutte quelle che ti servono, quando vuoi.',
      },
      pricing: {
        title: 'Prezzi Semplici e Trasparenti',
        subtitle: 'Inizia gratis, scala con la tua crescita. Nessun costo nascosto.',
        monthly: 'Mensile',
        yearly: 'Annuale',
        billedYearly: 'fatturato annualmente',
        mostPopular: 'PIÙ POPOLARE',
        perMonth: '/mese',
        startFree: 'Inizia Gratis',
        contactSales: 'Contatta Vendite',
        upgrade: 'Aggiorna',
        startTrial: 'Inizia Trial 14 Giorni',
        loading: 'Caricamento...',
        errorTitle: 'Impossibile caricare i piani',
      },
      security: {
        badge: 'Sicurezza di Livello Enterprise',
        title: 'I Tuoi Dati Sono Al Sicuro',
        subtitle: 'Sicurezza e privacy sono la nostra priorità assoluta. Ecco come proteggiamo le tue immagini.',
        f1Title: 'Crittografia End-to-End',
        f1Desc: 'Tutte le immagini sono crittografate in transito (TLS 1.3) e a riposo (AES-256).',
        f2Title: 'Server EU',
        f2Desc: 'I tuoi dati rimangono in Europa. Infrastruttura AWS con certificazione ISO 27001.',
        f3Title: 'Privacy by Design',
        f3Desc: "Non usiamo mai le tue immagini per addestrare modelli AI. I tuoi prodotti rimangono tuoi.",
        f4Title: 'Conforme al GDPR',
        f4Desc: 'Piena conformità al GDPR. DPA disponibile per clienti enterprise.',
        f5Title: 'Cancellazione Automatica',
        f5Desc: 'Le immagini vengono cancellate automaticamente dopo 30 giorni.',
        f6Title: 'SOC 2 Tipo II',
        f6Desc: 'Audit indipendenti annuali per garantire i più alti standard di sicurezza.',
        soc2Certified: 'Certificato Tipo II',
        gdprCompliant: 'Conforme UE',
        sslEncrypted: 'Crittografia 256-bit',
        awsInfra: 'Infrastruttura AWS',
      },
      testimonials: {
        badge: '12.000+ negozi e-commerce soddisfatti',
        title: 'Amato dai Professionisti',
        subtitle: 'Scopri perché migliaia di negozi e-commerce scelgono Centyr per le loro foto prodotto',
        t1Content: "Risparmiamo €500/mese in fotoritocco. Il ROI è stato immediato. Centyr ha completamente trasformato il nostro flusso di lavoro.",
        t1Result: 'ROI 15x in 3 mesi',
        t2Content: 'Passavo 3 ore al giorno ad allineare le foto dei prodotti. Ora carico tutto e in 5 minuti il catalogo è pronto.',
        t2Result: '90% di tempo risparmiato',
        t3Content: "Funziona perfettamente anche con packaging complessi. La qualità è professionale — i clienti notano la differenza.",
        t3Result: '+40% di conversioni',
        t4Content: "Gestisco 5 negozi online con oltre 2000 prodotti. Centyr mi ha permesso di standardizzare l'intero catalogo in un weekend.",
        t4Result: '2000+ foto elaborate',
        stat1Label: 'Negozi e-commerce attivi',
        stat2Label: 'Foto elaborate',
        stat3Label: 'Uptime garantito',
        stat4Label: 'Valutazione clienti',
      },
      finalCta: {
        badge: 'Inizia a elaborare in meno di 60 secondi',
        title: 'Pronto a Trasformare le Tue',
        titleLine2: 'Foto Prodotto?',
        subtitle: "Unisciti a 1.000+ negozi che usano l'AI professionale per perfezionare le loro foto prodotto. Inizia gratis, senza carta di credito.",
        ctaPrimary: 'Inizia Trial Gratuito',
        ctaSecondary: 'Vedi Prezzi',
        trustNoCreditCard: 'Nessuna carta di credito richiesta',
        trustFreeJobs: '3 lavori gratuiti/mese',
        trustMoneyBack: 'Garanzia soddisfatti o rimborsati 30 giorni',
      },
      footer: {
        productCol: 'Prodotto',
        resourcesCol: 'Risorse',
        companyCol: 'Azienda',
        legalCol: 'Legale',
        features: 'Funzionalità',
        pricing: 'Prezzi',
        apiDocs: 'Documentazione API',
        roadmap: 'Roadmap',
        status: 'Stato',
        blog: 'Blog',
        helpCenter: 'Centro Assistenza',
        videoTutorials: 'Video Tutorial',
        caseStudies: 'Casi di Studio',
        community: 'Community',
        aboutUs: 'Chi Siamo',
        careers: 'Lavora con Noi',
        contact: 'Contatti',
        pressKit: 'Press Kit',
        partners: 'Partner',
        privacyPolicy: 'Informativa Privacy',
        termsOfService: 'Termini di Servizio',
        gdprCompliance: 'Conformità GDPR',
        security: 'Sicurezza',
        sla: 'SLA',
        copyright: 'Tutti i diritti riservati.',
        soc2Badge: 'SOC 2 Type II',
        gdprBadge: 'Conforme GDPR',
        sslBadge: 'Crittografato SSL/TLS',
        stripeBadge: 'Pagamenti Sicuri Stripe',
        uptimeBadge: 'SLA Uptime 99,9%',
      },
      trustBadges: {
        stat1Label: 'Store attivi',
        stat2Label: 'Immagini/mese',
        stat3Label: 'Elaborazione media',
        stat4Label: 'SLA Uptime',
      },
      trustedBy: {
        tagline: 'Scelto da 12.000+ negozi e-commerce',
        title: 'Brand che si fidano di noi',
        quote: '"Centyr ha rivoluzionato il nostro flusso di lavoro. Passavamo 2 ore al giorno ad allineare le foto — ora sono 5 minuti. Il ROI è stato immediato."',
        quoteAuthor: 'Marco Rossi',
        quoteRole: 'CEO, ModaStyle - Milano',
        verified: 'Verificato',
        catFashion: 'Moda',
        catElectronics: 'Elettronica',
        catHome: 'Casa & Arredamento',
        catSports: 'Sport',
        catCosmetics: 'Cosmetici',
        catFood: 'Alimentare',
      },
      liveStats: {
        badge: 'Stats in tempo reale',
        imagesProcessed: 'Immagini elaborate',
        activeUsers: 'Utenti attivi ora',
        avgProcessing: 'Tempo medio',
        onlineNow: 'Online adesso',
        ultraFast: 'Ultra veloce',
        joinText: 'Unisciti alle migliaia di negozi e-commerce che già usano Centyr',
      },
      socialProof: {
        from: 'da',
        processedImages: 'ha elaborato {count} immagini',
        signedUp: 'si è registrato su Centyr',
        upgraded: "ha effettuato l'upgrade a Premium",
        minAgo: 'min fa',
      },
    },
  },
}
