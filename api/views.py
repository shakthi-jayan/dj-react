from django.shortcuts import render, redirect, get_object_or_404
from .models import Student, Course
from .forms import StudentForm, CourseForm
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required 

@login_required
def student_list(request):
    search = request.GET.get('search')
    students = Student.objects.all()
    if search:
        students = students.filter(name__icontains=search)
    paginator = Paginator(students,5)
    page_number = request.GET.get('page')
    students = paginator.get_page(page_number)
    return render(request, 'students/list.html', {'students': students})

@login_required
def create_student(request):
    if request.method == "POST":
        form = StudentForm(
            request.POST,
            request.FILES
        )
        if form.is_valid():
            form.save()
            return redirect('student_list')
    else:
        form = StudentForm()
    return render(
            request,
             "students/create.html",
             { "form" : form}
        )

@login_required
def edit_student(request, id):
    student = get_object_or_404(Student,id = id)
    if request.method == 'POST':
        form = StudentForm(
            request.POST,
            request.FILES,
            instance=student
        )
        if form.is_valid():
            form.save()
            return redirect('student_list')
    else:
        form = StudentForm(instance=student)
    return render(
        request,
        "students/edit.html",
        { "form" : form}
    )

@login_required
def delete_student(request, id):
    student = get_object_or_404(Student,id=id)
    student.delete()
    return redirect('student_list')

@login_required
def course_list(request):
    courses = Course.objects.all()
    return render(request,"courses/list.html",{
        "courses" : courses
    })

@login_required
def create_course(request):
    if request.method == "POST":
        form = CourseForm(
            request.POST,
        )
        if form.is_valid():
            form.save()
            return redirect('course_list')
    else:
        form = CourseForm()
    return render(
            request,
             "courses/create.html",
             { "form" : form}
        )

@login_required
def edit_course(request, id):
    course = get_object_or_404(Course, id = id)
    if request.method == "POST":
        form = CourseForm(
            request.POST,
            instance=course
        )
        if form.is_valid():
            form.save()
            return redirect('course_list')
    else:
        form = CourseForm(instance=course)
    return render(
            request,
             "courses/create.html",
             { "form" : form}
        )

@login_required
def delete_course(request,id):
    course = get_object_or_404(Course, id = id)
    course.delete()
    return redirect('course_list')



from rest_framework import generics
from .serializers import StudentSerializer, CourseSerializer


class StudentListAPIView(
    generics.ListCreateAPIView
):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class StudentDetailAPIView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class CourseListAPIView(
    generics.ListCreateAPIView
):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CourseDetailAPIView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer