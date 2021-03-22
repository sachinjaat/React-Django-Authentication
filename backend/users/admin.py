
#export model record as CSV file from admin interface

from django.contrib import admin
from .models import LoginHistoryModel
from django.http import HttpResponse
import csv

class ExportCsvMixin:
    def export_as_csv(self, request, queryset):

        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = "Export Selected"

class LoginHistoryAdmin(admin.ModelAdmin, ExportCsvMixin):

    #fields to be displayed

    list_display = ("ip_address", "logged_in_user_id")
    list_filter = ()
    actions = ["export_as_csv"]

# Register models

admin.site.register(LoginHistoryModel, LoginHistoryAdmin)


