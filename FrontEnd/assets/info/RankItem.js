import React from 'react';

import HoldIcon from '../image/hold/hold.svg';
// 홀드 컬러 딕트로 변경해줘야 함
import {holdColorDict} from './ColorInfo';

const RankItem =
  // 빈 경험치를 위한 친구
  [
    {
      name: 'Y0',
      color: '회색',
      main: <HoldIcon width={90} height={90} color={holdColorDict.회색} />,
      sub: <HoldIcon width={30} height={30} color={holdColorDict.회색} />,
    },
    {
      name: 'Y1',
      color: '빨강',
      main: <HoldIcon width={90} height={90} color={holdColorDict.빨강} />,
      sub: <HoldIcon width={30} height={30} color={holdColorDict.빨강} />,
    },
    {
      name: 'Y2',
      color: '주황',
      main: <HoldIcon width={90} height={90} color={holdColorDict.주황} />,
      sub: <HoldIcon width={30} height={30} color={holdColorDict.주황} />,
    },
    {
      name: 'Y3',
      color: '노랑',
      main: <HoldIcon width={90} height={90} color={holdColorDict.노랑} />,
      sub: <HoldIcon width={30} height={30} color={holdColorDict.노랑} />,
    },
    {
      name: 'Y4',
      color: '초록',
      main: <HoldIcon width={90} height={90} color={holdColorDict.초록} />,
      sub: <HoldIcon width={30} height={30} color={holdColorDict.초록} />,
    },
    {
      name: 'Y5',
      color: '파랑',
      main: <HoldIcon width={90} height={90} color={holdColorDict.파랑} />,
      sub: <HoldIcon width={30} height={30} color={holdColorDict.파랑} />,
    },
    {
      name: 'Y6',
      color: '남색',
      main: <HoldIcon width={90} height={90} color={holdColorDict.남색} />,
      sub: <HoldIcon width={30} height={30} color={holdColorDict.남색} />,
    },
    {
      name: 'Y7',
      color: '보라',
      main: <HoldIcon width={90} height={90} color={holdColorDict.보라} />,
      sub: <HoldIcon width={30} height={30} color={holdColorDict.보라} />,
    },
  ];

export default RankItem;
