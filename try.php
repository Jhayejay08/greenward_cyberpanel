<?php
// PHP variable
$phpVariable = "Hello from PHP!";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP to JavaScript Example</title>
</head>
<body>

<!-- Your HTML content -->

<script>
    // JavaScript code
    // Accessing the PHP variable in JavaScript
    var jsVariable = "<?php echo $phpVariable; ?>";

    // Now you can use jsVariable in your JavaScript code
    console.log(jsVariable);
</script>

</body>
</html>
