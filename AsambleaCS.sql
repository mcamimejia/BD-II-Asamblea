CREATE DATABASE AsambleaCS
GO

USE AsambleaCS
GO

CREATE TABLE Direccion(
IdDireccion VARCHAR(25) PRIMARY KEY NOT NULL,
DireccionUno VARCHAR(100) NOT NULL,
DireccionDos VARCHAR(50),
Complemento VARCHAR(50),
CodigoPostal VARCHAR(30),
Barrio VARCHAR(100) NOT NULL,
Ciudad VARCHAR(50) NOT NULL,
Pais VARCHAR(50) NOT NULL
)
GO

CREATE TABLE RolAsamblea(
IdRol VARCHAR(25) PRIMARY KEY NOT NULL,
Rol VARCHAR(30) NOT NULL,
Crear BIT DEFAULT(0),
Modificar BIT DEFAULT(0),
Eliminar BIT DEFAULT(0),
Votar BIT DEFAULT(0),
Descargar BIT DEFAULT(0)
)
GO

CREATE TABLE Documento(
IdDocumento VARCHAR(25) PRIMARY KEY NOT NULL,
NumDocumento BIGINT UNIQUE NOT NULL,
TipoDocumento VARCHAR(30) NOT NULL,
FechaExpedicion DATE,
ImgFrontal VARCHAR(200),
ImgReverso VARCHAR(200),
ImgCompleto VARCHAR(200),
Estado VARCHAR(30) DEFAULT('SIN_VERIFICAR'),
CHECK(Estado in ('VALIDO','NO_VALIDO','ANULADO','SIN_VERIFICAR'))
)
GO

CREATE TABLE Usuario(
IdUsuario VARCHAR(25) PRIMARY KEY NOT NULL,
PrimerNombre VARCHAR(50) NOT NULL,
SegundoNombre VARCHAR(50),
PrimerApellido VARCHAR(50),
SegundoApellido VARCHAR(50),
Correo VARCHAR(50) UNIQUE NOT NULL,
HashPassword VARBINARY(64) NOT NULL,
EsEmpresa BIT DEFAULT(0),
Perfil VARCHAR(30) NOT NULL,
CHECK(Perfil in ('EMPLEADO','EXTERNO')),
IdDireccion VARCHAR(25),
IdDocumento VARCHAR(25) NOT NULL,
FOREIGN KEY(IdDireccion) REFERENCES Direccion(IdDireccion),
FOREIGN KEY(IdDocumento) REFERENCES Documento(IdDocumento) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE Certificado(
IdCertificado VARCHAR(25) PRIMARY KEY NOT NULL,
FechaValidacion TIMESTAMP NOT NULL,
NombreValidador VARCHAR(50) NOT NULL,
Certificado VARCHAR(200),
IdDocumento VARCHAR(25) NOT NULL,
FOREIGN KEY(IdDocumento) REFERENCES Documento(IdDocumento) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE Empresa(
IdEmpresa VARCHAR(25) PRIMARY KEY NOT NULL,
Nombre VARCHAR(100) NOT NULL,
Nit BIGINT UNIQUE NOT NULL,
FechaCreacion DATE NOT NULL,
IdDireccion VARCHAR(25),
FOREIGN KEY(IdDireccion) REFERENCES Direccion(IdDireccion)
)
GO

CREATE TABLE DatosEmpresa(
IdDatos VARCHAR(25) PRIMARY KEY NOT NULL,
Telefono BIGINT UNIQUE,
Correo VARCHAR(50) UNIQUE,
SitioWeb VARCHAR(150),
RepLegal VARCHAR(100) NOT NULL,
Logo VARCHAR(200),
IdEmpresa VARCHAR(25) NOT NULL,
FOREIGN KEY(IdEmpresa) REFERENCES Empresa(IdEmpresa) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE Empleado(
IdEmpleado VARCHAR(25) PRIMARY KEY NOT NULL,
Cargo VARCHAR(50) NOT NULL,
Funciones VARCHAR(250),
IdUsuario VARCHAR(25) NOT NULL,
FOREIGN KEY(IdUsuario) REFERENCES Usuario(IdUsuario) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE EmpleadoAcademico(
IdEmpleadoAcademico VARCHAR(25) PRIMARY KEY NOT NULL,
Institucion VARCHAR(100) NOT NULL,
Titulo VARCHAR(100) NOT NULL,
NivelAcademico VARCHAR(50) NOT NULL,
FechaFinalizacion DATE,
IdEmpleado VARCHAR(25) NOT NULL,
FOREIGN KEY(IdEmpleado) REFERENCES Empleado(IdEmpleado) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE EmpleadoFamiliar(
IdEmpleadoFamiliar VARCHAR(25) PRIMARY KEY NOT NULL,
Parentesco VARCHAR(30) NOT NULL,
NumDocumento BIGINT NOT NULL,
TipoDocumento VARCHAR(30) NOT NULL,
PrimerNombre VARCHAR(100) NOT NULL,
SegundoNombre VARCHAR(50),
PrimerApellido VARCHAR(50) NOT NULL,
SegundoApellido VARCHAR(50),
FechaNacimiento DATE NOT NULL,
IdEmpleado VARCHAR(25) NOT NULL,
FOREIGN KEY(IdEmpleado) REFERENCES Empleado(IdEmpleado) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE EmpleadoPersonal(
IdEmpleadoPersonal VARCHAR(25) PRIMARY KEY NOT NULL,
Telefono BIGINT UNIQUE NOT NULL,
Correo VARCHAR(50) UNIQUE NOT NULL,
FechaNacimiento DATE NOT NULL,
Nacionalidad VARCHAR(50) NOT NULL,
Genero VARCHAR(50) NOT NULL,
CHECK(Genero in ('MASCULINO','FEMENINO')),
EstadoCivil VARCHAR(50),
ContactoEmergencia VARCHAR(100),
TelefonoContactoEmergencia BIGINT,
IdEmpleado VARCHAR(25) NOT NULL,
FOREIGN KEY(IdEmpleado) REFERENCES Empleado(IdEmpleado) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE EmpleadoHistoriaLaboral(
IdEmpleadoLaboral VARCHAR(25) PRIMARY KEY NOT NULL,
NombreEmpresa VARCHAR(100) NOT NULL,
Cargo VARCHAR(50) NOT NULL,
FechaInicio DATE NOT NULL,
FechaFin DATE NOT NULL,
Funciones VARCHAR(250),
IdEmpleado VARCHAR(25) NOT NULL,
FOREIGN KEY(IdEmpleado) REFERENCES Empleado(IdEmpleado) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE EmpleadoNomina(
IdEmpleadoNomina VARCHAR(25) PRIMARY KEY NOT NULL,
Salario DECIMAL NOT NULL,
ValorHoraExtraDiurna DECIMAL NOT NULL,
TipoContrato VARCHAR(50) NOT NULL,
FechaContratacion DATE NOT NULL,
Pensiones VARCHAR(50),
Cesantias VARCHAR(50),
Eps VARCHAR(50),
NumCuentaBancanria BIGINT NOT NULL,
TipoCuenta VARCHAR(50) NOT NULL,
CHECK(TipoCuenta in ('AHORRO','CORRIENTE')),
EntidadBancaria VARCHAR(50) NOT NULL,
IdEmpleado VARCHAR(25) NOT NULL,
FOREIGN KEY(IdEmpleado) REFERENCES Empleado(IdEmpleado) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE DocumentoNomina(
IdDocumento VARCHAR(25) PRIMARY KEY NOT NULL,
CertificadoPensiones VARCHAR(200),
CertificadoCesantias VARCHAR(200),
CertificadoEps VARCHAR(200),
Contrato VARCHAR(200),
CertificadoCuentaBancaria VARCHAR(200),
IdEmpleadoNomina VARCHAR(25) NOT NULL,
FOREIGN KEY(IdEmpleadoNomina) REFERENCES EmpleadoNomina(IdEmpleadoNomina) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE Nomina(
IdNomina VARCHAR(25) PRIMARY KEY NOT NULL,
FechaPago DATE NOT NULL,
SalarioBruto DECIMAL NOT NULL,
TotalDeducciones DECIMAL,
TotalAdiciones DECIMAL,
SalarioNeto DECIMAL NOT NULL,
EstadoPago VARCHAR(25) NOT NULL,
Colilla VARCHAR(200),
IdEmpleadoNomina VARCHAR(25) NOT NULL,
FOREIGN KEY(IdEmpleadoNomina) REFERENCES EmpleadoNomina(IdEmpleadoNomina) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE Deduccion(
IdDeduccion VARCHAR(25) PRIMARY KEY NOT NULL,
TipoDeduccion VARCHAR(50) NOT NULL,
Monto DECIMAL NOT NULL,
FechaAplicacion TIMESTAMP NOT NULL,
IdNomina VARCHAR(25) NOT NULL,
FOREIGN KEY(IdNomina) REFERENCES Nomina(IdNomina) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE Bonificacion(
IdBonificacion VARCHAR(25) PRIMARY KEY NOT NULL,
TipoBonificacion VARCHAR(50) NOT NULL,
Monto DECIMAL NOT NULL,
FechaAplicacion TIMESTAMP NOT NULL,
IdNomina VARCHAR(25) NOT NULL,
FOREIGN KEY(IdNomina) REFERENCES Nomina(IdNomina) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE HorasExtra(
IdHoraExtra VARCHAR(25) PRIMARY KEY NOT NULL,
Fecha DATE NOT NULL,
CantidadHoras INT NOT NULL,
ValorHora INT NOT NULL,
TotalPago DECIMAL NOT NULL,
IdBonificacion VARCHAR(25) NOT NULL,
FOREIGN KEY(IdBonificacion) REFERENCES Bonificacion(IdBonificacion) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE ClienteProveedor(
IdCliente VARCHAR(25) PRIMARY KEY NOT NULL,
NombreEmpresa VARCHAR(100) NOT NULL,
Nit BIGINT UNIQUE NOT NULL,
AccionesEmpresa BIGINT NOT NULL,
IdDireccion VARCHAR(25),
FOREIGN KEY(IdDireccion) REFERENCES Direccion(IdDireccion)
)
GO

CREATE TABLE Asamblea(
IdAsamblea VARCHAR(25) PRIMARY KEY NOT NULL,
Nombre VARCHAR(100) NOT NULL,
Fecha DATE NOT NULL,
HoraInicio TIME NOT NULL,
HoraFin TIME,
Lugar VARCHAR(50) NOT NULL,
AccionesTotal BIGINT NOT NULL,
AccionesMaximoParticipante BIGINT NOT NULL,
Tipo VARCHAR(50) NOT NULL,
CHECK(Tipo in ('PRESENCIAL','VIRTUAL')),
IdCliente VARCHAR(25) NOT NULL,
FOREIGN KEY(IdCliente) REFERENCES ClienteProveedor(IdCliente) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE Opciones(
IdOpciones VARCHAR(25) PRIMARY KEY NOT NULL,
Opcion1 VARCHAR(100) NOT NULL,
Opcion2 VARCHAR(100) NOT NULL,
Opcion3 VARCHAR(100),
Opcion4 VARCHAR(100),
Opcion5 VARCHAR(100),
Opcion6 VARCHAR(100),
Opcion7 VARCHAR(100),
Opcion8 VARCHAR(100),
Opcion9 VARCHAR(100),
Opcion10 VARCHAR(100)
)
GO

CREATE TABLE Mocion(
IdMocion VARCHAR(25) PRIMARY KEY NOT NULL,
Pregunta VARCHAR(250) NOT NULL,
Descripcion VARCHAR(250),
TipoMocion VARCHAR(50) NOT NULL,
HoraInicio DATETIME NOT NULL,
HoraFin DATETIME NOT NULL,
IdOpciones VARCHAR(25) NOT NULL,
IdAsamblea VARCHAR(25) NOT NULL,
FOREIGN KEY(IdOpciones) REFERENCES Opciones(IdOpciones),
FOREIGN KEY(IdAsamblea) REFERENCES Asamblea(IdAsamblea) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE ResultadosMocion(
IdResultadoMocion VARCHAR(25) PRIMARY KEY NOT NULL,
Estado VARCHAR(50) NOT NULL,
CantidadVotosTotal INT NOT NULL,
RequiereSecundar BIT DEFAULT(0) NOT NULL,
IdMocion VARCHAR(25) NOT NULL,
FOREIGN KEY(IdMocion) REFERENCES Mocion(IdMocion) ON DELETE CASCADE ON UPDATE CASCADE
)
GO

CREATE TABLE ParticipanteAsamblea(
IdParticipante VARCHAR(25) PRIMARY KEY NOT NULL,
AccionesRepresentadas BIGINT,
IdUsuario VARCHAR(25) NOT NULL,
IdAsamblea VARCHAR(25) NOT NULL,
IdRol VARCHAR(25) NOT NULL,
FOREIGN KEY(IdUsuario) REFERENCES Usuario(IdUsuario) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(IdAsamblea) REFERENCES Asamblea(IdAsamblea) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(IdRol) REFERENCES RolAsamblea(IdRol)
)
GO

CREATE TABLE VotacionMocion(
IdVotacionMocion VARCHAR(25) PRIMARY KEY NOT NULL,
OpcionVoto VARCHAR(100) NOT NULL,
FechaHoraVoto TIMESTAMP NOT NULL,
IdParticipante VARCHAR(25) NOT NULL,
IdMocion VARCHAR(25) NOT NULL,
FOREIGN KEY(IdParticipante) REFERENCES ParticipanteAsamblea(IdParticipante),
FOREIGN KEY(IdMocion) REFERENCES Mocion(IdMocion) ON DELETE CASCADE ON UPDATE CASCADE
)
GO


--- Insertar Datos De la Empresa ---

INSERT INTO Direccion (IdDireccion, DireccionUno, DireccionDos, Complemento, CodigoPostal, Barrio, Ciudad, Pais)  
VALUES ('DIR174164657596532', 'Carrea 52 #100C - 08', null, 'Oficina 322', '050003', 'Santa Cruz', 'Medellín', 'Colombia'); 
GO

INSERT INTO Empresa (IdEmpresa, Nombre, Nit, FechaCreacion, IdDireccion)  
VALUES ('COM001', 'Asamblea CS S.A.S.', 9001234567, '2020-05-15', 'DIR174164657596532');
GO

INSERT INTO DatosEmpresa (IdDatos, Telefono, Correo, SitioWeb, RepLegal, Logo, IdEmpresa)  
VALUES ('DAT001', 3128765555, 'contacto@asambleacs.com', 'https://www.asambleacs.com', 'Berta Ligia Pérez', null, 'COM001');
GO

INSERT INTO RolAsamblea (IdRol, Rol, Crear, Modificar, Eliminar, Votar, Descargar)  
VALUES ('ROL001', 'ADMIN', 1, 1, 1, 1, 1), ('ROL002', 'INVITADO', 0, 0, 0, 0, 1), ('ROL003', 'ACCIONISTA', 0, 0, 0, 1, 1), ('ROL004', 'MODERADOR', 0, 0, 0, 0, 1);  
GO

--------------------------------------

--- Insertar Datos de Asambleas

INSERT INTO Direccion (IdDireccion, DireccionUno, DireccionDos, Complemento, CodigoPostal, Barrio, Ciudad, Pais) VALUES
('DIR1741647098219104', 'Diagonal 12#15-37', NULL, NULL, '158325', 'Edmundo Lopez', 'Montería', 'Colombia'),
('DIR1741647098219106', 'Calle 55 14-31 Casa 2 Vallejuelo', NULL, NULL, '867725', 'La Castellana', 'Montería', 'Colombia'),
('DIR1741647098219108', 'Calle 1', NULL, NULL, '390193', 'Puerto Unión', 'Puerto Libertador', 'Colombia'),
('DIR1741647098219114', 'Diagonal 8 Transversal 3 Sur', NULL, NULL, '169217', 'Policarpa', 'Montería', 'Colombia'),
('DIR1741647098219115', 'Cr  009   026  020 00000 Montería - Cord', 'Apto 301', 'Cerca al parque', '110111', 'Moñitos', 'Montería', 'Colombia'),
('DIR1741647098219116', 'Mateo Gómez Cerete', NULL, NULL, '491267', 'Pekin', 'Cereté', 'Colombia');
GO

INSERT INTO ClienteProveedor (IdCliente, NombreEmpresa, Nit, AccionesEmpresa, IdDireccion) VALUES
('CLI174164890987667', 'Solvo', 901180401, 10000000, 'DIR1741647098219104'),
('CLI1741648909876221', 'Une epm telecomunicaciones', 900092385, 10030068, 'DIR1741647098219106'),
('CLI174164890987625', 'Nubank', 901284129, 3707000000, 'DIR1741647098219108'),
('CLI1741648909876901', 'Ecopetrol', 899999068, 404725125, 'DIR1741647098219114'),
('CLI1741648909876100', 'Avianca', 890100577, 660800000, 'DIR1741647098219115'),
('CLI1741648909876534', 'Exito', 890900608, 61421000, 'DIR1741647098219116');
GO

INSERT INTO Asamblea (IdAsamblea, Nombre, Fecha, HoraInicio, HoraFin, Lugar, AccionesTotal, AccionesMaximoParticipante, Tipo, IdCliente) VALUES
('ASA1741657938646124', 'Asamblea General de Accionistas', '2025-04-15', '09:00:00', '12:00:00', 'Auditorio Central', 10000000, 1800, 'PRESENCIAL', 'CLI174164890987667'),
('ASA1741657938646361', 'Asamblea Corporativa Anual', '2025-05-20', '10:30:00', '13:30:00', 'Sala de Conferencias A', 10030068, 1850, 'PRESENCIAL', 'CLI1741648909876221'),
('ASA1741657938646678', 'Asamblea Estratégica Empresarial', '2025-06-10', '14:00:00', '16:30:00', 'Salón Empresarial B', 3707000000, 650000, 'PRESENCIAL', 'CLI174164890987625'),
('ASA1741657938646932', 'Asamblea de Inversores y Directivos', '2025-07-05', '08:45:00', '11:15:00', 'GoogleMeet', 404725125, 70000, 'VIRTUAL', 'CLI1741648909876901'),
('ASA1741657938646297', 'Asamblea Ordinaria de Socios', '2025-08-12', '15:00:00', '17:30:00', 'GoogleMeet', 660800000, 130000, 'VIRTUAL', 'CLI1741648909876100'),
('ASA1741657938646154', 'Asamblea Extraordinaria de Decisiones', '2025-09-30', '16:45:00', '19:00:00', 'GoogleMeet', 61421000, 15000, 'VIRTUAL', 'CLI1741648909876534');
GO

-------------------------------