import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import CustomSubHeader from '../../components/CustomSubHeader';

function ServiceTermsScreen({navigation}) {
  return (
    <>
      <CustomSubHeader title={'이용 약관'} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.infoFlex}>
              <Text style={styles.title}>이용 약관</Text>

              <Text style={styles.text}>
                {'<'} Young Climb {'>'}은(는) 「개인정보 보호법」 제30조에 따라
                정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고
                원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보
                처리방침을 수립·공개합니다.
              </Text>
              <Text style={styles.text}>
                ○ 이 개인정보처리방침은 2022년 11월 14부터 적용됩니다.
              </Text>

              <Text> </Text>
              <Text style={styles.subTitle}> 제1조(개인정보의 처리 목적)</Text>
              <Text style={styles.text}>
                {'<'} Young Climb {'>'}('https://k7a701.p.ssafy.io/'이하 'Young
                Climb')은(는) 다음의 목적을 위하여 개인정보를 처리합니다.
                처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지
                않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」
                제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할
                예정입니다. 1. 홈페이지 회원가입 및 관리 회원 가입의사 확인,
                회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리,
                서비스 부정이용 방지, 각종 고지·통지 목적으로 개인정보를
                처리합니다.
              </Text>
              <Text style={styles.text}>
                1. 홈페이지 회원가입 및 관리 회원 가입의사 확인, 회원제 서비스
                제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용
                방지, 각종 고지·통지 목적으로 개인정보를 처리합니다.
              </Text>
              <Text style={styles.text}>
                2. 민원사무 처리 민원인의 신원 확인, 민원사항 확인, 사실조사를
                위한 연락·통지 목적으로 개인정보를 처리합니다.
              </Text>
              <Text style={styles.text}>
                3. 재화 또는 서비스 제공 서비스 제공, 콘텐츠 제공, 맞춤서비스
                제공을 목적으로 개인정보를 처리합니다.
              </Text>
              <Text style={styles.text}>
                4. 마케팅 및 광고에의 활용 신규 서비스(제품) 개발 및 맞춤 서비스
                제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재 ,
                서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에
                대한 통계 등을 목적으로 개인정보를 처리합니다.
              </Text>

              <Text> </Text>
              <Text style={styles.subTitle}>
                제2조(개인정보의 처리 및 보유 기간)
              </Text>
              <Text style={styles.text}>
                ① {'<'} Young Climb {'>'}은(는) 법령에 따른 개인정보
                보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은
                개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </Text>
              <Text style={styles.text}>
                ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
              </Text>
              <Text style={styles.text}>
                • 1.{'<'}홈페이지 회원가입 및 관리{'>'}
              </Text>
              <Text style={styles.text}>
                • {'<'}홈페이지 회원가입 및 관리{'>'}와 관련한 개인정보는
                수집.이용에 관한 동의일로부터{'<'}1년{'>'}까지 위 이용목적을
                위하여 보유.이용됩니다
              </Text>
              <Text style={styles.text}>
                • 보유근거 : 회원관리를 위해 회원 탈퇴 후 1년간 회원 정보를
                보관할 수 있습니다.
              </Text>

              <Text> </Text>
              <Text style={styles.subTitle}>
                제3조(처리하는 개인정보의 항목)
              </Text>
              <Text style={styles.text}>
                ① {'<'} Young Climb {'>'}은(는) 다음의 개인정보 항목을 처리하고
                있습니다.
              </Text>
              <Text style={styles.text}>
                • 1 {'<'} 홈페이지 회원가입 및 관리 {'>'}
              </Text>
              <Text style={styles.text}>
                • 필수항목 : 이메일, 비밀번호, 로그인ID
              </Text>

              <Text> </Text>
              <Text style={styles.subTitle}>
                제4조(개인정보의 제3자 제공에 관한 사항)
              </Text>
              <Text style={styles.text}>
                ① {'<'} Young Climb {'>'}은(는)개인정보를 제1조(개인정보의 처리
                목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의
                특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는
                경우에만 개인정보를 제3자에게 제공합니다.
              </Text>

              <Text> </Text>
              <Text style={styles.subTitle}>
                제5조(개인정보의 파기절차 및 파기방법)
              </Text>
              <Text style={styles.text}>
                ① {'<'} Young Climb {'>'}은(는)개인정보 보유기간의 경과,
                처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이
                해당 개인정보를 파기합니다.
              </Text>
              <Text style={styles.text}>
                ② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나
                처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를
                계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의
                데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
              </Text>
              <Text style={styles.text}>1. 법령 근거 :</Text>
              <Text style={styles.text}>
                2. 보존하는 개인정보 항목 : 계좌정보, 거래날짜
              </Text>
              <Text style={styles.text}>
                ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.
              </Text>
              <Text style={styles.text}>1. 파기절차</Text>
              <Text style={styles.text}>
                {'<'} Young Climb {'>'} 은(는) 파기 사유가 발생한 개인정보를
                선정하고, {'<'} Young Climb {'>'} 의 개인정보 보호책임자의
                승인을 받아 개인정보를 파기합니다.
              </Text>
              <Text style={styles.text}>2. 파기방법</Text>
              <Text style={styles.text}>
                전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을
                사용합니다
              </Text>

              <Text> </Text>
              <Text style={styles.subTitle}>
                제6조(미이용자의 개인정보 파기 등에 관한 조치)
              </Text>
              <Text style={styles.text}>
                ① {'<'}개인정보처리자명{'>'}은(는) 1년간 서비스를 이용하지 않은
                이용자는 휴면계정으로 전환하고, 개인정보를 별도로 분리하여
                보관합니다. 분리 보관된 개인정보는 1년간 보관 후 지체없이
                파기합니다.
              </Text>
              <Text style={styles.text}>
                ② {'<'}개인정보처리자명{'>'}은(는) 휴먼전환 30일 전까지 휴면예정
                회원에게 별도 분리 보관되는 사실 및 휴면 예정일, 별도 분리
                보관하는 개인정보 항목을 이메일, 문자 등 이용자에게 통지 가능한
                방법으로 알리고 있습니다.
              </Text>
              <Text style={styles.text}>
                ③ 휴면계정으로 전환을 원하지 않으시는 경우, 휴면계정 전환 전
                서비스 로그인을 하시면 됩니다. 또한, 휴면계정으로 전환되었더라도
                로그인을 하는 경우 이용자의 동의에 따라 휴면계정을 복원하여
                정상적인 서비스를 이용할 수 있습니다
              </Text>

              <Text> </Text>
              <Text style={styles.subTitle}>
                제7조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한
                사항)
              </Text>
              <Text style={styles.text}>
                ① 정보주체는 Young Climb에 대해 언제든지 개인정보
                열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다
              </Text>
              <Text style={styles.text}>
                ② 제1항에 따른 권리 행사는Young Climb에 대해 「개인정보 보호법」
                시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을
                통하여 하실 수 있으며 Young Climb은(는) 이에 대해 지체 없이
                조치하겠습니다.
              </Text>
              <Text style={styles.text}>
                ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은
                자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리
                방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을
                제출하셔야 합니다.
              </Text>
              <Text style={styles.text}>
                ④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조
                제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수
                있습니다.
              </Text>
              <Text style={styles.text}>
                ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가
                수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수
                없습니다.
              </Text>
              <Text style={styles.text}>
                ⑥ Young Climb은(는) 정보주체 권리에 따른 열람의 요구,
                정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가
                본인이거나 정당한 대리인인지를 확인합니다.
              </Text>

              <Text> </Text>
              <Text style={styles.subTitle}>
                제8조(개인정보의 안전성 확보조치에 관한 사항)
              </Text>
              <Text style={styles.text}>
                {'<'} Young Climb {'>'}은(는) 개인정보의 안전성 확보를 위해
                다음과 같은 조치를 취하고 있습니다.
              </Text>
              <Text style={styles.text}>1. 해킹 등에 대비한 기술적 대책</Text>
              <Text style={styles.text}>
                {'<'} Young Climb {'>'}('Young Climb')은 해킹이나 컴퓨터
                바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여
                보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터
                접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및
                차단하고 있습니다.
              </Text>
              <Text style={styles.text}>2. 개인정보의 암호화</Text>
              <Text style={styles.text}>
                이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고
                있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송
                데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도
                보안기능을 사용하고 있습니다.
              </Text>
              <Text style={styles.text}>3. 접속기록의 보관 및 위변조 방지</Text>
              <Text style={styles.text}>
                개인정보처리시스템에 접속한 기록을 최소 1년 이상 보관, 관리하고
                있으며,다만, 5만명 이상의 정보주체에 관하여 개인정보를
                추가하거나, 고유식별정보 또는 민감정보를 처리하는 경우에는
                2년이상 보관, 관리하고 있습니다.
              </Text>
              <Text style={styles.text}>
                또한, 접속기록이 위변조 및 도난, 분실되지 않도록 보안기능을
                사용하고 있습니다.
              </Text>
              <Text style={styles.text}>4. 개인정보에 대한 접근 제한</Text>
              <Text style={styles.text}>
                개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의
                부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한
                조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단
                접근을 통제하고 있습니다.
              </Text>

              <Text> </Text>
              <Text style={styles.subTitle}>
                제9조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에
                관한 사항)
              </Text>
              <Text style={styles.text}>
                Young Climb 은(는) 정보주체의 이용정보를 저장하고 수시로
                불러오는 ‘쿠키(cookie)’를 사용하지 않습니다.
              </Text>

              <Text> </Text>
              <Text style={styles.subTitle}>
                제10조(행태정보의 수집·이용·제공 및 거부 등에 관한 사항)
              </Text>
              <Text style={styles.text}>
                행태정보의 수집·이용·제공 및 거부등에 관한 사항
              </Text>
              <Text style={styles.text}>
                {'<'}개인정보처리자명{'>'}은(는) 온라인 맞춤형 광고 등을 위한
                행태정보를 수집·이용·제공하지 않습니다.
              </Text>

              <Text> </Text>
              <Text style={styles.subTitle}>
                제11조(추가적인 이용·제공 판단기준)
              </Text>
              <Text style={styles.text}>
                {'<'} Young Climb {'>'} 은(는) ｢개인정보 보호법｣ 제15조제3항 및
                제17조제4항에 따라 ｢개인정보 보호법 시행령｣ 제14조의2에 따른
                사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로
                이용·제공할 수 있습니다.
              </Text>
              <Text style={styles.text}>
                이에 따라 {'<'} Young Climb {'>'} 가(이) 정보주체의 동의 없이
                추가적인 이용·제공을 하기 위해서 다음과 같은 사항을
                고려하였습니다.
              </Text>
              <Text style={styles.text}>
                ▶ 개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과
                관련성이 있는지 여부
              </Text>
              <Text style={styles.text}>
                ▶ 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인
                이용·제공에 대한 예측 가능성이 있는지 여부
              </Text>
              <Text style={styles.text}>
                ▶ 개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게
                침해하는지 여부
              </Text>
              <Text style={styles.text}>
                ▶ 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지
                여부
              </Text>
              <Text style={styles.text}>
                ※ 추가적인 이용·제공 시 고려사항에 대한 판단기준은 사업자/단체
                스스로 자율적으로 판단하여 작성·공개함
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingBottom: 50,
    padding: 20,
  },
  subContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    width: '80%',
  },
  nameFont: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  infoFlex: {
    marginBottom: 7,
  },
  detailBox: {
    marginLeft: 10,
  },
  text: {
    color: 'black',
  },
  link: {
    alignSelf: 'flex-end',
    color: '#C4C4C4C4',
  },
});

export default ServiceTermsScreen;
