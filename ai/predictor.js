const diseaseDatabase = [
  {
    disease: 'Influenza (Flu)',
    symptoms: ['fever', 'cough', 'tiredness', 'body_aches', 'sore_throat'],
    description: 'A common viral infection that attacks the respiratory system. Most people recover within 1-2 weeks with rest and hydration.',
    severity: 'moderate',
    minSymptoms: 1,
    medicines: [
      { name: 'Paracetamol (Dolo 650)', type: 'Fever & Pain Relief', dosage: '1 tablet every 6-8 hours' },
      { name: 'Cetirizine', type: 'Antihistamine', dosage: '1 tablet daily at bedtime' },
      { name: 'Oseltamivir (Tamiflu)', type: 'Antiviral', dosage: 'As prescribed by doctor' },
      { name: 'Cough Syrup (Benadryl)', type: 'Cough Suppressant', dosage: '10ml every 6-8 hours' }
    ]
  },
  {
    disease: 'COVID-19',
    symptoms: ['fever', 'cough', 'breathing_difficulty', 'tiredness', 'loss_of_taste', 'body_aches'],
    description: 'A respiratory illness caused by the SARS-CoV-2 virus. Symptoms range from mild to severe. Seek medical attention if breathing becomes difficult.',
    severity: 'high',
    minSymptoms: 1,
    medicines: [
      { name: 'Paracetamol (Dolo 650)', type: 'Fever & Pain Relief', dosage: '1 tablet every 6-8 hours' },
      { name: 'Vitamin C (500mg)', type: 'Immune Support', dosage: '1 tablet daily' },
      { name: 'Zinc Supplements', type: 'Immune Support', dosage: '1 tablet daily with food' },
      { name: 'Azithromycin', type: 'Antibiotic (if prescribed)', dosage: 'As prescribed by doctor' },
      { name: 'Budesonide Inhaler', type: 'Anti-inflammatory', dosage: 'As prescribed by doctor' }
    ]
  },
  {
    disease: 'Migraine',
    symptoms: ['headache', 'nausea', 'sensitivity_to_light', 'dizziness'],
    description: 'A neurological condition characterized by intense, throbbing headaches often accompanied by nausea and sensitivity to light and sound.',
    severity: 'moderate',
    minSymptoms: 1,
    medicines: [
      { name: 'Ibuprofen (Brufen 400)', type: 'Pain Relief (NSAID)', dosage: '1 tablet every 8 hours after food' },
      { name: 'Sumatriptan', type: 'Migraine-specific', dosage: 'As prescribed by doctor' },
      { name: 'Domperidone', type: 'Anti-nausea', dosage: '1 tablet before meals' },
      { name: 'Paracetamol', type: 'Pain Relief', dosage: '1 tablet every 6-8 hours' }
    ]
  },
  {
    disease: 'Food Poisoning',
    symptoms: ['stomach_pain', 'vomiting', 'nausea', 'diarrhea', 'fever'],
    description: 'Illness caused by consuming contaminated food or water. Usually resolves within a few days with proper hydration.',
    severity: 'moderate',
    minSymptoms: 1,
    medicines: [
      { name: 'ORS (Oral Rehydration Salts)', type: 'Rehydration', dosage: '1 sachet in 1L water, sip throughout day' },
      { name: 'Ondansetron (Emeset)', type: 'Anti-vomiting', dosage: '1 tablet every 8 hours' },
      { name: 'Racecadotril', type: 'Anti-diarrheal', dosage: '1 capsule every 8 hours' },
      { name: 'Norfloxacin', type: 'Antibiotic (if bacterial)', dosage: 'As prescribed by doctor' }
    ]
  },
  {
    disease: 'Heart Disease',
    symptoms: ['chest_pain', 'shortness_of_breath', 'dizziness', 'tiredness', 'irregular_heartbeat'],
    description: 'A range of conditions affecting the heart. Chest pain and shortness of breath are warning signs requiring immediate medical attention.',
    severity: 'critical',
    minSymptoms: 1,
    medicines: [
      { name: 'Aspirin (75mg)', type: 'Blood Thinner', dosage: 'As prescribed by doctor' },
      { name: 'Atorvastatin', type: 'Cholesterol Lowering', dosage: 'As prescribed by doctor' },
      { name: 'Metoprolol', type: 'Beta Blocker', dosage: 'As prescribed by doctor' },
      { name: 'Sorbitrate (Isosorbide)', type: 'Nitrate (Chest Pain)', dosage: 'As prescribed by doctor' }
    ]
  },
  {
    disease: 'Common Cold',
    symptoms: ['sneezing', 'runny_nose', 'sore_throat', 'cough', 'mild_fever'],
    description: 'A mild viral infection of the upper respiratory tract. Symptoms usually improve within 7-10 days.',
    severity: 'low',
    minSymptoms: 1,
    medicines: [
      { name: 'Cetirizine', type: 'Antihistamine', dosage: '1 tablet daily at bedtime' },
      { name: 'Paracetamol', type: 'Fever & Pain Relief', dosage: '1 tablet every 6-8 hours if needed' },
      { name: 'Nasal Saline Spray', type: 'Decongestant', dosage: '2 sprays per nostril, 3 times daily' },
      { name: 'Strepsils Lozenges', type: 'Sore Throat Relief', dosage: '1 lozenge every 2-3 hours' }
    ]
  },
  {
    disease: 'Allergic Reaction',
    symptoms: ['itching', 'skin_rash', 'sneezing', 'runny_nose', 'watery_eyes'],
    description: 'An immune system response to a foreign substance. Can range from mild to severe. Consult a dermatologist or allergist.',
    severity: 'moderate',
    minSymptoms: 1,
    medicines: [
      { name: 'Levocetirizine', type: 'Antihistamine', dosage: '1 tablet daily at bedtime' },
      { name: 'Montelukast', type: 'Anti-allergic', dosage: '1 tablet daily at bedtime' },
      { name: 'Calamine Lotion', type: 'Topical (for itching)', dosage: 'Apply on affected area 2-3 times daily' },
      { name: 'Hydrocortisone Cream', type: 'Topical Steroid', dosage: 'Apply thin layer on rash, twice daily' }
    ]
  },
  {
    disease: 'Pneumonia',
    symptoms: ['fever', 'cough', 'breathing_difficulty', 'chest_pain', 'tiredness'],
    description: 'An infection that inflames the air sacs in one or both lungs. Requires prompt medical treatment.',
    severity: 'high',
    minSymptoms: 2,
    medicines: [
      { name: 'Amoxicillin + Clavulanate', type: 'Antibiotic', dosage: 'As prescribed by doctor' },
      { name: 'Azithromycin', type: 'Antibiotic', dosage: 'As prescribed by doctor' },
      { name: 'Paracetamol', type: 'Fever & Pain Relief', dosage: '1 tablet every 6-8 hours' },
      { name: 'Salbutamol Inhaler', type: 'Bronchodilator', dosage: 'As prescribed by doctor' }
    ]
  },
  {
    disease: 'Gastritis',
    symptoms: ['stomach_pain', 'nausea', 'bloating', 'loss_of_appetite'],
    description: 'Inflammation of the stomach lining. Can be caused by infection, regular use of certain pain relievers, or excessive alcohol use.',
    severity: 'moderate',
    minSymptoms: 1,
    medicines: [
      { name: 'Pantoprazole (Pan 40)', type: 'Proton Pump Inhibitor', dosage: '1 tablet before breakfast' },
      { name: 'Domperidone', type: 'Anti-nausea / Motility', dosage: '1 tablet before meals' },
      { name: 'Antacid Gel (Digene)', type: 'Antacid', dosage: '2 teaspoons after meals' },
      { name: 'Sucralfate', type: 'Stomach Lining Protector', dosage: 'As prescribed by doctor' }
    ]
  },
  {
    disease: 'Bronchitis',
    symptoms: ['cough', 'mucus_production', 'tiredness', 'shortness_of_breath', 'chest_discomfort'],
    description: 'Inflammation of the lining of bronchial tubes. Acute bronchitis usually improves within a week to 10 days.',
    severity: 'moderate',
    minSymptoms: 1,
    medicines: [
      { name: 'Ambroxol Syrup', type: 'Mucolytic (thins mucus)', dosage: '10ml three times daily' },
      { name: 'Salbutamol Inhaler', type: 'Bronchodilator', dosage: '2 puffs every 6 hours as needed' },
      { name: 'Dextromethorphan Syrup', type: 'Cough Suppressant', dosage: '10ml every 6-8 hours' },
      { name: 'Paracetamol', type: 'Fever & Pain Relief', dosage: '1 tablet every 6-8 hours if needed' }
    ]
  },
  {
    disease: 'Hypertension',
    symptoms: ['headache', 'dizziness', 'blurred_vision', 'chest_pain', 'shortness_of_breath'],
    description: 'High blood pressure is a common condition where the force of blood against artery walls is too high. Often has no symptoms but can lead to serious health problems.',
    severity: 'high',
    minSymptoms: 1,
    medicines: [
      { name: 'Amlodipine (5mg)', type: 'Calcium Channel Blocker', dosage: 'As prescribed by doctor' },
      { name: 'Telmisartan (40mg)', type: 'ARB (BP Lowering)', dosage: 'As prescribed by doctor' },
      { name: 'Hydrochlorothiazide', type: 'Diuretic', dosage: 'As prescribed by doctor' },
      { name: 'Aspirin (75mg)', type: 'Blood Thinner', dosage: 'As prescribed by doctor' }
    ]
  },
  {
    disease: 'Diabetes (Type 2)',
    symptoms: ['frequent_urination', 'excessive_thirst', 'tiredness', 'blurred_vision', 'slow_healing'],
    description: 'A chronic condition affecting how the body processes blood sugar. Management includes lifestyle changes and medication.',
    severity: 'high',
    minSymptoms: 1,
    medicines: [
      { name: 'Metformin (500mg)', type: 'Blood Sugar Control', dosage: 'As prescribed by doctor' },
      { name: 'Glimepiride', type: 'Sulfonylurea', dosage: 'As prescribed by doctor' },
      { name: 'Vildagliptin', type: 'DPP-4 Inhibitor', dosage: 'As prescribed by doctor' },
      { name: 'Vitamin B12', type: 'Supplement', dosage: '1 tablet daily' }
    ]
  }
];

const allSymptoms = [
  { id: 'fever', label: 'Fever', icon: '🌡️' },
  { id: 'cough', label: 'Cough', icon: '😷' },
  { id: 'headache', label: 'Headache', icon: '🤕' },
  { id: 'nausea', label: 'Nausea', icon: '🤢' },
  { id: 'sneezing', label: 'Sneezing', icon: '🤧' },
  { id: 'chest_pain', label: 'Chest Pain', icon: '💔' },
  { id: 'stomach_pain', label: 'Stomach Pain', icon: '🤮' },
  { id: 'skin_rash', label: 'Skin Rash', icon: '🔴' },
  { id: 'tiredness', label: 'Tiredness / Fatigue', icon: '😴' },
  { id: 'sore_throat', label: 'Sore Throat', icon: '🗣️' },
  { id: 'runny_nose', label: 'Runny Nose', icon: '👃' },
  { id: 'body_aches', label: 'Body Aches', icon: '💪' },
  { id: 'dizziness', label: 'Dizziness', icon: '😵' },
  { id: 'vomiting', label: 'Vomiting', icon: '🤮' },
  { id: 'breathing_difficulty', label: 'Breathing Difficulty', icon: '😤' },
  { id: 'shortness_of_breath', label: 'Shortness of Breath', icon: '🫁' },
  { id: 'loss_of_taste', label: 'Loss of Taste/Smell', icon: '👅' },
  { id: 'sensitivity_to_light', label: 'Sensitivity to Light', icon: '☀️' },
  { id: 'diarrhea', label: 'Diarrhea', icon: '🚽' },
  { id: 'itching', label: 'Itching', icon: '🖐️' },
  { id: 'watery_eyes', label: 'Watery Eyes', icon: '👁️' },
  { id: 'bloating', label: 'Bloating', icon: '🎈' },
  { id: 'loss_of_appetite', label: 'Loss of Appetite', icon: '🍽️' },
  { id: 'irregular_heartbeat', label: 'Irregular Heartbeat', icon: '💓' },
  { id: 'blurred_vision', label: 'Blurred Vision', icon: '👓' },
  { id: 'mild_fever', label: 'Mild Fever', icon: '🤒' },
  { id: 'mucus_production', label: 'Mucus Production', icon: '🤧' },
  { id: 'chest_discomfort', label: 'Chest Discomfort', icon: '😣' },
  { id: 'frequent_urination', label: 'Frequent Urination', icon: '🚿' },
  { id: 'excessive_thirst', label: 'Excessive Thirst', icon: '💧' },
  { id: 'slow_healing', label: 'Slow Wound Healing', icon: '🩹' }
];

function predictDisease(userSymptoms) {
  if (!userSymptoms || userSymptoms.length === 0) {
    return { predictions: [], message: 'No symptoms provided.' };
  }

  const results = [];

  for (const disease of diseaseDatabase) {
    const matchedSymptoms = disease.symptoms.filter(s => userSymptoms.includes(s));
    const matchCount = matchedSymptoms.length;

    if (matchCount >= disease.minSymptoms) {
      const confidence = Math.round((matchCount / disease.symptoms.length) * 100);
      results.push({
        disease: disease.disease,
        confidence,
        matchedSymptoms,
        totalSymptoms: disease.symptoms.length,
        description: disease.description,
        severity: disease.severity,
        medicines: disease.medicines || []
      });
    }
  }

  results.sort((a, b) => b.confidence - a.confidence);

  return {
    predictions: results.slice(0, 5),
    analyzedSymptoms: userSymptoms,
    totalDiseases: diseaseDatabase.length,
    message: results.length > 0
      ? `Found ${results.length} possible condition(s) based on your symptoms.`
      : 'No matching conditions found. Please consult a healthcare professional for proper diagnosis.'
  };
}

module.exports = { predictDisease, allSymptoms, diseaseDatabase };
