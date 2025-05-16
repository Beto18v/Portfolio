<?php

if ($_POST["y"] == 0) {
    echo "No se puede dividir por cero";
} else {
    $division = $_POST["x"] / $_POST["y"];
    echo "El resultado de la división es $division";    
}

?>