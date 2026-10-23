
import os
import django

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "backend.settings"
)

django.setup()

from django.contrib.contenttypes.models import ContentType

for ct in ContentType.objects.all():
    print(ct.id, ct.app_label, ct.model)
