import React, { useState, useEffect } from 'react';
import { MdOutlineArrowDropDown } from "react-icons/md";

const RealTime = () => {
  const [rank, setRank] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div style={styles.container}>
      <div style={styles.term}>
        <span style={styles.rank}>{(rank + 1).toString().padStart(2, '0')}</span>
        <span style={styles.rankName}>{items[rank]}</span>
        <button style={styles.dropdownButton} onClick={toggleDropdown}>
          <MdOutlineArrowDropDown />
        </button>
      </div>
      {isDropdownOpen && (
        <div style={styles.dropdown}>
          <span style={styles.dropdownTitle}>실시간 쇼핑 검색어</span>
          <div style={styles.topRankButtonContainer}>
            <button style={styles.topRankButton}>1~10</button>
          </div>
          {items.map((item, index) => (
            <div key={index} style={styles.dropdownItem}>
              {index + 1}. {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    flexDirection: 'column',
    padding: '20px',
  },
  term: {
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    width: '100%', // 추가된 부분
    justifyContent: 'flex-start', // 추가된 부분
  },
  rank: {
    color: 'orange',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  rankName: {
    marginLeft: 20,
    flexGrow: 1, // 추가된 부분
  },
  dropdownButton: {
    marginLeft: 'auto', // 오른쪽 끝에 배치
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '24px',
  },
  dropdown: {
    position: 'relative', // 수정된 부분
    top: '10px',
    right: '0',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
    padding: '20px',
    width: '200px',
    maxHeight: '600px',
    overflowY: 'auto',
    marginTop: '10px', // 검색어 아래에 배치
  },
  dropdownTitle: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  dropdownItem: {
    padding: '5px',
    cursor: 'pointer',
  },
  topRankButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  topRankButton: {
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default RealTime;
