import React, { useState, useEffect } from 'react';

const RealTime = () => {
  const [rank, setRank] = useState(0);

  const items = [
    '2층침대',
    '식탁',
    '리클라이너',
    '테이블',
    '수납장',
    '의자',
    '책장',
    '쇼파',
    '매트리스',
    '침대'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRank(prevRank => (prevRank === 9 ? 0 : prevRank + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={styles.term}>
        <span style={styles.rank}>{(rank + 1).toString().padStart(2, '0')}</span>
        <span style={styles.rankName}>{items[rank]}</span> 
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    flexDirection: 'column',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '20px',
  },
  term: {
    fontSize: '16px',
  },
  rank: {
    color: 'orange', // 숫자의 색상을 주황색으로 지정
    fontWeight: 'bold', // 굵은 글꼴로 설정
    fontFamily: 'Arial, sans-serif', // 원하는 둥근체 글꼴로 변경
    marginLeft: 20
  },
  rankName: {
    fontFamily: 'Arial, sans-serif', // 원하는 둥근체 글꼴로 변경
    marginLeft: 20
  }
};



export default RealTime;
