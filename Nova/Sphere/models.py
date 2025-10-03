# Sphere/models.py
from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    name = models.CharField(max_length=200)
    short_detail = models.TextField()
    event_date = models.DateField()
    event_time = models.TimeField()
    location = models.CharField(max_length=255)
    registered = models.IntegerField(default=0)
    people_required = models.IntegerField()
    registration_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    image = models.ImageField(upload_to="events/", blank=True, null=True)

    def __str__(self):
        return self.name

    @property
    def is_full(self):
        return self.registered >= self.people_required


class EventRegistration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="registrations")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    registered_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("event", "user")  # Prevent duplicate registrations

    def __str__(self):
        return f"{self.user.username} -> {self.event.name}"
