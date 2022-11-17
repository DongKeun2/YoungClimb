import "../App.css";

function Share() {
  function share() {
    window.Kakao.Share.sendCustom({
      templateId: 85975,
      templateArgs: {
        title: "YoungClimb",
        description: "최고의 클라이밍 커뮤니티",
      },
    });
  }
  return (
    <div className="sharePage">
      <div className="shareDescriptionBox">
        <p className="shareDescription">친구에게 Young Climb을 소개해보세요!</p>
      </div>
      <a className="shareBtn" onClick={share}>
        카카오톡 공유하기
      </a>
    </div>
  );
}

export default Share;
