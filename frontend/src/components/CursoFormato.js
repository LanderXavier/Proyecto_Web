import React from 'react';

const CursoFormato = ({ curso }) => {
  return (
    <div id="pdf-content" className="container py-5" style={{
      fontFamily: 'Georgia, serif',
      fontSize: '12pt',
      color: '#000000',
      background: '#ffffff',
      padding: '20px',
      width: '100%',
      // Configuración para formato horizontal
      pageBreakAfter: 'always',
      pageOrientation: 'landscape'
    }}>
      <div className="pdf-header" style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{
          margin: 0,
          color: '#0c2340',
          fontWeight: 'bold',
          fontSize: '17pt'
        }}>YACHAY TECH UNIVERSITY</h2>
        <h2 style={{
          margin: 0,
          color: '#0c2340',
          fontWeight: 'bold',
          fontSize: '22pt'
        }}>SYLLABUS</h2>
      </div>

      {/* 1. GENERAL INFORMATION - Layout optimizado para horizontal */}
      <table className="main-table" style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        border: '1px solid #000000'
      }}>
        <thead>
          <tr>
            <th colSpan="6" style={{
              backgroundColor: '#3b7191',
              color: 'white',
              padding: '10px',
              fontWeight: 'bold',
              fontSize: '12pt',
              textAlign: 'center',
              border: '1px solid #000000',
              letterSpacing: '1px',
              textTransform: 'capitalize'
            }}>1. General Information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{
              fontWeight: 'bold',
              backgroundColor: '#e9ecef',
              textAlign: 'left',
              width: '16%',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '20pt'
            }}>A. SCHOOL</td>
            <td style={{
              width: '17%',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.school || ""}</td>
            <td style={{
              fontWeight: 'bold',
              backgroundColor: '#e9ecef',
              textAlign: 'left',
              width: '16%',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>B. MAJOR</td>
            <td style={{
              width: '17%',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.major || ""}</td>
            <td style={{
              fontWeight: 'bold',
              backgroundColor: '#e9ecef',
              textAlign: 'left',
              width: '16%',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>C. COURSE</td>
            <td style={{
              width: '18%',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.nombre || ""}</td>
          </tr>
          <tr>
            <td style={{
              fontWeight: 'bold',
              backgroundColor: '#e9ecef',
              textAlign: 'left',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>D. CODE</td>
            <td style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.codigo || ""}</td>
            <td style={{
              fontWeight: 'bold',
              backgroundColor: '#e9ecef',
              textAlign: 'left',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>E. LEVEL</td>
            <td style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.level || ""}</td>
            <td style={{
              fontWeight: 'bold',
              backgroundColor: '#e9ecef',
              textAlign: 'left',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>F. ACADEMIC TERM</td>
            <td style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.semestre || ""}</td>
          </tr>
          <tr>
            <td style={{
              fontWeight: 'bold',
              backgroundColor: '#e9ecef',
              textAlign: 'left',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>G. CURRICULAR UNIT</td>
            <td style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.unit || ""}</td>
            <td style={{
              fontWeight: 'bold',
              backgroundColor: '#e9ecef',
              textAlign: 'left',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>H. STUDY MODE</td>
            <td style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.mode || ""}</td>
            <td style={{
              fontWeight: 'bold',
              backgroundColor: '#e9ecef',
              textAlign: 'left',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>I. TOTAL HOURS</td>
            <td style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.totalHoras || ""}</td>
          </tr>
          <tr>
            <td style={{
              fontWeight: 'bold',
              backgroundColor: '#e9ecef',
              textAlign: 'left',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>J. PROFESSORS</td>
            <td colSpan="5" style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.professors || ""}</td>
          </tr>
          <tr>
            <td style={{
              fontWeight: 'bold',
              backgroundColor: '#e9ecef',
              textAlign: 'left',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>K. WEEKLY CLASS SCHEDULE</td>
            <td colSpan="5" style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.classSchedule || ""}</td>
          </tr>
          <tr>
            <td style={{
              fontWeight: 'bold',
              backgroundColor: '#e9ecef',
              textAlign: 'left',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>L. WEEKLY TUTORING SCHEDULE</td>
            <td colSpan="5" style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.tutoringSchedule || ""}</td>
          </tr>
        </tbody>
      </table>

      {/* 2. PREREQUISITES AND COREQUISITES - Horizontal layout */}
      <table className="main-table" style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        border: '1px solid #000000'
      }}>
        <thead>
          <tr>
            <th colSpan="4" style={{
              backgroundColor: '#3b7191',
              color: 'white',
              padding: '10px',
              fontWeight: 'bold',
              fontSize: '14pt',
              textAlign: 'center',
              border: '1px solid #000000',
              letterSpacing: '1px',
              textTransform: 'capitalize'
            }}>2. Prerequisites and Corequisites</th>
          </tr>
          <tr>
            <th colSpan="2" style={{
              backgroundColor: '#a7c8e6',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '11pt',
              textAlign: 'center',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              width: '50%'
            }}>PREREQUISITES</th>
            <th colSpan="2" style={{
              backgroundColor: '#a7c8e6',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '11pt',
              textAlign: 'center',
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              width: '50%'
            }}>COREQUISITES</th>
          </tr>
          <tr>
            <th style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt',
              width: '25%'
            }}>COURSE</th>
            <th style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt',
              width: '25%'
            }}>CODE</th>
            <th style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt',
              width: '25%'
            }}>COURSE</th>
            <th style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt',
              width: '25%'
            }}>CODE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.prerequisiteCourse || ""}</td>
            <td style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.prerequisiteCode || ""}</td>
            <td style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.corequisiteCourse || ""}</td>
            <td style={{
              border: '1px solid #000000',
              padding: '10px 12px',
              verticalAlign: 'middle',
              fontSize: '11pt'
            }}>{curso.corequisiteCode || ""}</td>
          </tr>
        </tbody>
      </table>

      {/* Contenido en formato de 2 columnas para aprovechar el espacio horizontal */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {/* Columna izquierda */}
        <div style={{ flex: 1 }}>
          {/* 3. COURSE DESCRIPTION */}
          <div style={{
            backgroundColor: '#3b7191',
            color: 'white',
            padding: '10px',
            fontWeight: 'bold',
            fontSize: '14pt',
            textAlign: 'center',
            border: '1px solid #000000',
            letterSpacing: '1px',
            textTransform: 'capitalize'
          }}>3. Course Description</div>
          <p style={{
            textAlign: 'justify',
            padding: '10px 15px',
            border: '1px solid #000000',
            minHeight: '150px',
            fontSize: '11pt',
            backgroundColor: '#ffffff',
            margin: '0 0 20px 0'
          }}>{curso.descripcion || ""}</p>
          
          {/* 5. COURSE CONTENT */}
          <div style={{
            backgroundColor: '#3b7191',
            color: 'white',
            padding: '10px',
            fontWeight: 'bold',
            fontSize: '14pt',
            textAlign: 'center',
            border: '1px solid #000000',
            letterSpacing: '1px',
            textTransform: 'capitalize'
          }}>5. Course Content</div>
          <p style={{
            textAlign: 'justify',
            padding: '10px 15px',
            border: '1px solid #000000',
            minHeight: '150px',
            fontSize: '11pt',
            backgroundColor: '#ffffff',
            margin: '0'
          }}>{curso.temas || ""}</p>
        </div>
        
        {/* Columna derecha */}
        <div style={{ flex: 1 }}>
          {/* 4. COURSE CONTRIBUTION */}
          <div style={{
            backgroundColor: '#3b7191',
            color: 'white',
            padding: '10px',
            fontWeight: 'bold',
            fontSize: '14pt',
            textAlign: 'center',
            border: '1px solid #000000',
            letterSpacing: '1px',
            textTransform: 'capitalize'
          }}>4. Course Contribution to Professional Training</div>
          <p style={{
            textAlign: 'justify',
            padding: '10px 15px',
            border: '1px solid #000000',
            minHeight: '150px',
            fontSize: '11pt',
            backgroundColor: '#ffffff',
            margin: '0 0 20px 0'
          }}>{curso.objetivos || ""}</p>
          
          {/* 6. BIBLIOGRAPHY */}
          <div style={{
            backgroundColor: '#3b7191',
            color: 'white',
            padding: '10px',
            fontWeight: 'bold',
            fontSize: '14pt',
            textAlign: 'center',
            border: '1px solid #000000',
            letterSpacing: '1px',
            textTransform: 'capitalize'
          }}>6. Bibliography</div>
          <p style={{
            textAlign: 'justify',
            padding: '10px 15px',
            border: '1px solid #000000',
            minHeight: '150px',
            fontSize: '11pt',
            backgroundColor: '#ffffff',
            margin: '0'
          }}>{curso.bibliografia || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default CursoFormato;