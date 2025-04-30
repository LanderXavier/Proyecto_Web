function generatePDF() {
  // Creamos un objeto con todos los datos
  const syllabusData = {
    school: document.getElementById('school').value,
    major: document.getElementById('major').value,
    course: document.getElementById('course').value,
    code: document.getElementById('code').value,
    level: document.getElementById('level').value,
    term: document.getElementById('term').value,
    mode: document.getElementById('mode').value,
    unit: document.getElementById('unit').value,
    hours: document.getElementById('hours').value,
    class_schedule: document.getElementById('class_schedule').value,
    tutoring_schedule: document.getElementById('tutoring_schedule').value,
    professor: document.getElementById('professor').value,
    description: document.getElementById('description').value,
    contribution: document.getElementById('contribution').value,
    prerequisite_course: document.getElementById('prerequisite_course').value,
    prerequisite_code: document.getElementById('prerequisite_code').value,
    corequisite_course: document.getElementById('corequisite_course').value,
    corequisite_code: document.getElementById('corequisite_code').value,
  };

  console.log("Datos del syllabus:", JSON.stringify(syllabusData, null, 2));

  // Transferir datos al contenido del PDF
  document.getElementById('out-school').textContent = syllabusData.school;
  document.getElementById('out-major').textContent = syllabusData.major;
  document.getElementById('out-course').textContent = syllabusData.course;
  document.getElementById('out-code').textContent = syllabusData.code;
  document.getElementById('out-level').textContent = syllabusData.level;
  document.getElementById('out-term').textContent = syllabusData.term;
  document.getElementById('out-mode').textContent = syllabusData.mode;
  document.getElementById('out-unit').textContent = syllabusData.unit;
  document.getElementById('out-hours').textContent = syllabusData.hours;
  document.getElementById('out-class_schedule').textContent = syllabusData.class_schedule;
  document.getElementById('out-tutoring_schedule').textContent = syllabusData.tutoring_schedule;
  document.getElementById('out-professor').textContent = syllabusData.professor;
  document.getElementById('out-contribution').textContent = syllabusData.contribution;

  document.getElementById('out-prerequisite_course').textContent = document.getElementById('prerequisite_course').value;
  document.getElementById('out-prerequisite_code').textContent = document.getElementById('prerequisite_code').value;
  document.getElementById('out-corequisite_course').textContent = document.getElementById('corequisite_course').value;
  document.getElementById('out-corequisite_code').textContent = document.getElementById('corequisite_code').value;
  document.getElementById('out-description').textContent = document.getElementById('description').value;

  const element = document.getElementById('pdf-content');
  element.style.display = 'block'; // mostrar para capturar


  html2pdf:
  html2pdf().set({
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: 'syllabus.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { 
      scale: 3, 
      useCORS: true, 
      allowTaint: false,
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
  })
  .from(element)
  .save()
  .then(() => {
    element.style.display = 'none';
  });
  
  // html2pdf().set({
  //   margin: [0.5, 0.5, 0.5, 0.5], // Márgenes más pequeños
  //   filename: 'syllabus.pdf',
  //   image: { type: 'jpeg', quality: 1 },
  //   html2canvas: { 
  //     scale: 3,
  //     useCORS: true,
  //     allowTaint: false,
  //     logging: true,
  //     pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }  // 👈🏼 Importante para evitar cortes raros
  //   },
  //   jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' } // Horizontal
  // }).from(element)
  // .save()
  // .then(() => {
  //   element.style.display = 'none';
  // });
  
  
}
