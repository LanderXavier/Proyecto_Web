import openpyxl
from openpyxl import Workbook
import os

wb = Workbook()


# Hoja signature SOLO con los campos requeridos por el backend
ws1 = wb.active
ws1.title = "signature"
ws1.append([
    "curricular_unit", "UOC", "learning_outcomes", "content", "total_hours", "semester", "school"
])
ws1.append([
    "Cálculo I", 5, '["Resolver límites"]', "Límites, derivadas, integrales", 144, 1, "Ingeniería"
])
ws1.append([
    "Álgebra Lineal", 5, '["Resolver matrices"]', "Matrices, espacios vectoriales", 144, 1, "Ingeniería"
])
ws1.append([
    "Química I", 5, '["Analizar reacciones"]', "Reacciones, enlaces químicos", 144, 1, "Ingeniería"
])
ws1.append([
    "Biología I", 5, '["Comprender células"]', "Células, membranas, enzimas", 144, 1, "Ingeniería"
])

# Hoja Program (sin cambios, ejemplo anterior)
ws2 = wb.create_sheet(title="Program")
ws2.append([
    "ID_program", "signature_id", "curricular_unit", "content", "teaching_hours", "internship_hours", "independent_learning_hours", "total_hours", "semester", "school", "methodology", "prerequisites", "corequisites", "learning_outcomes", "bibliography", "objectives", "units", "learningOutcomes", "bibliographyMain", "bibliographyComplementary", "contribution", "major", "course", "code", "study_mode", "estado"
])
ws2.append([
    1, 1, "Cálculo I", "Límites, derivadas, integrales", 48, 48, 48, 144, 1, "Ingeniería", "Presencial", '["MAT101"]', '["FIS101"]', '["Resolver límites"]', '["Libro 1"]', "Objetivo 1", '["Unidad 1"]', '["LO1"]', '["BibMain1"]', '["BibComp1"]', "Aporte 1", "Industrial", "Curso 1", "MAT101", "Presencial", "pendiente"
])
ws2.append([
    2, 2, "Álgebra Lineal", "Matrices, espacios vectoriales", 48, 48, 48, 144, 1, "Ingeniería", "Presencial", '["MAT102"]', '["FIS102"]', '["Resolver matrices"]', '["Libro 2"]', "Objetivo 2", '["Unidad 2"]', '["LO2"]', '["BibMain2"]', '["BibComp2"]', "Aporte 2", "Industrial", "Curso 2", "MAT102", "Presencial", "revisado"
])

# Guardar en la misma carpeta que el script
output_path = os.path.join(os.path.dirname(__file__), "ejemplo_importacion.xlsx")
wb.save(output_path)
print(f"Archivo ejemplo_importacion.xlsx generado en: {output_path}")
