import React, { useState } from 'react';

const Circle = ({ id, name, imgUrl, onClick }) => {
  const circleStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    overflow: 'hidden', // 이미지가 동그라미를 벗어나지 않도록
  };

  const hoverStyle = {
    backgroundColor: '#d0d0d0',
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // 이미지가 동그라미를 채우도록
  };

  const [hover, setHover] = useState(false);

  return (
    <div
      style={hover ? { ...circleStyle, ...hoverStyle } : circleStyle}
      onClick={() => onClick(id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={imgUrl} alt={name} style={imgStyle} />
    </div>
  );
};

const Description = ({ description }) => {
  const descriptionStyle = {
    marginTop: '40px', // 소개와 동그라미 컨테이너 사이 간격 추가
    fontSize: '18px',
  };

  return (
    <div style={descriptionStyle}>
      <p>{description}</p>
    </div>
  );
};

const App = () => {
  const [selectedCircle, setSelectedCircle] = useState(null);

  const circles = [
    { id: 1, name: '송햇님', description: 'This is the description for 송햇님', imgUrl: 'https://via.placeholder.com/200' },
    { id: 2, name: '이강성', description: 'This is the description for 이강성', imgUrl: 'https://via.placeholder.com/200' },
    { id: 3, name: '정아름', description: 'This is the description for 정아름', imgUrl: 'https://via.placeholder.com/200' },
    { id: 4, name: '홍시표', description: 'This is the description for 홍시표', imgUrl: 'https://via.placeholder.com/200' },
    { id: 5, name: '김용현', description: 'This is the description for 김용현', imgUrl: 'https://via.placeholder.com/200' },
    { id: 6, name: '박성민', description: 'This is the description for 박성민', imgUrl: 'https://via.placeholder.com/200' },
  ];

  const handleCircleClick = (id) => {
    setSelectedCircle(circles.find(circle => circle.id === id));
  };

  const appStyle = {
    textAlign: 'center',
  };

  const circleContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px',
  };

  return (
    <div style={appStyle}>
      <div style={circleContainerStyle}>
        {circles.map(circle => (
          <Circle key={circle.id} id={circle.id} name={circle.name} imgUrl={circle.imgUrl} onClick={handleCircleClick} />
        ))}
      </div>
      {selectedCircle && <Description description={selectedCircle.description} />}
    </div>
  );
};

export default App;
