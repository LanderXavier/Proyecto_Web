import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card, Container, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Program = () => {
  const [program, setProgram] = useState({
    curricular_unit: '',
    content: '',
    teaching_hours: '',
    internship_hours: '',
    independent_learning_hours: '',
    total_hours: '',
    semester: '',
    school: '',
    methodology: '',
    prerequisites: '',
    corequisites: '',
    learning_outcomes: '',
    bibliography: '',
    major: '',
    course: '',
    code: '',
    study_mode: '',
    contribution: '',
  });

  const [activeTab, setActiveTab] = useState('general');
  const [signatures, setSignatures] = useState([]);
  const [selectedSignature, setSelectedSignature] = useState('');
  const [prerequisites, setPrerequisites] = useState([{ course: '', code: '' }]);
  const [corequisites, setCorequisites] = useState([{ course: '', code: '' }]);
  const [units, setUnits] = useState([
    { unit: '', contents: [''] }
  ]);

  const [learningOutcomes, setLearningOutcomes] = useState([
    { code: '', description: '' }
  ]);

  const [methodology, setMethodology] = useState('');
  const [bibliographyMain, setBibliographyMain] = useState([
    { author: '', title: '', edition: '', year: '', publisher: '', library: '' }
  ]);
  const [bibliographyComplementary, setBibliographyComplementary] = useState([
    { author: '', title: '', edition: '', year: '', publisher: '', library: '' }
  ]);
  const navigate = useNavigate();

  // Verificar si el token existe
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSignatures = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Signature/signatures`
        );
        setSignatures(response.data);
      } catch (error) {
        console.error('Error fetching signatures:', error);
        alert('Error fetching signatures');
      }
    };

    fetchSignatures();
  }, []);

  useEffect(() => {
    if (selectedSignature && signatures.length > 0) {
      const found = signatures.find((s) => s.id === parseInt(selectedSignature));
      if (found) {
        setProgram((prev) => ({
          ...prev,
          curricular_unit: found.curricular_unit || '',
          content: found.content || '',
          total_hours: found.total_hours || '',
          semester: found.semester || '',
          school: found.school || '',
          learning_outcomes: found.learning_outcomes || '',
        }));
      }
    }
  }, [selectedSignature, signatures]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgram((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrereqChange = (idx, field, value) => {
    const updated = prerequisites.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setPrerequisites(updated);
  };

  const handleCoreqChange = (idx, field, value) => {
    const updated = corequisites.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setCorequisites(updated);
  };

  const handleUnitChange = (idx, value) => {
    const updated = units.map((item, i) =>
      i === idx ? { ...item, unit: value } : item
    );
    setUnits(updated);
  };

  const handleContentChange = (unitIdx, contentIdx, value) => {
    const updated = units.map((item, i) =>
      i === unitIdx
        ? { ...item, contents: item.contents.map((c, j) => j === contentIdx ? value : c) }
        : item
    );
    setUnits(updated);
  };

  // Learning Outcomes
  const handleLearningOutcomeChange = (idx, field, value) => {
    const updated = learningOutcomes.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setLearningOutcomes(updated);
  };
  const addLearningOutcome = () => setLearningOutcomes([...learningOutcomes, { description: '' }]);
  const removeLearningOutcome = (idx) => setLearningOutcomes(learningOutcomes.filter((_, i) => i !== idx));

  // Bibliografía principal
  const handleBibliographyMainChange = (idx, field, value) => {
    const updated = bibliographyMain.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setBibliographyMain(updated);
  };
  const addBibliographyMain = () => setBibliographyMain([...bibliographyMain, { author: '', title: '', edition: '', year: '', publisher: '', library: '' }]);
  const removeBibliographyMain = (idx) => setBibliographyMain(bibliographyMain.filter((_, i) => i !== idx));

  // Bibliografía complementaria
  const handleBibliographyComplementaryChange = (idx, field, value) => {
    const updated = bibliographyComplementary.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setBibliographyComplementary(updated);
  };
  const addBibliographyComplementary = () => setBibliographyComplementary([...bibliographyComplementary, { author: '', title: '', edition: '', year: '', publisher: '', library: '' }]);
  const removeBibliographyComplementary = (idx) => setBibliographyComplementary(bibliographyComplementary.filter((_, i) => i !== idx));

  const addPrerequisite = () => setPrerequisites([...prerequisites, { course: '', code: '' }]);
  const removePrerequisite = (idx) => setPrerequisites(prerequisites.filter((_, i) => i !== idx));

  const addCorequisite = () => setCorequisites([...corequisites, { course: '', code: '' }]);
  const removeCorequisite = (idx) => setCorequisites(corequisites.filter((_, i) => i !== idx));

  const addUnit = () => setUnits([...units, { unit: '', contents: [''] }]);
  const removeUnit = (idx) => setUnits(units.filter((_, i) => i !== idx));

  const addContent = (unitIdx) => {
    const updated = units.map((item, i) =>
      i === unitIdx ? { ...item, contents: [...item.contents, ''] } : item
    );
    setUnits(updated);
  };

  const removeContent = (unitIdx, contentIdx) => {
    const updated = units.map((item, i) =>
      i === unitIdx
        ? { ...item, contents: item.contents.filter((_, j) => j !== contentIdx) }
        : item
    );
    setUnits(updated);
  };

  const handleSaveToDatabase = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!selectedSignature) {
        alert('Por favor, selecciona una asignatura.');
        return;
      }

      // Validar que los campos requeridos no estén vacíos
      const missingFields = [];

      if (!program.curricular_unit) missingFields.push('Unidad Curricular');
      if (!program.content) missingFields.push('Descripción');
      if (!program.total_hours) missingFields.push('Total de Horas');
      if (!program.semester) missingFields.push('Semestre');
      if (!program.school) missingFields.push('Escuela');
      if (!methodology) missingFields.push('Metodología');
      if (!learningOutcomes.length || !learningOutcomes[0].description) missingFields.push('Learning Outcomes');
      if (!bibliographyMain.length || !bibliographyMain[0].author) missingFields.push('Bibliografía Principal');

      if (missingFields.length > 0) {
        alert('Por favor, completa los siguientes campos obligatorios:\n' + missingFields.join('\n'));
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/program/create`,
        {
          ...program,
          prerequisites: JSON.stringify(prerequisites),
          corequisites: JSON.stringify(corequisites),
          units: JSON.stringify(units),
          learningOutcomes: JSON.stringify(learningOutcomes),
          methodology,
          bibliographyMain: JSON.stringify(bibliographyMain),
          bibliographyComplementary: JSON.stringify(bibliographyComplementary),
          signature_id: selectedSignature,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      setProgram({
        curricular_unit: '',
        content: '',
        teaching_hours: '',
        internship_hours: '',
        independent_learning_hours: '',
        total_hours: '',
        semester: '',
        school: '',
        methodology: '',
        prerequisites: '',
        corequisites: '',
        learning_outcomes: '',
        bibliography: '',
        major: '',
        course: '',
        code: '',
        study_mode: '',
        contribution: '',
      });
      setSelectedSignature('');
      navigate('/dashboard'); // Redirige al dashboard después de guardar
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
      alert('Error al guardar en la base de datos');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Formulario de Programa</h1>
      <Card className="mb-4">
        <Card.Body>
          <Tabs
            id="program-tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
            justify
          >
            <Tab eventKey="general" title="1. Información General">
              <Form.Group className="mb-3">
                <Form.Label>Asignatura</Form.Label>
                <Form.Select
                  value={selectedSignature}
                  onChange={(e) => setSelectedSignature(e.target.value)}
                >
                  <option value="">Selecciona una asignatura</option>
                  {signatures.map((sig) => (
                    <option key={sig.id} value={sig.id}>
                      {sig.curricular_unit}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Escuela</Form.Label>
                <Form.Control
                  type="text"
                  name="school"
                  value={program.school}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Carrera/Mención</Form.Label>
                <Form.Control
                  type="text"
                  name="major"
                  value={program.major || ''}
                  onChange={handleChange}
                  placeholder="Ej: Computer Science Engineering"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={program.code || ''}
                  onChange={handleChange}
                  placeholder="Ej: ECMC-COM-1117"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Unidad Curricular</Form.Label>
                <Form.Control
                  type="text"
                  name="curricular_unit"
                  value={program.curricular_unit}
                  onChange={handleChange}
                  placeholder="Ej: Professional"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Modalidad de Estudio</Form.Label>
                <Form.Control
                  type="text"
                  name="study_mode"
                  value={program.study_mode || ''}
                  onChange={handleChange}
                  placeholder="Ej: In person"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Total de Horas</Form.Label>
                <Form.Control
                  type="number"
                  name="total_hours"
                  value={program.total_hours}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Semestre</Form.Label>
                <Form.Control
                  type="number"
                  name="semester"
                  value={program.semester}
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

            <Tab eventKey="description" title="3. Descripción del Curso">
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="content"
                  value={program.content}
                  onChange={handleChange}
                  placeholder="Describe el curso aquí..."
                />
              </Form.Group>
            </Tab>
            <Tab eventKey="contribution" title="4. Aporte Profesional">
              <Form.Group className="mb-3">
                <Form.Label>Aporte</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="contribution"
                  value={program.contribution || ''}
                  onChange={handleChange}
                  placeholder="Describe el aporte del curso..."
                />
              </Form.Group>
            </Tab>
            <Tab eventKey="objextives" title="5. Objetivos del curso">
              <Form.Group className="mb-3">
                <Form.Label>Objetivos</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="objectives"
                  value={program.objectives || ''}
                  onChange={handleChange}
                  placeholder="Describe los objetivos del curso..."
                />
              </Form.Group>
            </Tab>
            <Tab eventKey="units" title="6. Units / Contents">
              {units.map((unit, unitIdx) => (
                <Card key={unitIdx} className="mb-3">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      <Form.Control
                        type="text"
                        placeholder={`Unit ${unitIdx + 1} (ej: Unit 1)`}
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
                    <h6>Contents</h6>
                    {unit.contents.map((content, contentIdx) => (
                      <div key={contentIdx} className="d-flex align-items-center mb-2">
                        <Form.Control
                          type="text"
                          placeholder={`Contenido ${contentIdx + 1}`}
                          value={content}
                          onChange={e => handleContentChange(unitIdx, contentIdx, e.target.value)}
                          className="me-2"
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
                    >
                      <FaPlus /> Agregar Contenido
                    </Button>
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
                    placeholder="Description"
                    value={item.description}
                    onChange={e => handleLearningOutcomeChange(idx, 'description', e.target.value)}
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

            <Tab eventKey="methodology" title="8. Methodology">
              <Form.Group className="mb-3">
                <Form.Label>Methodology</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="methodology"
                  value={methodology}
                  onChange={e => setMethodology(e.target.value)}
                  placeholder="Describe la metodología aquí..."
                />
              </Form.Group>
            </Tab>

            <Tab eventKey="bibliography" title="9. Information Sources (Bibliography)">
              <h5>9.1 Main</h5>
              {bibliographyMain.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center mb-2 flex-wrap">
                  <Form.Control
                    type="text"
                    placeholder="Author/s"
                    value={item.author}
                    onChange={e => handleBibliographyMainChange(idx, 'author', e.target.value)}
                    className="me-2 mb-2"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Title of Work"
                    value={item.title}
                    onChange={e => handleBibliographyMainChange(idx, 'title', e.target.value)}
                    className="me-2 mb-2"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Edition"
                    value={item.edition}
                    onChange={e => handleBibliographyMainChange(idx, 'edition', e.target.value)}
                    className="me-2 mb-2"
                    style={{ maxWidth: 100 }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Year"
                    value={item.year}
                    onChange={e => handleBibliographyMainChange(idx, 'year', e.target.value)}
                    className="me-2 mb-2"
                    style={{ maxWidth: 100 }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Publisher"
                    value={item.publisher}
                    onChange={e => handleBibliographyMainChange(idx, 'publisher', e.target.value)}
                    className="me-2 mb-2"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Library (Yes/No)"
                    value={item.library}
                    onChange={e => handleBibliographyMainChange(idx, 'library', e.target.value)}
                    className="me-2 mb-2"
                    style={{ maxWidth: 120 }}
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

              <h5>9.2 Complementary</h5>
              {bibliographyComplementary.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center mb-2 flex-wrap">
                  <Form.Control
                    type="text"
                    placeholder="Author/s"
                    value={item.author}
                    onChange={e => handleBibliographyComplementaryChange(idx, 'author', e.target.value)}
                    className="me-2 mb-2"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Title of Work"
                    value={item.title}
                    onChange={e => handleBibliographyComplementaryChange(idx, 'title', e.target.value)}
                    className="me-2 mb-2"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Edition"
                    value={item.edition}
                    onChange={e => handleBibliographyComplementaryChange(idx, 'edition', e.target.value)}
                    className="me-2 mb-2"
                    style={{ maxWidth: 100 }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Year"
                    value={item.year}
                    onChange={e => handleBibliographyComplementaryChange(idx, 'year', e.target.value)}
                    className="me-2 mb-2"
                    style={{ maxWidth: 100 }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Publisher"
                    value={item.publisher}
                    onChange={e => handleBibliographyComplementaryChange(idx, 'publisher', e.target.value)}
                    className="me-2 mb-2"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Library (Yes/No)"
                    value={item.library}
                    onChange={e => handleBibliographyComplementaryChange(idx, 'library', e.target.value)}
                    className="me-2 mb-2"
                    style={{ maxWidth: 120 }}
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
        <Button variant="info" onClick={handleSaveToDatabase}>
          Guardar en la Base de Datos
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/dashboard')}
          className="ms-3"
        >
          Regresar al Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default Program;