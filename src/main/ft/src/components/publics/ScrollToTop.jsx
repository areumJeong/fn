import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드럽게 스크롤
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth' // 부드럽게 스크롤
    });
  };

  return (
    <div> {/* 긴 페이지를 위한 예제 스타일 */}
      <button onClick={scrollToTop} style={{ position: 'fixed', bottom: '60px', right: '10px' }}>
        <FaArrowUp />
      </button>
      <button onClick={scrollToBottom} style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
        <FaArrowDown />
      </button>
    </div>
  );
}
