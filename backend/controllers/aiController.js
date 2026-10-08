import Department from '../models/Department.js';
import Doctor from '../models/Doctor.js';
import { isMongoConnected, mockDbStore } from '../config/db.js';
import { getGeminiDoctorRecommendation, getGeminiSkinAnalysis } from '../services/geminiService.js';

export const recommendDoctor = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a description of your symptoms or medical concern.'
      });
    }

    // Retrieve active departments and doctors from database
    let allDepartments;
    let allDoctors;

    if (isMongoConnected) {
      allDepartments = await Department.find({}).lean();
      allDoctors = await Doctor.find({}).lean();
    } else {
      allDepartments = await mockDbStore.findDepartments({});
      allDoctors = await mockDbStore.findDoctors({});
    }

    // Call Gemini AI service
    const aiResult = await getGeminiDoctorRecommendation({
      symptoms: symptoms.trim(),
      departments: allDepartments,
      doctors: allDoctors
    });

    // VALIDATION STEP 1: Verify department exists
    let matchedDepartment = allDepartments.find(
      d => d.departmentId === (aiResult.departmentId || '').toLowerCase() ||
           d.name.toLowerCase() === (aiResult.department || '').toLowerCase()
    );

    if (!matchedDepartment) {
      matchedDepartment = allDepartments.find(d => d.departmentId === 'general-medicine') || allDepartments[0];
    }

    // VALIDATION STEP 2: Verify recommended doctors exist in database
    let validDoctors = [];
    if (Array.isArray(aiResult.recommendedDoctors) && aiResult.recommendedDoctors.length > 0) {
      for (const recDoc of aiResult.recommendedDoctors) {
        const found = allDoctors.find(
          d => d.doctorId === recDoc.doctorId ||
               d.name.toLowerCase() === (recDoc.name || '').toLowerCase()
        );
        if (found) {
          validDoctors.push({
            ...found,
            recommendationReason: recDoc.reason || `Specialist in ${found.specialization}`
          });
        }
      }
    }

    // If no valid doctor was matched from AI output, fallback to doctors from the matched department
    if (validDoctors.length === 0) {
      const deptDoctors = allDoctors.filter(d => d.departmentId === matchedDepartment.departmentId);
      validDoctors = deptDoctors.slice(0, 2).map(doc => ({
        ...doc,
        recommendationReason: `Experienced ${doc.specialization} specialist available in the ${matchedDepartment.name} department.`
      }));
    }

    // Medical safety disclaimer
    const standardDisclaimer = "WeCare AI Doctor Assistant provides routing recommendations for appointment scheduling purposes only. It is NOT a diagnostic tool and does NOT prescribe medication. For urgent medical conditions, please visit the emergency room immediately or call 911 / 112.";

    return res.status(200).json({
      success: true,
      data: {
        department: matchedDepartment.name,
        departmentId: matchedDepartment.departmentId,
        departmentDescription: matchedDepartment.description,
        reason: aiResult.reason || `Based on your description, a consultation in ${matchedDepartment.name} is recommended.`,
        isEmergency: Boolean(aiResult.isEmergency),
        emergencyAdvice: aiResult.emergencyAdvice || null,
        recommendedDoctors: validDoctors,
        disclaimer: aiResult.disclaimer || standardDisclaimer
      }
    });
  } catch (error) {
    console.error('recommendDoctor error:', error);
    return res.status(500).json({
      success: false,
      message: 'Sorry, the AI assistant encountered an unexpected error. Please browse our departments or doctors directly.',
      error: error.message
    });
  }
};

export const analyzeSkinHealth = async (req, res) => {
  try {
    const { image, mimeType } = req.body;

    if (!image || typeof image !== 'string' || image.length < 50) {
      return res.status(400).json({
        success: false,
        message: 'A valid face photo is required for skin health screening.'
      });
    }

    // Retrieve active Dermatology doctors from database
    let dermatologyDoctors = [];
    if (isMongoConnected) {
      dermatologyDoctors = await Doctor.find({ departmentId: 'dermatology' }).lean();
    } else {
      dermatologyDoctors = await mockDbStore.findDoctors({ departmentId: 'dermatology' });
    }

    // Call Gemini Vision Service
    const analysis = await getGeminiSkinAnalysis({
      imageBase64: image,
      mimeType: mimeType || 'image/jpeg'
    });

    // Check if the face was valid for visual assessment
    if (analysis.isValidFace === false) {
      return res.status(422).json({
        success: false,
        isInvalidFace: true,
        errorCode: analysis.errorCode || 'UNRELIABLE_IMAGE',
        message: analysis.errorMessage || 'The provided image could not be reliably evaluated. Please take or upload a clear, centered, well-lit face photo.',
        dermatologyDoctors: dermatologyDoctors.slice(0, 3)
      });
    }

    // Standard medical disclaimer
    const standardDisclaimer = "This AI screening is for general informational purposes only and is not a medical diagnosis or prescription. Always consult a board-certified dermatologist for clinical evaluation.";

    return res.status(200).json({
      success: true,
      data: {
        summary: analysis.summary || "Visual screening completed.",
        visibleConcerns: Array.isArray(analysis.visibleConcerns) ? analysis.visibleConcerns : [],
        generalCareGuidance: Array.isArray(analysis.generalCareGuidance) ? analysis.generalCareGuidance : [],
        assessmentReliability: analysis.assessmentReliability || "Visual assessment is based on 2D photo approximation and cannot substitute an in-person clinical exam.",
        disclaimer: analysis.disclaimer || standardDisclaimer,
        dermatologyDoctors: dermatologyDoctors.slice(0, 3)
      }
    });
  } catch (error) {
    console.error('analyzeSkinHealth error:', error);
    return res.status(500).json({
      success: false,
      message: 'Skin health screening encountered an unexpected error. Please try again or consult our dermatology team directly.',
      error: error.message
    });
  }
};

