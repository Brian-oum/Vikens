from django.urls import path
from . import views

urlpatterns = [
    # Core pages
    path('', views.homepage, name='homepage'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('events/', views.events, name='events'),
    path("events/register/<int:event_id>/", views.register_event, name="register_event"),

    # Solution pages
    path('expertise/it-support/', views.IT_support, name='IT_support'),
    path('expertise/software-systems/', views.software, name='software'),
    path('expertise/hardware/', views.hardware, name='hardware'),
    path('expertise/networking/', views.networking, name='networking'),
    path('expertise/cybersec/', views.cybersec, name='cybersec'),
    path('expertise/training/', views.cloud, name='cloud'),
]
