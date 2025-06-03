import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Button, Form, Card, Container, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CursoFormato from './CursoFormato.js';
import html2pdf from 'html2pdf.js';
import axios from 'axios';
import { FaTrash, FaPlus } from 'react-icons/fa';

const CursoPdf = () => {
  const [curso, setCurso] = useState({
    nombre: '',
    codigo: '',
    semestre: '',
    totalHoras: '',
    descripcion: '',
    objetivos: '',
    temas: '',
    bibliografia: '',
    ID_program: '',
    school: '',
    methodology: '',
    major: '',
    study_mode: '',
    professors: '',
    weekly_class_schedule: '',
    weekly_tutoring_schedule: '',
    contribution: '',
    prerequisite_course: '',
    prerequisite_code: '',
    corequisite_course: '',
    corequisite_code: ''
  });

  const [programData, setProgramData] = useState([]);
  const [mostrarFormato, setMostrarFormato] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const printRef = useRef();
  const navigate = useNavigate();
  const [units, setUnits] = useState([
    {
      unit: '',
      contents: [
        {
          content: '',
          teaching_hours: '',
          internship_hours: '',
          independent_hours: '',
        }
      ],
      evaluation_instruments: ''
    }
  ]);

  // Prerrequisitos y Correquisitos igual que en ProgramPdf.js
  const [prerequisites, setPrerequisites] = useState([{ course: '', code: '' }]);
  const [corequisites, setCorequisites] = useState([{ course: '', code: '' }]);

  // Learning Outcomes igual que en ProgramPdf.js
  const [learningOutcomes, setLearningOutcomes] = useState([
    { outcome: '' }
  ]);

  // Bibliografía principal y complementaria igual que en ProgramPdf.js
  const [bibliographyMain, setBibliographyMain] = useState([
    { reference: '' }
  ]);
  const [bibliographyComplementary, setBibliographyComplementary] = useState([
    { reference: '' }
  ]);

  // Verificar si el token existe
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); 
    }
  }, [navigate]);

  // Obtener los programas disponibles
  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtén el token del usuario
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/program/programs`, // Endpoint para obtener los programas
          {
            headers: {
              Authorization: `Bearer ${token}`, // Envía el token en los headers
            },
          }
        );
        setProgramData(response.data); // Guarda los programas en el estado
      } catch (error) {
        console.error('Error al obtener los programas:', error);
      }
    };

    fetchProgramData();
  }, []);

  // Auto completar los campos basados en el programa seleccionado
  useEffect(() => {
    if (curso.ID_program) {
      const selectedProgram = programData.find(
        (program) => program.ID_program === parseInt(curso.ID_program)
      );
      if (selectedProgram) {
        setCurso((prevCurso) => ({
          ...prevCurso,
          nombre: selectedProgram.curricular_unit,
          codigo: selectedProgram.code || selectedProgram.ID_program,
          semestre: selectedProgram.semester,
          descripcion: selectedProgram.content,
          totalHoras: selectedProgram.total_hours,
          school: selectedProgram.school,
          methodology: selectedProgram.methodology,
          major: selectedProgram.major,
          study_mode: selectedProgram.study_mode,
          professors: selectedProgram.professors,
          weekly_class_schedule: selectedProgram.weekly_class_schedule,
          weekly_tutoring_schedule: selectedProgram.weekly_tutoring_schedule,
          contribution: selectedProgram.contribution,
          objetivos: selectedProgram.objectives || '',
          temas: selectedProgram.temas || '',
          bibliografia: selectedProgram.bibliography || '',
          // Si tienes más campos, agrégalos aquí
        }));
        // Poblar arrays de prerequisitos y correquisitos
        setPrerequisites(selectedProgram.prerequisites ? JSON.parse(selectedProgram.prerequisites) : [{ course: '', code: '' }]);
        setCorequisites(selectedProgram.corequisites ? JSON.parse(selectedProgram.corequisites) : [{ course: '', code: '' }]);
      }
    }
  }, [curso.ID_program, programData]);

  // Para editar y mostrar lo que viene de la base de datos (Syllabus)
  useEffect(() => {
    // Si el syllabus ya existe y lo quieres editar, aquí puedes poblar los estados
    // Por ejemplo, si recibes un syllabus para editar:
    if (curso.syllabus_id) {
      // Aquí deberías hacer una petición para obtener el syllabus por ID y poblar los estados
      // Ejemplo:
      // axios.get(`/Syllabus/${curso.syllabus_id}`)...
      // y luego setCurso, setPrerequisites, setCorequisites, setUnits, etc.
      // Por ahora, si ya tienes los datos en curso, pobla los arrays si existen:
      if (curso.prerequisite_course) {
        try {
          setPrerequisites(JSON.parse(curso.prerequisite_course));
        } catch (e) { setPrerequisites([{ course: '', code: '' }]); }
      }
      if (curso.corequisite_course) {
        try {
          setCorequisites(JSON.parse(curso.corequisite_course));
        } catch (e) { setCorequisites([{ course: '', code: '' }]); }
      }
      if (curso.units) {
        try {
          setUnits(JSON.parse(curso.units));
        } catch (e) { /* no-op */ }
      }
      if (curso.learningOutcomes) {
        try {
          setLearningOutcomes(JSON.parse(curso.learningOutcomes));
        } catch (e) { setLearningOutcomes([{ outcome: '' }]); }
      }
      if (curso.bibliographyMain) {
        try {
          setBibliographyMain(JSON.parse(curso.bibliographyMain));
        } catch (e) { setBibliographyMain([{ reference: '' }]); }
      }
      if (curso.bibliographyComplementary) {
        try {
          setBibliographyComplementary(JSON.parse(curso.bibliographyComplementary));
        } catch (e) { setBibliographyComplementary([{ reference: '' }]); }
      }
    }
  }, [curso]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Funciones para editar/agregar/eliminar prerrequisitos
  const handlePrereqChange = (idx, field, value) => {
    const updated = prerequisites.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setPrerequisites(updated);
  };
  const addPrerequisite = () => setPrerequisites([...prerequisites, { course: '', code: '' }]);
  const removePrerequisite = (idx) => setPrerequisites(prerequisites.filter((_, i) => i !== idx));

  // Funciones para editar/agregar/eliminar correquisitos
  const handleCoreqChange = (idx, field, value) => {
    const updated = corequisites.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setCorequisites(updated);
  };
  const addCorequisite = () => setCorequisites([...corequisites, { course: '', code: '' }]);
  const removeCorequisite = (idx) => setCorequisites(corequisites.filter((_, i) => i !== idx));

  // Funciones para learning outcomes
  const handleLearningOutcomeChange = (idx, value) => {
    const updated = learningOutcomes.map((item, i) =>
      i === idx ? { ...item, outcome: value } : item
    );
    setLearningOutcomes(updated);
  };
  const addLearningOutcome = () => setLearningOutcomes([...learningOutcomes, { outcome: '' }]);
  const removeLearningOutcome = (idx) => setLearningOutcomes(learningOutcomes.filter((_, i) => i !== idx));

  // Funciones para bibliografía principal
  const handleBibliographyMainChange = (idx, value) => {
    const updated = bibliographyMain.map((item, i) =>
      i === idx ? { ...item, reference: value } : item
    );
    setBibliographyMain(updated);
  };
  const addBibliographyMain = () => setBibliographyMain([...bibliographyMain, { reference: '' }]);
  const removeBibliographyMain = (idx) => setBibliographyMain(bibliographyMain.filter((_, i) => i !== idx));

  // Funciones para bibliografía complementaria
  const handleBibliographyComplementaryChange = (idx, value) => {
    const updated = bibliographyComplementary.map((item, i) =>
      i === idx ? { ...item, reference: value } : item
    );
    setBibliographyComplementary(updated);
  };
  const addBibliographyComplementary = () => setBibliographyComplementary([...bibliographyComplementary, { reference: '' }]);
  const removeBibliographyComplementary = (idx) => setBibliographyComplementary(bibliographyComplementary.filter((_, i) => i !== idx));

  const handleSaveToDatabase = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Syllabus/create`,
        {
          ID_program: curso.ID_program,
          syllabus_name: curso.nombre,
          objetivos: curso.objetivos,
          temas: curso.temas,
          bibliografia: curso.bibliografia,
          prerequisite_course: JSON.stringify(prerequisites),
          prerequisite_code: '',
          corequisite_course: JSON.stringify(corequisites),
          corequisite_code: '',
          units: JSON.stringify(units),
          learning_outcomes: JSON.stringify(learningOutcomes),
          bibliography_main: JSON.stringify(bibliographyMain),
          bibliography_complementary: JSON.stringify(bibliographyComplementary),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      navigate('/dashboard'); // Redirige al dashboard después de guardar
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
      alert('Error al guardar en la base de datos');
    }
  };

  const handlePreview = () => {
    setMostrarFormato(true);
  };

  const handleSave = () => {
    const options = {
      margin: 1,
      filename: `${curso.nombre}-curso.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };

    html2pdf()
      .from(printRef.current)
      .set(options)
      .save();
  };

  const handleUnitChange = (idx, value) => {
    const updated = units.map((item, i) =>
      i === idx ? { ...item, unit: value } : item
    );
    setUnits(updated);
  };

  const handleContentChange = (unitIdx, contentIdx, field, value) => {
    const updated = units.map((item, i) =>
      i === unitIdx
        ? {
            ...item,
            contents: item.contents.map((c, j) =>
              j === contentIdx ? { ...c, [field]: value } : c
            ),
          }
        : item
    );
    setUnits(updated);
  };

  const addUnit = () =>
    setUnits([
      ...units,
      {
        unit: '',
        contents: [
          {
            content: '',
            teaching_hours: '',
            internship_hours: '',
            independent_hours: '',
          },
        ],
        evaluation_instruments: '',
      },
    ]);

  const removeUnit = (idx) => setUnits(units.filter((_, i) => i !== idx));

  const addContent = (unitIdx) => {
    const updated = units.map((item, i) =>
      i === unitIdx
        ? {
            ...item,
            contents: [
              ...item.contents,
              {
                content: '',
                teaching_hours: '',
                internship_hours: '',
                independent_hours: '',
              },
            ],
          }
        : item
    );
    setUnits(updated);
  };

  const removeContent = (unitIdx, contentIdx) => {
    const updated = units.map((item, i) =>
      i === unitIdx
        ? {
            ...item,
            contents: item.contents.filter((_, j) => j !== contentIdx),
          }
        : item
    );
    setUnits(updated);
  };

  const handleEvaluationChange = (unitIdx, value) => {
    const updated = units.map((item, i) =>
      i === unitIdx ? { ...item, evaluation_instruments: value } : item
    );
    setUnits(updated);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Formulario de Syllabus</h1>
      <Card className="mb-4">
        <Card.Body>
          <Tabs
            id="curso-tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
            justify
          >
            <Tab eventKey="general" title="1. General Information">
              <Form.Group className="mb-3">
                <Form.Label>Seleccionar Programa</Form.Label>
                <Form.Control
                  as="select"
                  name="ID_program"
                  value={curso.ID_program}
                  onChange={handleChange}
                >
                  <option value="">Seleccione un programa</option>
                  {programData.map((program) => (
                    <option key={program.ID_program} value={program.ID_program}>
                      {program.curricular_unit}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Escuela</Form.Label>
                <Form.Control
                  type="text"
                  name="school"
                  value={curso.school}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Carrera/Mención</Form.Label>
                <Form.Control
                  type="text"
                  name="major"
                  value={curso.major || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Curso</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={curso.nombre}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="codigo"
                  value={curso.codigo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Semestre</Form.Label>
                <Form.Control
                  type="text"
                  name="semestre"
                  value={curso.semestre}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Modalidad de Estudio</Form.Label>
                <Form.Control
                  type="text"
                  name="study_mode"
                  value={curso.study_mode || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Total de Horas</Form.Label>
                <Form.Control
                  type="text"
                  name="totalHoras"
                  value={curso.totalHoras}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Profesores</Form.Label>
                <Form.Control
                  type="text"
                  name="professors"
                  value={curso.professors || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Horario de Clases</Form.Label>
                <Form.Control
                  type="text"
                  name="weekly_class_schedule"
                  value={curso.weekly_class_schedule || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Horario de Tutoría</Form.Label>
                <Form.Control
                  type="text"
                  name="weekly_tutoring_schedule"
                  value={curso.weekly_tutoring_schedule || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Tab>
            <Tab eventKey="prereq" title="2. Prerrequisitos y Correquisitos">
              <h5>Prerrequisitos</h5>
              {prerequisites.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Curso"
                    value={item.course}
                    onChange={e => handlePrereqChange(idx, 'course', e.target.value)}
                    className="me-2"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Código"
                    value={item.code}
                    onChange={e => handlePrereqChange(idx, 'code', e.target.value)}
                    className="me-2"
                  />
                  <Button variant="danger" size="sm" onClick={() => removePrerequisite(idx)} disabled={prerequisites.length === 1}>
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button variant="success" size="sm" onClick={addPrerequisite}>
                <FaPlus /> Agregar
              </Button>
              <hr />
              <h5>Correquisitos</h5>
              {corequisites.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Curso"
                    value={item.course}
                    onChange={e => handleCoreqChange(idx, 'course', e.target.value)}
                    className="me-2"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Código"
                    value={item.code}
                    onChange={e => handleCoreqChange(idx, 'code', e.target.value)}
                    className="me-2"
                  />
                  <Button variant="danger" size="sm" onClick={() => removeCorequisite(idx)} disabled={corequisites.length === 1}>
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button variant="success" size="sm" onClick={addCorequisite}>
                <FaPlus /> Agregar
              </Button>
            </Tab>
            <Tab eventKey="description" title="3. Course Description">
              <Form.Group className="mb-3">
                <Form.Label>Descripción del Curso</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={curso.descripcion}
                  onChange={handleChange}
                />
              </Form.Group>
            </Tab>
            <Tab eventKey="contribution" title="4. Course Contribution">
              <Form.Group className="mb-3">
                <Form.Label>Aporte Profesional</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="contribution"
                  value={curso.contribution || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Tab>
            <Tab eventKey="objectives" title="5. Course Objectives">
              <Form.Group className="mb-3">
                <Form.Label>Objetivos del Curso</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="objetivos"
                  value={curso.objetivos}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Temas</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="temas"
                  value={curso.temas}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bibliografía</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="bibliografia"
                  value={curso.bibliografia}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Metodología</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="methodology"
                  value={curso.methodology}
                  onChange={handleChange}
                />
              </Form.Group>
            </Tab>
            <Tab eventKey="units" title="6. Units / Contents / Hours / Evaluation Instruments">
              {units.map((unit, unitIdx) => (
                <Card key={unitIdx} className="mb-3">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      <Form.Control
                        type="text"
                        placeholder={`Unidad Curricular (ej: CU ${unitIdx + 1})`}
                        value={unit.unit}
                        onChange={e => handleUnitChange(unitIdx, e.target.value)}
                        className="me-2"
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeUnit(unitIdx)}
                        disabled={units.length === 1}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                    <h6>Contenidos y Horas</h6>
                    {unit.contents.map((content, contentIdx) => (
                      <div key={contentIdx} className="d-flex align-items-center mb-2 flex-wrap">
                        <Form.Control
                          type="text"
                          placeholder={`Contenido ${contentIdx + 1}`}
                          value={content.content}
                          onChange={e => handleContentChange(unitIdx, contentIdx, 'content', e.target.value)}
                          className="me-2 mb-2"
                          style={{ minWidth: 200 }}
                        />
                        <Form.Control
                          type="number"
                          placeholder="Teaching Hours"
                          value={content.teaching_hours}
                          onChange={e => handleContentChange(unitIdx, contentIdx, 'teaching_hours', e.target.value)}
                          className="me-2 mb-2"
                          style={{ width: 120 }}
                        />
                        <Form.Control
                          type="number"
                          placeholder="Internship Hours"
                          value={content.internship_hours}
                          onChange={e => handleContentChange(unitIdx, contentIdx, 'internship_hours', e.target.value)}
                          className="me-2 mb-2"
                          style={{ width: 120 }}
                        />
                        <Form.Control
                          type="number"
                          placeholder="Independent Hours"
                          value={content.independent_hours}
                          onChange={e => handleContentChange(unitIdx, contentIdx, 'independent_hours', e.target.value)}
                          className="me-2 mb-2"
                          style={{ width: 120 }}
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeContent(unitIdx, contentIdx)}
                          disabled={unit.contents.length === 1}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => addContent(unitIdx)}
                      className="mb-2"
                    >
                      <FaPlus /> Agregar Contenido
                    </Button>
                    <Form.Group className="mt-3">
                      <Form.Label>Instrumentos de Evaluación</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ej: Workshops, Project 1"
                        value={unit.evaluation_instruments}
                        onChange={e => handleEvaluationChange(unitIdx, e.target.value)}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              ))}
              <Button variant="primary" size="sm" onClick={addUnit}>
                <FaPlus /> Agregar Unidad
              </Button>
            </Tab>
            <Tab eventKey="learningOutcomes" title="7. Learning outcomes of the course">
              <h5>Learning Outcomes</h5>
              {learningOutcomes.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center mb-2">
                  <Form.Control
                    type="text"
                    placeholder={`Learning Outcome ${idx + 1}`}
                    value={item.outcome}
                    onChange={e => handleLearningOutcomeChange(idx, e.target.value)}
                    className="me-2"
                  />
                  <Button variant="danger" size="sm" onClick={() => removeLearningOutcome(idx)} disabled={learningOutcomes.length === 1}>
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button variant="success" size="sm" onClick={addLearningOutcome}>
                <FaPlus /> Agregar
              </Button>
            </Tab>
            <Tab eventKey="bibliography" title="9. Information Sources (Bibliography)">
              <h5>Bibliografía Principal</h5>
              {bibliographyMain.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center mb-2">
                  <Form.Control
                    type="text"
                    placeholder={`Referencia Principal ${idx + 1}`}
                    value={item.reference}
                    onChange={e => handleBibliographyMainChange(idx, e.target.value)}
                    className="me-2"
                  />
                  <Button variant="danger" size="sm" onClick={() => removeBibliographyMain(idx)} disabled={bibliographyMain.length === 1}>
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button variant="success" size="sm" onClick={addBibliographyMain}>
                <FaPlus /> Agregar
              </Button>
              <hr />
              <h5>Bibliografía Complementaria</h5>
              {bibliographyComplementary.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center mb-2">
                  <Form.Control
                    type="text"
                    placeholder={`Referencia Complementaria ${idx + 1}`}
                    value={item.reference}
                    onChange={e => handleBibliographyComplementaryChange(idx, e.target.value)}
                    className="me-2"
                  />
                  <Button variant="danger" size="sm" onClick={() => removeBibliographyComplementary(idx)} disabled={bibliographyComplementary.length === 1}>
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button variant="success" size="sm" onClick={addBibliographyComplementary}>
                <FaPlus /> Agregar
              </Button>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      <div className="text-center mb-5">
        <Button variant="primary" onClick={handlePreview} className="me-2">
          Generar Syllabus
        </Button>
        <Button variant="primary" onClick={() => navigate('/dashboard')}>
          Regresar al Dashboard
        </Button>
        {mostrarFormato && (
          <div>
            <Button variant="success" onClick={handleSave}>
              Generar a formato PDF
            </Button>
            <Button variant="info" onClick={handleSaveToDatabase}>
              Guardar en la Base de Datos
            </Button>
          </div>
        )}
      </div>

      {mostrarFormato && (
        <div ref={printRef} style={{ backgroundColor: "white", padding: "20px", marginBottom: "40px" }}>
          <CursoFormato curso={curso} />
        </div>
      )}
    </Container>
  );
};

export default CursoPdf;
