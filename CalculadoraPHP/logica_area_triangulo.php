<?php

$base = $_POST['x'];
$altura = $_POST['y'];

if ($base <= 0 || $altura <= 0) {
    echo "La base y altura deben ser mayores a cero.";
} else {
    $area = ($base * $altura) / 2;
    echo "El área del triángulo es de $area cm2";
}

?>