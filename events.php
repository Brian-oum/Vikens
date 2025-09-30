<?php
$conn = new mysqli("localhost", "root", "", "event_service");
$today = date("Y-m-d");

// Fetch upcoming events
$upcoming = $conn->query("SELECT * FROM events WHERE event_date >= '$today' ORDER BY event_date ASC");

// Fetch past events
$past = $conn->query("SELECT * FROM events WHERE event_date < '$today' ORDER BY event_date DESC");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Events & Training</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --primary: #3a86ff;
      --primary-dark: #2563eb;
      --secondary: #ff006e;
      --light: #f8f9fa;
      --dark: #212529;
      --gray: #6c757d;
      --light-gray: #e9ecef;
      --success: #198754;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: var(--dark);
      background-color: #fafbfc;
      line-height: 1.6;
    }
    
    .hero {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      color: white;
      padding: 80px 20px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
      opacity: 0.5;
    }
    
    .hero h1 {
      font-weight: 800;
      font-size: 3rem;
      margin-bottom: 1rem;
      position: relative;
    }
    
    .hero p {
      font-size: 1.2rem;
      max-width: 700px;
      margin: 0 auto;
      position: relative;
    }
    
    .tabs {
      margin: 40px 0;
      text-align: center;
    }
    
    .nav-tabs {
      border: none;
      display: inline-flex;
      background: var(--light);
      border-radius: 50px;
      padding: 5px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    
    .nav-tabs .nav-link {
      border: none;
      padding: 12px 30px;
      border-radius: 50px;
      font-weight: 600;
      color: var(--gray);
      transition: all 0.3s ease;
    }
    
    .nav-tabs .nav-link:hover {
      color: var(--primary);
      background: transparent;
    }
    
    .nav-tabs .nav-link.active {
      background: var(--primary);
      color: white;
      box-shadow: 0 4px 10px rgba(58, 134, 255, 0.3);
    }
    
    .section-title {
      position: relative;
      padding-bottom: 15px;
      margin-bottom: 30px;
      font-weight: 700;
    }
    
    .section-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 4px;
      background: var(--primary);
      border-radius: 2px;
    }
    
    .event-card {
      border: none;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(0,0,0,0.07);
      height: 100%;
      background: white;
    }
    
    .event-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 25px rgba(0,0,0,0.1);
    }
    
    .event-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .event-card:hover .event-img {
      transform: scale(1.05);
    }
    
    .event-body {
      padding: 25px;
    }
    
    .event-title {
      font-weight: 700;
      margin-bottom: 15px;
      color: var(--dark);
      font-size: 1.25rem;
    }
    
    .event-detail {
      color: var(--gray);
      margin-bottom: 15px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .event-meta {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .meta-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.9rem;
    }
    
    .meta-icon {
      color: var(--primary);
      width: 20px;
    }
    
    .event-footer {
      background: var(--light);
      padding: 15px 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .price {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--primary);
    }
    
    .register-btn {
      background: var(--primary);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      font-weight: 600;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .register-btn:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(58, 134, 255, 0.3);
    }
    
    .register-btn:disabled {
      background: var(--gray);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    .no-events {
      text-align: center;
      padding: 60px 20px;
      color: var(--gray);
    }
    
    .no-events i {
      font-size: 3rem;
      margin-bottom: 20px;
      color: var(--light-gray);
    }
    
    .no-events p {
      font-size: 1.1rem;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .hero {
        padding: 60px 20px;
      }
      
      .hero h1 {
        font-size: 2.2rem;
      }
      
      .nav-tabs {
        flex-direction: column;
        border-radius: 12px;
      }
      
      .nav-tabs .nav-link {
        border-radius: 8px;
      }
      
      .event-footer {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }
    }
  </style>
</head>
<body>

<!-- Hero Section -->
<div class="hero">
  <div class="container">
    <h1>Events & Training</h1>
    <p>Join our hands-on workshops and training sessions to enhance your technical skills and advance your career</p>
  </div>
</div>

<!-- Tabs -->
<div class="tabs">
  <div class="container">
    <ul class="nav nav-tabs" id="eventTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming" type="button" role="tab">
          <i class="fas fa-calendar-alt me-2"></i>Upcoming Events
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="past-tab" data-bs-toggle="tab" data-bs-target="#past" type="button" role="tab">
          <i class="fas fa-history me-2"></i>Past Events
        </button>
      </li>
    </ul>
  </div>
</div>

<!-- Events Content -->
<div class="container mb-5">
  <div class="tab-content" id="eventTabsContent">

    <!-- Upcoming Events -->
    <div class="tab-pane fade show active" id="upcoming" role="tabpanel">
      <h3 class="section-title">Upcoming Events</h3>
      <div class="row g-4">
        <?php if ($upcoming->num_rows > 0) { ?>
          <?php while ($row = $upcoming->fetch_assoc()) { ?>
            <div class="col-md-6 col-lg-4">
              <div class="event-card">
                <img src="images/events/<?php echo $row['image'] ?: 'default.jpg'; ?>" class="event-img" alt="<?php echo $row['name']; ?>">
                <div class="event-body">
                  <h5 class="event-title"><?php echo $row['name']; ?></h5>
                  <p class="event-detail"><?php echo $row['short_detail']; ?></p>
                  <div class="event-meta">
                    <div class="meta-item">
                      <i class="fas fa-calendar meta-icon"></i>
                      <span><?php echo $row['event_date']; ?> (<?php echo $row['event_day']; ?>)</span>
                    </div>
                    <div class="meta-item">
                      <i class="fas fa-clock meta-icon"></i>
                      <span><?php echo $row['event_time']; ?></span>
                    </div>
                    <div class="meta-item">
                      <i class="fas fa-map-marker-alt meta-icon"></i>
                      <span><?php echo $row['location']; ?></span>
                    </div>
                    <div class="meta-item">
                    <i class="fas fa-users meta-icon"></i>
                    <span>
                    <?php echo $row['registered'] . "/" . $row['people_required']; ?> Slots
                    </span>
                    </div>
                  </div>
                </div>
                <div class="event-footer">
                  <span class="price">KSh <?php echo number_format($row['registration_fee']); ?></span>
                  <button class="register-btn" onclick="window.location.href='contact.html'">
                      <i class="fas fa-ticket-alt me-1"></i> Register Now
                  </button>

                </div>
              </div>
            </div>
          <?php } ?>
        <?php } else { ?>
          <div class="no-events">
            <i class="fas fa-calendar-plus"></i>
            <p>No upcoming events at the moment. Check back later!</p>
          </div>
        <?php } ?>
      </div>
    </div>

    <!-- Past Events -->
    <div class="tab-pane fade" id="past" role="tabpanel">
      <h3 class="section-title">Past Events</h3>
      <div class="row g-4">
        <?php if ($past->num_rows > 0) { ?>
          <?php while ($row = $past->fetch_assoc()) { ?>
            <div class="col-md-6 col-lg-4">
              <div class="event-card">
                <img src="images/events/<?php echo $row['image'] ?: 'default.jpg'; ?>" class="event-img" alt="<?php echo $row['name']; ?>">
                <div class="event-body">
                  <h5 class="event-title"><?php echo $row['name']; ?></h5>
                  <p class="event-detail"><?php echo $row['short_detail']; ?></p>
                  <div class="event-meta">
                    <div class="meta-item">
                      <i class="fas fa-calendar meta-icon"></i>
                      <span><?php echo $row['event_date']; ?> (<?php echo $row['event_day']; ?>)</span>
                    </div>
                    <div class="meta-item">
                      <i class="fas fa-clock meta-icon"></i>
                      <span><?php echo $row['event_time']; ?></span>
                    </div>
                    <div class="meta-item">
                      <i class="fas fa-map-marker-alt meta-icon"></i>
                      <span><?php echo $row['location']; ?></span>
                    </div>
                    <div class="meta-item">
                      <i class="fas fa-map-marker-alt meta-icon"></i>
                      <span><?php echo $row['people_required']; ?></span>
                    </div>
                  </div>
                </div>
                <div class="event-footer">
                  <span class="price">KSh <?php echo number_format($row['registration_fee']); ?></span>
                  <button class="register-btn" disabled>
                    <i class="fas fa-lock me-1"></i> Closed
                  </button>
                </div>
              </div>
            </div>
          <?php } ?>
        <?php } else { ?>
          <div class="no-events">
            <i class="fas fa-history"></i>
            <p>No past events to display yet.</p>
          </div>
        <?php } ?>
      </div>
    </div>

  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>