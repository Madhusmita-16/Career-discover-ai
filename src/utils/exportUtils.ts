import type { OptimizedResume } from '../types/resume';

export function triggerPDFPrint(): void {
  window.print();
}

export function exportResumeAsPlainText(resume: OptimizedResume): void {
  let text = `===================================================\n`;
  text += `${resume.targetTitle.toUpperCase()} RESUME\n`;
  text += `===================================================\n\n`;

  text += `PROFESSIONAL SUMMARY\n`;
  text += `--------------------\n`;
  text += `${resume.summary}\n\n`;

  text += `SKILLS MATRIX\n`;
  text += `-------------\n`;
  resume.optimizedSkills.forEach(group => {
    text += `${group.category}: ${group.skills.join(', ')}\n`;
  });
  text += `\n`;

  text += `WORK EXPERIENCE\n`;
  text += `----------------\n`;
  resume.optimizedExperiences.forEach(exp => {
    text += `${exp.jobTitle} | ${exp.company} (${exp.location})\n`;
    text += `${exp.startDate} - ${exp.endDate}\n`;
    exp.responsibilities.forEach(resp => {
      text += `  • ${resp}\n`;
    });
    if (exp.keyAchievements && exp.keyAchievements.length > 0) {
      exp.keyAchievements.forEach(ach => {
        text += `  * Key Achievement: ${ach}\n`;
      });
    }
    text += `\n`;
  });

  text += `FEATURED PROJECTS\n`;
  text += `-----------------\n`;
  resume.selectedProjects.forEach(proj => {
    text += `${proj.title} [Tech Stack: ${proj.techStack.join(', ')}]\n`;
    text += `${proj.description}\n`;
    proj.highlights.forEach(h => {
      text += `  • ${h}\n`;
    });
    text += `\n`;
  });

  text += `EDUCATION\n`;
  text += `---------\n`;
  resume.education.forEach(edu => {
    text += `${edu.degree} in ${edu.fieldOfStudy}\n`;
    text += `${edu.institution} (${edu.location}) | ${edu.startDate} - ${edu.endDate} | GPA: ${edu.gpa || 'N/A'}\n\n`;
  });

  if (resume.certifications.length > 0) {
    text += `CERTIFICATIONS\n`;
    text += `--------------\n`;
    resume.certifications.forEach(cert => {
      text += `• ${cert.title} - ${cert.issuer} (${cert.date}) [ID: ${cert.credentialId || 'N/A'}]\n`;
    });
  }

  const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `Resume_${resume.targetTitle.replace(/\s+/g, '_')}.txt`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
