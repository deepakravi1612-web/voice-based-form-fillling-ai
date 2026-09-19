/**
 * VoiceForm - Production-Grade Voice-Based Form Filling Portal
 * Designed for Indian English (en-IN) with Tamil and Hindi Architecture
 * Author: Antigravity IDE Pair Programmer
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Configuration & Field Definitions
  // ==========================================================================
  
  const FIELDS = [
    {
      id: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      sensitive: false,
      cardId: 'card-fullName',
      prompt: {
        'en-IN': 'What is your full name?',
        'ta-IN': 'உங்கள் முழுப் பெயர் என்ன?',
        'hi-IN': 'आपका पूरा नाम क्या है?'
      },
      subhint: 'Press Start Speaking and say: "My name is Abinaya"',
      placeholder: 'e.g. Abinaya Sundar'
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      sensitive: true, // Requires confirmation
      cardId: 'card-email',
      prompt: {
        'en-IN': 'What is your email address?',
        'ta-IN': 'உங்கள் மின்னஞ்சல் முகவரி என்ன?',
        'hi-IN': 'आपका ईमेल पता क्या है?'
      },
      subhint: 'Say: "My email is abinaya at gmail dot com"',
      placeholder: 'e.g. abinaya@gmail.com'
    },
    {
      id: 'phone',
      label: 'Mobile Phone Number',
      type: 'tel',
      required: true,
      sensitive: true, // Requires confirmation
      cardId: 'card-phone',
      prompt: {
        'en-IN': 'What is your mobile phone number?',
        'ta-IN': 'உங்கள் கைபேசி எண் என்ன?',
        'hi-IN': 'आपका मोबाइल फोन नंबर क्या है?'
      },
      subhint: 'Say: "My phone number is 9876543210" or speak digits',
      placeholder: '10-digit mobile number'
    },
    {
      id: 'dob',
      label: 'Date of Birth',
      type: 'date',
      required: true,
      sensitive: true, // Requires confirmation
      cardId: 'card-dob',
      prompt: {
        'en-IN': 'What is your date of birth?',
        'ta-IN': 'உங்கள் பிறந்த தேதி என்ன?',
        'hi-IN': 'आपकी जन्म तिथि क्या है?'
      },
      subhint: 'Say: "June 15 2006" or "15th August 1998"',
      placeholder: 'YYYY-MM-DD'
    },
    {
      id: 'gender',
      label: 'Gender',
      type: 'radio',
      required: true,
      sensitive: false,
      cardId: 'card-gender',
      prompt: {
        'en-IN': 'What is your gender? Male, Female, or Other?',
        'ta-IN': 'உங்கள் பாலினம் என்ன? ஆண், பெண், அல்லது பிற?',
        'hi-IN': 'आपका लिंग क्या है? पुरुष, महिला, या अन्य?'
      },
      subhint: 'Say: "Female" or "My gender is female"',
      options: ['Male', 'Female', 'Other']
    },
    {
      id: 'country',
      label: 'Country',
      type: 'select',
      required: true,
      sensitive: false,
      cardId: 'card-country',
      prompt: {
        'en-IN': 'Which country do you reside in? India, United States, United Kingdom, Canada, or Australia?',
        'ta-IN': 'நீங்கள் எந்த நாட்டில் வசிக்கிறீர்கள்? இந்தியா, அமெரிக்கா, அல்லது ஆஸ்திரேலியா?',
        'hi-IN': 'आप किस देश में रहते हैं? भारत, अमेरिका, या ऑस्ट्रेलिया?'
      },
      subhint: 'Say: "Select India" or "Country India"',
      options: ['India', 'United States', 'United Kingdom', 'Canada', 'Australia']
    },
    {
      id: 'skills',
      label: 'Technical Skills',
      type: 'checkbox',
      required: false,
      sensitive: false,
      cardId: 'card-skills',
      prompt: {
        'en-IN': 'What technical skills do you have? You can choose Java, C++, Cybersecurity, Web Development, or Database.',
        'ta-IN': 'உங்களிடம் என்ன தொழில்நுட்ப திறன்கள் உள்ளன? ஜாவா, சி++, அல்லது இணைய உருவாக்கம்.',
        'hi-IN': 'आपके पास क्या तकनीकी कौशल हैं? जावा, सी++, या वेब डेवलपमेंट।'
      },
      subhint: 'Say: "Select Java and Cybersecurity" or "Unselect Java"',
      options: ['Java', 'C++', 'Cybersecurity', 'Web Development', 'Database']
    },
    {
      id: 'address',
      label: 'Residential Address',
      type: 'textarea',
      required: true,
      sensitive: true, // Requires confirmation
      cardId: 'card-address',
      prompt: {
        'en-IN': 'What is your complete residential address?',
        'ta-IN': 'உங்கள் முழுமையான முகவரி என்ன?',
        'hi-IN': 'आपका पूरा आवासीय पता क्या है?'
      },
      subhint: 'Say: "My address is 42 Gandhi Road Chennai Tamil Nadu"',
      placeholder: 'House / Flat No, Street, City, State, PIN'
    }
  ];

  // Number words for Indian spoken digits
  const DIGIT_WORDS = {
    'zero': '0', 'oh': '0', 'one': '1', 'two': '2', 'to': '2', 'too': '2',
    'three': '3', 'four': '4', 'for': '4', 'five': '5', 'six': '6',
    'seven': '7', 'eight': '8', 'ate': '8', 'nine': '9',
    'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13', 'fourteen': '14',
    'fifteen': '15', 'sixteen': '16', 'seventeen': '17', 'eighteen': '18', 'nineteen': '19',
    'twenty': '20', 'thirty': '30', 'forty': '40', 'fifty': '50', 'sixty': '60',
    'seventy': '70', 'eighty': '80', 'ninety': '90', 'hundred': '100'
  };

  const MONTHS_MAP = {
    'january': 1, 'jan': 1,
    'february': 2, 'feb': 2,
    'march': 3, 'mar': 3,
    'april': 4, 'apr': 4,
    'may': 5,
    'june': 6, 'jun': 6,
    'july': 7, 'jul': 7,
    'august': 8, 'aug': 8,
    'september': 9, 'sep': 9, 'sept': 9,
    'october': 10, 'oct': 10,
    'november': 11, 'nov': 11,
    'december': 12, 'dec': 12
  };

  // ==========================================================================
  // 2. Application State
  // ==========================================================================
  
  const state = {
    currentFieldIndex: 0,
    selectedLanguage: 'en-IN',
    isListening: false,
    isSpeakingAssistant: false,
    isVoiceGuidanceEnabled: true,
    isConfirmationMode: false,
    pendingConfirmation: null, // { fieldIndex, value, displayValue }
    reviewModalOpen: false,
    speechSupported: false,
    recognitionInstance: null,
    formValues: {
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      country: '',
      skills: [],
      address: '',
      documentName: ''
    }
  };

  // ==========================================================================
  // 3. DOM Elements Cache
  // ==========================================================================
  
  const elements = {
    html: document.documentElement,
    languageSelect: document.getElementById('languageSelect'),
    currentLangTag: document.getElementById('currentLangTag'),
    unsupportedBanner: document.getElementById('unsupportedBanner'),
    dismissAlertBtn: document.getElementById('dismissAlertBtn'),
    
    // Assistant Card
    assistantCard: document.getElementById('assistantCard'),
    statusBadge: document.getElementById('statusBadge'),
    statusDot: document.getElementById('statusDot'),
    statusText: document.getElementById('statusText'),
    stepCounterBadge: document.getElementById('stepCounterBadge'),
    activeFieldTag: document.getElementById('activeFieldTag'),
    soundBars: document.getElementById('soundBars'),
    assistantQuestion: document.getElementById('assistantQuestion'),
    assistantSubhint: document.getElementById('assistantSubhint'),
    
    // Transcript & Confirmation
    transcriptText: document.getElementById('transcriptText'),
    confidenceBadge: document.getElementById('confidenceBadge'),
    confirmationBox: document.getElementById('confirmationBox'),
    confirmMsg: document.getElementById('confirmMsg'),
    btnConfirmYes: document.getElementById('btnConfirmYes'),
    btnConfirmNo: document.getElementById('btnConfirmNo'),
    
    // Assistant Controls
    btnToggleSpeak: document.getElementById('btnToggleSpeak'),
    btnSpeakText: document.getElementById('btnSpeakText'),
    btnRepeatPrompt: document.getElementById('btnRepeatPrompt'),
    btnTypeInstead: document.getElementById('btnTypeInstead'),
    
    // Progress
    progressPercent: document.getElementById('progressPercent'),
    progressBarFill: document.getElementById('progressBarFill'),
    stepStepper: document.getElementById('stepStepper'),
    
    // Form Inputs
    form: document.getElementById('voiceApplicationForm'),
    inputFullName: document.getElementById('fullName'),
    inputEmail: document.getElementById('email'),
    inputPhone: document.getElementById('phone'),
    inputDob: document.getElementById('dob'),
    radioGenders: document.querySelectorAll('input[name="gender"]'),
    selectCountry: document.getElementById('country'),
    checkboxSkills: document.querySelectorAll('input[name="skills"]'),
    textareaAddress: document.getElementById('address'),
    inputDocument: document.getElementById('documentUpload'),
    fileSelectedName: document.getElementById('fileSelectedName'),
    btnSpeakDoc: document.getElementById('btnSpeakDoc'),
    
    // Form Navigation & Actions
    btnPrevField: document.getElementById('btnPrevField'),
    btnNextField: document.getElementById('btnNextField'),
    btnClearCurrentField: document.getElementById('btnClearCurrentField'),
    btnOpenReview: document.getElementById('btnOpenReview'),
    btnFormSubmit: document.getElementById('btnFormSubmit'),
    
    // Accessibility Controls
    fontSizeSmall: document.getElementById('fontSizeSmall'),
    fontSizeNormal: document.getElementById('fontSizeNormal'),
    fontSizeLarge: document.getElementById('fontSizeLarge'),
    toggleHighContrast: document.getElementById('toggleHighContrast'),
    toggleSpeechAudio: document.getElementById('toggleSpeechAudio'),
    screenReaderAnnouncer: document.getElementById('screenReaderAnnouncer'),
    
    // Modals
    reviewModal: document.getElementById('reviewModal'),
    reviewTableBody: document.getElementById('reviewTableBody'),
    btnCloseReviewModal: document.getElementById('btnCloseReviewModal'),
    btnReviewBack: document.getElementById('btnReviewBack'),
    btnConfirmFinalSubmit: document.getElementById('btnConfirmFinalSubmit'),
    
    successModal: document.getElementById('successModal'),
    receiptCode: document.getElementById('receiptCode'),
    receiptApplicantName: document.getElementById('receiptApplicantName'),
    receiptApplicantPhone: document.getElementById('receiptApplicantPhone'),
    receiptTimestamp: document.getElementById('receiptTimestamp'),
    btnPrintReceipt: document.getElementById('btnPrintReceipt'),
    btnResetAllForm: document.getElementById('btnResetAllForm'),
    
    // Simulator
    btnSimulateMicDenied: document.getElementById('btnSimulateMicDenied'),
    customSimInput: document.getElementById('customSimInput'),
    btnRunCustomSim: document.getElementById('btnRunCustomSim')
  };

  // ==========================================================================
  // 4. Speech Synthesis (Voice Assistant Output)
  // ==========================================================================
  
  const AssistantVoice = {
    speak: function (text, onEndCallback) {
      if (!state.isVoiceGuidanceEnabled || !('speechSynthesis' in window)) {
        if (onEndCallback) onEndCallback();
        return;
      }

      // Stop any pending speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = state.selectedLanguage;
      utterance.rate = 0.95; // Slightly slower, clear conversational pace
      utterance.pitch = 1.0;

      // Select natural Indian accent voice if available
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(v => v.lang === 'en-IN' || v.lang.startsWith('en_IN') || v.name.includes('India'));
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      state.isSpeakingAssistant = true;

      utterance.onend = function () {
        state.isSpeakingAssistant = false;
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = function () {
        state.isSpeakingAssistant = false;
        if (onEndCallback) onEndCallback();
      };

      window.speechSynthesis.speak(utterance);
    },

    stop: function () {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        state.isSpeakingAssistant = false;
      }
    }
  };

  // Pre-load voices
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = function () {
      // Voices loaded into browser cache
    };
  }

  // ==========================================================================
  // 5. Speech Recognition Engine
  // ==========================================================================
  
  const SpeechEngine = {
    init: function () {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        state.speechSupported = false;
        elements.unsupportedBanner.classList.remove('hidden');
        UIManager.setStatus('Unsupported', 'Not Available in Browser');
        return;
      }

      state.speechSupported = true;
      const recognition = new SpeechRecognition();
      
      recognition.lang = state.selectedLanguage;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;

      recognition.onstart = function () {
        state.isListening = true;
        UIManager.setListeningUI(true);
        UIManager.setStatus('Listening', 'Listening... Please speak now');
        UIManager.announce('Microphone active. Please speak now.');
      };

      recognition.onresult = function (event) {
        let interimTranscript = '';
        let finalTranscript = '';
        let confidence = 0.85;

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res.isFinal) {
            finalTranscript += res[0].transcript;
            if (res[0].confidence > 0) {
              confidence = res[0].confidence;
            }
          } else {
            interimTranscript += res[0].transcript;
          }
        }

        const displayText = finalTranscript || interimTranscript;
        UIManager.updateTranscript(displayText, confidence);

        if (finalTranscript.trim().length > 0) {
          UIManager.setStatus('Processing', 'Processing command...');
          SpeechEngine.handleTranscript(finalTranscript.trim(), confidence);
        }
      };

      recognition.onerror = function (event) {
        state.isListening = false;
        UIManager.setListeningUI(false);
        console.warn('Speech recognition error:', event.error);

        switch (event.error) {
          case 'not-allowed':
          case 'service-not-allowed':
            UIManager.setStatus('Error', 'Microphone Permission Denied');
            UIManager.showErrorMessage(
              'Microphone access was denied. Please allow microphone access in your browser settings, or continue filling the form manually.'
            );
            break;
          case 'no-speech':
            UIManager.setStatus('Ready', 'No speech detected. Try again.');
            break;
          case 'network':
            UIManager.setStatus('Error', 'Network Error');
            UIManager.showErrorMessage('Network connection error during voice recognition. You can continue manually.');
            break;
          default:
            UIManager.setStatus('Ready', 'Could not understand. Click to retry.');
            break;
        }
      };

      recognition.onend = function () {
        state.isListening = false;
        UIManager.setListeningUI(false);
        if (elements.statusText.textContent === 'Listening...') {
          UIManager.setStatus('Ready', 'Ready');
        }
      };

      state.recognitionInstance = recognition;
    },

    start: function () {
      if (!state.speechSupported) {
        UIManager.showErrorMessage('Speech recognition is not available in this browser. Please use keyboard input or the simulation buttons below.');
        return;
      }

      if (state.isSpeakingAssistant) {
        AssistantVoice.stop();
      }

      try {
        state.recognitionInstance.lang = state.selectedLanguage;
        state.recognitionInstance.start();
      } catch (err) {
        console.log('Recognition already active or restart called:', err);
      }
    },

    stop: function () {
      if (state.recognitionInstance && state.isListening) {
        state.recognitionInstance.stop();
      }
      state.isListening = false;
      UIManager.setListeningUI(false);
      UIManager.setStatus('Ready', 'Ready');
    },

    toggle: function () {
      if (state.isListening) {
        SpeechEngine.stop();
      } else {
        SpeechEngine.start();
      }
    },

    handleTranscript: function (rawText, confidence) {
      console.log('Raw Spoken Transcript:', rawText);
      CommandProcessor.processSpokenText(rawText, confidence);
    }
  };

  // ==========================================================================
  // 6. Natural Language & Command Processor
  // ==========================================================================
  
  const CommandProcessor = {
    processSpokenText: function (rawText, confidence) {
      const normalized = rawText.trim().toLowerCase();

      // ----------------------------------------------------------------------
      // A. Check if currently in Confirmation Mode ("Is this correct? Yes/No")
      // ----------------------------------------------------------------------
      if (state.isConfirmationMode && state.pendingConfirmation) {
        if (/^(yes|yeah|yep|correct|confirm|right|proceed|ok|sure)$/i.test(normalized)) {
          CommandProcessor.executeConfirmation(true);
          return;
        }
        if (/^(no|nope|wrong|change|change it|cancel|incorrect|retry)$/i.test(normalized)) {
          CommandProcessor.executeConfirmation(false);
          return;
        }
      }

      // ----------------------------------------------------------------------
      // B. Global Voice Navigation & Utility Commands
      // ----------------------------------------------------------------------
      
      // 1. Next Field
      if (/^(next|next field|go next|move next|forward)$/i.test(normalized)) {
        NavigationManager.nextField();
        return;
      }

      // 2. Previous Field
      if (/^(previous|prev|previous field|go back|back|go previous)$/i.test(normalized)) {
        NavigationManager.prevField();
        return;
      }

      // 3. Repeat Question
      if (/^(repeat|say again|repeat question|pardon|repeat prompt)$/i.test(normalized)) {
        NavigationManager.repeatPrompt();
        return;
      }

      // 4. Clear Current Field
      if (/^(clear this field|clear field|clear|erase|erase this field|delete value)$/i.test(normalized)) {
        FormHandler.clearCurrentField();
        return;
      }

      // 5. Review Form
      if (/^(review my form|review form|review|check form|view summary)$/i.test(normalized)) {
        ModalManager.openReviewModal();
        return;
      }

      // 6. Submit Form
      if (/^(submit form|submit|finish application|send form)$/i.test(normalized)) {
        FormHandler.handleVoiceSubmit();
        return;
      }

      // 7. Upload Document Voice Trigger
      if (/^(upload my document|upload document|upload file|attach file|attach document)$/i.test(normalized)) {
        FormHandler.triggerDocumentUpload();
        return;
      }

      // 8. Direct Field Jumping ("Go to email", "Go to phone", etc.)
      const targetJump = CommandProcessor.detectFieldJump(normalized);
      if (targetJump !== null) {
        NavigationManager.goToField(targetJump);
        return;
      }

      // ----------------------------------------------------------------------
      // C. Field-Specific Value Extraction
      // ----------------------------------------------------------------------
      const currentField = FIELDS[state.currentFieldIndex];
      if (!currentField) return;

      switch (currentField.type) {
        case 'text': // Full Name
          CommandProcessor.handleFullNameInput(rawText);
          break;
        case 'email':
          CommandProcessor.handleEmailInput(rawText);
          break;
        case 'tel':
          CommandProcessor.handlePhoneInput(rawText);
          break;
        case 'date':
          CommandProcessor.handleDateInput(rawText);
          break;
        case 'radio': // Gender
          CommandProcessor.handleGenderInput(rawText);
          break;
        case 'select': // Country
          CommandProcessor.handleCountryInput(rawText);
          break;
        case 'checkbox': // Skills
          CommandProcessor.handleSkillsInput(rawText);
          break;
        case 'textarea': // Address
          CommandProcessor.handleAddressInput(rawText);
          break;
        default:
          console.warn('Unhandled field type:', currentField.type);
      }
    },

    // Detect "go to [field]" commands
    detectFieldJump: function (text) {
      if (text.includes('go to name') || text.includes('go to full name')) return 0;
      if (text.includes('go to email')) return 1;
      if (text.includes('go to phone') || text.includes('go to mobile')) return 2;
      if (text.includes('go to date') || text.includes('go to dob') || text.includes('go to birthday')) return 3;
      if (text.includes('go to gender')) return 4;
      if (text.includes('go to country')) return 5;
      if (text.includes('go to skill') || text.includes('go to skills')) return 6;
      if (text.includes('go to address')) return 7;
      return null;
    },

    // 1. Full Name Processing
    handleFullNameInput: function (rawText) {
      let cleaned = rawText
        .replace(/^(my name is|fill my name as|enter my name as|i am|name is)\s+/i, '')
        .trim();

      // Capitalize words
      cleaned = cleaned.replace(/\b\w/g, char => char.toUpperCase());

      if (cleaned.length < 2) {
        AssistantVoice.speak("I couldn't catch your name. Please speak your full name again.");
        return;
      }

      FormHandler.applyFieldValue('fullName', cleaned);
      AssistantVoice.speak(`Name recorded as ${cleaned}. Moving to email.`);
      setTimeout(() => NavigationManager.nextField(), 1200);
    },

    // 2. Email Processing: converts "at" to @, "dot" to ., strips spaces
    handleEmailInput: function (rawText) {
      let cleaned = rawText
        .replace(/^(my email is|fill email as|email is)\s+/i, '')
        .trim()
        .toLowerCase();

      // Speech conversions
      cleaned = cleaned
        .replace(/\s+(at the rate of|at the rate|at)\s+/gi, '@')
        .replace(/\s+dot\s+/gi, '.')
        .replace(/\s+underscore\s+/gi, '_')
        .replace(/\s+(dash|hyphen)\s+/gi, '-')
        .replace(/\s+/g, ''); // remove internal spaces

      // Quick correction for phrases like "gmail.com" when transcribed as "gmail com"
      cleaned = cleaned.replace(/@([a-z0-9]+)\s+([a-z0-9]+)$/i, '@$1.$2');

      if (!cleaned.includes('@') || !cleaned.includes('.')) {
        AssistantVoice.speak("Please say your email with at and dot, for example: abinaya at gmail dot com.");
        return;
      }

      // Sensitive field: ask confirmation
      CommandProcessor.promptConfirmation(1, cleaned, cleaned, `You entered email: ${cleaned}. Is that correct?`);
    },

    // 3. Phone Number Processing
    handlePhoneInput: function (rawText) {
      let cleaned = rawText
        .replace(/^(my phone number is|my mobile number is|phone is|number is)\s+/i, '')
        .trim()
        .toLowerCase();

      // Expand "double X", "triple X"
      cleaned = cleaned.replace(/\bdouble\s+([a-z0-9]+)/gi, (match, p1) => `${p1} ${p1}`);
      cleaned = cleaned.replace(/\btriple\s+([a-z0-9]+)/gi, (match, p1) => `${p1} ${p1} ${p1}`);

      // Convert word digits
      const words = cleaned.split(/[\s-]+/);
      let digitString = '';

      for (const w of words) {
        if (DIGIT_WORDS[w] !== undefined) {
          digitString += DIGIT_WORDS[w];
        } else if (/^\d+$/.test(w)) {
          digitString += w;
        }
      }

      // If words didn't form digits, fall back to stripping non-digits from rawText
      if (!digitString) {
        digitString = rawText.replace(/\D/g, '');
      }

      // Check if starting with +91 or 91
      if (digitString.length === 12 && digitString.startsWith('91')) {
        digitString = digitString.substring(2);
      }

      if (digitString.length !== 10) {
        AssistantVoice.speak(`I heard ${digitString.length} digits. Indian mobile numbers must be 10 digits. Please say your 10 digit number again.`);
        return;
      }

      // Sensitive field: ask confirmation
      const spokenDigits = digitString.split('').join(' ');
      CommandProcessor.promptConfirmation(2, digitString, digitString, `You entered phone number ${spokenDigits}. Is this correct?`);
    },

    // 4. Date of Birth Processing
    handleDateInput: function (rawText) {
      let text = rawText
        .replace(/^(my date of birth is|date of birth is|i was born on|born on)\s+/i, '')
        .trim()
        .toLowerCase();

      // Remove ordinal suffixes (15th -> 15, 1st -> 1)
      text = text.replace(/(\d+)(st|nd|rd|th)/gi, '$1').replace(/\bof\b/gi, '');

      let isoDate = CommandProcessor.parseDateStringToIso(text);

      if (!isoDate) {
        AssistantVoice.speak("Could not understand the date. Please say a date like June 15 2006, or type it manually.");
        return;
      }

      // Sensitive field: ask confirmation
      const readableDate = new Date(isoDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      CommandProcessor.promptConfirmation(3, isoDate, readableDate, `You entered date of birth as ${readableDate}. Is that correct?`);
    },

    parseDateStringToIso: function (text) {
      // 1. Try format: "june 15 2006" or "15 june 2006"
      const words = text.split(/[\s,\/.-]+/);
      let day, month, year;

      for (let i = 0; i < words.length; i++) {
        const w = words[i].toLowerCase();
        if (MONTHS_MAP[w]) {
          month = MONTHS_MAP[w];
          words.splice(i, 1);
          break;
        }
      }

      if (month) {
        // Remaining words should be day and year
        const numbers = words.map(w => parseInt(w, 10)).filter(n => !isNaN(n));
        if (numbers.length >= 2) {
          if (numbers[0] > 31) {
            year = numbers[0];
            day = numbers[1];
          } else {
            day = numbers[0];
            year = numbers[1];
          }
        }
      } else {
        // Check for DD MM YYYY or YYYY MM DD numeric
        const nums = text.match(/\d+/g);
        if (nums && nums.length === 3) {
          if (nums[0].length === 4) {
            year = parseInt(nums[0], 10);
            month = parseInt(nums[1], 10);
            day = parseInt(nums[2], 10);
          } else {
            day = parseInt(nums[0], 10);
            month = parseInt(nums[1], 10);
            year = parseInt(nums[2], 10);
          }
        }
      }

      if (day && month && year) {
        if (year < 100) year += 1900; // 2-digit year safety
        const pad = n => String(n).padStart(2, '0');
        return `${year}-${pad(month)}-${pad(day)}`;
      }

      return null;
    },

    // 5. Gender Processing
    handleGenderInput: function (rawText) {
      const lower = rawText.toLowerCase();
      let chosen = null;

      if (/\b(female|woman|girl)\b/.test(lower)) {
        chosen = 'Female';
      } else if (/\b(male|man|boy)\b/.test(lower)) {
        chosen = 'Male';
      } else if (/\b(other|transgender|prefer not to say)\b/.test(lower)) {
        chosen = 'Other';
      }

      if (!chosen) {
        AssistantVoice.speak("Please choose Male, Female, or Other.");
        return;
      }

      FormHandler.applyFieldValue('gender', chosen);
      AssistantVoice.speak(`Selected gender as ${chosen}. Moving to country.`);
      setTimeout(() => NavigationManager.nextField(), 1000);
    },

    // 6. Country Processing (STRICT MATCHING REQUIREMENT)
    handleCountryInput: function (rawText) {
      let lower = rawText
        .replace(/^(select|country|choose|my country is|country is)\s+/i, '')
        .trim()
        .toLowerCase();

      const options = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia'];
      let matched = null;

      // Handle aliases
      if (lower === 'india' || lower === 'bharat') matched = 'India';
      else if (lower === 'united states' || lower === 'usa' || lower === 'america' || lower === 'us') matched = 'United States';
      else if (lower === 'united kingdom' || lower === 'uk' || lower === 'britain' || lower === 'england') matched = 'United Kingdom';
      else if (lower === 'canada') matched = 'Canada';
      else if (lower === 'australia') matched = 'Australia';

      if (!matched) {
        // STRICT REQUIREMENT:
        // If user says something that doesn't match an available option:
        // "That option is not available. Please choose from the available options."
        // Do NOT silently choose the closest incorrect option!
        const errMsg = "That option is not available. Please choose from the available options.";
        AssistantVoice.speak(errMsg);
        UIManager.setStatus('Error', errMsg);
        UIManager.announce(errMsg);
        return;
      }

      FormHandler.applyFieldValue('country', matched);
      AssistantVoice.speak(`Selected country as ${matched}. Moving to skills.`);
      setTimeout(() => NavigationManager.nextField(), 1000);
    },

    // 7. Skills Checkbox Processing (Multi-select / Unselect)
    handleSkillsInput: function (rawText) {
      const lower = rawText.toLowerCase();
      const isUnselect = /^(unselect|deselect|remove|clear)\b/i.test(lower);
      
      const skillMap = {
        'java': 'Java',
        'c++': 'C++',
        'cpp': 'C++',
        'c plus plus': 'C++',
        'cybersecurity': 'Cybersecurity',
        'cyber security': 'Cybersecurity',
        'web development': 'Web Development',
        'web dev': 'Web Development',
        'database': 'Database',
        'databases': 'Database',
        'sql': 'Database'
      };

      const matchedSkills = [];

      for (const [key, val] of Object.entries(skillMap)) {
        if (lower.includes(key)) {
          if (!matchedSkills.includes(val)) {
            matchedSkills.push(val);
          }
        }
      }

      if (matchedSkills.length === 0) {
        AssistantVoice.speak("I couldn't identify the skill. Available options are Java, C++, Cybersecurity, Web Development, or Database.");
        return;
      }

      matchedSkills.forEach(skill => {
        FormHandler.toggleSkillCheckbox(skill, !isUnselect);
      });

      const actionWord = isUnselect ? 'Unselected' : 'Selected';
      const feedback = `${actionWord} ${matchedSkills.join(' and ')}. Say Next to proceed to address.`;
      AssistantVoice.speak(feedback);
      UIManager.setStatus('Ready', feedback);
    },

    // 8. Address Processing
    handleAddressInput: function (rawText) {
      let cleaned = rawText
        .replace(/^(my address is|address is|fill address as)\s+/i, '')
        .trim();

      if (cleaned.length < 5) {
        AssistantVoice.speak("Please speak your complete address including city and state.");
        return;
      }

      // Capitalize first letter
      cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

      CommandProcessor.promptConfirmation(7, cleaned, cleaned, `You entered address as: ${cleaned}. Is that correct?`);
    },

    // Confirmation Helper
    promptConfirmation: function (fieldIndex, rawValue, displayValue, speechPrompt) {
      state.isConfirmationMode = true;
      state.pendingConfirmation = {
        fieldIndex: fieldIndex,
        value: rawValue,
        displayValue: displayValue
      };

      UIManager.showConfirmationBox(displayValue);
      AssistantVoice.speak(speechPrompt);
      UIManager.announce(speechPrompt);
    },

    executeConfirmation: function (isAccepted) {
      if (!state.pendingConfirmation) return;

      const { fieldIndex, value, displayValue } = state.pendingConfirmation;
      const field = FIELDS[fieldIndex];

      state.isConfirmationMode = false;
      state.pendingConfirmation = null;
      UIManager.hideConfirmationBox();

      if (isAccepted) {
        FormHandler.applyFieldValue(field.id, value);
        AssistantVoice.speak(`${field.label} confirmed. Moving to next field.`);
        setTimeout(() => NavigationManager.nextField(), 1200);
      } else {
        AssistantVoice.speak(`No problem. Please say your ${field.label} again, or click Type Instead to edit.`);
      }
    }
  };

  // ==========================================================================
  // 7. Form Operations & Value Handlers
  // ==========================================================================
  
  const FormHandler = {
    applyFieldValue: function (fieldId, value) {
      state.formValues[fieldId] = value;

      switch (fieldId) {
        case 'fullName':
          elements.inputFullName.value = value;
          elements.inputFullName.classList.remove('field-error');
          break;
        case 'email':
          elements.inputEmail.value = value;
          elements.inputEmail.classList.remove('field-error');
          break;
        case 'phone':
          elements.inputPhone.value = value;
          elements.inputPhone.classList.remove('field-error');
          break;
        case 'dob':
          elements.inputDob.value = value;
          elements.inputDob.classList.remove('field-error');
          break;
        case 'gender':
          elements.radioGenders.forEach(r => {
            r.checked = (r.value === value);
          });
          break;
        case 'country':
          elements.selectCountry.value = value;
          elements.selectCountry.classList.remove('field-error');
          break;
        case 'address':
          elements.textareaAddress.value = value;
          elements.textareaAddress.classList.remove('field-error');
          break;
      }

      UIManager.updateProgress();
    },

    toggleSkillCheckbox: function (skillName, shouldCheck) {
      elements.checkboxSkills.forEach(chk => {
        if (chk.value.toLowerCase() === skillName.toLowerCase()) {
          chk.checked = shouldCheck;
        }
      });

      // Update state
      const selected = [];
      elements.checkboxSkills.forEach(chk => {
        if (chk.checked) selected.push(chk.value);
      });
      state.formValues.skills = selected;
      UIManager.updateProgress();
    },

    clearCurrentField: function () {
      const field = FIELDS[state.currentFieldIndex];
      if (!field) return;

      switch (field.id) {
        case 'fullName':
          elements.inputFullName.value = '';
          state.formValues.fullName = '';
          break;
        case 'email':
          elements.inputEmail.value = '';
          state.formValues.email = '';
          break;
        case 'phone':
          elements.inputPhone.value = '';
          state.formValues.phone = '';
          break;
        case 'dob':
          elements.inputDob.value = '';
          state.formValues.dob = '';
          break;
        case 'gender':
          elements.radioGenders.forEach(r => r.checked = false);
          state.formValues.gender = '';
          break;
        case 'country':
          elements.selectCountry.value = '';
          state.formValues.country = '';
          break;
        case 'skills':
          elements.checkboxSkills.forEach(chk => chk.checked = false);
          state.formValues.skills = [];
          break;
        case 'address':
          elements.textareaAddress.value = '';
          state.formValues.address = '';
          break;
      }

      UIManager.updateProgress();
      const msg = `${field.label} cleared.`;
      AssistantVoice.speak(msg);
      UIManager.setStatus('Ready', msg);
    },

    triggerDocumentUpload: function () {
      AssistantVoice.speak("Opening file selector. Please select your document.");
      setTimeout(() => {
        elements.inputDocument.click();
      }, 400);
    },

    handleVoiceSubmit: function () {
      if (ModalManager.isReviewOpen()) {
        AssistantVoice.speak("Your form is ready. Do you want to submit it? Say Yes to confirm or click Submit.");
        return;
      }

      ModalManager.openReviewModal();
      AssistantVoice.speak("Please review your information. Say Submit Form or click Confirm to complete.");
    },

    validateAll: function () {
      let isValid = true;

      if (!elements.inputFullName.value.trim()) {
        elements.inputFullName.classList.add('field-error');
        isValid = false;
      }
      if (!elements.inputEmail.value.trim() || !elements.inputEmail.value.includes('@')) {
        elements.inputEmail.classList.add('field-error');
        isValid = false;
      }
      if (!/^[6-9]\d{9}$/.test(elements.inputPhone.value.trim())) {
        elements.inputPhone.classList.add('field-error');
        isValid = false;
      }
      if (!elements.inputDob.value) {
        elements.inputDob.classList.add('field-error');
        isValid = false;
      }
      
      let genderChecked = false;
      elements.radioGenders.forEach(r => { if (r.checked) genderChecked = true; });
      if (!genderChecked) {
        document.getElementById('card-gender').classList.add('has-error');
        isValid = false;
      }

      if (!elements.selectCountry.value) {
        elements.selectCountry.classList.add('field-error');
        isValid = false;
      }

      if (!elements.textareaAddress.value.trim()) {
        elements.textareaAddress.classList.add('field-error');
        isValid = false;
      }

      return isValid;
    },

    syncManualInputsToState: function () {
      state.formValues.fullName = elements.inputFullName.value.trim();
      state.formValues.email = elements.inputEmail.value.trim();
      state.formValues.phone = elements.inputPhone.value.trim();
      state.formValues.dob = elements.inputDob.value;
      
      elements.radioGenders.forEach(r => {
        if (r.checked) state.formValues.gender = r.value;
      });

      state.formValues.country = elements.selectCountry.value;

      const skills = [];
      elements.checkboxSkills.forEach(chk => {
        if (chk.checked) skills.push(chk.value);
      });
      state.formValues.skills = skills;

      state.formValues.address = elements.textareaAddress.value.trim();

      if (elements.inputDocument.files && elements.inputDocument.files[0]) {
        state.formValues.documentName = elements.inputDocument.files[0].name;
      }
    }
  };

  // ==========================================================================
  // 8. Navigation & Conversational Form Step Manager
  // ==========================================================================
  
  const NavigationManager = {
    goToField: function (index, triggerSpeech = true) {
      if (index < 0 || index >= FIELDS.length) return;

      // Unhighlight all field cards
      FIELDS.forEach(f => {
        const card = document.getElementById(f.cardId);
        if (card) card.classList.remove('active-field');
      });

      state.currentFieldIndex = index;
      const targetField = FIELDS[index];
      const targetCard = document.getElementById(targetField.cardId);

      if (targetCard) {
        targetCard.classList.add('active-field');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Update Assistant Top Info
      UIManager.updateStepUI(index);

      // Conversational prompt in current language
      const promptText = targetField.prompt[state.selectedLanguage] || targetField.prompt['en-IN'];
      elements.assistantQuestion.textContent = `"${promptText}"`;
      elements.assistantSubhint.innerHTML = targetField.subhint;

      if (triggerSpeech && state.isVoiceGuidanceEnabled) {
        AssistantVoice.speak(promptText);
      }

      UIManager.announce(`Step ${index + 1} of ${FIELDS.length}: ${targetField.label}. ${promptText}`);
    },

    nextField: function () {
      if (state.currentFieldIndex < FIELDS.length - 1) {
        NavigationManager.goToField(state.currentFieldIndex + 1, true);
      } else {
        ModalManager.openReviewModal();
      }
    },

    prevField: function () {
      if (state.currentFieldIndex > 0) {
        NavigationManager.goToField(state.currentFieldIndex - 1, true);
      }
    },

    repeatPrompt: function () {
      const targetField = FIELDS[state.currentFieldIndex];
      const promptText = targetField.prompt[state.selectedLanguage] || targetField.prompt['en-IN'];
      AssistantVoice.speak(promptText);
    }
  };

  // ==========================================================================
  // 9. UI Manager & Visual State Updates
  // ==========================================================================
  
  const UIManager = {
    setStatus: function (stateType, message) {
      elements.statusText.textContent = message;
      elements.assistantCard.classList.remove('is-listening', 'is-processing');

      if (stateType === 'Listening') {
        elements.assistantCard.classList.add('is-listening');
      } else if (stateType === 'Processing') {
        elements.assistantCard.classList.add('is-processing');
      }
    },

    setListeningUI: function (listening) {
      if (listening) {
        elements.btnSpeakText.textContent = 'Stop Speaking';
        elements.btnToggleSpeak.classList.add('listening');
        elements.btnToggleSpeak.setAttribute('aria-label', 'Stop Voice Input');
      } else {
        elements.btnSpeakText.textContent = 'Start Speaking';
        elements.btnToggleSpeak.classList.remove('listening');
        elements.btnToggleSpeak.setAttribute('aria-label', 'Start Voice Input');
      }
    },

    updateTranscript: function (text, confidence) {
      elements.transcriptText.innerHTML = `<span>&ldquo;${text}&rdquo;</span>`;
      
      const pct = Math.round(confidence * 100);
      elements.confidenceBadge.textContent = `Confidence: ${pct}%`;
      
      if (pct >= 85) {
        elements.confidenceBadge.className = 'confidence-badge high';
      } else {
        elements.confidenceBadge.className = 'confidence-badge';
      }
    },

    showConfirmationBox: function (displayValue) {
      elements.confirmMsg.innerHTML = `You entered: <strong>${displayValue}</strong>. Is this correct?`;
      elements.confirmationBox.classList.remove('hidden');
    },

    hideConfirmationBox: function () {
      elements.confirmationBox.classList.add('hidden');
    },

    updateStepUI: function (index) {
      const field = FIELDS[index];
      elements.stepCounterBadge.querySelector('.step-num').textContent = `Step ${index + 1} of ${FIELDS.length}`;
      elements.activeFieldTag.textContent = field.label;

      // Update stepper items
      const stepItems = elements.stepStepper.querySelectorAll('.step-item');
      stepItems.forEach((item, idx) => {
        item.classList.remove('active', 'completed');
        if (idx === index) {
          item.classList.add('active');
        } else if (idx < index) {
          item.classList.add('completed');
        }
      });
    },

    updateProgress: function () {
      FormHandler.syncManualInputsToState();

      let filledCount = 0;
      if (state.formValues.fullName) filledCount++;
      if (state.formValues.email) filledCount++;
      if (state.formValues.phone) filledCount++;
      if (state.formValues.dob) filledCount++;
      if (state.formValues.gender) filledCount++;
      if (state.formValues.country) filledCount++;
      if (state.formValues.skills && state.formValues.skills.length > 0) filledCount++;
      if (state.formValues.address) filledCount++;

      const pct = Math.round((filledCount / FIELDS.length) * 100);
      elements.progressPercent.textContent = `${pct}%`;
      elements.progressBarFill.style.width = `${pct}%`;
      elements.progressBarFill.parentElement.setAttribute('aria-valuenow', pct);
    },

    showErrorMessage: function (msg) {
      alert(msg);
    },

    announce: function (text) {
      elements.screenReaderAnnouncer.textContent = text;
    }
  };

  // ==========================================================================
  // 10. Modals (Review & Success)
  // ==========================================================================
  
  const ModalManager = {
    openReviewModal: function () {
      FormHandler.syncManualInputsToState();
      state.reviewModalOpen = true;

      // Populate review table
      let html = '';
      const v = state.formValues;

      const rows = [
        { label: 'Full Name', value: v.fullName || '<em>Not provided</em>', index: 0 },
        { label: 'Email Address', value: v.email || '<em>Not provided</em>', index: 1 },
        { label: 'Mobile Number', value: v.phone ? `+91 ${v.phone}` : '<em>Not provided</em>', index: 2 },
        { label: 'Date of Birth', value: v.dob || '<em>Not provided</em>', index: 3 },
        { label: 'Gender', value: v.gender || '<em>Not selected</em>', index: 4 },
        { label: 'Country', value: v.country || '<em>Not selected</em>', index: 5 },
        { label: 'Technical Skills', value: v.skills.length > 0 ? v.skills.join(', ') : '<em>None selected</em>', index: 6 },
        { label: 'Residential Address', value: v.address || '<em>Not provided</em>', index: 7 },
        { label: 'Document Attached', value: v.documentName || '<em>No document uploaded</em>', index: 8 }
      ];

      rows.forEach(r => {
        html += `
          <tr>
            <td><strong>${r.label}</strong></td>
            <td>${r.value}</td>
            <td style="text-align: center;">
              <button type="button" class="btn-edit-row" data-field-index="${r.index}" title="Edit ${r.label}">
                ✏️ Edit
              </button>
            </td>
          </tr>
        `;
      });

      elements.reviewTableBody.innerHTML = html;
      elements.reviewModal.classList.remove('hidden');
      UIManager.announce('Review application dialog opened.');

      // Attach edit button listeners
      elements.reviewTableBody.querySelectorAll('.btn-edit-row').forEach(btn => {
        btn.addEventListener('click', function () {
          const idx = parseInt(this.getAttribute('data-field-index'), 10);
          ModalManager.closeReviewModal();
          if (idx <= 7) {
            NavigationManager.goToField(idx, true);
          } else {
            elements.inputDocument.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    },

    closeReviewModal: function () {
      state.reviewModalOpen = false;
      elements.reviewModal.classList.add('hidden');
    },

    isReviewOpen: function () {
      return state.reviewModalOpen;
    },

    submitFinalApplication: function () {
      if (!FormHandler.validateAll()) {
        ModalManager.closeReviewModal();
        UIManager.showErrorMessage('Please fill in all mandatory required fields before submitting.');
        return;
      }

      ModalManager.closeReviewModal();

      // Generate realistic acknowledgement ID
      const randomRef = 'IND-VF-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
      elements.receiptCode.textContent = randomRef;
      elements.receiptApplicantName.textContent = state.formValues.fullName;
      elements.receiptApplicantPhone.textContent = '+91 ' + state.formValues.phone;
      elements.receiptTimestamp.textContent = new Date().toLocaleString('en-IN');

      elements.successModal.classList.remove('hidden');

      const successAnnouncement = `Application successfully submitted! Your acknowledgment reference number is ${randomRef}.`;
      AssistantVoice.speak(successAnnouncement);
      UIManager.announce(successAnnouncement);
    },

    resetAll: function () {
      elements.successModal.classList.add('hidden');
      elements.form.reset();
      elements.fileSelectedName.textContent = 'No document attached yet';
      
      state.formValues = {
        fullName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        country: '',
        skills: [],
        address: '',
        documentName: ''
      };

      UIManager.updateProgress();
      NavigationManager.goToField(0, true);
    }
  };

  // ==========================================================================
  // 11. Event Listeners Setup
  // ==========================================================================
  
  function bindEvents() {
    // 1. Assistant Primary Buttons
    elements.btnToggleSpeak.addEventListener('click', () => SpeechEngine.toggle());
    elements.btnRepeatPrompt.addEventListener('click', () => NavigationManager.repeatPrompt());
    elements.btnTypeInstead.addEventListener('click', () => {
      const f = FIELDS[state.currentFieldIndex];
      const el = document.getElementById(f.id);
      if (el) el.focus();
    });

    // 2. Confirmation Box Buttons
    elements.btnConfirmYes.addEventListener('click', () => CommandProcessor.executeConfirmation(true));
    elements.btnConfirmNo.addEventListener('click', () => CommandProcessor.executeConfirmation(false));

    // 3. Stepper bullets click
    elements.stepStepper.querySelectorAll('.step-item').forEach(item => {
      item.addEventListener('click', function () {
        const step = parseInt(this.getAttribute('data-step'), 10);
        NavigationManager.goToField(step, true);
      });
    });

    // 4. Form Action Buttons
    elements.btnPrevField.addEventListener('click', () => NavigationManager.prevField());
    elements.btnNextField.addEventListener('click', () => NavigationManager.nextField());
    elements.btnClearCurrentField.addEventListener('click', () => FormHandler.clearCurrentField());
    elements.btnOpenReview.addEventListener('click', () => ModalManager.openReviewModal());
    
    elements.form.addEventListener('submit', function (e) {
      e.preventDefault();
      ModalManager.openReviewModal();
    });

    // 5. Individual Speak buttons beside fields
    document.querySelectorAll('.btn-field-speak').forEach(btn => {
      btn.addEventListener('click', function () {
        const target = this.getAttribute('data-target');
        if (target !== null) {
          NavigationManager.goToField(parseInt(target, 10), false);
          SpeechEngine.start();
        }
      });
    });

    // 6. Document Upload
    elements.btnSpeakDoc.addEventListener('click', () => FormHandler.triggerDocumentUpload());
    elements.inputDocument.addEventListener('change', function () {
      if (this.files && this.files[0]) {
        elements.fileSelectedName.textContent = `Attached: ${this.files[0].name} (${Math.round(this.files[0].size / 1024)} KB)`;
        state.formValues.documentName = this.files[0].name;
        AssistantVoice.speak(`Document attached: ${this.files[0].name}`);
      }
    });

    // 7. Manual Input Change Tracking
    const trackInput = () => UIManager.updateProgress();
    elements.inputFullName.addEventListener('input', trackInput);
    elements.inputEmail.addEventListener('input', trackInput);
    elements.inputPhone.addEventListener('input', trackInput);
    elements.inputDob.addEventListener('input', trackInput);
    elements.radioGenders.forEach(r => r.addEventListener('change', trackInput));
    elements.selectCountry.addEventListener('change', trackInput);
    elements.checkboxSkills.forEach(c => c.addEventListener('change', trackInput));
    elements.textareaAddress.addEventListener('input', trackInput);

    // 8. Language Selector
    elements.languageSelect.addEventListener('change', function () {
      state.selectedLanguage = this.value;
      elements.currentLangTag.textContent = this.value;
      if (state.recognitionInstance) {
        state.recognitionInstance.lang = this.value;
      }
      NavigationManager.repeatPrompt();
    });

    // 9. Accessibility Controls
    elements.fontSizeSmall.addEventListener('click', () => setFontSize('small'));
    elements.fontSizeNormal.addEventListener('click', () => setFontSize('normal'));
    elements.fontSizeLarge.addEventListener('click', () => setFontSize('large'));

    function setFontSize(size) {
      elements.html.setAttribute('data-font-size', size);
      elements.fontSizeSmall.classList.toggle('active', size === 'small');
      elements.fontSizeNormal.classList.toggle('active', size === 'normal');
      elements.fontSizeLarge.classList.toggle('active', size === 'large');
    }

    elements.toggleHighContrast.addEventListener('click', function () {
      const isHigh = elements.html.getAttribute('data-high-contrast') === 'true';
      elements.html.setAttribute('data-high-contrast', !isHigh);
      this.setAttribute('aria-pressed', !isHigh);
    });

    elements.toggleSpeechAudio.addEventListener('click', function () {
      state.isVoiceGuidanceEnabled = !state.isVoiceGuidanceEnabled;
      this.classList.toggle('active', state.isVoiceGuidanceEnabled);
      this.setAttribute('aria-pressed', state.isVoiceGuidanceEnabled);
      if (!state.isVoiceGuidanceEnabled) {
        AssistantVoice.stop();
      }
    });

    elements.dismissAlertBtn.addEventListener('click', () => {
      elements.unsupportedBanner.classList.add('hidden');
    });

    // 10. Modals
    elements.btnCloseReviewModal.addEventListener('click', () => ModalManager.closeReviewModal());
    elements.btnReviewBack.addEventListener('click', () => ModalManager.closeReviewModal());
    elements.btnConfirmFinalSubmit.addEventListener('click', () => ModalManager.submitFinalApplication());
    
    elements.btnPrintReceipt.addEventListener('click', () => window.print());
    elements.btnResetAllForm.addEventListener('click', () => ModalManager.resetAll());

    // 11. Simulator Drawer
    document.querySelectorAll('.btn-sim').forEach(btn => {
      if (btn.id === 'btnSimulateMicDenied') return;
      btn.addEventListener('click', function () {
        const phrase = this.getAttribute('data-phrase');
        if (phrase) {
          UIManager.updateTranscript(phrase, 0.94);
          CommandProcessor.processSpokenText(phrase, 0.94);
        }
      });
    });

    elements.btnSimulateMicDenied.addEventListener('click', function () {
      UIManager.setStatus('Error', 'Microphone Permission Denied');
      UIManager.showErrorMessage('Simulated Test 8: Microphone permission denied by browser. The manual form remains 100% functional!');
      AssistantVoice.speak("Microphone permission denied. You can continue filling the form manually.");
    });

    elements.btnRunCustomSim.addEventListener('click', function () {
      const val = elements.customSimInput.value.trim();
      if (val) {
        UIManager.updateTranscript(val, 0.92);
        CommandProcessor.processSpokenText(val, 0.92);
      }
    });

    elements.customSimInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        elements.btnRunCustomSim.click();
      }
    });
  }

  // ==========================================================================
  // 12. Application Bootstrapper
  // ==========================================================================
  
  function init() {
    SpeechEngine.init();
    bindEvents();
    UIManager.updateProgress();

    // Start at field 0 (Full Name) without auto-speaking on first load to prevent browser autoplay policies
    NavigationManager.goToField(0, false);
    UIManager.setStatus('Ready', 'Ready');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
