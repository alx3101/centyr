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
    overview: string
    billing: string
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
    emailAddress: string
    signingIn: string
    orContinueWith: string
    backToSignIn: string
    forgotPasswordTitle: string
    forgotPasswordSubtitle: string
    sendResetCode: string
    sending: string
    resetCodeSent: string
    resetPasswordTitle: string
    enterCodeSentTo: string
    verificationCode: string
    newPassword: string
    confirmNewPassword: string
    resetting: string
    resetSuccess: string
    didntReceiveCode: string
    requestAgain: string
    creatingAccount: string
    mustBe8Chars: string
    agreeToTerms: string
    termsOfService: string
    and: string
    privacyPolicy: string
    signIn: string
    signUp: string
    whyChoose: string
    instantProcessing: string
    instantProcessingDesc: string
    saveHours: string
    saveHoursDesc: string
    guarantee: string
    guaranteeDesc: string
    avgRating: string
    activeStores: string
    freeJobsBadge: string
    noCreditCard: string
    setupIn60: string
    startFreeJobsBadge: string
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
    jobsProcessed: string
    readyToProcess: string
    aiPoweredHub: string
    jobsPerMonth: string
    jobsLeft: string
    upgrade: string
    available: string
    success: string
    usageLabel: string
    noJobsTitle: string
    noJobsDesc: string
    uploadNow: string
    watchDemo: string
    filterAll: string
    filterCompleted: string
    filterProcessing: string
    filterFailed: string
    filterPending: string
    searchPlaceholder: string
    sortNewest: string
    sortOldest: string
    sortName: string
    noJobsStatus: string
    showAllJobs: string
    uploadNewImages: string
    downloadCompleted: string
    downloadFailed: string
    batch: string
    tipJpgPng: string
    tipBackground: string
    tipBulk: string
    checklistUploadTitle: string
    checklistUploadDesc: string
    checklistUploadAction: string
    checklistDownloadTitle: string
    checklistDownloadDesc: string
    checklistDownloadAction: string
    checklistExploreTitle: string
    checklistExploreDesc: string
    checklistExploreAction: string
  }

  jobDetail: {
    title: string
    untitled: string
    backToDashboard: string
    jobId: string
    created: string
    updated: string
    processing: string
    totalTime: string
    images: string
    batchMode: string
    single: string
    batchJob: string
    download: string
    downloading: string
    downloadImage: string
    delete: string
    retry: string
    retrying: string
    errorMessage: string
    errorLoading: string
    jobNotFound: string
    backToDashboardBtn: string
    loading: string
    batchResults: string
    imageComparison: string
    original: string
    input: string
    processed: string
    complete: string
    format: string
    size: string
    time: string
    status: string
    processingYourImage: string
    jobQueued: string
    processingDesc: string
    queuedDesc: string
    autoUpdate: string
    processingFailed: string
    failedDesc: string
    tryAnother: string
    statusCompleted: string
    statusProcessing: string
    statusFailed: string
    statusPending: string
    statusUnknown: string
    retryFailed: string
    retryStarted: string
    retryConfirmTitle: string
    retryConfirmMsg: string
    retryConfirmBtn: string
    deleteConfirmTitle: string
    deleteConfirmMsg: string
    deleteConfirmBtn: string
    downloadFailed: string
    reprocess: string
    reprocessTitle: string
    reprocessDesc: string
    reprocessStart: string
    reprocessing: string
    reprocessSuccess: string
    reprocessFailed: string
    reprocessExpiredTitle: string
    reprocessExpiredDesc: string
    reprocessUploadNew: string
    outputFormat: string
    customFormat: string
    marketplaceFormats: string
  }

  settings: {
    title: string
    subtitle: string
    badge: string
    profileSection: string
    usernameLabel: string
    usernamePlaceholder: string
    emailLabel: string
    emailVerified: string
    emailNotVerified: string
    saveButton: string
    savingButton: string
    passwordSection: string
    currentPassword: string
    currentPasswordPlaceholder: string
    newPassword: string
    newPasswordPlaceholder: string
    confirmPassword: string
    confirmPasswordPlaceholder: string
    changePasswordButton: string
    changingButton: string
    accountSection: string
    userId: string
    accountStatus: string
    currentPlan: string
    toastProfileSuccess: string
    toastProfileError: string
    toastPasswordSuccess: string
    toastPasswordError: string
    toastPasswordMismatch: string
    toastPasswordTooShort: string
    // GDPR section
    gdprSection: string
    gdprDescription: string
    exportDataButton: string
    exportDataLoading: string
    exportDataSuccess: string
    exportDataError: string
    deleteAccountButton: string
    deleteAccountConfirmTitle: string
    deleteAccountConfirmMsg: string
    deleteAccountConfirmInput: string
    deleteAccountConfirmBtn: string
    deleteAccountSuccess: string
    deleteAccountError: string
  }

  cookieBanner: {
    title: string
    description: string
    privacyLink: string
    gdprLink: string
    and: string
    sessionCookie: string
    noTracking: string
    accept: string
    decline: string
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
    newJob: string
    newJobSubtitle: string
    jobsRemaining: string
    whatIsJob: string
    jobExplanation: string
    stepUpload: string
    stepConfigure: string
    stepReview: string
    uploadStepTitle: string
    uploadStepSubtitle: string
    dropHere: string
    dragHere: string
    orBrowse: string
    freePlanLimit: string
    canUploadTo: string
    upgradeUnlimited: string
    imageAdded: string
    imagesAdded: string
    configureTitle: string
    configureSubtitle: string
    jobNameLabel: string
    jobNamePlaceholder: string
    jobNameHelper: string
    processingOptions: string
    removeBackground: string
    removeBackgroundDesc: string
    premium: string
    customBackground: string
    uploadBackgroundImage: string
    formatPreset: string
    presetCustom: string
    presetLocked: string
    outputSettings: string
    outputSize: string
    margin: string
    marginHelper: string
    reviewTitle: string
    reviewSubtitle: string
    summaryJob: string
    summaryImages: string
    summaryOptions: string
    summaryPreview: string
    aiAlignment: string
    backgroundRemoval: string
    customBackgroundLabel: string
    estimatedTimeLabel: string
    redirectInfo: string
    insufficientCredits: string
    insufficientCreditsDesc: string
    continueBtn: string
    startProcessing: string
    processingBtn: string
    fast: string
    fastDesc: string
    aiPrecision: string
    aiPrecisionDesc: string
    secure: string
    secureDesc: string
    jobStarted: string
    compressingImages: string
    uploadAtLeastOne: string
    enterJobName: string
    maxBatchExceeded: string
    upgradeToProcess: string
    onlyCreditsLeft: string
    upgradePremium: string
  }

  // Billing
  billing: {
    title: string
    subtitle: string
    subscriptionManagement: string
    currentSubscription: string
    monthlyQuota: string
    usedThisMonth: string
    remaining: string
    jobsPerMonth: string
    jobsLeft: string
    manageBillingPortal: string
    opening: string
    runningLow: string
    runningLowDesc: string
    viewUpgradeOptions: string
    availablePlans: string
    monthly: string
    yearly: string
    mostPopular: string
    currentPlanBadge: string
    save20: string
    processingBtn: string
    currentPlanBtn: string
    upgradeTo: string
    billingHistory: string
    noBillingHistory: string
    billingHistoryDesc: string
    downloadInvoice: string
    invoiceStatusPaid: string
    invoiceStatusOpen: string
    invoiceStatusVoid: string
    invoiceStatusRefund: string
    invoiceTypeInvoice: string
    invoiceTypeRefund: string
    cannotPurchase: string
    failedCheckout: string
    failedPortal: string
    perYear: string
    perMonth: string
    updatePaymentMethod: string
  }

  // Onboarding
  onboarding: {
    title: string
    subtitle: string
    ofCompleted: string
    completed: string
    congratulations: string
    congratulationsDesc: string
  }

  // Post Download Modal
  postDownload: {
    title: string
    subtitle: string
    runningLow: string
    runningLowDesc: string
    upgradePro: string
    upgradeProDesc: string
    upgradeNow: string
    whatsNext: string
    processMore: string
    processMoreDesc: string
    unlockBulk: string
    unlockBulkDesc: string
    loveCentyr: string
    referralDesc: string
    referralCredits: string
    copy: string
    copied: string
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
    limitReached: string
    runningLow: string
    usedAll: string
    usedPartial: string
    upgradeTitle: string
    benefit1: string
    benefit2: string
    benefit3: string
    benefit4: string
    upgradeContinue: string
    upgradePro: string
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
      yourStoreLabel: string
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
      subscribe: string
      loading: string
      errorTitle: string
      currentPlanLabel: string
      jobsUsedThisMonth: string
      managePlan: string
      currentBadge: string
      currentPlanButton: string
      enterpriseTitle: string
      enterpriseDesc: string
      enterpriseFeature1Title: string
      enterpriseFeature1Desc: string
      enterpriseFeature2Title: string
      enterpriseFeature2Desc: string
      enterpriseFeature3Title: string
      enterpriseFeature3Desc: string
      enterpriseFeature4Title: string
      enterpriseFeature4Desc: string
      enterpriseFrom: string
      enterpriseCustomPrice: string
      enterpriseCustomDesc: string
      enterpriseCta: string
      enterpriseResponse: string
      faqTitle: string
      faq1q: string
      faq1a: string
      faq2q: string
      faq2a: string
      faq3q: string
      faq3a: string
      backToHome: string
      planInfo: {
        free: { description: string; features: string[] }
        mini: { description: string; features: string[] }
        starter: { description: string; features: string[] }
        pro: { description: string; features: string[] }
        business: { description: string; features: string[] }
      }
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
      subtitle: string
      description: string
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
      testimonials: 'Compare',
      getStarted: 'Get Started',
      signedInAs: 'Signed in as',
      overview: 'Overview',
      billing: 'Billing',
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
      emailAddress: 'Email Address',
      signingIn: 'Signing in...',
      orContinueWith: 'Or continue with',
      backToSignIn: 'Back to Sign In',
      forgotPasswordTitle: 'Forgot Password?',
      forgotPasswordSubtitle: "Enter your email and we'll send you a reset code.",
      sendResetCode: 'Send Reset Code',
      sending: 'Sending...',
      resetCodeSent: 'Reset code sent! Check your email.',
      resetPasswordTitle: 'Reset Password',
      enterCodeSentTo: 'Enter the code sent to',
      verificationCode: 'Verification Code',
      newPassword: 'New Password',
      confirmNewPassword: 'Confirm New Password',
      resetting: 'Resetting...',
      resetSuccess: 'Password reset successfully! Please sign in.',
      didntReceiveCode: "Didn't receive a code?",
      requestAgain: 'Request again',
      creatingAccount: 'Creating account...',
      mustBe8Chars: 'Must be at least 8 characters',
      agreeToTerms: 'I agree to the',
      termsOfService: 'Terms of Service',
      and: 'and',
      privacyPolicy: 'Privacy Policy',
      signIn: 'Sign in',
      signUp: 'Sign up',
      whyChoose: 'Why choose Centyr?',
      instantProcessing: 'Instant Processing',
      instantProcessingDesc: 'Hundreds of photos processed in seconds, automatically',
      saveHours: 'Save 10+ Hours/Week',
      saveHoursDesc: 'Automate manual product photo editing',
      guarantee: '30-Day Guarantee',
      guaranteeDesc: 'Full money-back guarantee, no questions asked',
      avgRating: 'Average rating from our customers',
      activeStores: 'active e-commerce stores',
      freeJobsBadge: '10 free jobs/month',
      noCreditCard: 'No credit card required',
      setupIn60: 'Setup in 60 seconds',
      startFreeJobsBadge: 'Start with 10 free jobs/month',
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
      jobsProcessed: 'jobs processed',
      readyToProcess: 'Ready to process',
      aiPoweredHub: 'Your image processing hub',
      jobsPerMonth: 'jobs / month',
      jobsLeft: 'jobs left',
      upgrade: 'Upgrade',
      available: 'Available',
      success: 'Success',
      usageLabel: 'Usage',
      noJobsTitle: 'No jobs processed yet',
      noJobsDesc: 'Upload your first product photo to see results in seconds',
      uploadNow: 'Upload Now',
      watchDemo: 'Watch Demo',
      filterAll: 'all',
      filterCompleted: 'completed',
      filterProcessing: 'processing',
      filterFailed: 'failed',
      filterPending: 'pending',
      searchPlaceholder: 'Search by name…',
      sortNewest: 'Newest first',
      sortOldest: 'Oldest first',
      sortName: 'Name (A-Z)',
      noJobsStatus: 'No jobs found with status:',
      showAllJobs: 'Show All Jobs',
      uploadNewImages: 'Upload New Images',
      downloadCompleted: 'Download completed!',
      downloadFailed: 'Download failed',
      batch: 'Batch',
      tipJpgPng: 'Works best with JPG/PNG files',
      tipBackground: 'White or grey backgrounds give best results',
      tipBulk: 'Process multiple images in bulk with Pro plan',
      checklistUploadTitle: 'Upload your first image',
      checklistUploadDesc: 'Try our automatic alignment with a product photo',
      checklistUploadAction: 'Upload Now',
      checklistDownloadTitle: 'Download your result',
      checklistDownloadDesc: 'Get your perfectly aligned image',
      checklistDownloadAction: 'View Jobs',
      checklistExploreTitle: 'Explore features',
      checklistExploreDesc: 'Check out bulk upload and other pro features',
      checklistExploreAction: 'Learn More',
    },

    jobDetail: {
      title: 'Job Details',
      untitled: 'Untitled Job',
      backToDashboard: 'Dashboard',
      jobId: 'Job ID',
      created: 'Created',
      updated: 'Updated',
      processing: 'Processing',
      totalTime: 'Total time',
      images: 'Images',
      batchMode: 'Batch mode',
      single: 'Single',
      batchJob: 'Batch Job',
      download: 'Download',
      downloading: 'Downloading...',
      downloadImage: 'Download Image',
      delete: 'Delete',
      retry: 'Retry',
      retrying: 'Retrying...',
      errorMessage: 'Error Message',
      errorLoading: 'Error Loading Job',
      jobNotFound: 'Job not found',
      backToDashboardBtn: 'Back to Dashboard',
      loading: 'Loading job details...',
      batchResults: 'Batch Results',
      imageComparison: 'Image Comparison',
      original: 'Original',
      input: 'Input',
      processed: 'Processed',
      complete: 'Complete',
      format: 'Format',
      size: 'Size',
      time: 'Time',
      status: 'Status',
      processingYourImage: 'Processing Your Image',
      jobQueued: 'Job Queued',
      processingDesc: 'Your image is being processed. This usually takes a few seconds.',
      queuedDesc: 'Your job is queued and will start processing shortly.',
      autoUpdate: 'This page will update automatically',
      processingFailed: 'Processing Failed',
      failedDesc: 'An error occurred while processing your image.',
      tryAnother: 'Try Another Image',
      statusCompleted: 'Completed',
      statusProcessing: 'Processing',
      statusFailed: 'Failed',
      statusPending: 'Pending',
      statusUnknown: 'Unknown',
      retryFailed: 'Retry failed',
      retryStarted: 'Retry started for {count} images',
      retryConfirmTitle: 'Retry failed images',
      retryConfirmMsg: 'Do you want to retry processing the incomplete images?',
      retryConfirmBtn: 'Retry',
      deleteConfirmTitle: 'Delete job',
      deleteConfirmMsg: 'Are you sure you want to delete this job? This action cannot be undone.',
      deleteConfirmBtn: 'Yes, delete',
      downloadFailed: 'Download failed',
      reprocess: 'Reprocess',
      reprocessTitle: 'Reprocess with a different format',
      reprocessDesc: 'Re-run the original images with new output settings. Uses one credit per image.',
      reprocessStart: 'Start Reprocess',
      reprocessing: 'Reprocessing...',
      reprocessSuccess: 'New job started',
      reprocessFailed: 'Reprocess failed',
      reprocessExpiredTitle: 'Original images no longer accessible',
      reprocessExpiredDesc: 'The original files have expired. Upload them again to reprocess with a different format.',
      reprocessUploadNew: 'New Upload',
      outputFormat: 'Output Format',
      customFormat: 'Custom',
      marketplaceFormats: 'Marketplace formats',
    },

    settings: {
      title: 'Account Settings',
      subtitle: 'Manage your account details and preferences',
      badge: 'Account Management',
      profileSection: 'Profile Information',
      usernameLabel: 'Username',
      usernamePlaceholder: 'Enter your username',
      emailLabel: 'Email Address',
      emailVerified: 'Email verified',
      emailNotVerified: 'Email not verified',
      saveButton: 'Save Changes',
      savingButton: 'Saving...',
      passwordSection: 'Change Password',
      currentPassword: 'Current Password',
      currentPasswordPlaceholder: 'Enter current password',
      newPassword: 'New Password',
      newPasswordPlaceholder: 'Enter new password (min 8 characters)',
      confirmPassword: 'Confirm New Password',
      confirmPasswordPlaceholder: 'Confirm new password',
      changePasswordButton: 'Change Password',
      changingButton: 'Changing...',
      accountSection: 'Account Information',
      userId: 'User ID',
      accountStatus: 'Account Status',
      currentPlan: 'Current Plan',
      toastProfileSuccess: 'Profile updated successfully!',
      toastProfileError: 'Failed to update profile',
      toastPasswordSuccess: 'Password changed successfully!',
      toastPasswordError: 'Failed to change password',
      toastPasswordMismatch: 'Passwords do not match',
      toastPasswordTooShort: 'Password must be at least 8 characters',
      gdprSection: 'Privacy & Data',
      gdprDescription: 'Under GDPR you have the right to export all your data or permanently delete your account. Account deletion is irreversible and all your images and jobs will be removed immediately.',
      exportDataButton: 'Export My Data',
      exportDataLoading: 'Exporting...',
      exportDataSuccess: 'Data exported successfully',
      exportDataError: 'Failed to export data',
      deleteAccountButton: 'Delete My Account',
      deleteAccountConfirmTitle: 'Delete Account Permanently',
      deleteAccountConfirmMsg: 'This action cannot be undone. All your jobs, images, and account data will be permanently deleted. Your subscription will be cancelled immediately.',
      deleteAccountConfirmInput: 'Type DELETE to confirm',
      deleteAccountConfirmBtn: 'Yes, permanently delete my account',
      deleteAccountSuccess: 'Your account has been deleted. Goodbye!',
      deleteAccountError: 'Failed to delete account. Please contact privacy@centyr.tech',
    },

    cookieBanner: {
      title: 'We use strictly necessary cookies',
      description: 'We only use essential cookies to keep you logged in and remember your preferences. No tracking, no ads. Read our',
      privacyLink: 'Privacy Policy',
      gdprLink: 'Cookie Policy',
      and: 'and',
      sessionCookie: 'Session only',
      noTracking: 'No tracking or advertising cookies',
      accept: 'Got it',
      decline: 'Decline',
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
      warningLow: "You're running low on images!",
      upgradeNow: 'Upgrade now',
      quotaExceeded: 'Monthly limit exceeded. Please upgrade your plan.',
      maxFiles: 'Maximum files per upload',
      newJob: 'New Job',
      newJobSubtitle: 'Each upload creates a job, your photos are aligned and processed automatically.',
      jobsRemaining: 'jobs remaining',
      whatIsJob: "What's a job?",
      jobExplanation: 'A job is a batch of one or more images sent for processing. Each job has a name, tracks progress in real time, and keeps your results available for download in the dashboard.',
      stepUpload: 'Upload',
      stepConfigure: 'Configure',
      stepReview: 'Review',
      uploadStepTitle: 'Upload your images',
      uploadStepSubtitle: 'Drag your product photos or click to select',
      dropHere: 'Drop it here!',
      dragHere: 'Drag images here',
      orBrowse: 'or click to browse',
      freePlanLimit: 'Free Plan: 1 image per job.',
      canUploadTo: 'You can upload up to {count} images per job.',
      upgradeUnlimited: 'Upgrade for unlimited batches',
      imageAdded: 'image added',
      imagesAdded: 'images added',
      configureTitle: 'Configure job',
      configureSubtitle: 'Customize your processing options',
      jobNameLabel: 'Job Name',
      jobNamePlaceholder: 'e.g. Summer Collection 2024, Product Catalog...',
      jobNameHelper: 'A descriptive name to identify this batch',
      processingOptions: 'Processing Options',
      removeBackground: 'Remove Background',
      removeBackgroundDesc: 'Automatically removes the background for clean product shots',
      premium: 'Premium',
      customBackground: 'Custom background (optional)',
      uploadBackgroundImage: 'Upload background image',
      formatPreset: 'Format Preset',
      presetCustom: 'Custom',
      presetLocked: 'Dimensions and padding are set automatically by the preset.',
      outputSettings: 'Output Settings',
      outputSize: 'Output Size',
      margin: 'Margin',
      marginHelper: 'Percentage relative to the output size.',
      reviewTitle: 'Review & start',
      reviewSubtitle: 'Check the details before starting processing',
      summaryJob: 'Job',
      summaryImages: 'Images',
      summaryOptions: 'Options',
      summaryPreview: 'Preview',
      aiAlignment: 'Automatic Alignment',
      backgroundRemoval: 'Background Removal',
      customBackgroundLabel: 'Custom Background',
      estimatedTimeLabel: 'Estimated time: ~{minutes} minutes',
      redirectInfo: "You'll be redirected to the dashboard to track progress",
      insufficientCredits: 'Insufficient credits',
      insufficientCreditsDesc: 'You have {remaining} credits but are trying to process {count} images.',
      continueBtn: 'Continue',
      startProcessing: 'Start Processing',
      processingBtn: 'Processing...',
      fast: 'Fast',
      fastDesc: '~10 sec per image',
      aiPrecision: 'Automatic Precision',
      aiPrecisionDesc: 'Perfect alignment',
      secure: 'Secure',
      secureDesc: 'End-to-end encryption',
      jobStarted: 'Job started! Redirecting to dashboard...',
      compressingImages: 'Optimizing images...',
      uploadAtLeastOne: 'Upload at least one image',
      enterJobName: 'Enter a job name',
      maxBatchExceeded: 'Maximum {count} images per batch.',
      upgradeToProcess: 'Upgrade to process more!',
      onlyCreditsLeft: 'You only have {count} jobs left this month.',
      upgradePremium: 'Upgrade to Premium to use background removal',
    },

    billing: {
      title: 'Billing & Subscription',
      subtitle: 'Manage your subscription and billing information',
      subscriptionManagement: 'Subscription Management',
      currentSubscription: 'Current Subscription',
      monthlyQuota: 'Monthly Quota',
      usedThisMonth: 'Used This Month',
      remaining: 'Remaining',
      jobsPerMonth: 'jobs/month',
      jobsLeft: 'jobs left',
      manageBillingPortal: 'Manage Billing Portal',
      opening: 'Opening...',
      runningLow: "You're running low on credits",
      runningLowDesc: "You've used {percentage}% of your monthly quota. Consider upgrading to avoid interruptions.",
      viewUpgradeOptions: 'View upgrade options →',
      availablePlans: 'Available Plans',
      monthly: 'Monthly',
      yearly: 'Yearly',
      mostPopular: 'MOST POPULAR',
      currentPlanBadge: 'CURRENT PLAN',
      save20: 'Save 20% vs monthly',
      processingBtn: 'Processing...',
      currentPlanBtn: 'Current Plan',
      upgradeTo: 'Upgrade to',
      billingHistory: 'Billing History',
      noBillingHistory: 'No billing history yet',
      billingHistoryDesc: 'Your invoices and payment history will appear here',
      downloadInvoice: 'Download invoice',
      invoiceStatusPaid: 'Paid',
      invoiceStatusOpen: 'Open',
      invoiceStatusVoid: 'Void',
      invoiceStatusRefund: 'Refunded',
      invoiceTypeInvoice: 'Invoice',
      invoiceTypeRefund: 'Credit note',
      cannotPurchase: 'This plan cannot be purchased online',
      failedCheckout: 'Failed to start checkout',
      failedPortal: 'Failed to open billing portal',
      perYear: '/year',
      perMonth: '/month',
      updatePaymentMethod: 'Update Payment Method',
    },

    onboarding: {
      title: 'Get Started with Centyr',
      subtitle: 'Complete these steps to unlock the full potential',
      ofCompleted: 'of',
      completed: 'completed',
      congratulations: 'Congratulations!',
      congratulationsDesc: "You've completed the onboarding. You're all set to create amazing aligned images!",
    },

    postDownload: {
      title: 'Download Complete!',
      subtitle: 'Your perfectly aligned image is ready',
      runningLow: 'Running Low on Credits',
      runningLowDesc: 'You have {remaining}/{total} uploads remaining this month',
      upgradePro: 'Upgrade to Pro',
      upgradeProDesc: 'Get unlimited uploads, bulk processing, and priority support for just $19/month',
      upgradeNow: 'Upgrade Now',
      whatsNext: "What's next?",
      processMore: 'Process More Images',
      processMoreDesc: 'Upload another batch',
      unlockBulk: 'Unlock Bulk Upload',
      unlockBulkDesc: 'Process 100s of images at once',
      loveCentyr: 'Love Centyr?',
      referralDesc: 'Share with a friend and you both get',
      referralCredits: '5 free image credits!',
      copy: 'Copy',
      copied: '✓ Copied',
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
      limitReached: 'Monthly Limit Reached',
      runningLow: 'Running Low on Credits',
      usedAll: "You've used all {limit} images this month. Upgrade to Pro for unlimited uploads!",
      usedPartial: "You've used {current}/{limit} images this month. Only {remaining} left!",
      upgradeTitle: 'Upgrade to Pro and get:',
      benefit1: 'Unlimited image uploads per month',
      benefit2: 'Bulk processing - upload 100s at once',
      benefit3: 'Priority support and faster processing',
      benefit4: 'API access for automation',
      upgradeContinue: 'Upgrade Now to Continue',
      upgradePro: 'Upgrade to Pro - $19/mo',
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
        badge: '20 hours by hand → 10 minutes',
        title: 'Set the standard once.',
        titleHighlight: 'It stays matched.',
        subtitle: 'Your whole catalog aligned, centered, same background, same size. In ~10 minutes. New products auto-match. No Canva, no freelancer.',
        ctaPrimary: 'Try your hardest products free',
        ctaSecondary: 'See prices',
        trustNoCreditCard: 'No credit card to start',
        trustFreeJobs: '10 free products/month',
        trustMoneyBack: '30-day money-back guarantee',
        yourStoreLabel: 'Your Store',
      },
      features: {
        title: 'Anyone can clean one photo. Centyr holds the standard.',
        subtitle: '~20 hours and ~€300 of manual alignment per catalog, and it breaks again the moment you add a product. Here is what you get instead.',
        f1Title: 'The 20-hour Canva job, in ~10 minutes',
        f1Desc: 'Align, center, size, remove the background and even out the lighting across your whole catalog to one standard. ~21 seconds per product. Without Canva, without Photoshop, without design skills.',
        f2Title: 'New products auto-match the old ones',
        f2Desc: 'Add a product next quarter and it matches the 500 already in your catalog the moment you upload it. This is what a freelancer structurally cannot sell you: the standard stays after the job ends.',
        f3Title: 'Change your standard, not your weekend',
        f3Desc: 'New margin, new background, new size? One click re-applies it to the entire catalog. By hand or on Fiverr you start over from zero and pay again, here it\'s one click.',
        f4Title: 'Every marketplace spec, handled for you',
        f4Desc: 'Amazon 1:1, Zalando 2:3, eBay, Etsy and your own store, each compliant, from one upload. We track each store\'s rules as they change, so you never read an image-requirements page again.',
      },
      howItWorks: {
        badge: '20 HOURS → 10 MINUTES',
        title: 'Upload a catalog. Download a matching one.',
        subtitle: 'Three steps, no design skill, nothing to install. It runs in your browser and a single product processes in about 21 seconds.',
        step1Title: 'Upload your catalog',
        step1Desc: 'Drag in your product photos, 5 or 500. Including the ones shot on different days, at different distances, in different light.',
        step2Title: 'Centyr applies your standard',
        step2Desc: 'Aligned, centered, sized, background removed, lighting evened out, every product to the same spec. Background removal runs on BiRefNet, which holds up on glass, jewelry, transparent and reflective products.',
        step2Sub: '~21 seconds per product. ~200 products in about 10 minutes, the same job that costs you ~20 hours by hand.',
        step3Title: 'Download, and it stays matched',
        step3Desc: 'Take the matching catalog to every channel. Add products next season and they auto-match. Change your standard and one click re-applies it to everything.',
        bottomText: 'No Canva grid. No freelancer to re-brief. No reshoot. No spec sheets to track.',
        ctaButton: 'Try your hardest products free',
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
        title: '~20 hours ≈ €300 per catalog, every season. Or €39.99 a month.',
        subtitle: 'Real prices, no trial tricks. Start free on 10 products, see the before/after on your own catalog, and only pay once the standard holds. Annual is 10× monthly, two months free.',
        monthly: 'Monthly',
        yearly: 'Yearly',
        billedYearly: 'billed yearly',
        mostPopular: 'MOST POPULAR',
        perMonth: '/month',
        startFree: 'Start Free',
        contactSales: 'Contact Sales',
        upgrade: 'Upgrade',
        startTrial: 'Start free, no card',
        subscribe: 'Subscribe',
        loading: 'Loading...',
        errorTitle: 'Failed to load pricing plans',
        currentPlanLabel: 'Current plan',
        jobsUsedThisMonth: '{current} / {limit} jobs used this month',
        managePlan: 'Manage subscription',
        currentBadge: 'CURRENT',
        currentPlanButton: 'Current plan',
        enterpriseTitle: 'Enterprise Solution',
        enterpriseDesc: 'For companies with advanced needs. Unlimited volume, custom integrations, guaranteed SLA and dedicated support.',
        enterpriseFeature1Title: 'Unlimited volume',
        enterpriseFeature1Desc: 'No monthly limit',
        enterpriseFeature2Title: 'SLA 99.99%',
        enterpriseFeature2Desc: 'Guaranteed uptime',
        enterpriseFeature3Title: 'Dedicated team',
        enterpriseFeature3Desc: 'Account manager',
        enterpriseFeature4Title: '24/7 support',
        enterpriseFeature4Desc: 'Maximum priority',
        enterpriseFrom: 'Starting from',
        enterpriseCustomPrice: 'Custom',
        enterpriseCustomDesc: 'Tailored pricing',
        enterpriseCta: 'Contact Sales',
        enterpriseResponse: 'Response within 24h',
        faqTitle: 'Frequently Asked Questions',
        faq1q: 'Can I cancel anytime?',
        faq1a: "Yes! You can cancel your subscription at any time. You'll continue to have access until the end of the billing period.",
        faq2q: 'What happens if I exceed my quota?',
        faq2a: "You'll need to wait for the next month or upgrade to a higher plan. We'll notify you when you're close to the limit.",
        faq3q: 'Do you offer refunds?',
        faq3a: 'Yes, we offer a 30-day money-back guarantee. Contact support for a full refund.',
        backToHome: 'Back to Home',
        planInfo: {
          free: {
            description: 'Prove it on your hardest products, €0',
            features: ['10 jobs/month', 'Up to 5 images per batch', 'Uniform alignment & centering', 'Background removal (BiRefNet, glass, jewelry, reflective)', 'Custom margin & dimensions', '7-day storage', 'Email support', '✗ Custom background', '✗ Product shadows', '✗ Marketplace presets', '✗ Exposure normalization'],
          },
          mini: {
            description: 'A small catalog, kept uniform',
            features: ['25 jobs/month', 'Up to 5 images per batch', 'Uniform alignment & centering', 'Background removal (BiRefNet)', 'Custom background & margin', '14-day storage', 'Email support'],
          },
          starter: {
            description: 'Your standard, reproducible, under €13/month',
            features: ['60 jobs/month', 'Up to 25 images per batch', 'Uniform alignment & centering', 'Background removal (BiRefNet)', 'Product shadows', '1 marketplace preset', 'One-click reprocess of the whole catalog', 'Custom background & margin', '30-day storage', 'Email support', '✗ Exposure normalization'],
          },
          pro: {
            description: 'The flagship, whole catalog, every channel, stays matched',
            features: ['200 jobs/month', 'Up to 100 images per batch', 'Uniform alignment & centering', 'Background removal (BiRefNet)', 'Product shadows', 'All marketplace presets (4), Amazon 1:1, Zalando 2:3, eBay, Etsy', 'Batch exposure normalization', 'New products auto-match your standard', 'One-click reprocess of the whole catalog', 'Priority processing', 'Custom background & margin', '90-day storage', 'Priority support'],
          },
          business: {
            description: 'Agencies & studios, many client catalogs, one standard each',
            features: ['500 jobs/month', 'Up to 100 images per batch', 'Uniform alignment & centering', 'Background removal (BiRefNet)', 'Product shadows', 'All marketplace presets (4)', 'Batch exposure normalization', 'A persistent standard per client catalog', 'One-click reprocess of the whole catalog', 'Priority processing', 'Custom background & margin', '180-day storage', '24/7 priority support'],
          },
        },
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
        badge: 'Solo founder, pre-revenue, no customers yet',
        title: 'The old way. The new way.',
        subtitle: 'We have no testimonials to quote and no logos to flash, and we will not invent them. Here is the honest comparison, then judge the before/after on your own catalog.',
        t1Content: 'Old way: ~20 hours in Canva to align ~200 products, about €300 of your time, and you do it again every season. New way: ~10 minutes, about 21 seconds per product.',
        t1Result: '20 hours → 10 minutes',
        t2Content: 'Old way: you add products next season and the grid breaks, so the whole pass comes back. New way: new products auto-match the ones already in your catalog the moment you upload them.',
        t2Result: 'Auto-match, no second pass',
        t3Content: 'Old way: change a margin and you redo the catalog product by product, or re-brief and re-pay a freelancer who never kept your standard. New way: one click re-applies your standard to everything.',
        t3Result: 'One click, whole catalog',
        t4Content: 'Old way: remove.bg, PhotoRoom and Pixelcut fix one image at a time and hold no catalog standard. New way: one standard across the whole catalog, output compliant for every channel.',
        t4Result: 'A standard, not an edit',
        stat1Label: '~20 hours by hand → ~10 minutes',
        stat2Label: '~€300 per catalog cycle, not spent',
        stat3Label: 'One standard, re-applied on demand',
        stat4Label: 'No testimonials, your own before/after',
      },
      finalCta: {
        badge: 'Free plan: 10 products, no card',
        title: 'Set your standard once.',
        titleLine2: 'Let it hold.',
        subtitle: '~20 hours by hand, or a freelancer you re-brief every season. Do it in ~10 minutes, and this time the standard stays. Start with your hardest products and see the before/after on your own catalog, before you pay anything.',
        ctaPrimary: 'Try your hardest products free',
        ctaSecondary: 'See real prices',
        trustNoCreditCard: 'No credit card required',
        trustFreeJobs: '10 free jobs/month',
        trustMoneyBack: '30-day money-back on any paid plan',
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
        tagline: 'One upload. Every channel\'s spec.',
        subtitle: 'Amazon wants 1:1 square. Zalando wants 2:3 portrait. eBay, Etsy and your own store each want something else.',
        description: 'Match one and you break another, unless one standardized catalog outputs them all. Centyr tracks every store\'s spec as it changes, so you never read an image-requirements page again. No second manual pass, no reshoot.',
      },
      liveStats: {
        badge: 'Real-time Stats',
        imagesProcessed: 'Images processed',
        activeUsers: 'Active users now',
        avgProcessing: 'Avg. processing time',
        onlineNow: 'Online now',
        ultraFast: 'Ultra fast',
        joinText: 'Standardize your first 10 products free, no card required',
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
      testimonials: 'Confronto',
      getStarted: 'Inizia Gratis',
      signedInAs: 'Accesso come',
      overview: 'Panoramica',
      billing: 'Fatturazione',
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
      emailAddress: 'Indirizzo Email',
      signingIn: 'Accesso in corso...',
      orContinueWith: 'Oppure continua con',
      backToSignIn: 'Torna al Login',
      forgotPasswordTitle: 'Password Dimenticata?',
      forgotPasswordSubtitle: "Inserisci la tua email e ti invieremo un codice di reset.",
      sendResetCode: 'Invia Codice di Reset',
      sending: 'Invio in corso...',
      resetCodeSent: 'Codice inviato! Controlla la tua email.',
      resetPasswordTitle: 'Reimposta Password',
      enterCodeSentTo: 'Inserisci il codice inviato a',
      verificationCode: 'Codice di Verifica',
      newPassword: 'Nuova Password',
      confirmNewPassword: 'Conferma Nuova Password',
      resetting: 'Reimpostazione in corso...',
      resetSuccess: 'Password reimpostata con successo! Effettua il login.',
      didntReceiveCode: 'Non hai ricevuto il codice?',
      requestAgain: 'Richiedi di nuovo',
      creatingAccount: 'Creazione account in corso...',
      mustBe8Chars: 'Deve essere di almeno 8 caratteri',
      agreeToTerms: 'Accetto i',
      termsOfService: 'Termini di Servizio',
      and: 'e la',
      privacyPolicy: 'Privacy Policy',
      signIn: 'Accedi',
      signUp: 'Registrati',
      whyChoose: 'Perché scegliere Centyr?',
      instantProcessing: 'Elaborazione Istantanea',
      instantProcessingDesc: 'Centinaia di foto elaborate in pochi secondi, automaticamente',
      saveHours: 'Risparmia 10+ Ore/Settimana',
      saveHoursDesc: 'Automatizza la modifica manuale delle foto prodotto',
      guarantee: 'Garanzia 30 Giorni',
      guaranteeDesc: 'Rimborso completo garantito, senza domande',
      avgRating: 'Valutazione media dai nostri clienti',
      activeStores: 'negozi e-commerce attivi',
      freeJobsBadge: '10 jobs gratuiti/mese',
      noCreditCard: 'Nessuna carta di credito richiesta',
      setupIn60: 'Configurazione in 60 secondi',
      startFreeJobsBadge: 'Inizia con 10 jobs gratuiti/mese',
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
      recentJobs: 'Jobs Recenti',
      noJobs: 'Nessun job elaborato ancora',
      uploadFirst: 'Carica le tue prime immagini →',
      images: 'immagini',
      download: 'Scarica',
      jobId: 'ID Job',
      estimatedTime: 'Tempo stimato rimanente',
      seconds: 'secondi',
      jobsProcessed: 'jobs elaborati',
      readyToProcess: 'Pronto per elaborare',
      aiPoweredHub: 'Il tuo hub di elaborazione immagini',
      jobsPerMonth: 'jobs / mese',
      jobsLeft: 'jobs rimanenti',
      upgrade: 'Aggiorna',
      available: 'Disponibili',
      success: 'Successo',
      usageLabel: 'Utilizzo',
      noJobsTitle: 'Nessun job elaborato ancora',
      noJobsDesc: "Carica la tua prima foto prodotto e vedi i risultati in secondi",
      uploadNow: 'Carica Ora',
      watchDemo: 'Guarda Demo',
      filterAll: 'tutti',
      filterCompleted: 'completati',
      filterProcessing: 'in elaborazione',
      filterFailed: 'falliti',
      filterPending: 'in attesa',
      searchPlaceholder: 'Cerca per nome…',
      sortNewest: 'Più recenti',
      sortOldest: 'Meno recenti',
      sortName: 'Nome (A-Z)',
      noJobsStatus: 'Nessun job trovato con stato:',
      showAllJobs: 'Mostra Tutti i Jobs',
      uploadNewImages: 'Carica Nuove Immagini',
      downloadCompleted: 'Download completato!',
      downloadFailed: 'Download fallito',
      batch: 'Batch',
      tipJpgPng: 'Funziona meglio con file JPG/PNG',
      tipBackground: 'Gli sfondi bianchi o grigi danno i migliori risultati',
      tipBulk: 'Elabora più immagini in blocco con il piano Pro',
      checklistUploadTitle: 'Carica la tua prima immagine',
      checklistUploadDesc: "Prova l'allineamento automatico con una foto prodotto",
      checklistUploadAction: 'Carica Ora',
      checklistDownloadTitle: 'Scarica il tuo risultato',
      checklistDownloadDesc: 'Ottieni la tua immagine perfettamente allineata',
      checklistDownloadAction: 'Vedi Jobs',
      checklistExploreTitle: 'Esplora le funzionalità',
      checklistExploreDesc: 'Scopri il caricamento in blocco e altre funzioni pro',
      checklistExploreAction: 'Scopri di Più',
    },

    jobDetail: {
      title: 'Dettagli Job',
      untitled: 'Job senza nome',
      backToDashboard: 'Dashboard',
      jobId: 'ID Job',
      created: 'Creato',
      updated: 'Aggiornato',
      processing: 'Elaborazione',
      totalTime: 'Tempo totale',
      images: 'Immagini',
      batchMode: 'Modalità batch',
      single: 'Singola',
      batchJob: 'Job Batch',
      download: 'Scarica',
      downloading: 'Download...',
      downloadImage: 'Scarica Immagine',
      delete: 'Elimina',
      retry: 'Riprova',
      retrying: 'Riprovo...',
      errorMessage: 'Messaggio di errore',
      errorLoading: 'Errore caricamento job',
      jobNotFound: 'Job non trovato',
      backToDashboardBtn: 'Torna alla Dashboard',
      loading: 'Caricamento dettagli job...',
      batchResults: 'Risultati batch',
      imageComparison: 'Confronto immagini',
      original: 'Originale',
      input: 'Input',
      processed: 'Elaborata',
      complete: 'Completata',
      format: 'Formato',
      size: 'Dimensione',
      time: 'Tempo',
      status: 'Stato',
      processingYourImage: 'Elaborazione in corso',
      jobQueued: 'Job in coda',
      processingDesc: "L'immagine è in elaborazione. Di solito richiede pochi secondi.",
      queuedDesc: "Il job è in coda e inizierà l'elaborazione a breve.",
      autoUpdate: 'Questa pagina si aggiornerà automaticamente',
      processingFailed: 'Elaborazione fallita',
      failedDesc: "Si è verificato un errore durante l'elaborazione dell'immagine.",
      tryAnother: "Prova con un'altra immagine",
      statusCompleted: 'Completato',
      statusProcessing: 'In elaborazione',
      statusFailed: 'Fallito',
      statusPending: 'In attesa',
      statusUnknown: 'Sconosciuto',
      retryFailed: 'Riprova fallito',
      retryStarted: 'Riprova avviata per {count} immagini',
      retryConfirmTitle: 'Riprova immagini fallite',
      retryConfirmMsg: 'Vuoi riprovare a elaborare le immagini incomplete?',
      retryConfirmBtn: 'Riprova',
      deleteConfirmTitle: 'Elimina job',
      deleteConfirmMsg: 'Sei sicuro di voler eliminare questo job? Azione irreversibile.',
      deleteConfirmBtn: 'Sì, elimina',
      downloadFailed: 'Download fallito',
      reprocess: 'Rielabora',
      reprocessTitle: 'Rielabora con formato diverso',
      reprocessDesc: 'Rielabora le immagini originali con nuove impostazioni. Usa un credito per immagine.',
      reprocessStart: 'Avvia Rielaborazione',
      reprocessing: 'Rielaborazione...',
      reprocessSuccess: 'Nuovo job avviato',
      reprocessFailed: 'Rielaborazione fallita',
      reprocessExpiredTitle: 'Immagini originali non più accessibili',
      reprocessExpiredDesc: 'I file originali sono scaduti. Ricaricali per rielaborare con un formato diverso.',
      reprocessUploadNew: 'Nuovo upload',
      outputFormat: 'Formato output',
      customFormat: 'Personalizzato',
      marketplaceFormats: 'Formati marketplace',
    },

    settings: {
      title: 'Impostazioni Account',
      subtitle: 'Gestisci i dettagli e le preferenze del tuo account',
      badge: 'Gestione Account',
      profileSection: 'Informazioni Profilo',
      usernameLabel: 'Username',
      usernamePlaceholder: 'Inserisci il tuo username',
      emailLabel: 'Indirizzo Email',
      emailVerified: 'Email verificata',
      emailNotVerified: 'Email non verificata',
      saveButton: 'Salva Modifiche',
      savingButton: 'Salvataggio...',
      passwordSection: 'Cambia Password',
      currentPassword: 'Password Attuale',
      currentPasswordPlaceholder: 'Inserisci la password attuale',
      newPassword: 'Nuova Password',
      newPasswordPlaceholder: 'Inserisci nuova password (min 8 caratteri)',
      confirmPassword: 'Conferma Nuova Password',
      confirmPasswordPlaceholder: 'Conferma la nuova password',
      changePasswordButton: 'Cambia Password',
      changingButton: 'Cambio in corso...',
      accountSection: 'Informazioni Account',
      userId: 'ID Utente',
      accountStatus: 'Stato Account',
      currentPlan: 'Piano Attuale',
      toastProfileSuccess: 'Profilo aggiornato!',
      toastProfileError: 'Aggiornamento fallito',
      toastPasswordSuccess: 'Password cambiata!',
      toastPasswordError: 'Cambio password fallito',
      toastPasswordMismatch: 'Le password non coincidono',
      toastPasswordTooShort: 'La password deve avere almeno 8 caratteri',
      gdprSection: 'Privacy & Dati',
      gdprDescription: 'Ai sensi del GDPR hai il diritto di esportare tutti i tuoi dati o eliminare definitivamente il tuo account. L\'eliminazione è irreversibile: tutte le immagini e i job verranno rimossi immediatamente.',
      exportDataButton: 'Esporta i Miei Dati',
      exportDataLoading: 'Esportazione...',
      exportDataSuccess: 'Dati esportati con successo',
      exportDataError: 'Esportazione dati fallita',
      deleteAccountButton: 'Elimina il Mio Account',
      deleteAccountConfirmTitle: 'Elimina Account Definitivamente',
      deleteAccountConfirmMsg: 'Questa azione è irreversibile. Tutti i tuoi job, immagini e dati account verranno eliminati permanentemente. Il tuo abbonamento verrà cancellato immediatamente.',
      deleteAccountConfirmInput: 'Scrivi ELIMINA per confermare',
      deleteAccountConfirmBtn: 'Sì, elimina definitivamente il mio account',
      deleteAccountSuccess: 'Il tuo account è stato eliminato. Arrivederci!',
      deleteAccountError: 'Eliminazione fallita. Contatta privacy@centyr.tech',
    },

    cookieBanner: {
      title: 'Usiamo solo cookie essenziali',
      description: 'Utilizziamo esclusivamente cookie necessari per mantenerti connesso e ricordare le tue preferenze. Nessun tracciamento, nessuna pubblicità. Leggi la nostra',
      privacyLink: 'Privacy Policy',
      gdprLink: 'Cookie Policy',
      and: 'e la',
      sessionCookie: 'Solo sessione',
      noTracking: 'Nessun cookie di tracciamento o pubblicità',
      accept: 'Capito',
      decline: 'Rifiuta',
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
      warningLow: 'Stai esaurendo le immagini!',
      upgradeNow: 'Aggiorna ora',
      quotaExceeded: 'Limite mensile superato. Aggiorna il tuo piano.',
      maxFiles: 'Massimo file per caricamento',
      newJob: 'Nuovo Job',
      newJobSubtitle: "Ogni caricamento crea un job, le tue foto vengono allineate ed elaborate automaticamente.",
      jobsRemaining: 'jobs rimanenti',
      whatIsJob: "Cos'è un job?",
      jobExplanation: "Un job è un batch di una o più immagini inviate per l'elaborazione. Ogni job ha un nome, traccia il progresso in tempo reale e mantiene i risultati disponibili per il download nella dashboard.",
      stepUpload: 'Carica',
      stepConfigure: 'Configura',
      stepReview: 'Revisione',
      uploadStepTitle: 'Carica le tue immagini',
      uploadStepSubtitle: 'Trascina le tue foto prodotto o clicca per selezionarle',
      dropHere: 'Rilascia qui!',
      dragHere: 'Trascina le immagini qui',
      orBrowse: 'o clicca per sfogliare',
      freePlanLimit: 'Piano Gratuito: 1 immagine per job.',
      canUploadTo: 'Puoi caricare fino a {count} immagini per job.',
      upgradeUnlimited: 'Aggiorna per batch illimitati',
      imageAdded: 'immagine aggiunta',
      imagesAdded: 'immagini aggiunte',
      configureTitle: 'Configura job',
      configureSubtitle: 'Personalizza le opzioni di elaborazione',
      jobNameLabel: 'Nome Job',
      jobNamePlaceholder: 'es. Collezione Estate 2024, Catalogo Prodotti...',
      jobNameHelper: 'Un nome descrittivo per identificare questo batch',
      processingOptions: 'Opzioni di Elaborazione',
      removeBackground: 'Rimuovi Sfondo',
      removeBackgroundDesc: "Rimuove automaticamente lo sfondo per foto prodotto pulite",
      premium: 'Premium',
      customBackground: 'Sfondo personalizzato (opzionale)',
      uploadBackgroundImage: 'Carica immagine di sfondo',
      formatPreset: 'Formato Preset',
      presetCustom: 'Personalizzato',
      presetLocked: 'Dimensioni e padding vengono impostati automaticamente dal preset.',
      outputSettings: 'Impostazioni Output',
      outputSize: 'Dimensione Output',
      margin: 'Margine',
      marginHelper: 'Percentuale relativa alla dimensione output.',
      reviewTitle: 'Revisione & avvio',
      reviewSubtitle: "Controlla i dettagli prima di avviare l'elaborazione",
      summaryJob: 'Job',
      summaryImages: 'Immagini',
      summaryOptions: 'Opzioni',
      summaryPreview: 'Anteprima',
      aiAlignment: 'Allineamento automatico',
      backgroundRemoval: 'Rimozione Sfondo',
      customBackgroundLabel: 'Sfondo Personalizzato',
      estimatedTimeLabel: 'Tempo stimato: ~{minutes} minuti',
      redirectInfo: 'Verrai reindirizzato alla dashboard per tracciare il progresso',
      insufficientCredits: 'Crediti insufficienti',
      insufficientCreditsDesc: 'Hai {remaining} crediti ma stai cercando di elaborare {count} immagini.',
      continueBtn: 'Continua',
      startProcessing: 'Avvia Elaborazione',
      processingBtn: 'Elaborazione...',
      fast: 'Veloce',
      fastDesc: '~10 sec per immagine',
      aiPrecision: 'Precisione automatica',
      aiPrecisionDesc: 'Allineamento perfetto',
      secure: 'Sicuro',
      secureDesc: 'Crittografia end-to-end',
      jobStarted: 'Job avviato! Reindirizzamento alla dashboard...',
      compressingImages: 'Ottimizzazione immagini...',
      uploadAtLeastOne: 'Carica almeno una immagine',
      enterJobName: 'Inserisci un nome per il job',
      maxBatchExceeded: 'Massimo {count} immagini per batch.',
      upgradeToProcess: 'Aggiorna per elaborarne di più!',
      onlyCreditsLeft: 'Hai solo {count} jobs rimanenti questo mese.',
      upgradePremium: 'Aggiorna a Premium per usare la rimozione dello sfondo',
    },

    billing: {
      title: 'Fatturazione e Abbonamento',
      subtitle: "Gestisci il tuo abbonamento e le informazioni di fatturazione",
      subscriptionManagement: 'Gestione Abbonamento',
      currentSubscription: 'Abbonamento Attuale',
      monthlyQuota: 'Quota Mensile',
      usedThisMonth: 'Usato Questo Mese',
      remaining: 'Rimanenti',
      jobsPerMonth: 'jobs/mese',
      jobsLeft: 'jobs rimanenti',
      manageBillingPortal: 'Gestisci Portale Fatturazione',
      opening: 'Apertura...',
      runningLow: 'Stai esaurendo i crediti',
      runningLowDesc: "Hai usato il {percentage}% della tua quota mensile. Considera un aggiornamento per evitare interruzioni.",
      viewUpgradeOptions: 'Vedi opzioni di aggiornamento →',
      availablePlans: 'Piani Disponibili',
      monthly: 'Mensile',
      yearly: 'Annuale',
      mostPopular: 'PIÙ POPOLARE',
      currentPlanBadge: 'PIANO ATTUALE',
      save20: 'Risparmia 20% vs mensile',
      processingBtn: 'Elaborazione...',
      currentPlanBtn: 'Piano Attuale',
      upgradeTo: 'Passa a',
      billingHistory: 'Storico Fatturazione',
      noBillingHistory: 'Nessuno storico di fatturazione ancora',
      billingHistoryDesc: 'Le tue fatture e lo storico pagamenti appariranno qui',
      downloadInvoice: 'Scarica fattura',
      invoiceStatusPaid: 'Pagata',
      invoiceStatusOpen: 'Aperta',
      invoiceStatusVoid: 'Annullata',
      invoiceStatusRefund: 'Rimborsata',
      invoiceTypeInvoice: 'Fattura',
      invoiceTypeRefund: 'Nota di credito',
      cannotPurchase: 'Questo piano non può essere acquistato online',
      failedCheckout: 'Impossibile avviare il checkout',
      failedPortal: 'Impossibile aprire il portale di fatturazione',
      perYear: '/anno',
      perMonth: '/mese',
      updatePaymentMethod: 'Cambia Metodo di Pagamento',
    },

    onboarding: {
      title: 'Inizia con Centyr',
      subtitle: 'Completa questi passaggi per sbloccare tutto il potenziale',
      ofCompleted: 'di',
      completed: 'completati',
      congratulations: 'Congratulazioni!',
      congratulationsDesc: "Hai completato l'onboarding. Sei pronto per creare immagini allineate perfettamente!",
    },

    postDownload: {
      title: 'Download Completato!',
      subtitle: 'La tua immagine perfettamente allineata è pronta',
      runningLow: 'Crediti in Esaurimento',
      runningLowDesc: 'Hai {remaining}/{total} caricamenti rimanenti questo mese',
      upgradePro: 'Passa a Pro',
      upgradeProDesc: 'Ottieni caricamenti illimitati, elaborazione in blocco e supporto prioritario a soli $19/mese',
      upgradeNow: 'Aggiorna Ora',
      whatsNext: 'Cosa fare adesso?',
      processMore: 'Elabora Altre Immagini',
      processMoreDesc: 'Carica un altro batch',
      unlockBulk: 'Sblocca Caricamento in Blocco',
      unlockBulkDesc: 'Elabora centinaia di immagini contemporaneamente',
      loveCentyr: 'Ti piace Centyr?',
      referralDesc: 'Condividi con un amico e ricevete entrambi',
      referralCredits: '5 crediti immagine gratuiti!',
      copy: 'Copia',
      copied: '✓ Copiato',
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
      limitReached: 'Limite Mensile Raggiunto',
      runningLow: 'Crediti in Esaurimento',
      usedAll: "Hai usato tutte le {limit} immagini di questo mese. Passa a Pro per caricamenti illimitati!",
      usedPartial: "Hai usato {current}/{limit} immagini questo mese. Ne restano solo {remaining}!",
      upgradeTitle: 'Passa a Pro e ottieni:',
      benefit1: 'Caricamenti illimitati per mese',
      benefit2: 'Elaborazione in blocco - carica centinaia in una volta',
      benefit3: 'Supporto prioritario ed elaborazione più veloce',
      benefit4: 'Accesso API per automazione',
      upgradeContinue: 'Aggiorna Ora per Continuare',
      upgradePro: 'Passa a Pro - $19/mese',
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
        badge: '20 ore a mano → 10 minuti',
        title: 'Imposta lo standard una volta.',
        titleHighlight: 'Resta uniforme.',
        subtitle: 'Tutto il catalogo allineato, centrato, stesso sfondo, stessa misura. In ~10 minuti. I nuovi prodotti si auto-allineano. Niente Canva, niente freelance.',
        ctaPrimary: 'Prova i tuoi prodotti difficili, gratis',
        ctaSecondary: 'Vedi i prezzi',
        trustNoCreditCard: 'Nessuna carta per iniziare',
        trustFreeJobs: '10 prodotti gratis/mese',
        trustMoneyBack: 'Garanzia soddisfatti o rimborsati 30 giorni',
        yourStoreLabel: 'Il Tuo Store',
      },
      features: {
        title: 'Pulire una foto lo sanno fare tutti. Centyr tiene lo standard.',
        subtitle: '~20 ore e ~€300 di allineamento manuale per catalogo, e si rompe di nuovo appena aggiungi un prodotto. Ecco cosa ottieni al suo posto.',
        f1Title: 'Il lavoro da 20 ore su Canva, in ~10 minuti',
        f1Desc: 'Allinea, centra, dimensiona, rimuove lo sfondo e uniforma la luce su tutto il catalogo, secondo un unico standard. ~21 secondi a prodotto. Senza Canva, senza Photoshop, senza saper usare un editor.',
        f2Title: 'I nuovi prodotti si allineano da soli ai vecchi',
        f2Desc: 'Aggiungi un prodotto tra tre mesi e combacia con i 500 già a catalogo nel momento in cui lo carichi. È la parte che un freelancer non può venderti: lo standard resta anche quando il lavoro finisce.',
        f3Title: 'Cambia lo standard, non il weekend',
        f3Desc: 'Nuovo margine, nuovo sfondo, nuova dimensione? Un click lo ri-applica all\'intero catalogo. A mano o su Fiverr ricominci da zero e paghi di nuovo, qui è un click.',
        f4Title: 'Le specifiche di ogni marketplace, gestite per te',
        f4Desc: 'Amazon 1:1, Zalando 2:3, eBay, Etsy e il tuo store, ognuno conforme, da un solo caricamento. Seguiamo noi le regole di ogni store quando cambiano: tu non apri più una pagina di requisiti immagine.',
      },
      howItWorks: {
        badge: '20 ORE → 10 MINUTI',
        title: 'Carichi un catalogo. Ne scarichi uno che combacia.',
        subtitle: 'Tre passaggi, zero competenze di design, niente da installare. Funziona nel browser e un singolo prodotto viene elaborato in circa 21 secondi.',
        step1Title: 'Carica il catalogo',
        step1Desc: 'Trascina le tue foto prodotto, 5 o 500. Anche quelle scattate in giorni diversi, a distanze diverse, con luci diverse.',
        step2Title: 'Centyr applica il tuo standard',
        step2Desc: 'Allineato, centrato, dimensionato, sfondo rimosso, luce uniformata, ogni prodotto sulla stessa specifica. La rimozione sfondo gira su BiRefNet, che regge vetro, gioielli, trasparenti e riflettenti.',
        step2Sub: '~21 secondi a prodotto. ~200 prodotti in circa 10 minuti, lo stesso lavoro che a mano ti costa ~20 ore.',
        step3Title: 'Scarica, e resta uniforme',
        step3Desc: 'Porti il catalogo uniforme su ogni canale. Aggiungi prodotti la prossima stagione e si allineano da soli. Cambi standard e un click lo ri-applica a tutto.',
        bottomText: 'Nessuna griglia su Canva. Nessun freelancer da ri-briefare. Nessuno scatto da rifare. Nessuna specifica da inseguire.',
        ctaButton: 'Prova gratis i tuoi prodotti più difficili',
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
        title: '~20 ore ≈ €300 a catalogo, ogni stagione. Oppure €39,99 al mese.',
        subtitle: 'Prezzi reali, nessun trucco da trial. Inizi gratis su 10 prodotti, vedi il before/after sul tuo catalogo e paghi solo quando lo standard regge. L\'annuale è 10× il mensile: due mesi gratis.',
        monthly: 'Mensile',
        yearly: 'Annuale',
        billedYearly: 'fatturato annualmente',
        mostPopular: 'PIÙ POPOLARE',
        perMonth: '/mese',
        startFree: 'Inizia Gratis',
        contactSales: 'Contatta Vendite',
        upgrade: 'Aggiorna',
        startTrial: 'Inizia gratis, senza carta',
        subscribe: 'Abbonati',
        loading: 'Caricamento...',
        errorTitle: 'Impossibile caricare i piani',
        currentPlanLabel: 'Piano attuale',
        jobsUsedThisMonth: '{current} / {limit} job usati questo mese',
        managePlan: 'Gestisci abbonamento',
        currentBadge: 'ATTUALE',
        currentPlanButton: 'Piano attuale',
        enterpriseTitle: 'Soluzione Enterprise',
        enterpriseDesc: 'Per aziende con esigenze avanzate. Volume illimitato, integrazioni custom, SLA garantito e supporto dedicato.',
        enterpriseFeature1Title: 'Volume illimitato',
        enterpriseFeature1Desc: 'Nessun limite mensile',
        enterpriseFeature2Title: 'SLA 99.99%',
        enterpriseFeature2Desc: 'Uptime garantito',
        enterpriseFeature3Title: 'Team dedicato',
        enterpriseFeature3Desc: 'Account manager',
        enterpriseFeature4Title: 'Supporto 24/7',
        enterpriseFeature4Desc: 'Priorità massima',
        enterpriseFrom: 'A partire da',
        enterpriseCustomPrice: 'Custom',
        enterpriseCustomDesc: 'Pricing su misura',
        enterpriseCta: 'Contatta Sales',
        enterpriseResponse: 'Risposta entro 24h',
        faqTitle: 'Domande Frequenti',
        faq1q: 'Posso cancellare quando voglio?',
        faq1a: "Sì! Puoi cancellare l'abbonamento in qualsiasi momento. Continuerai ad avere accesso fino alla fine del periodo di fatturazione.",
        faq2q: 'Cosa succede se supero la quota?',
        faq2a: "Dovrai aspettare il mese successivo o fare upgrade a un piano superiore. Ti notificheremo quando sei vicino al limite.",
        faq3q: 'Offrite rimborsi?',
        faq3a: "Sì, offriamo una garanzia soddisfatti o rimborsati di 30 giorni. Contatta il supporto per un rimborso completo.",
        backToHome: 'Torna alla Home',
        planInfo: {
          free: {
            description: 'Provalo sui tuoi prodotti più difficili, €0',
            features: ['10 job/mese', 'Fino a 5 immagini per batch', 'Allineamento e centraggio uniforme', 'Rimozione sfondo (BiRefNet, vetro, gioielli, riflettenti)', 'Margine e dimensioni personalizzati', 'Storage 7 giorni', 'Supporto email', '✗ Sfondo personalizzato', '✗ Ombre prodotto', '✗ Preset marketplace', '✗ Normalizza esposizione'],
          },
          mini: {
            description: 'Un catalogo piccolo, tenuto uniforme',
            features: ['25 job/mese', 'Fino a 5 immagini per batch', 'Allineamento e centraggio uniforme', 'Rimozione sfondo (BiRefNet)', 'Sfondo e margine personalizzati', 'Storage 14 giorni', 'Supporto email'],
          },
          starter: {
            description: 'Il tuo standard, riproducibile, sotto i €13 al mese',
            features: ['60 job/mese', 'Fino a 25 immagini per batch', 'Allineamento e centraggio uniforme', 'Rimozione sfondo (BiRefNet)', 'Ombre prodotto', '1 preset marketplace', 'Ri-elaborazione dell\'intero catalogo in un click', 'Sfondo e margine personalizzati', 'Storage 30 giorni', 'Supporto email', '✗ Normalizza esposizione'],
          },
          pro: {
            description: 'Il piano di punta, tutto il catalogo, ogni canale, sempre uniforme',
            features: ['200 job/mese', 'Fino a 100 immagini per batch', 'Allineamento e centraggio uniforme', 'Rimozione sfondo (BiRefNet)', 'Ombre prodotto', 'Tutti i preset marketplace (4), Amazon 1:1, Zalando 2:3, eBay, Etsy', 'Normalizza esposizione batch', 'I nuovi prodotti si allineano da soli al tuo standard', 'Ri-elaborazione dell\'intero catalogo in un click', 'Elaborazione prioritaria', 'Sfondo e margine personalizzati', 'Storage 90 giorni', 'Supporto prioritario'],
          },
          business: {
            description: 'Agenzie e studi, tanti cataloghi clienti, uno standard ciascuno',
            features: ['500 job/mese', 'Fino a 100 immagini per batch', 'Allineamento e centraggio uniforme', 'Rimozione sfondo (BiRefNet)', 'Ombre prodotto', 'Tutti i preset marketplace (4)', 'Normalizza esposizione batch', 'Uno standard persistente per ogni catalogo cliente', 'Ri-elaborazione dell\'intero catalogo in un click', 'Elaborazione prioritaria', 'Sfondo e margine personalizzati', 'Storage 180 giorni', 'Supporto prioritario 24/7'],
          },
        },
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
        badge: 'Founder solo, pre-revenue, ancora nessun cliente',
        title: 'Il vecchio modo. Il nuovo modo.',
        subtitle: 'Non abbiamo testimonianze da citare né loghi da sventolare, e non ce li inventiamo. Ecco il confronto onesto, poi giudica il before/after sul tuo catalogo.',
        t1Content: 'Vecchio modo: ~20 ore su Canva per allineare ~200 prodotti, circa €300 del tuo tempo, e lo rifai ogni stagione. Nuovo modo: ~10 minuti, circa 21 secondi a prodotto.',
        t1Result: '20 ore → 10 minuti',
        t2Content: 'Vecchio modo: aggiungi prodotti la stagione dopo, la griglia si rompe e tutto il lavoro torna indietro. Nuovo modo: i nuovi prodotti si allineano da soli a quelli già a catalogo nel momento in cui li carichi.',
        t2Result: 'Auto-match, nessun secondo giro',
        t3Content: 'Vecchio modo: cambi un margine e rifai il catalogo prodotto per prodotto, oppure ri-briefi e ripaghi un freelancer che il tuo standard non l\'ha mai tenuto. Nuovo modo: un click ri-applica il tuo standard a tutto.',
        t3Result: 'Un click, tutto il catalogo',
        t4Content: 'Vecchio modo: remove.bg, PhotoRoom e Pixelcut sistemano un\'immagine alla volta e non tengono nessuno standard di catalogo. Nuovo modo: uno standard su tutto il catalogo, in uscita conforme per ogni canale.',
        t4Result: 'Uno standard, non un ritocco',
        stat1Label: '~20 ore a mano → ~10 minuti',
        stat2Label: '~€300 a ciclo di catalogo, non spesi',
        stat3Label: 'Uno standard, ri-applicato quando vuoi',
        stat4Label: 'Zero testimonianze, il tuo before/after',
      },
      finalCta: {
        badge: 'Piano gratuito: 10 prodotti, senza carta',
        title: 'Imposta il tuo standard una volta.',
        titleLine2: 'Lascia che regga.',
        subtitle: "~20 ore a mano, o un freelancer da ri-briefare ogni stagione. Fallo in ~10 minuti, e stavolta lo standard resta. Parti dai tuoi prodotti più difficili e guarda il before/after sul tuo catalogo, prima di pagare un euro.",
        ctaPrimary: 'Prova gratis i tuoi prodotti più difficili',
        ctaSecondary: 'Guarda i prezzi reali',
        trustNoCreditCard: 'Nessuna carta di credito richiesta',
        trustFreeJobs: '10 job gratuiti/mese',
        trustMoneyBack: 'Rimborso entro 30 giorni su ogni piano a pagamento',
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
        tagline: 'Un solo caricamento. Le specifiche di ogni canale.',
        subtitle: 'Amazon vuole il quadrato 1:1. Zalando vuole il verticale 2:3. eBay, Etsy e il tuo store vogliono ognuno un\'altra cosa.',
        description: 'Ne rispetti una e ne rompi un\'altra, a meno che un unico catalogo standardizzato non le produca tutte. Centyr segue le specifiche di ogni store quando cambiano, così non apri più una pagina di requisiti immagine. Nessun secondo passaggio manuale, nessuno scatto da rifare.',
      },
      liveStats: {
        badge: 'Stats in tempo reale',
        imagesProcessed: 'Immagini elaborate',
        activeUsers: 'Utenti attivi ora',
        avgProcessing: 'Tempo medio',
        onlineNow: 'Online adesso',
        ultraFast: 'Ultra veloce',
        joinText: 'Standardizza gratis i tuoi primi 10 prodotti, senza carta',
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
