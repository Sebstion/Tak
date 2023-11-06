from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Data
from .serializers import *

@api_view(['GET', 'POST'])
def data_list(request):
    if request.method == 'GET':
        data = Data.objects.all()
        serializer = DataSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        if isinstance(request.data, list):
            serialized_data = []
            for item in request.data:
                serializer = DataSerializer(data=item)
                if serializer.is_valid():
                    serializer.save()
                    serialized_data.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serialized_data, status=status.HTTP_201_CREATED)

        serializer = DataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def data_detail(request, pk):
    try:
        data = Data.objects.get(pk=pk)
    except Data.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = DataSerializer(data, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)