const diseaseSpecializationMap = {
  'Influenza (Flu)': 'General Physician',
  'COVID-19': 'Pulmonologist',
  'Migraine': 'Neurologist',
  'Food Poisoning': 'Gastroenterologist',
  'Heart Disease': 'Cardiologist',
  'Common Cold': 'ENT Specialist',
  'Allergic Reaction': 'Dermatologist',
  'Pneumonia': 'Pulmonologist',
  'Gastritis': 'Gastroenterologist',
  'Bronchitis': 'Pulmonologist',
  'Hypertension': 'Cardiologist',
  'Diabetes (Type 2)': 'General Physician'
};

function getSpecialization(disease) {
  return diseaseSpecializationMap[disease] || 'General Physician';
}

async function getRecommendedDoctors(disease, db) {
  const specialization = getSpecialization(disease);
  const allDoctors = await db.getAll('doctors');
  const matchingDoctors = allDoctors.filter(
    doc => doc.specialization === specialization
  );
  return { specialization, doctors: matchingDoctors };
}

module.exports = { getSpecialization, getRecommendedDoctors, diseaseSpecializationMap };
