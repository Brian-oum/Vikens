from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import Event, EventRegistration, PaymentVerification
from django.core.mail import send_mail
from django.conf import settings
from .forms import ContactForm, PaymentVerificationForm


# Core pages
def homepage(request):
    return render(request, 'Sphere/homepage.html')

def about(request):
    return render(request, 'Sphere/about.html')

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

    # Register the user, but don't count them yet (not paid)
    EventRegistration.objects.create(event=event, user=request.user)

    messages.success(request, f"You have successfully registered for {event.name}! Please verify your payment.")
    return redirect("events")


def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact_message = form.save()  # save message to DB

            # Admin notification email
            subject = f"New Contact Message: {contact_message.subject}"
            body = f"""
            You have received a new message from {contact_message.name} ({contact_message.email}).

            Subject: {contact_message.subject}
            Message:
            {contact_message.message}
            """

            send_mail(
                subject,
                body,
                settings.DEFAULT_FROM_EMAIL,
                [settings.CONTACT_EMAIL],
                fail_silently=False,
            )

            # Confirmation email to user
            user_subject = "We Received Your Message - NovaSphere"
            user_body = f"""
            Hi {contact_message.name},

            Thank you for reaching out to us. We have received your message and will get back to you shortly.

            Your Message:
            {contact_message.message}

            Best regards,
            NovaSphere Team
            """

            send_mail(
                user_subject,
                user_body,
                settings.DEFAULT_FROM_EMAIL,
                [contact_message.email],
                fail_silently=False,
            )

            messages.success(request, "✅ Your message has been sent successfully!")
            return redirect('contact')
    else:
        form = ContactForm()

    return render(request, 'Sphere/contact.html', {'form': form})


def verify_payment(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    form = PaymentVerificationForm()

    if request.method == "POST":
        form = PaymentVerificationForm(request.POST)
        if form.is_valid():
            mpesa_code = form.cleaned_data['mpesa_code'].strip().upper()

            # Prevent duplicate submissions
            if PaymentVerification.objects.filter(mpesa_code=mpesa_code).exists():
                messages.error(request, "❌ This M-Pesa code has already been submitted.")
                return redirect('verify_payment', event_id=event.id)

            # Create a record
            verification = form.save(commit=False)
            verification.event = event
            verification.verified = False  # Manual admin verification
            verification.save()

            messages.success(request, "✅ Payment submitted successfully! Await admin verification.")
            return redirect('verify_payment', event_id=event.id)
        else:
            messages.error(request, "⚠️ Please check your input and try again.")

    return render(request, "Sphere/verify_payment.html", {"form": form, "event": event})

