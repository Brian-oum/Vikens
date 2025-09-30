<?php
// db connection
$conn = new mysqli("localhost", "root", "", "event_service");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $short_detail = $_POST['short_detail'];
    $event_date = $_POST['event_date'];
    $event_day = $_POST['event_day'];
    $event_time = $_POST['event_time'];
    $location = $_POST['location'];
    $registration_fee = $_POST['registration_fee'];
    $people_required = $_POST['people_required'];
    $registered = $_POST['registered'];

    // handle image upload
    $image = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $targetDir = "images/events/";
        $image = time() . "_" . basename($_FILES['image']['name']);
        $targetFile = $targetDir . $image;

        // only allow certain file types
        $allowedTypes = ['jpg','jpeg','png','gif'];
        $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

        if (in_array($fileType, $allowedTypes)) {
            move_uploaded_file($_FILES['image']['tmp_name'], $targetFile);
        } else {
            echo "<p style='color:red;'>Invalid file type. Only JPG, PNG, and GIF allowed.</p>";
            $image = null;
        }
    }

    // insert into db
    $sql = "INSERT INTO events (name, short_detail, image, event_date, event_day, event_time, location, registration_fee, people_required) 
            VALUES ('$name', '$short_detail', '$image', '$event_date', '$event_day', '$event_time', '$location', '$registration_fee', '$people_required')";

    if ($conn->query($sql) === TRUE) {
        echo "<p style='color:green;'>Event created successfully!</p>";
    } else {
        echo "<p style='color:red;'>Error: " . $conn->error . "</p>";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Create Event</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        form { max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; }
        label { display: block; margin: 10px 0 5px; }
        input, textarea, select { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 5px; }
        button { background: #28a745; color: #fff; padding: 10px; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background: #218838; }
    </style>
</head>
<body>

<h2>Create New Event</h2>

<form method="POST" action="" enctype="multipart/form-data">
    <label>Event Name</label>
    <input type="text" name="name" required>

    <label>Short Detail</label>
    <textarea name="short_detail" required></textarea>

    <label>Event Image</label>
    <input type="file" name="image" accept="image/*">

    <label>Date</label>
    <input type="date" name="event_date" required>

    <label>Day</label>
    <input type="text" name="event_day" required>

    <label>Time</label>
    <input type="time" name="event_time" required>

    <label>Location</label>
    <input type="text" name="location" required>

    <label>Registration Fee (KSH)</label>
    <input type="number" name="registration_fee" step="0.01" required>

    <label>Number of People Required</label>
    <input type="number" name="people_required" required>

    <button type="submit">Create Event</button>
</form>

</body>
</html>
