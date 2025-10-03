from django.contrib import admin
from .models import Event

# Register your models here.
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("name", "event_date", "event_time", "location", "registered", "people_required")
    list_filter = ("event_date", "location")
    search_fields = ("name", "location", "short_detail")
    ordering = ("event_date",)