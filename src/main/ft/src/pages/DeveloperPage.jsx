import React, { useState } from 'react';

const Circle = ({ id, name, onClick }) => {
  const circleStyle = {
    width: '200px',
    height: '200px',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    overflow: 'hidden',
    borderRadius: '50%',
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // 이미지가 원 안에 딱 맞게 표시되도록 함
    borderRadius: '50%',
  };

 

  return (
    <div
      style={circleStyle}
      onClick={() => onClick(id)}
    >
      <img src="img/sung.png" alt={name} style={imgStyle} />
    </div>
  );
};

const Description = ({ description }) => {
  const descriptionStyle = {
    marginTop: '100px',
    fontSize: '20px',
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
    { id: 1, name: '송햇님', description: 'This is the description for 송햇님' },
    { id: 2, name: '이강성', description: 'This is the description for 이강성' },
    { id: 3, name: '정아름', description: 'This is the description for 정아름' },
    { id: 4, name: '홍시표', description: 'This is the description for 홍시표' },
    { id: 5, name: '김용현', description: 'This is the description for 김용현' },
    { id: 6, name: '박성민', description: 'This is the description for 박성민' },
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
    flexWrap: 'wrap',
    margin: '50px',
  };

  return (
    <div style={appStyle}>
      <div style={circleContainerStyle}>
        {circles.map(circle => (
          <Circle key={circle.id} id={circle.id} name={circle.name} onClick={handleCircleClick} />
        ))}
      </div>
      {selectedCircle && <Description description={selectedCircle.description} />}
    </div>
  );
};

export default App;
