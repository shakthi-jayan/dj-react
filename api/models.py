from django.db import models

class Course(models.Model):
    name = models.CharField(max_length=50)
    duration = models.IntegerField()
    description = models.TextField()

    def __str__(self):
        return self.name

class Student(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    profile_image = models.ImageField(
        upload_to= 'students/',
        blank=True,
        null=True
    )

    def __str__(self):
        return self.email