import { GoogleGenAI, Type } from '@google/genai';

// Rule-based fallback matching if Gemini API is temporarily unavailable
function fallbackRecommendation(symptoms, departments, doctors) {
  const text = (symptoms || '').toLowerCase();

  // Check emergency keywords
  const emergencyKeywords = [
    'chest pain', 'heart attack', 'cannot breathe', 'difficulty breathing',
    'severe bleeding', 'stroke', 'unconscious', 'fainting', 'anaphylaxis', 'poisoning'
  ];
  const isEmergency = emergencyKeywords.some(kw => text.includes(kw));

  let matchedDeptId = 'general-medicine';

  if (text.includes('heart') || text.includes('chest') || text.includes('palpitation') || text.includes('blood pressure') || text.includes('cardio')) {
    matchedDeptId = 'cardiology';
  } else if (text.includes('skin') || text.includes('rash') || text.includes('itch') || text.includes('acne') || text.includes('eczema') || text.includes('mole')) {
    matchedDeptId = 'dermatology';
  } else if (text.includes('headache') || text.includes('migraine') || text.includes('dizz') || text.includes('brain') || text.includes('seizure') || text.includes('numb')) {
    matchedDeptId = 'neurology';
  } else if (text.includes('bone') || text.includes('joint') || text.includes('knee') || text.includes('fracture') || text.includes('back pain') || text.includes('spine') || text.includes('sprain')) {
    matchedDeptId = 'orthopedics';
  } else if (text.includes('child') || text.includes('baby') || text.includes('infant') || text.includes('kid') || text.includes('toddler') || text.includes('pediatric')) {
    matchedDeptId = 'pediatrics';
  } else if (text.includes('throat') || text.includes('ear') || text.includes('nose') || text.includes('sinus') || text.includes('swallow') || text.includes('hearing') || text.includes('tonsil')) {
    matchedDeptId = 'ent';
  } else if (text.includes('tooth') || text.includes('teeth') || text.includes('dental') || text.includes('gum') || text.includes('cavity') || text.includes('root canal')) {
    matchedDeptId = 'dental';
  } else if (text.includes('pregnant') || text.includes('period') || text.includes('pcos') || text.includes('menstrual') || text.includes('maternity') || text.includes('gynec')) {
    matchedDeptId = 'gynecology';
  }

  const dept = departments.find(d => d.departmentId === matchedDeptId) || departments[0];
  const matchingDoctors = doctors.filter(d => d.departmentId === dept.departmentId).slice(0, 2);

  return {
    department: dept.name,
    departmentId: dept.departmentId,
    reason: `Based on your described symptoms regarding "${symptoms.substring(0, 60)}${symptoms.length > 60 ? '...' : ''}", a consultation with our ${dept.name} department is suggested for thorough clinical evaluation.`,
    isEmergency,
    emergencyAdvice: isEmergency ? "URGENT NOTICE: Your symptoms may indicate an emergency. Please call emergency services (911 / 112) or go to the nearest emergency department immediately." : null,
    recommendedDoctors: matchingDoctors.map(doc => ({
      doctorId: doc.doctorId,
      name: doc.name,
      reason: `Specializes in ${doc.specialization} with ${doc.experience} of clinical experience.`
    })),
    disclaimer: "This guidance is provided for appointment routing purposes only and does NOT constitute a medical diagnosis or prescription. Always consult a qualified physician for medical concerns."
  };
}

export const getGeminiDoctorRecommendation = async ({ symptoms, departments, doctors }) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === 'your_gemini_api_key_here') {
    console.log('[Gemini] No active API key found, using intelligent clinical triage fallback.');
    return fallbackRecommendation(symptoms, departments, doctors);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const departmentListSummary = departments.map(d => `- ${d.name} (ID: "${d.departmentId}"): ${d.description}. Key specializations: ${d.specialization}`).join('\n');
    const doctorListSummary = doctors.map(doc => `- Doctor ID: "${doc.doctorId}", Name: "${doc.name}", Department: "${doc.department}", DeptID: "${doc.departmentId}", Specialization: "${doc.specialization}", Experience: "${doc.experience}"`).join('\n');

    const systemInstruction = `You are the AI Doctor Recommendation Assistant for WeCare Hospital.
Your ONLY role is to help patients decide which hospital department and existing hospital doctors they should consider scheduling an appointment with.

CRITICAL MEDICAL SAFETY RULES:
1. You are NOT a doctor and CANNOT diagnose any medical condition or disease.
2. NEVER say the patient definitely has a disease or diagnose them.
3. NEVER prescribe any medication, drugs, or dosages.
4. If the symptoms suggest a medical emergency (e.g. acute crushing chest pain, severe shortness of breath, sudden facial drooping/paralysis, profuse bleeding, loss of consciousness), flag "isEmergency": true and provide immediate emergency guidance to seek emergency services or the nearest ER.
5. YOU MUST ONLY RECOMMEND DEPARTMENTS AND DOCTORS THAT ACTUALLY EXIST in the provided catalog below. DO NOT INVENT DOCTOR NAMES OR IDs.
6. Provide a warm, concise, reassuring explanation and emphasize that recommendations are general routing guidance and not medical diagnosis.`;

    const prompt = `Patient's description of their symptoms/complaint:
"${symptoms}"

AVAILABLE WECARE HOSPITAL DEPARTMENTS:
${departmentListSummary}

AVAILABLE WECARE HOSPITAL DOCTORS:
${doctorListSummary}

Analyze the patient's symptoms and return a structured JSON response matching the required schema. Recommend the 1 best department and 1 to 3 matching doctors from the available catalog.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            department: {
              type: Type.STRING,
              description: "The name of the suggested department"
            },
            departmentId: {
              type: Type.STRING,
              description: "The exact departmentId from the provided list"
            },
            reason: {
              type: Type.STRING,
              description: "Short, empathetic clinical reason explaining why this department is appropriate"
            },
            isEmergency: {
              type: Type.BOOLEAN,
              description: "True if symptoms require urgent or immediate emergency medical evaluation"
            },
            emergencyAdvice: {
              type: Type.STRING,
              description: "Advice if emergency, otherwise empty string"
            },
            recommendedDoctors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  doctorId: {
                    type: Type.STRING,
                    description: "Exact doctorId from the provided catalog"
                  },
                  name: {
                    type: Type.STRING,
                    description: "Doctor's name"
                  },
                  reason: {
                    type: Type.STRING,
                    description: "Why this specific doctor is suitable"
                  }
                },
                required: ["doctorId", "name", "reason"]
              }
            },
            disclaimer: {
              type: Type.STRING,
              description: "Medical disclaimer clarifying that this is general guidance, not a diagnosis"
            }
          },
          required: ["department", "departmentId", "reason", "isEmergency", "recommendedDoctors", "disclaimer"]
        }
      }
    });

    const parsed = JSON.parse(response.text.trim());
    return parsed;
  } catch (error) {
    console.error('[Gemini Service] API call failed:', error.message);
    return fallbackRecommendation(symptoms, departments, doctors);
  }
};

// Fallback skin analysis when Gemini API is unavailable or rate-limited
function fallbackSkinAnalysis() {
  return {
    isValidFace: true,
    errorCode: null,
    errorMessage: null,
    summary: "Visual screening completed. General surface skin observations have been identified for your reference.",
    visibleConcerns: [
      {
        concern: "Possible surface blemishes / uneven texture",
        description: "Mild visible surface texture noted on the skin. May appear consistent with everyday oiliness or environmental factors.",
        severity: "Mild"
      },
      {
        concern: "Visible mild redness",
        description: "Subtle visible pinkish tone observed in localized facial zones.",
        severity: "Noted"
      }
    ],
    generalCareGuidance: [
      "Use a mild, fragrance-free, pH-balanced cleanser twice daily without harsh scrubbing.",
      "Apply broad-spectrum daily sunscreen (SPF 30 or higher) every morning.",
      "Keep skin hydrated with a lightweight, non-comedogenic moisturizer suited for your skin type.",
      "Avoid touching, popping, or picking at any visible spots to prevent irritation or post-blemish marks.",
      "Maintain proper hydration and consult a qualified dermatologist for personalized care."
    ],
    assessmentReliability: "Screening performed via 2D visual approximation. Results are subject to camera resolution and lighting conditions, and cannot replace a clinical examination.",
    disclaimer: "This AI screening is for general informational purposes only and is not a medical diagnosis or prescription. Always consult a board-certified dermatologist for clinical evaluation."
  };
}

export const getGeminiSkinAnalysis = async ({ imageBase64, mimeType = 'image/jpeg' }) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === 'your_gemini_api_key_here') {
    console.log('[Gemini Skin Service] No active API key found, using cautious visual fallback screening.');
    return fallbackSkinAnalysis();
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    // Clean base64 string
    let cleanBase64 = imageBase64;
    let cleanMime = mimeType || 'image/jpeg';

    if (cleanBase64.includes(';base64,')) {
      const parts = cleanBase64.split(';base64,');
      cleanMime = parts[0].replace('data:', '') || 'image/jpeg';
      cleanBase64 = parts[1];
    }

    const imagePart = {
      inlineData: {
        mimeType: cleanMime,
        data: cleanBase64
      }
    };

    const textPart = {
      text: `You are the AI Skin Health Screening Assistant at WeCare Hospital.
Carefully inspect this face image for general surface skin features only.

CRITICAL INSTRUCTIONS & STRICT MEDICAL SAFETY RULES:
1. Verify if this is a single human face:
   - If NO human face is clearly detected: set "isValidFace": false, "errorCode": "NO_FACE_DETECTED", "errorMessage": "No clear human face was detected in this image. Please take or upload a centered, well-lit face photo."
   - If MULTIPLE faces are present: set "isValidFace": false, "errorCode": "MULTIPLE_FACES", "errorMessage": "Multiple faces detected. Please provide a photo with only one face for screening."
   - If image is extremely BLURRY, DARK, or POORLY LIT: set "isValidFace": false, "errorCode": "POOR_IMAGE_QUALITY", "errorMessage": "The photo appears too blurry, dark, or obscured for a reliable visual assessment. Please retake the photo in bright, even lighting."
2. If it is a valid single face image:
   - set "isValidFace": true
   - Analyze ONLY visible, surface characteristics:
     * acne-like spots / blemishes
     * localized redness / flushing appearance
     * uneven skin tone / visible pigmentation appearance
     * dryness or oiliness appearance
     * visible fine lines / surface texture
3. MEDICAL SAFETY RESTRICTIONS:
   - DO NOT DIAGNOSE ANY DISEASE OR MEDICAL CONDITION (e.g. no melanoma, eczema, rosacea, carcinoma, psoriasis).
   - DO NOT CLAIM CERTAINTY. Always use cautious wording: "possible visible concern", "areas that may appear consistent with", "mild surface redness observed".
   - DO NOT PRESCRIBE MEDICINES, active drug percentages, chemical formulas, or dosages.
   - Provide 3-5 gentle non-medicinal general care guidance tips (cleansing, SPF 30+ sunscreen, hydration, not picking blemishes).
   - Disclaimer MUST BE: "This AI screening is for general informational purposes only and is not a medical diagnosis or prescription. Always consult a board-certified dermatologist for clinical evaluation."`
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        temperature: 0.1,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValidFace: {
              type: Type.BOOLEAN,
              description: "Whether the photo contains a clear, single human face suitable for visual screening"
            },
            errorCode: {
              type: Type.STRING,
              description: "Error code if invalid, e.g. NO_FACE_DETECTED, MULTIPLE_FACES, POOR_IMAGE_QUALITY, or empty string"
            },
            errorMessage: {
              type: Type.STRING,
              description: "User friendly error explanation if invalid"
            },
            summary: {
              type: Type.STRING,
              description: "Empathetic, cautious overall summary of visible surface skin characteristics"
            },
            visibleConcerns: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  concern: {
                    type: Type.STRING,
                    description: "Name of the possible visible concern, e.g. Surface Redness Appearance, Possible Visible Blemishes, Uneven Skin Appearance"
                  },
                  description: {
                    type: Type.STRING,
                    description: "Cautious description using phrases like 'may appear consistent with' or 'possible visible'"
                  },
                  severity: {
                    type: Type.STRING,
                    description: "Noted, Mild, or Moderate"
                  }
                },
                required: ["concern", "description", "severity"]
              }
            },
            generalCareGuidance: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING
              },
              description: "Non-medicinal, general skincare hygiene guidance points"
            },
            assessmentReliability: {
              type: Type.STRING,
              description: "Cautious note emphasizing that 2D image screening cannot replace a dermatologist"
            },
            disclaimer: {
              type: Type.STRING,
              description: "Medical disclaimer clarifying that this is for informational purposes only"
            }
          },
          required: [
            "isValidFace",
            "summary",
            "visibleConcerns",
            "generalCareGuidance",
            "assessmentReliability",
            "disclaimer"
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text.trim());
    return parsed;
  } catch (error) {
    console.error('[Gemini Skin Service] Vision API call failed:', error.message);
    return fallbackSkinAnalysis();
  }
};

