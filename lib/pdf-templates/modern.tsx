import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { GeneratedResume } from '@/types'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    fontSize: 10,
    color: '#1e293b',
  },
  header: {
    backgroundColor: '#1e293b',
    paddingVertical: 28,
    paddingHorizontal: 40,
  },
  headerName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 22,
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 11,
    color: '#94a3b8',
    marginBottom: 10,
  },
  headerContact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  headerContactItem: {
    fontSize: 9,
    color: '#cbd5e1',
  },
  body: {
    paddingHorizontal: 40,
    paddingTop: 22,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#6366f1',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 7,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
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
    fontSize: 10.5,
    color: '#1e293b',
  },
  jobDuration: {
    fontSize: 9,
    color: '#64748b',
  },
  jobCompany: {
    fontSize: 9.5,
    color: '#6366f1',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  bulletItem: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: '#374151',
    marginBottom: 2,
    paddingLeft: 12,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  eduDegree: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#1e293b',
    marginBottom: 1,
  },
  eduSchool: {
    fontSize: 9.5,
    color: '#6366f1',
  },
  eduYear: {
    fontSize: 9,
    color: '#64748b',
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
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

interface Props {
  resume: GeneratedResume
  candidateName: string
  jobTitle: string
  email: string
  phone: string
  location: string
}

export function ModernTemplate({ resume, candidateName, jobTitle, email, phone, location }: Props) {
  const contactItems = [email, phone, location].filter(Boolean)
  return (
    <Document title={`${candidateName} — Resume`} author={candidateName} creator="Zeender">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerName}>{candidateName}</Text>
          <Text style={styles.headerTitle}>{jobTitle}</Text>
          <View style={styles.headerContact}>
            {contactItems.map((item, i) => (
              <Text key={i} style={styles.headerContactItem}>{item}</Text>
            ))}
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Professional Summary</Text>
            <Text style={styles.summaryText}>{resume.summary}</Text>
          </View>

          {resume.experience?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Work Experience</Text>
              {resume.experience.map((exp, i) => (
                <View key={i} style={styles.jobBlock}>
                  <View style={styles.jobTopRow}>
                    <Text style={styles.jobRole}>{exp.role}</Text>
                    <Text style={styles.jobDuration}>{exp.duration}</Text>
                  </View>
                  <Text style={styles.jobCompany}>{exp.company}</Text>
                  {exp.bullets?.map((b, j) => (
                    <Text key={j} style={styles.bulletItem}>▸  {b}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}

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

          {resume.skills?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Skills</Text>
              <View style={styles.skillsWrap}>
                {resume.skills.map((skill, i) => (
                  <Text key={i} style={styles.skillChip}>{skill}</Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}
