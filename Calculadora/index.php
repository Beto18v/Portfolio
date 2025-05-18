<?php
require 'operaciones.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculadora</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    .seccion-operacion {
      display: none;
    }

    .seccion-activa {
      display: block;
    }
  </style>
</head>

<body class="container text-center justify-center bg-black p-4">
  <!-- Menú -->
  <div class="p-4">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
      Menú
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="?operacion=suma">Suma</a></li>
      <li><a class="dropdown-item" href="?operacion=resta">Resta</a></li>
      <li><a class="dropdown-item" href="?operacion=multiplicacion">Multiplicación</a></li>
      <li><a class="dropdown-item" href="?operacion=division">División</a></li>
      <li><a class="dropdown-item" href="?operacion=potencia_cuadrada">Potencia al cuadrado</a></li>
      <li><a class="dropdown-item" href="?operacion=potencia_cubica">Potencia al cubo</a></li>
      <li><a class="dropdown-item" href="?operacion=edad">Edad</a></li>
      <li><a class="dropdown-item" href="?operacion=area_triangulo">Área Triángulo</a></li>
      <li><a class="dropdown-item" href="?operacion=volumen_cubo">Volumen Cubo</a></li>
    </ul>
  </div>

  <!-- Mostrar resultados/errores -->
  <?php if (isset($resultado)): ?>
    <div class="alert alert-info mb-3 px-4"><?= $resultado ?></div>
  <?php elseif (isset($error)): ?>
    <div class="alert alert-danger mb-3 px-4"><?= $error ?></div>
  <?php endif; ?>

  <!-- Contenedor de operaciones -->
  <div class="container-fluid">
    <!-- Suma -->
    <section id="suma" class="seccion-operacion bg-success p-4 rounded mx-4 <?= $operacion_activa === 'suma' ? 'seccion-activa' : '' ?>">
      <form method="post" class="text-center">
        <input type="hidden" name="operacion" value="suma">
        <h2 class="text-light">Suma</h2>
        <div class="mb-3 px-4">
          <input type="number" name="x" class="form-control" placeholder="Ingrese el primer número..." required>
        </div>
        <div class="mb-3 px-4">
          <input type="number" name="y" class="form-control" placeholder="Ingrese el segundo número..." required>
        </div>
        <button type="submit" class="btn btn-light">Calcular</button>
      </form>
    </section>

    <!-- Resta -->
    <section id="resta" class="seccion-operacion bg-info p-4 rounded mx-4 <?= $operacion_activa === 'resta' ? 'seccion-activa' : '' ?>">
      <form method="post" class="text-center">
        <input type="hidden" name="operacion" value="resta">
        <h2 class="text-light">Resta</h2>
        <div class="mb-3 px-4">
          <input type="number" name="x" class="form-control" placeholder="Ingrese el primer numero..." required>
        </div>
        <div class="mb-3 px-4">
          <input type="number" name="y" class="form-control" placeholder="Ingrese el segundo numero..." required>
        </div>
        <button type="submit" class="btn btn-light">Calcular</button>
      </form>
    </section>

    <!-- Multiplicación -->
    <section id="multiplicacion" class="seccion-operacion bg-danger p-4 rounded mx-4 <?= $operacion_activa === 'multiplicacion' ? 'seccion-activa' : '' ?>">
      <form method="post" class="text-center">
        <input type="hidden" name="operacion" value="multiplicacion">
        <h2 class="text-light">Multiplicación</h2>
        <div class="mb-3 px-4">
          <input type="number" name="x" class="form-control" placeholder="Ingrese el primer numero..." required>
        </div>
        <div class="mb-3 px-4">
          <input type="number" name="y" class="form-control" placeholder="Ingrese el segundo numero..." required>
        </div>
        <div class="mb-3 px-4">
          <input type="number" name="z" class="form-control" placeholder="Ingrese el tercer numero..." required>
        </div>
        <button type="submit" class="btn btn-light">Calcular</button>
      </form>
    </section>

    <!-- División -->
    <section id="division" class="seccion-operacion bg-warning p-4 rounded mx-4 <?= $operacion_activa === 'division' ? 'seccion-activa' : '' ?>">
      <form method="post" class="text-center">
        <input type="hidden" name="operacion" value="division">
        <h2 class="text-light">División</h2>
        <div class="mb-3 px-4">
          <input type="number" name="x" class="form-control" placeholder="Ingrese el primer numero..." required>
        </div>
        <div class="mb-3 px-4">
          <input type="number" name="y" class="form-control" placeholder="Ingrese el segundo numero..." required>
        </div>
        <button type="submit" class="btn btn-light">Calcular</button>
      </form>
    </section>

    <!-- Potencia al cuadrado -->
    <section id="potencia_cuadrada" class="seccion-operacion bg-primary p-4 rounded mx-4 <?= $operacion_activa === 'potencia_cuadrada' ? 'seccion-activa' : '' ?>">
      <form method="post" class="text-center">
        <input type="hidden" name="operacion" value="potencia_cuadrada">
        <h2 class="text-light">Potencia al cuadrado</h2>
        <div class="mb-3 px-4">
          <input type="number" name="x" class="form-control" placeholder="Ingrese un numero..." required>
        </div>
        <button type="submit" class="btn btn-light">Calcular</button>
      </form>
    </section>

    <!-- Potencia al cubo -->
    <section id="potencia_cubica" class="seccion-operacion bg-success p-4 rounded mx-4 <?= $operacion_activa === 'potencia_cubica' ? 'seccion-activa' : '' ?>">
      <form method="post" class="text-center">
        <input type="hidden" name="operacion" value="potencia_cubica">
        <h2 class="text-light">Potencia al cubo</h2>
        <div class="mb-3 px-4">
          <input type="number" name="x" class="form-control" placeholder="Ingrese un numero..." required>
        </div>
        <button type="submit" class="btn btn-light">Calcular</button>
      </form>
    </section>

    <!-- Edad -->
    <section id="edad" class="seccion-operacion bg-info p-4 rounded mx-4 <?= $operacion_activa === 'edad' ? 'seccion-activa' : '' ?>">
      <form method="post" class="text-center">
        <input type="hidden" name="operacion" value="edad">
        <h2 class="text-light">Edad</h2>
        <div class="mb-3 px-4">
          <input type="number" name="x" class="form-control" placeholder="Ingrese su año de nacimiento..." required>
        </div>
        <button type="submit" class="btn btn-light">Calcular</button>
      </form>
    </section>

    <!-- Área de un triángulo -->
    <section id="area_triangulo" class="seccion-operacion bg-danger p-4 rounded mx-4 <?= $operacion_activa === 'area_triangulo' ? 'seccion-activa' : '' ?>">
      <form method="post" class="text-center">
        <input type="hidden" name="operacion" value="area_triangulo">
        <h2 class="text-light">Área de un triángulo</h2>
        <div class="mb-3 px-4">
          <input type="number" name="x" class="form-control" placeholder="Ingrese la base del triángulo en cm" required>
        </div>
        <div class="mb-3 px-4">
          <input type="number" name="y" class="form-control" placeholder="Ingrese la altura del triángulo en cm" required>
        </div>
        <button type="submit" class="btn btn-light">Calcular</button>
      </form>
    </section>

    <!-- Volumen de un cubo -->
    <section id="volumen_cubo" class="seccion-operacion bg-warning p-4 rounded mx-4 <?= $operacion_activa === 'volumen_cubo' ? 'seccion-activa' : '' ?>">
      <form method="post" class="text-center">
        <input type="hidden" name="operacion" value="volumen_cubo">
        <h2 class="text-light">Volumen de un cubo</h2>
        <div class="mb-3 px-4">
          <input type="number" name="x" class="form-control" placeholder="Ingrese el lado del cubo en cm" required>
        </div>
        <button type="submit" class="btn btn-light">Calcular</button>
      </form>
    </section>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>