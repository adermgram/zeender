import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import { GeneratedResume } from '@/types'

// Use built-in fonts — avoids any font loading issues in serverless
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    paddingTop: 0,
    paddingBottom: 32,
    paddingHorizontal: 0,
    fontSize: 10,
    color: '#1e293b',
  },
  // ── Header band ──────────────────────────────────────────────
  header: {
    backgroundColor: '#1e293b',
    paddingVertical: 28,
    paddingHorizontal: 40,
    marginBottom: 0,
  },
  headerName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 12,
  },
  headerContact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  headerContactItem: {
    fontSize: 9,
    color: '#cbd5e1',
  },
  // ── Body ─────────────────────────────────────────────────────
  body: {
    paddingHorizontal: 40,
    paddingTop: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#6366f1',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  // ── Summary ──────────────────────────────────────────────────
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
  },
  // ── Experience ───────────────────────────────────────────────
  jobBlock: {
    marginBottom: 14,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  jobRole: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10.5,
    color: '#1e293b',
  },
  jobDuration: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 1,
  },
  jobCompany: {
    fontSize: 10,
    color: '#6366f1',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 4,
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 14,
    fontSize: 9,
    color: '#6366f1',
    marginTop: 1,
    flexShrink: 0,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#374151',
  },
  // ── Education ────────────────────────────────────────────────
  eduBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  eduLeft: {
    flex: 1,
  },
  eduDegree: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#1e293b',
    marginBottom: 2,
  },
  eduSchool: {
    fontSize: 9.5,
    color: '#6366f1',
  },
  eduYear: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 1,
  },
  // ── Skills ───────────────────────────────────────────────────
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillChip: {
    backgroundColor: '#eef2ff',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    fontSize: 9,
    color: '#4338ca',
    fontFamily: 'Helvetica-Bold',
  },
})

interface ResumePDFProps {
  resume: GeneratedResume
  candidateName: string
  jobTitle: string
  email: string
  phone: string
  location: string
}

export function ResumePDF({
  resume,
  candidateName,
  jobTitle,
  email,
  phone,
  location,
}: ResumePDFProps) {
  const contactItems = [email, phone, location].filter(Boolean)

  return (
    <Document
      title={`${candidateName} — Resume`}
      author={candidateName}
      creator="ResumeAI"
    >
      <Page size="A4" style={styles.page}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.headerName}>{candidateName}</Text>
          <Text style={styles.headerTitle}>{jobTitle}</Text>
          <View style={styles.headerContact}>
            {contactItems.map((item, i) => (
              <Text key={i} style={styles.headerContactItem}>
                {item}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.body}>
          {/* ── Summary ── */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Professional Summary</Text>
            <Text style={styles.summaryText}>{resume.summary}</Text>
          </View>

          {/* ── Experience ── */}
          {resume.experience && resume.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Work Experience</Text>
              {resume.experience.map((exp, i) => (
                <View key={i} style={styles.jobBlock}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobRole}>{exp.role}</Text>
                    <Text style={styles.jobDuration}>{exp.duration}</Text>
                  </View>
                  <Text style={styles.jobCompany}>{exp.company}</Text>
                  {exp.bullets?.map((bullet, j) => (
                    <View key={j} style={styles.bullet}>
                      <Text style={styles.bulletDot}>▸</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* ── Education ── */}
          {resume.education && resume.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Education</Text>
              {resume.education.map((edu, i) => (
                <View key={i} style={styles.eduBlock}>
                  <View style={styles.eduLeft}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                  </View>
                  <Text style={styles.eduYear}>{edu.year}</Text>
                </View>
              ))}
            </View>
          )}

          {/* ── Skills ── */}
          {resume.skills && resume.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Skills</Text>
              <View style={styles.skillsWrap}>
                {resume.skills.map((skill, i) => (
                  <Text key={i} style={styles.skillChip}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}
