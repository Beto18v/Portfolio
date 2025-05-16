<?php

$ano_nacimiento = $_POST['x'];
$ano_actual = date('Y');
    
    if ($ano_nacimiento <= $ano_actual) {
        $edad = $ano_actual - $ano_nacimiento;
        echo "Su edad aproximada es $edad años";
    } else {
        echo "¡El año de nacimiento no puede ser mayor al actual!";
    }

?>