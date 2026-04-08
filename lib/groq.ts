import Groq from 'groq-sdk'
import { ResumeFormData, GeneratedResume } from '@/types'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function generateResume(formData: ResumeFormData): Promise<GeneratedResume> {
  const systemPrompt = `You are an expert professional resume writer with 15+ years of experience crafting compelling, ATS-optimized resumes that get interviews at top companies. You deeply understand how Applicant Tracking Systems work and you mirror the language of the job description to maximize keyword matching.

Your task: analyze the candidate's background and the target job description, then produce a polished, powerful resume in valid JSON only.

Rules:
- Return ONLY valid JSON. No markdown. No code fences. No explanation before or after.
- Write bullet points that lead with strong action verbs (Engineered, Led, Reduced, Launched, etc.)
- Quantify achievements wherever reasonable (%, ₦, users, time saved, etc.)
- The summary must be 3–4 sentences, tailored to the specific role
- Skills must reflect what the job description explicitly asks for, plus the candidate's genuine skills`

  const userPrompt = `Create a professional resume for this candidate targeting the role below.

═══ CANDIDATE INFO ═══
Full Name: ${formData.fullName}
Target Job Title: ${formData.jobTitle}
Email: ${formData.email}
Phone: ${formData.phone}
Location: ${formData.location}

═══ WORK EXPERIENCE ═══
${formData.experience
  .filter((e) => e.company)
  .map(
    (exp, i) => `
Job ${i + 1}:
  Company: ${exp.company}
  Role: ${exp.role}
  Duration: ${exp.duration}
  Details: ${exp.description}`
  )
  .join('\n')}

═══ EDUCATION ═══
${formData.education
  .filter((e) => e.school)
  .map((edu) => `  • ${edu.degree} — ${edu.school} (${edu.year})`)
  .join('\n')}

═══ SKILLS ═══
${formData.skills}

═══ TARGET JOB DESCRIPTION ═══
${formData.targetJobDescription}

═══ REQUIRED OUTPUT ═══
Return ONLY this JSON shape (no markdown, no extra text):
{
  "summary": "3–4 sentence professional summary tailored to the target role",
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Duration string",
      "bullets": [
        "Strong action-verb bullet point with quantified impact",
        "Another bullet point",
        "Another bullet point"
      ]
    }
  ],
  "education": [
    {
      "school": "School Name",
      "degree": "Degree",
      "year": "Year"
    }
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}`

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.65,
    max_tokens: 2048,
  })

  const content = completion.choices[0]?.message?.content
  if (!content) throw new Error('No content returned from AI')

  // Parse — strip any accidental markdown fences
  const cleaned = content
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim()

  let parsed: GeneratedResume
  try {
    parsed = JSON.parse(cleaned)
  } catch {
    // Last-resort: extract the first JSON object
    const match = cleaned.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('AI returned invalid JSON')
    parsed = JSON.parse(match[0])
  }

  // Validate required keys
  if (!parsed.summary || !parsed.experience || !parsed.education || !parsed.skills) {
    throw new Error('AI response missing required fields')
  }

  return parsed
}
