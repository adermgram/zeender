export interface WorkExperience {
  company: string
  role: string
  duration: string
  description: string
}

export interface Education {
  school: string
  degree: string
  year: string
}

export interface ResumeFormData {
  // Step 1 — Personal Info
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string

  // Step 2 — Work Experience
  experience: WorkExperience[]

  // Step 3 — Education & Skills
  education: Education[]
  skills: string

  // Step 4 — Target Job
  targetJobDescription: string
  template: 'modern' | 'classic' | 'executive'
}

export interface GeneratedResumeExperience {
  company: string
  role: string
  duration: string
  bullets: string[]
}

export interface GeneratedResumeEducation {
  school: string
  degree: string
  year: string
}

export interface GeneratedResume {
  summary: string
  experience: GeneratedResumeExperience[]
  education: GeneratedResumeEducation[]
  skills: string[]
}

export interface PaymentInitResponse {
  reference: string
  paymentId: string
  amount: number
}
