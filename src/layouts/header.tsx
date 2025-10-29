import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

export default function MainHeader() {
  const navigate = useNavigate();

  return (
    <div id="header">
      <div className="flex flex-row h-[30px] items-center">
        <div className="absolute top-0 right-0">기본 메뉴</div>
      </div>
      {/* 
        시멘틱 마크업 : 
          a태그 - 클릭했을 때, 특정 동작이 일아난다.
          img태그 - 이미지를 표시한다.
        웹 접근성
          a > img - a태그는 링크이며, 클릭 가능하다를 명시한다. 
      */}
      <a
        // 마우스 오버 시, 커서 모양 변경으로 클릭 가능함을 시각화
        onMouseOver={(e) => {
          e.currentTarget.style.cursor = 'pointer';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.cursor = 'default';
        }}
        // 마우스 클릭 시, 페이지 재랜더링
        onClick={() => {
          navigate('/');
          console.log('click');
        }}
        className="flex flex-row h-[100px] mx-10 mt-2 items-start"
      >
        <img src={logo} width={'100px'} height={'25%'} />
      </a>
    </div>
  );
}
