-- Desactivar comprobación de claves foráneas (útil en la carga inicial)
SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE Easy_Adopt_Db;
CREATE DATABASE IF NOT EXISTS Easy_Adopt_Db;
USE Easy_Adopt_Db;

-- TABLAS DE LOOKUP (Tablas de referencia, sin dependencias)
-- Tabla de estados de usuario
CREATE TABLE IF NOT EXISTS user_status_db (
    id_user_status INT PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(20) UNIQUE NOT NULL
);
INSERT INTO user_status_db (status_name) VALUES ('Activo'), ('Inactivo'), ('Suspendido');

-- Tabla de roles
CREATE TABLE IF NOT EXISTS role_db (
    id_role INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) UNIQUE NOT NULL
);
INSERT INTO role_db (role_name) VALUES ('Administrador'), ('Adoptante'), ('Donante'), ('Refugio'), ('Aliado_Comercial');

-- Tabla de tipos de documento
CREATE TABLE IF NOT EXISTS document_type_db (
    id_document_type INT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(50) UNIQUE NOT NULL
);
INSERT INTO document_type_db (type_name) VALUES ('Cédula'), ('Pasaporte'), ('Otro');

-- Tabla de estados de adopción
CREATE TABLE IF NOT EXISTS adoption_status_db (
    id_adoption_status INT PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(20) UNIQUE NOT NULL
);
INSERT INTO adoption_status_db (status_name) VALUES ('Pendiente'), ('Aprobada'), ('Rechazada'), ('Completada');

-- Tabla de tipos de donante
CREATE TABLE IF NOT EXISTS donor_type_db (
    id_donor_type INT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(50) UNIQUE NOT NULL
);
INSERT INTO donor_type_db (type_name) VALUES ('Individual'), ('Empresa'), ('Fundación');

-- Tabla de tipos de donación
CREATE TABLE IF NOT EXISTS donation_type_db (
    id_donation_type INT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(20) UNIQUE NOT NULL
);
INSERT INTO donation_type_db (type_name) VALUES ('Monetaria'), ('En_Especie');

-- Tabla de especies
CREATE TABLE IF NOT EXISTS species_db (
    id_species INT PRIMARY KEY AUTO_INCREMENT,
    species_name VARCHAR(50) UNIQUE NOT NULL
);
INSERT INTO species_db (species_name) VALUES ('Perro'), ('Gato'), ('Otro');

-- Tabla de estados de salud de mascotas
CREATE TABLE IF NOT EXISTS pet_health_status_db (
    id_pet_health_status INT PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(20) UNIQUE NOT NULL
);
INSERT INTO pet_health_status_db (status_name) VALUES ('Saludable'), ('En_Tratamiento'), ('Necesita_Atención');

-- Tabla de tipos de empresa
CREATE TABLE IF NOT EXISTS company_type_db (
    id_company_type INT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(50) UNIQUE NOT NULL
);
INSERT INTO company_type_db (type_name) VALUES ('Veterinaria'), ('Tienda_de_Mascotas'), ('Otro');

-- Tabla de categorías de producto
CREATE TABLE IF NOT EXISTS product_category_db (
    id_product_category INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) UNIQUE NOT NULL
);
INSERT INTO product_category_db (category_name) VALUES ('Alimentos'), ('Accesorios'), ('Médico'), ('Juguetes'), ('Otro');

-- Tabla de estados de producto
CREATE TABLE IF NOT EXISTS product_status_db (
    id_product_status INT PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(20) UNIQUE NOT NULL
);
INSERT INTO product_status_db (status_name) VALUES ('Activo'), ('Agotado');

-- =====================================================
-- TABLAS PRINCIPALES
-- =====================================================

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS user_db (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    id_user_status INT NOT NULL DEFAULT 1,
    FOREIGN KEY (id_user_status) REFERENCES user_status_db(id_user_status)
);

-- Tabla de contactos de usuario
CREATE TABLE IF NOT EXISTS user_contact_db (
    id_contact INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    phone VARCHAR(15),
    address VARCHAR(255),
    FOREIGN KEY (id_user) REFERENCES user_db(id_user)
);

-- Tabla de relación entre usuarios y roles
CREATE TABLE IF NOT EXISTS user_role_db (
    id_user INT NOT NULL,
    id_role INT NOT NULL,
    PRIMARY KEY (id_user, id_role),
    FOREIGN KEY (id_user) REFERENCES user_db(id_user),
    FOREIGN KEY (id_role) REFERENCES role_db(id_role)
);

-- Tabla de administradores
CREATE TABLE IF NOT EXISTS administrator_db (
    id_administrator INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL UNIQUE,
    access_level VARCHAR(50) NOT NULL,  -- Ej.: Super_Admin, Regular_Admin, Soporte
    department VARCHAR(100),
    FOREIGN KEY (id_user) REFERENCES user_db(id_user)
);

-- Tabla de adoptantes
CREATE TABLE IF NOT EXISTS adopter_db (
    id_adopter INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL UNIQUE,
    id_document_type INT NOT NULL,
    document_number VARCHAR(20) NOT NULL,
    birth_date DATE,
    occupation VARCHAR(100),
    monthly_income DECIMAL(10,2) UNSIGNED,
    validated BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_user) REFERENCES user_db(id_user),
    FOREIGN KEY (id_document_type) REFERENCES document_type_db(id_document_type)
);

-- Tabla de ubicaciones
CREATE TABLE IF NOT EXISTS location_db (
    id_location INT PRIMARY KEY AUTO_INCREMENT,
    geographic_location VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100)
);

-- Tabla de refugios
CREATE TABLE IF NOT EXISTS shelter_db (
    id_shelter INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL UNIQUE,
    pet_capacity SMALLINT UNSIGNED NOT NULL,
    id_location INT,
    operation_license VARCHAR(50),
    foundation_date DATE,
    FOREIGN KEY (id_user) REFERENCES user_db(id_user),
    FOREIGN KEY (id_location) REFERENCES location_db(id_location)
);

-- Tabla de razas (se vincula a especies)
CREATE TABLE IF NOT EXISTS breed_db (
    id_breed INT PRIMARY KEY AUTO_INCREMENT,
    id_species INT NOT NULL,
    breed_name VARCHAR(100) NOT NULL,
    UNIQUE (id_species, breed_name),
    FOREIGN KEY (id_species) REFERENCES species_db(id_species)
);

-- Tabla de mascotas
CREATE TABLE IF NOT EXISTS pet_db (
    id_pet INT PRIMARY KEY AUTO_INCREMENT,
    id_shelter INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    id_species INT NOT NULL,
    id_breed INT,
    birthdate SMALLINT UNSIGNED,
    gender ENUM('Male','Female') NOT NULL,
    entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    vaccines_complete BOOLEAN DEFAULT FALSE,
    sterilized BOOLEAN DEFAULT FALSE,
    adopted BOOLEAN DEFAULT FALSE,
    id_pet_health_status INT NOT NULL DEFAULT 1,
    FOREIGN KEY (id_shelter) REFERENCES shelter_db(id_shelter),
    FOREIGN KEY (id_species) REFERENCES species_db(id_species),
    FOREIGN KEY (id_breed) REFERENCES breed_db(id_breed),
    FOREIGN KEY (id_pet_health_status) REFERENCES pet_health_status_db(id_pet_health_status)
);

-- Tabla de adopciones
CREATE TABLE IF NOT EXISTS adoption_db (
    id_adoption INT PRIMARY KEY AUTO_INCREMENT,
    id_pet INT NOT NULL,
    id_adopter INT NOT NULL,
    adoption_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_adoption_status INT NOT NULL DEFAULT 1,
    FOREIGN KEY (id_pet) REFERENCES pet_db(id_pet),
    FOREIGN KEY (id_adopter) REFERENCES adopter_db(id_adopter),
    FOREIGN KEY (id_adoption_status) REFERENCES adoption_status_db(id_adoption_status)
);

-- Tabla de seguimiento de adopciones
CREATE TABLE IF NOT EXISTS adoption_followup_db (
    id_followup INT PRIMARY KEY AUTO_INCREMENT,
    id_adoption INT NOT NULL,
    report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    follow_up_report TEXT,
    FOREIGN KEY (id_adoption) REFERENCES adoption_db(id_adoption)
);

-- Tabla de auditoría de adopciones
CREATE TABLE IF NOT EXISTS adoption_audit_db (
    audit_id INT PRIMARY KEY AUTO_INCREMENT,
    id_adoption INT NOT NULL,
    operation VARCHAR(10) NOT NULL,  -- INSERT, UPDATE, DELETE
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    audit_details TEXT,
    FOREIGN KEY (id_adoption) REFERENCES adoption_db(id_adoption) ON DELETE CASCADE
);

-- Tabla de donantes
CREATE TABLE IF NOT EXISTS donor_db (
    id_donor INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL UNIQUE,
    id_donor_type INT NOT NULL,
    tax_identification VARCHAR(20),
    FOREIGN KEY (id_user) REFERENCES user_db(id_user),
    FOREIGN KEY (id_donor_type) REFERENCES donor_type_db(id_donor_type)
);

-- Tabla de donaciones
CREATE TABLE IF NOT EXISTS donation_db (
    id_donation INT PRIMARY KEY AUTO_INCREMENT,
    id_donor INT NOT NULL,
    amount DECIMAL(10,2) UNSIGNED NOT NULL,
    id_donation_type INT NOT NULL,
    donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    donation_description TEXT,
    FOREIGN KEY (id_donor) REFERENCES donor_db(id_donor),
    FOREIGN KEY (id_donation_type) REFERENCES donation_type_db(id_donation_type),
    CONSTRAINT chk_donation_amount CHECK (amount > 0)
);

-- Tabla de detalle de donaciones
CREATE TABLE IF NOT EXISTS donation_detail_db (
    id_detail INT PRIMARY KEY AUTO_INCREMENT,
    id_donation INT NOT NULL,
    detail_description TEXT,
    amount DECIMAL(10,2) UNSIGNED,
    FOREIGN KEY (id_donation) REFERENCES donation_db(id_donation)
);

-- Tabla de auditoría de donaciones
CREATE TABLE IF NOT EXISTS donation_audit_db (
    audit_id INT PRIMARY KEY AUTO_INCREMENT,
    id_donation INT NOT NULL,
    operation VARCHAR(10) NOT NULL,  -- INSERT, UPDATE, DELETE
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    audit_details TEXT,
    FOREIGN KEY (id_donation) REFERENCES donation_db(id_donation) ON DELETE CASCADE
);

-- Tabla de aliados comerciales
CREATE TABLE IF NOT EXISTS commercial_ally_db (
    id_commercial_ally INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL UNIQUE,
    business_name VARCHAR(200) NOT NULL,
    id_company_type INT NOT NULL,
    website VARCHAR(100),
    agreement_date DATE,
    FOREIGN KEY (id_user) REFERENCES user_db(id_user),
    FOREIGN KEY (id_company_type) REFERENCES company_type_db(id_company_type)
);

-- Tabla de configuración del marketplace
CREATE TABLE IF NOT EXISTS marketplace_config_db (
    id_config INT PRIMARY KEY AUTO_INCREMENT,
    id_commercial_ally INT NOT NULL UNIQUE,
    commission_rate DECIMAL(5,2) UNSIGNED,
    rules TEXT,
    FOREIGN KEY (id_commercial_ally) REFERENCES commercial_ally_db(id_commercial_ally)
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS product_db (
    id_product INT PRIMARY KEY AUTO_INCREMENT,
    id_commercial_ally INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    id_product_category INT NOT NULL,
    price DECIMAL(10,2) UNSIGNED NOT NULL,
    stock SMALLINT UNSIGNED DEFAULT 0,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_product_status INT NOT NULL DEFAULT 1,
    FOREIGN KEY (id_commercial_ally) REFERENCES commercial_ally_db(id_commercial_ally),
    FOREIGN KEY (id_product_category) REFERENCES product_category_db(id_product_category),
    FOREIGN KEY (id_product_status) REFERENCES product_status_db(id_product_status),
    CONSTRAINT chk_product_price CHECK (price > 0)
);

-- NUEVO MÓDULO: PRODUCT Q&A
-- Tabla de preguntas sobre productos
CREATE TABLE IF NOT EXISTS product_question_db (
    id_question INT PRIMARY KEY AUTO_INCREMENT,
    id_product INT NOT NULL,
    id_user INT NOT NULL,
    question_text TEXT NOT NULL,
    question_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_product) REFERENCES product_db(id_product) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES user_db(id_user) ON DELETE CASCADE
);

-- Tabla de respuestas a las preguntas
CREATE TABLE IF NOT EXISTS product_answer_db (
    id_answer INT PRIMARY KEY AUTO_INCREMENT,
    id_question INT NOT NULL,
    id_user INT NOT NULL,
    answer_text TEXT NOT NULL,
    answer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_question) REFERENCES product_question_db(id_question) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES user_db(id_user) ON DELETE CASCADE
);

-- NUEVO MÓDULO: SALES
-- Tabla de ventas (cabecera)
CREATE TABLE IF NOT EXISTS sale_db (
    id_sale INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,  -- comprador
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) UNSIGNED NOT NULL,
    sale_status VARCHAR(20) DEFAULT 'Completed',
    FOREIGN KEY (id_user) REFERENCES user_db(id_user)
);

-- Tabla de detalle de ventas
CREATE TABLE IF NOT EXISTS sale_detail_db (
    id_sale_detail INT PRIMARY KEY AUTO_INCREMENT,
    id_sale INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    unit_price DECIMAL(10,2) UNSIGNED NOT NULL,
    total_price DECIMAL(10,2) UNSIGNED AS (quantity * unit_price) STORED,
    FOREIGN KEY (id_sale) REFERENCES sale_db(id_sale) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES product_db(id_product)
);

-- ÍNDICES ADICIONALES PARA MEJORAR CONSULTAS
CREATE UNIQUE INDEX idx_user_email ON user_db(email);
CREATE INDEX idx_adoption_date ON adoption_db(adoption_date);
CREATE INDEX idx_donation_date ON donation_db(donation_date);
CREATE INDEX idx_adoption_adopter_status ON adoption_db(id_adopter, id_adoption_status);

-- Reactivar comprobación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;
