from django import forms
from .models import Student, Course

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = '__all__'
        widgets = {
                    'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Student Name'}),
                    'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Enter Student Email'}),
                    'phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Student phone'}),
                    'course': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Student course'}),
                    'address': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Enter Student Address', 'rows': 4}),
                    'profile_image': forms.FileInput(attrs={'class': 'form-control'}),
                }

class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = '__all__'
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Course Name'}),
            'duration': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Enter Duration'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Enter Course Description', 'rows': 4})
        }

    def clean_duration(self):
        duration = self.cleaned_data['duration']
        if duration <= 0:
            raise forms.ValidationError("Duration must be greater than 0")
        return duration