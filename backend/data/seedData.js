// Seed data for WeCare Hospital
// Contains initial departments and doctors

export const initialDepartments = [
  {
    departmentId: "cardiology",
    name: "Cardiology",
    description: "Comprehensive cardiac care specializing in diagnosis, prevention, and treatment of heart and vascular conditions.",
    specialization: "Heart Diseases, Hypertension, Arrhythmia, Interventional Cardiology",
    icon: "HeartPulse",
    headOfDepartment: "Dr. Arthur Vance, MD, FACC",
    roomLocation: "Tower A, 3rd Floor, Suite 301",
    emergencyAvailable: true
  },
  {
    departmentId: "dermatology",
    name: "Dermatology",
    description: "Advanced dermatological services for skin, hair, and nail health, including clinical and aesthetic dermatology.",
    specialization: "Eczema, Psoriasis, Acne, Skin Allergies, Dermato-surgery",
    icon: "Sparkles",
    headOfDepartment: "Dr. Elena Rostova, MD",
    roomLocation: "Tower B, 2nd Floor, Suite 210",
    emergencyAvailable: false
  },
  {
    departmentId: "neurology",
    name: "Neurology",
    description: "Expert neurological diagnosis and therapeutics for disorders of the brain, spinal cord, and nervous system.",
    specialization: "Migraines, Epilepsy, Neuropathy, Stroke Rehabilitation, Parkinson's",
    icon: "Brain",
    headOfDepartment: "Dr. Marcus Chen, MD, PhD",
    roomLocation: "Tower A, 4th Floor, Suite 405",
    emergencyAvailable: true
  },
  {
    departmentId: "orthopedics",
    name: "Orthopedics",
    description: "Specialized musculoskeletal care including joint replacement, sports injury treatment, and spine surgery.",
    specialization: "Joint Pain, Arthritis, Fractures, Sports Injuries, Spine Disorders",
    icon: "Activity",
    headOfDepartment: "Dr. Robert Sterling, MS, FRCS",
    roomLocation: "Tower C, 1st Floor, Suite 115",
    emergencyAvailable: true
  },
  {
    departmentId: "pediatrics",
    name: "Pediatrics",
    description: "Compassionate child healthcare from newborns through adolescence, focusing on development and pediatric medicine.",
    specialization: "Child Healthcare, Immunizations, Pediatric Infections, Growth Disorders",
    icon: "Baby",
    headOfDepartment: "Dr. Linda Gomez, MD, FAAP",
    roomLocation: "Tower B, 1st Floor, Pediatric Wing",
    emergencyAvailable: true
  },
  {
    departmentId: "ent",
    name: "ENT (Ear, Nose & Throat)",
    description: "Comprehensive otolaryngology care for ear, nose, throat, and head & neck disorders.",
    specialization: "Sinusitis, Hearing Loss, Throat Infections, Vertigo, Tonsillitis",
    icon: "Ear",
    headOfDepartment: "Dr. Vikram Patel, MS (ENT)",
    roomLocation: "Tower B, 3rd Floor, Suite 320",
    emergencyAvailable: false
  },
  {
    departmentId: "general-medicine",
    name: "General Medicine",
    description: "First-contact primary and comprehensive medical care for acute and chronic adult health conditions.",
    specialization: "Fever, Diabetes, Hypertension, Gastrointestinal Issues, Preventive Care",
    icon: "Stethoscope",
    headOfDepartment: "Dr. Sarah Mitchell, MD",
    roomLocation: "Tower A, Ground Floor, Primary Care",
    emergencyAvailable: true
  },
  {
    departmentId: "gynecology",
    name: "Gynecology & Obstetrics",
    description: "Dedicated women's health services encompassing maternity, obstetrics, reproductive wellness, and gynecological surgery.",
    specialization: "Prenatal Care, PCOS, Women's Health, High-Risk Pregnancy",
    icon: "Users",
    headOfDepartment: "Dr. Catherine Hayes, MD, FACOG",
    roomLocation: "Tower C, 2nd Floor, Women's Pavilion",
    emergencyAvailable: true
  },
  {
    departmentId: "dental",
    name: "Dental Sciences",
    description: "Full-spectrum dental and maxillofacial care including restorative dentistry, orthodontics, and oral surgery.",
    specialization: "Toothache, Root Canal, Dental Implants, Gum Disease, Cosmetic Dentistry",
    icon: "Smile",
    headOfDepartment: "Dr. Julian Walsh, DDS",
    roomLocation: "Tower B, Ground Floor, Suite 105",
    emergencyAvailable: false
  }
];

export const initialDoctors = [
  // Cardiology
  {
    doctorId: "DOC-CARD-01",
    name: "Dr. Arthur Vance, MD, FACC",
    department: "Cardiology",
    departmentId: "cardiology",
    specialization: "Interventional Cardiology & Coronary Angioplasty",
    experience: "18 Years",
    biography: "Former Chief of Interventional Cardiology at St. Jude's, Dr. Vance has performed over 3,000 successful cardiac catheterizations and stent procedures.",
    availability: "Mon, Wed, Fri (09:00 AM - 02:00 PM)",
    rating: 4.9,
    consultationFee: 120,
    qualifications: "MD (Cardiology), Fellowship in Interventional Cardiology (Johns Hopkins)",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80"
  },
  {
    doctorId: "DOC-CARD-02",
    name: "Dr. Rachel Adams, MD",
    department: "Cardiology",
    departmentId: "cardiology",
    specialization: "Clinical Cardiology & Heart Rhythm Disorders",
    experience: "11 Years",
    biography: "Specialist in non-invasive cardiac imaging, echocardiography, management of complex arrhythmias, and preventative cardiovascular health.",
    availability: "Tue, Thu, Sat (10:00 AM - 04:00 PM)",
    rating: 4.8,
    consultationFee: 95,
    qualifications: "MD, Board Certified in Cardiovascular Medicine",
    image: "https://images.unsplash.com/photo-1594824813571-638f026361a6?w=400&auto=format&fit=crop&q=80"
  },

  // Dermatology
  {
    doctorId: "DOC-DERM-01",
    name: "Dr. Elena Rostova, MD",
    department: "Dermatology",
    departmentId: "dermatology",
    specialization: "Clinical & Aesthetic Dermatology, Psoriasis",
    experience: "14 Years",
    biography: "Renowned dermatologist focusing on chronic inflammatory skin disorders, autoimmune dermatoses, and advanced laser skin therapies.",
    availability: "Mon, Tue, Thu (09:30 AM - 03:00 PM)",
    rating: 4.9,
    consultationFee: 85,
    qualifications: "MD (Dermatology & Venereology), American Academy of Dermatology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80"
  },
  {
    doctorId: "DOC-DERM-02",
    name: "Dr. Julian Rivera, MD",
    department: "Dermatology",
    departmentId: "dermatology",
    specialization: "Pediatric Dermatology & Skin Allergy Management",
    experience: "9 Years",
    biography: "Expert in pediatric skin conditions, contact dermatitis testing, eczema care plans, and mole mapping for early melanoma detection.",
    availability: "Wed, Fri, Sat (11:00 AM - 05:00 PM)",
    rating: 4.7,
    consultationFee: 80,
    qualifications: "MD, Fellowship in Pediatric Dermatology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80"
  },

  // Neurology
  {
    doctorId: "DOC-NEUR-01",
    name: "Dr. Marcus Chen, MD, PhD",
    department: "Neurology",
    departmentId: "neurology",
    specialization: "Neurovascular Medicine & Headache Management",
    experience: "16 Years",
    biography: "Pioneering clinical neurologist specializing in severe migraine treatment, peripheral neuropathy, cognitive disorders, and stroke recovery.",
    availability: "Mon, Wed, Fri (10:00 AM - 03:30 PM)",
    rating: 4.9,
    consultationFee: 130,
    qualifications: "MD, PhD in Neurobiology (Harvard Medical School)",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80"
  },
  {
    doctorId: "DOC-NEUR-02",
    name: "Dr. Amara Thorne, MD",
    department: "Neurology",
    departmentId: "neurology",
    specialization: "Epilepsy, Seizure Disorders & Sleep Neurology",
    experience: "12 Years",
    biography: "Dedicated to comprehensive neurological diagnostic evaluations, continuous EEG monitoring, and specialized treatment for movement disorders.",
    availability: "Tue, Thu, Sat (09:00 AM - 02:00 PM)",
    rating: 4.8,
    consultationFee: 110,
    qualifications: "MD (Neurology), Fellow of American Neurological Association",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&auto=format&fit=crop&q=80"
  },

  // Orthopedics
  {
    doctorId: "DOC-ORTH-01",
    name: "Dr. Robert Sterling, MS, FRCS",
    department: "Orthopedics",
    departmentId: "orthopedics",
    specialization: "Joint Replacement & Arthroscopic Surgery",
    experience: "20 Years",
    biography: "Specialist in computer-assisted knee and hip arthroplasty, complex reconstructive surgery, and degenerative joint disease management.",
    availability: "Mon, Tue, Thu (08:30 AM - 01:30 PM)",
    rating: 4.9,
    consultationFee: 110,
    qualifications: "MS (Orthopedics), FRCS (Trauma & Orthopedics, UK)",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80"
  },
  {
    doctorId: "DOC-ORTH-02",
    name: "Dr. Maya Lin, MD",
    department: "Orthopedics",
    departmentId: "orthopedics",
    specialization: "Sports Medicine & Spinal Rehabilitation",
    experience: "10 Years",
    biography: "Team physician consultant with deep expertise in ligament repairs (ACL/MCL), rotator cuff injuries, and minimally invasive spine interventions.",
    availability: "Wed, Fri, Sat (10:00 AM - 04:00 PM)",
    rating: 4.8,
    consultationFee: 95,
    qualifications: "MD (Orthopedics), Fellowship in Sports Medicine",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80"
  },

  // Pediatrics
  {
    doctorId: "DOC-PED-01",
    name: "Dr. Linda Gomez, MD, FAAP",
    department: "Pediatrics",
    departmentId: "pediatrics",
    specialization: "General Pediatrics & Infant Developmental Care",
    experience: "15 Years",
    biography: "Beloved pediatrician with a child-friendly approach, focusing on early childhood development, pediatric allergy management, and adolescent medicine.",
    availability: "Mon - Fri (09:00 AM - 01:00 PM)",
    rating: 5.0,
    consultationFee: 75,
    qualifications: "MD (Pediatrics), Fellow of the American Academy of Pediatrics",
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&auto=format&fit=crop&q=80"
  },
  {
    doctorId: "DOC-PED-02",
    name: "Dr. David O'Connor, MD",
    department: "Pediatrics",
    departmentId: "pediatrics",
    specialization: "Pediatric Infectious Diseases & Nutrition",
    experience: "11 Years",
    biography: "Specializes in recurrent childhood infections, nutritional deficiencies, childhood asthma management, and comprehensive immunization programs.",
    availability: "Tue, Thu, Sat (02:00 PM - 07:00 PM)",
    rating: 4.8,
    consultationFee: 75,
    qualifications: "MD, Board Certified Pediatrician",
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&auto=format&fit=crop&q=80"
  },

  // ENT
  {
    doctorId: "DOC-ENT-01",
    name: "Dr. Vikram Patel, MS (ENT)",
    department: "ENT",
    departmentId: "ent",
    specialization: "Rhinology, Sinus Surgery & Vertigo",
    experience: "16 Years",
    biography: "Leading otolaryngologist specializing in endoscopic sinus surgery, sleep apnea treatment, chronic tonsillitis, and balance/vestibular disorders.",
    availability: "Mon, Wed, Fri (09:00 AM - 02:00 PM)",
    rating: 4.8,
    consultationFee: 85,
    qualifications: "MS (Otolaryngology), Gold Medalist, Fellow in Rhinology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80"
  },
  {
    doctorId: "DOC-ENT-02",
    name: "Dr. Claire Dubois, MD",
    department: "ENT",
    departmentId: "ent",
    specialization: "Otology, Hearing Disorders & Vocal Cord Pathology",
    experience: "12 Years",
    biography: "Expertise in hearing loss evaluation, tympanoplasty, voice therapy for hoarseness, and management of chronic ear infections and tinnitus.",
    availability: "Tue, Thu, Sat (10:00 AM - 03:30 PM)",
    rating: 4.9,
    consultationFee: 85,
    qualifications: "MD (ENT), Board Certified Otolaryngologist",
    image: "https://images.unsplash.com/photo-1594824813571-638f026361a6?w=400&auto=format&fit=crop&q=80"
  },

  // General Medicine
  {
    doctorId: "DOC-GEN-01",
    name: "Dr. Sarah Mitchell, MD",
    department: "General Medicine",
    departmentId: "general-medicine",
    specialization: "Internal Medicine & Chronic Lifestyle Disease Management",
    experience: "17 Years",
    biography: "Comprehensive primary care clinician dedicated to managing multi-system chronic illnesses including type 2 diabetes, metabolic syndrome, and acute illnesses.",
    availability: "Mon - Sat (08:30 AM - 01:30 PM)",
    rating: 4.9,
    consultationFee: 70,
    qualifications: "MD (Internal Medicine), American College of Physicians",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80"
  },
  {
    doctorId: "DOC-GEN-02",
    name: "Dr. Kevin Walsh, MD",
    department: "General Medicine",
    departmentId: "general-medicine",
    specialization: "Infectious Diseases & Adult Preventive Healthcare",
    experience: "13 Years",
    biography: "Passionate about health screenings, fever diagnostics, respiratory infections, hypertension control, and lifestyle optimization.",
    availability: "Mon - Fri (02:00 PM - 07:00 PM)",
    rating: 4.8,
    consultationFee: 65,
    qualifications: "MD, Board Certified in Internal Medicine",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80"
  },

  // Gynecology
  {
    doctorId: "DOC-GYN-01",
    name: "Dr. Catherine Hayes, MD, FACOG",
    department: "Gynecology",
    departmentId: "gynecology",
    specialization: "Obstetrics, High-Risk Pregnancy & Laparoscopic Surgery",
    experience: "19 Years",
    biography: "Compassionate obstetrician and gynecologist who has safely delivered thousands of babies. Specializes in fertility evaluation and minimally invasive surgery.",
    availability: "Mon, Wed, Thu (09:00 AM - 02:30 PM)",
    rating: 4.9,
    consultationFee: 100,
    qualifications: "MD, FACOG (Fellow of American College of Obstetricians and Gynecologists)",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&auto=format&fit=crop&q=80"
  },
  {
    doctorId: "DOC-GYN-02",
    name: "Dr. Priya Nair, MS (OBG)",
    department: "Gynecology",
    departmentId: "gynecology",
    specialization: "Adolescent Gynecology & Hormonal Disorders (PCOS)",
    experience: "10 Years",
    biography: "Focuses on PCOS holistic protocols, menstrual health irregularities, endometriosis management, and prenatal counseling for first-time mothers.",
    availability: "Tue, Fri, Sat (10:00 AM - 04:00 PM)",
    rating: 4.8,
    consultationFee: 85,
    qualifications: "MS (Obstetrics & Gynecology), Fellowship in Reproductive Endocrinology",
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&auto=format&fit=crop&q=80"
  },

  // Dental
  {
    doctorId: "DOC-DENT-01",
    name: "Dr. Julian Walsh, DDS",
    department: "Dental Sciences",
    departmentId: "dental",
    specialization: "Endodontics & Restorative Oral Surgery",
    experience: "14 Years",
    biography: "Precision endodontist renowned for pain-free microscopic root canal treatments, complex tooth extractions, and crown restoration.",
    availability: "Mon, Tue, Thu, Sat (09:00 AM - 03:00 PM)",
    rating: 4.9,
    consultationFee: 65,
    qualifications: "DDS, Advanced Certificate in Endodontics",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80"
  },
  {
    doctorId: "DOC-DENT-02",
    name: "Dr. Sophia Miller, DMD",
    department: "Dental Sciences",
    departmentId: "dental",
    specialization: "Orthodontics & Periodontal Health",
    experience: "9 Years",
    biography: "Specialist in clear aligners, aesthetic smile makeovers, periodontal deep cleaning, and pediatric preventive dentistry.",
    availability: "Wed, Fri (11:00 AM - 06:00 PM)",
    rating: 4.7,
    consultationFee: 60,
    qualifications: "DMD, Certificate in Orthodontics & Dentofacial Orthopedics",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80"
  }
];

export const initialAppointments = [
  {
    bookingId: "WC-2026-90214",
    patientName: "Eleanor Vance",
    contact: {
      phone: "+1 (555) 234-5678",
      email: "eleanor.vance@example.com"
    },
    doctorId: "DOC-CARD-01",
    doctorName: "Dr. Arthur Vance, MD, FACC",
    departmentId: "cardiology",
    departmentName: "Cardiology",
    appointmentDate: "2026-10-15",
    appointmentTime: "10:30 AM",
    reason: "Routine cardiovascular checkup following mild hypertension symptoms.",
    status: "Confirmed",
    createdAt: new Date("2026-10-06T14:20:00Z")
  },
  {
    bookingId: "WC-2026-88102",
    patientName: "Marcus Sterling",
    contact: {
      phone: "+1 (555) 876-5432",
      email: "marcus.sterling@example.com"
    },
    doctorId: "DOC-NEUR-01",
    doctorName: "Dr. Marcus Chen, MD, PhD",
    departmentId: "neurology",
    departmentName: "Neurology",
    appointmentDate: "2026-10-18",
    appointmentTime: "11:15 AM",
    reason: "Frequent tension headaches and ocular migraine episodes.",
    status: "Waiting",
    createdAt: new Date("2026-10-07T09:15:00Z")
  },
  {
    bookingId: "WC-2026-74521",
    patientName: "Sophia Martinez",
    contact: {
      phone: "+1 (555) 432-1098",
      email: "sophia.m@example.com"
    },
    doctorId: "DOC-DERM-01",
    doctorName: "Dr. Elena Rostova, MD",
    departmentId: "dermatology",
    departmentName: "Dermatology",
    appointmentDate: "2026-10-20",
    appointmentTime: "02:00 PM",
    reason: "Sudden persistent rash on forearms with itching.",
    status: "Pending",
    createdAt: new Date("2026-10-07T16:45:00Z")
  }
];
