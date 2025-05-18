<?php
// Operación activa por defecto
$operacion_activa = $_GET['operacion'] ?? ' ';

// Procesar formulario
if ($_POST['operacion'] ?? false) {
    $operacion = $_POST['operacion'];
    [$resultado, $error] = ['', ''];
    
    switch($operacion) {
        case 'suma':
            $x = $_POST['x'] ?? 0;
            $y = $_POST['y'] ?? 0;
            $resultado = "Suma: $x + $y = ". ($x + $y);
            break;
            
        case 'resta':
            $x = $_POST['x'] ?? 0;
            $y = $_POST['y'] ?? 0;
            $resultado = "Resta: $x - $y = ". ($x - $y);
            break;
            
        case 'multiplicacion':
            $x = $_POST['x'] ?? 0;
            $y = $_POST['y'] ?? 0;
            $z = $_POST['z'] ?? 0;
            $resultado = "Multiplicación: $x x $y x $z = ". ($x * $y * $z);
            break;
            
        case 'division':
            $x = $_POST['x'] ?? 0;
            $y = $_POST['y'] ?? 0;
            if($y == 0) {
                $error = "No se puede dividir por cero";
            } else {
                $resultado = "División: $x ÷ $y = ". ($x / $y);
            }
            break;
            
        case 'potencia_cuadrada':
            $x = $_POST['x']?? 0;
            $resultado = "Potencia al cuadrado: $x ² = ". ($x * $x);
            break;

        case 'potencia_cubica':
            $x = $_POST['x']?? 0;
            $resultado = "Potencia al cubo: $x ³ = ". ($x * $x * $x);
            break;

        case 'edad';
            $ano_nacimiento = $_POST['x']?? 0;
            $ano_actual = date('Y');
            if($ano_nacimiento <= $ano_actual) {
                $edad = $ano_actual - $ano_nacimiento;
                $resultado = "Su edad aproximada es de $edad años";
            }
            else {
                $error = "El año de nacimiento no puede ser mayor al año actual";
            }
            break;

        case 'area_triangulo':
            $base = $_POST['x']?? 0;
            $altura = $_POST['y']?? 0;
            $resultado = "El área del triángulo es de ". ($base * $altura / 2). 'cm²';
            break;
            
        case 'volumen_cubo':
            $lado = $_POST['x']?? 0;
            $resultado = "El volumen del cubo es de ". ($lado * $lado * $lado). 'cm³';
            break;

        default:
            $error = "Operación no válida";
    }
    
    // Redirigir para mostrar el resultado
    $params = [
        'operacion' => $operacion,
        $error ? 'error' : 'resultado' => $error ?: $resultado
    ];
    header('Location: ?' . http_build_query($params));
    exit;
}

// Mostrar resultado si viene por GET
if(isset($_GET['resultado'])) {
    $resultado = $_GET['resultado'];
}
if(isset($_GET['error'])) {
    $error = $_GET['error'];
}
?>