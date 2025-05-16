<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
</head>

<body class="bg-success text-center">
    <button type="button" class="btn btn-secondary">
        <h2>
        <?php

        $suma = $_POST["num1"] + $_POST["num2"];
        echo "El resultado de sumar ", $_POST["num1"], " + ", $_POST["num2"], " es $suma";

        ?>
        </h2>
    </button>
</body>

</html>