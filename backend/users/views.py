from django.shortcuts import render
from .serializers import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions

class CreateUserView(APIView):

    permission_classes = (permissions.AllowAny, )

    #user validation

    def post(self,request):

        user = request.data.get('user')

        if not user:
            return Response({'response' : 'error', 'message' : 'No data found'})

        serializer = UserSerializerWithToken(data = user)

        if serializer.is_valid():
            saved_user = serializer.save()
        else:
            return Response({"response" : "error", "message" : serializer.errors})

        return Response({"response" : "success", "message" : "user created succesfully"})

