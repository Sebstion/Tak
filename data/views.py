from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Data
from .serializers import DataSerializer

@api_view(['GET', 'POST'])
def data_list(request):
    if request.method == 'GET':
        data = Data.objects.all()
        serializer = DataSerializer(data, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data_list = request.data

        if not isinstance(data_list, list):
            data_list = [data_list]

        serializer = DataSerializer(data=data_list, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Data
from .serializers import DataSerializer

@api_view(['GET', 'POST'])
def data_list(request):
    if request.method == 'GET':
        data = Data.objects.all()
        serializer = DataSerializer(data, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data_list = request.data

        if not isinstance(data_list, list):
            data_list = [data_list]

        serializer = DataSerializer(data=data_list, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def data_detail(request, pk):
    print(request.data)
    print(pk)
    try:
        data = Data.objects.get(pk=pk)
    except Data.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        data_list = request.data
        if not isinstance(data_list, list):
            data_list = [data_list]

        serializer = DataSerializer(data, data=data_list, partial=True, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)