import React from 'react';

import Gray from '../image/rank/gray.svg';
import Red from '../image/rank/red.svg';
import Orange from '../image/rank/orange.svg';
import Yellow from '../image/rank/yellow.svg';
import Green from '../image/rank/green.svg';
import Sky from '../image/rank/sky.svg';
import Blue from '../image/rank/blue.svg';
import Violet from '../image/rank/violet.svg';

const RankItem =
  // 빈 경험치를 위한 친구
  [
    {
      name: 'Y0',
      color: 'gray',
      main: <Gray width={90} height={90} />,
      sub: <Gray width={30} height={30} />,
    },
    {
      name: 'Y1',
      color: 'red',
      main: <Red width={90} height={90} />,
      sub: <Red width={30} height={30} />,
    },
    {
      name: 'Y2',
      color: 'orange',
      main: <Orange width={90} height={90} />,
      sub: <Orange width={30} height={30} />,
    },
    {
      name: 'Y3',
      color: 'yellow',
      main: <Yellow width={90} height={90} />,
      sub: <Yellow width={30} height={30} />,
    },
    {
      name: 'Y4',
      color: 'green',
      main: <Green width={90} height={90} />,
      sub: <Green width={30} height={30} />,
    },
    {
      name: 'Y5',
      color: 'sky',
      main: <Sky width={90} height={90} />,
      sub: <Sky width={30} height={30} />,
    },
    {
      name: 'Y6',
      color: 'blue',
      main: <Blue width={90} height={90} />,
      sub: <Blue width={30} height={30} />,
    },
    {
      name: 'Y7',
      color: 'violet',
      main: <Violet width={90} height={90} />,
      sub: <Violet width={30} height={30} />,
    },
  ];

export default RankItem;
