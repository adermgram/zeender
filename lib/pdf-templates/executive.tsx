import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { GeneratedResume } from '@/types'

const SIDEBAR = '#0f172a'
const ACCENT  = '#f59e0b'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    fontSize: 10,
  },
  // ── Left sidebar ──────────────────────────────────────────────
  sidebar: {
    width: '33%',
    backgroundColor: SIDEBAR,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 20,
  },
  sidebarName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 17,
    color: '#ffffff',
    marginBottom: 3,
    lineHeight: 1.2,
  },
  sidebarTitle: {
    fontSize: 9,
    color: ACCENT,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 20,
  },
  sidebarSectionHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: ACCENT,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
    marginTop: 18,
  },
  sidebarDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    marginBottom: 10,
  },
  sidebarContactItem: {
    fontSize: 8.5,
    color: '#94a3b8',
    marginBottom: 4,
    lineHeight: 1.4,
  },
  sidebarSkillItem: {
    fontSize: 8.5,
    color: '#cbd5e1',
    marginBottom: 4,
    paddingLeft: 8,
  },
  // ── Main content area ─────────────────────────────────────────
  main: {
    flex: 1,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 3,
  },
  sectionAccentLine: {
    width: 28,
    borderBottomWidth: 2,
    borderBottomColor: ACCENT,
    marginBottom: 9,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.65,
    color: '#374151',
  },
  jobBlock: {
    marginBottom: 12,
  },
  jobTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  jobRole: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#0f172a',
  },
  jobDuration: {
    fontSize: 8.5,
    color: '#64748b',
  },
  jobCompany: {
    fontSize: 9,
    color: '#f59e0b',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  bulletItem: {
    fontSize: 9,
    lineHeight: 1.55,
    color: '#374151',
    marginBottom: 2,
    paddingLeft: 10,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  eduDegree: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    color: '#0f172a',
    marginBottom: 1,
  },
  eduSchool: {
    fontSize: 9,
    color: '#64748b',
  },
  eduYear: {
    fontSize: 8.5,
    color: '#64748b',
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

export function ExecutiveTemplate({ resume, candidateName, jobTitle, email, phone, location }: Props) {
  const contactItems = [email, phone, location].filter(Boolean)

  return (
    <Document title={`${candidateName} — Resume`} author={candidateName} creator="Zeender">
      <Page size="A4" style={styles.page}>

        {/* ── Sidebar ── */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarName}>{candidateName}</Text>
          <Text style={styles.sidebarTitle}>{jobTitle}</Text>
          <View style={styles.sidebarDivider} />

          {contactItems.length > 0 && (
            <>
              <Text style={styles.sidebarSectionHeader}>Contact</Text>
              {contactItems.map((item, i) => (
                <Text key={i} style={styles.sidebarContactItem}>{item}</Text>
              ))}
            </>
          )}

          {resume.skills?.length > 0 && (
            <>
              <Text style={styles.sidebarSectionHeader}>Skills</Text>
              {resume.skills.map((skill, i) => (
                <Text key={i} style={styles.sidebarSkillItem}>· {skill}</Text>
              ))}
            </>
          )}

          {resume.education?.length > 0 && (
            <>
              <Text style={styles.sidebarSectionHeader}>Education</Text>
              {resume.education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 8.5, color: '#e2e8f0', fontFamily: 'Helvetica-Bold', marginBottom: 1 }}>
                    {edu.degree}
                  </Text>
                  <Text style={{ fontSize: 8, color: '#94a3b8' }}>{edu.school}</Text>
                  <Text style={{ fontSize: 8, color: '#64748b' }}>{edu.year}</Text>
                </View>
              ))}
            </>
          )}
        </View>

        {/* ── Main content ── */}
        <View style={styles.main}>
          {/* Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>About Me</Text>
            <View style={styles.sectionAccentLine} />
            <Text style={styles.summaryText}>{resume.summary}</Text>
          </View>

          {/* Experience */}
          {resume.experience?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Experience</Text>
              <View style={styles.sectionAccentLine} />
              {resume.experience.map((exp, i) => (
                <View key={i} style={styles.jobBlock}>
                  <View style={styles.jobTopRow}>
                    <Text style={styles.jobRole}>{exp.role}</Text>
                    <Text style={styles.jobDuration}>{exp.duration}</Text>
                  </View>
                  <Text style={styles.jobCompany}>{exp.company}</Text>
                  {exp.bullets?.map((b, j) => (
                    <Text key={j} style={styles.bulletItem}>›  {b}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>

      </Page>
    </Document>
  )
}
