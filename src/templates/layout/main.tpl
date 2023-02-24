<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>{{ title | title }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- build:css styles/vendor.min.css -->
    <link rel="stylesheet" href="libs/hamburgers.min.css">
    <link rel="stylesheet" href="libs/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="libs/datepicker.min.css">
    <link rel="stylesheet" href="libs/daterangepicker.min.css">
    <link rel="stylesheet" href="libs/select2.min.css">
    <link rel="stylesheet" href="libs/aos.css">
    <link rel="stylesheet" href="libs/quill.snow.css">
    <link rel="stylesheet" href="libs/swiper-bundle.min.css">
    <!-- endbuild -->

    <link rel="shortcut icon" type="image/x-icon" href="ico/logo.svg" />

    <!-- build:css styles/main.css -->
    <link rel="stylesheet" href="styles/main.css">
    <!-- endbuild -->

</head>

<body>
    <div class="site-wrapper">
        {% block content %} {% endblock %}
    </div>


    <!-- build:js scripts/jquery.min.js -->
    <script src="libs/jquery.min.js"></script>
    <!-- endbuild -->

    <!-- build:js scripts/bootstrap.min.js -->
    <script src="libs/bootstrap/bootstrap.min.js"></script>
    <!-- endbuild -->

    <!-- build:js scripts/vendor.min.js -->
    <script src="libs/popper.min.js"></script>
    <script src="libs/jquery-inputmask/jquery.inputmask.bundle.min.js"></script>
    <script src="libs/jquery.inputmask.min.js"></script>
    <script src="libs/datepicker.min.js"></script>
    <script src="libs/select2.full.min.js"></script>
    <script src="libs/daterangepicker.min.js"></script>
    <script src="libs/chart.js"></script>
    <script src="libs/aos.js"></script>
    <script src="libs/quill.min.js"></script>
    <script src="libs/swiper-bundle.min.js"></script>
    <!-- endbuild -->

    <!-- build:js scripts/main.js -->

    <script src="scripts/main.js"></script>

    <!-- endbuild -->
</body>

</html>