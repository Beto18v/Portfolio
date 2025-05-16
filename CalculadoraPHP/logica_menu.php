<?php
// Verificar qué sección mostrar
$seccion_activa = isset($_GET['seccion']) ? $_GET['seccion'] : 'suma';

// Función para determinar si una sección está activa
function seccion_es_activa($seccion) {
    global $seccion_activa;
    return $seccion_activa === $seccion ? 'seccion-activa' : '';
}
?>