from rest_framework.decorators import api_view
from rest_framework.response import Response

import cv2
import cvlib as cv
import urllib.request
import numpy as np

@api_view(['POST'])
def wingspan(request):
    resp = urllib.request.urlopen(request.data['image'])
    image = np.asarray(bytearray(resp.read()), dtype='uint8')
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    conf = 0.5 # 사물 인식을 진행할 confidence의 역치 값
    model_name = "yolov7" # 사물을 인식할 모델 이름

    result = cv.detect_common_objects(image, confidence=conf, model=model_name)
    
    if not result:
        return Response({'사람이 감지되지 않았습니다.'})

    y_min = result[0][0][1]
    y_max = result[0][0][3]
    y_len = y_max - y_min - 18

    x_min = result[0][0][0]
    x_max = result[0][0][2]
    x_len = x_max - x_min
    
    height = int(request.data['height'])
    wingspan = round(x_len/y_len * height, 2)
    
    return Response({'wingspan': wingspan})