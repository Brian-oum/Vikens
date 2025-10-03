from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import Event, EventRegistration


# Core pages
def homepage(request):
    return render(request, 'Sphere/homepage.html')

def about(request):
    return render(request, 'Sphere/about_us.html')

def contact(request):
    return render(request, 'Sphere/contact.html')

# Solution pages
def IT_support(request):
    return render(request, 'Sphere/IT_support.html')

def software(request):
    return render(request, 'Sphere/software.html')

def hardware(request):
    return render(request, 'Sphere/hardware.html')

def networking(request):
    return render(request, 'Sphere/network.html')

def cybersec(request):
    return render(request, 'Sphere/cybersec.html')

def cloud(request):
    return render(request, 'Sphere/cloud.html')

def events(request):
    events = Event.objects.all().order_by("event_date")
    return render(request, "Sphere/events.html", {"events": events})

def register_event(request, event_id):
    event = get_object_or_404(Event, id=event_id)

    if event.is_full:
        messages.error(request, "Sorry, this event is already full.")
        return redirect("events")

    if EventRegistration.objects.filter(event=event, user=request.user).exists():
        messages.warning(request, "You are already registered for this event.")
        return redirect("events")

    # Register user
    EventRegistration.objects.create(event=event, user=request.user)
    event.registered += 1
    event.save()

    messages.success(request, f"You have successfully registered for {event.name}!")
    return redirect("events")