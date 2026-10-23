from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path('create/', views.create_student, name='create_student'),
    path('students/', views.student_list, name='student_list'),
    path('edit/<int:id>/', views.edit_student, name='edit_student'),
    path('delete/<int:id>/', views.delete_student, name='delete_student'),

    path('courses/', views.course_list, name='course_list'),
    path('course/create/', views.create_course, name='create_course'),
    path('course/edit/<int:id>/', views.edit_course, name='edit_course'),
    path('course/delete/<int:id>/', views.delete_course, name='delete_course'),

    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),

    path('api/students/', views.StudentListAPIView.as_view(), name='student_api'),
    path('api/students/<int:pk>/', views.StudentDetailAPIView.as_view(), name='student_detail_api'),
    path('api/courses/', views.CourseListAPIView.as_view(), name='course_api'),
    path('api/courses/<int:pk>/', views.CourseDetailAPIView.as_view(), name='course_detail_api'),
    path('api/token/',TokenObtainPairView.as_view(),name = 'token_obtain_pair'),
    path('api/token/refresh',TokenRefreshView.as_view(),name = 'token_refresh'),

]