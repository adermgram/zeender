import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { GeneratedResume } from '@/types'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    paddingVertical: 40,
    paddingHorizontal: 48,
    fontSize: 10,
    color: '#111827',
  },
  // ── Header ───────────────────────────────────────────────────
  headerName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 26,
    color: '#111827',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerDivider: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#111827',
    marginBottom: 5,
  },
  headerContact: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 18,
  },
  headerContactItem: {
    fontSize: 9,
    color: '#4b5563',
  },
  // ── Sections ─────────────────────────────────────────────────
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 3,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.65,
    color: '#374151',
  },
  // ── Experience ───────────────────────────────────────────────
  jobBlock: {
    marginBottom: 11,
  },
  jobTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  jobRole: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10.5,
    color: '#111827',
  },
  jobDuration: {
    fontSize: 9,
    color: '#6b7280',
    fontFamily: 'Helvetica-Oblique',
  },
  jobCompany: {
    fontSize: 9.5,
    color: '#4b5563',
    fontFamily: 'Helvetica-Oblique',
    marginBottom: 4,
  },
  bulletItem: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#374151',
    marginBottom: 2,
    paddingLeft: 12,
  },
  // ── Education ────────────────────────────────────────────────
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  eduDegree: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#111827',
    marginBottom: 1,
  },
  eduSchool: {
    fontSize: 9.5,
    color: '#4b5563',
    fontFamily: 'Helvetica-Oblique',
  },
  eduYear: {
    fontSize: 9,
    color: '#6b7280',
  },
  // ── Skills ───────────────────────────────────────────────────
  skillsText: {
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.6,
  },
})

interface Props {
  resume: GeneratedResume
  candidateName: string
  jobTitle: string
  email: string
  phone: string
  location: string
}

export function ClassicTemplate({ resume, candidateName, jobTitle, email, phone, location }: Props) {
  const contactItems = [email, phone, location].filter(Boolean)

  return (
    <Document title={`${candidateName} — Resume`} author={candidateName} creator="Zeender">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.headerName}>{candidateName.toUpperCase()}</Text>
        <Text style={styles.headerTitle}>{jobTitle}</Text>
        <View style={styles.headerDivider} />
        <View style={styles.headerContact}>
          {contactItems.map((item, i) => (
            <Text key={i} style={styles.headerContactItem}>{item}</Text>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Profile</Text>
          <Text style={styles.summaryText}>{resume.summary}</Text>
        </View>

        {/* Experience */}
        {resume.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Experience</Text>
            {resume.experience.map((exp, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobTopRow}>
                  <Text style={styles.jobRole}>{exp.role}</Text>
                  <Text style={styles.jobDuration}>{exp.duration}</Text>
                </View>
                <Text style={styles.jobCompany}>{exp.company}</Text>
                {exp.bullets?.map((b, j) => (
                  <Text key={j} style={styles.bulletItem}>–  {b}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Education</Text>
            {resume.education.map((edu, i) => (
              <View key={i} style={styles.eduRow}>
                <View>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                </View>
                <Text style={styles.eduYear}>{edu.year}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Skills</Text>
            <Text style={styles.skillsText}>{resume.skills.join('   •   ')}</Text>
          </View>
        )}
      </Page>
    </Document>
  )
}
