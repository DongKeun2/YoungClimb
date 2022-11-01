from rest_framework.decorators import api_view
from rest_framework.response import Response

import cvlib as cv
from PIL import Image
import numpy as np

@api_view(['POST'])
def wingspan(request):
    img = request.FILES['image'].file
    image_tmp = Image.open(img).convert('RGB')
    image = np.array(image_tmp)
    image = image[:,:,::-1].copy()

    conf = 0.5 # 사물 인식을 진행할 confidence의 역치 값
    model_name = "yolov7" # 사물을 인식할 모델 이름

    result = cv.detect_common_objects(image, confidence=conf, model=model_name)

    #if result[1][0] != 'person':
        #return Response({'사람이 감지되지 않았습니다.'})

    if not result[0][0]:
        return Response({'사람이 감지되지 않았습니다.'})


    y_min = result[0][0][1]
    y_max = result[0][0][3]
    y_len = y_max - y_min - 18

    x_min = result[0][0][0]
    x_max = result[0][0][2]
    x_len = x_max - x_min
    
    height = int(request.data['data'].split('"')[3])
    wingspan = round(x_len/y_len * height, 2)
    
    return Response({'wingspan': wingspan})