import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsFeed.css';
import { useUser } from '../../contexts/userContext'; // UserContext 가져오기

import shinhanLogo from '../../../src/assets/images/shinhanlogo.png';
import samsungLogo from '../../../src/assets/images/samsung.jpg';
import naver from '../../../src/assets/images/naver.jpg';
import hyundai from '../../../src/assets/images/hyundai.jpg';
import skshhnix from '../../../src/assets/images/skhynix.jpg';
import solleaf from '../../../src/assets/images/solleaf.png';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readNewsIds, setReadNewsIds] = useState([]);
  const [solAnimation, setSolAnimation] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useUser(); // userContext에서 userId 가져오기

  const keywordsToNames = {
    신한지주: ['신한지주'],
    현대차: ['현대차', '현대자동차'],
    네이버: ['네이버'],
    SK하이닉스: ['SK하이닉스', '하이닉스'],
    삼성전자: ['삼성전자', '삼성'],
  };

  // 로컬 스토리지에 읽은 뉴스 ID 저장
  const saveReadNewsToLocalStorage = (userId, newsId) => {
    const storageKey = `readNewsIds_${userId}`;
    const storedNewsIds = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updatedNewsIds = [...new Set([...storedNewsIds, newsId])];
    localStorage.setItem(storageKey, JSON.stringify(updatedNewsIds));
  };

  // 로컬 스토리지에서 읽은 뉴스 ID 로드
  const loadReadNewsFromLocalStorage = (userId) => {
    const storageKey = `readNewsIds_${userId}`;
    const storedNewsIds = JSON.parse(localStorage.getItem(storageKey)) || [];
    setReadNewsIds(storedNewsIds);
  };

  // 백엔드에서 뉴스 데이터를 가져오는 함수
  const fetchArticles = async () => {
    try {
      const response = await axios.get('/api/news'); // 백엔드에서 DB 데이터를 가져옴
      const fetchedArticles = response.data.data;

      // 중복 제거
      const uniqueArticles = fetchedArticles.filter(
        (article, index, self) =>
          index === self.findIndex((t) => t.news_id === article.news_id)
      );

      setArticles(uniqueArticles); // 중복 제거된 뉴스 데이터를 상태로 설정
      setLoading(false);
    } catch (error) {
      console.error('❌ 뉴스 가져오기 오류:', error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  // 뉴스 읽기 기록 저장 함수
  const recordNewsRead = async (newsId) => {
    console.log('전달된 news_id:', newsId); // 로그로 news_id 출력

    if (!userId) {
      console.error('❌ 사용자 ID가 설정되지 않았습니다.');
      return;
    }

    try {
      const read_date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
      const response = await axios.get(
        `/api/news/invest/solleafcontent/news/${newsId}`,
        {
          params: {
            user_id: userId,
            read_date: read_date,
          },
        }
      );
      const { news_id } = response.data.data;

      // 상태와 로컬 스토리지에 읽은 뉴스 ID 저장
      setReadNewsIds((prev) => [...prev, news_id]);
      saveReadNewsToLocalStorage(userId, news_id);

      if (response.data.message === '뉴스읽기 기록 저장 및 쏠잎 지급 완료') {
        console.log('✅ 쏠잎 지급 애니메이션 시작');
        setSolAnimation(true);
        // setTimeout(() => setSolAnimation(false), 3000); // 3초 후 애니메이션 종료
      }

      console.log(`✅ 뉴스 읽기 기록 저장 :`, response.data);
    } catch (error) {
      console.error('❌ 뉴스 읽기 기록 오류:', error.message);
    }
  };

  // 제목에서 종목 이름 찾기
  const getCompanyNameFromTitle = (title) => {
    for (const [name, keywords] of Object.entries(keywordsToNames)) {
      if (keywords.some((keyword) => new RegExp(keyword, 'i').test(title))) {
        return name;
      }
    }
    return '종목이름 없음';
  };

  // 컴포넌트가 마운트될 때 사용자 ID와 뉴스 데이터를 가져옴
  useEffect(() => {
    if (userId) {
      loadReadNewsFromLocalStorage(userId);
      fetchArticles();
    }
  }, [userId]);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>에러: {error}</p>;

  return (
    <div className="news-container">
      <h1 className="title">Sole News</h1>

      {solAnimation && (
        <div
          className="frame-9"
          key={Date.now()} // 매번 새로운 키로 DOM 강제 갱신
        >
          <button
            className="close-buttons"
            onClick={() => setSolAnimation(false)}
          >
            ×
          </button>
          <img className="solleaf" src={solleaf} alt="Leaf Image 28" />
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="burst-particle" key={index}></div>
          ))}
        </div>
      )}

      <div className="news-list">
        {articles.map((article) => {
          const companyName = getCompanyNameFromTitle(article.title);
          const isRead = readNewsIds.includes(article.news_id); // 읽은 뉴스인지 확인
          return (
            <div
              key={article.news_id}
              className={`news-card ${isRead ? 'read' : ''}`} // 읽은 뉴스면 'read' 클래스 추가
              onClick={() => {
                if (!isRead) {
                  recordNewsRead(article.news_id); // 뉴스 읽기 기록 저장
                }
                window.open(article.content_url, '_blank'); // 새 탭에서 뉴스 페이지 열기
              }}
            >
              <div className="news-row">
                <img
                  className="news-logo"
                  src={
                    companyName === '신한지주'
                      ? shinhanLogo
                      : companyName === '삼성전자'
                      ? samsungLogo
                      : companyName === '네이버'
                      ? naver
                      : companyName === 'SK하이닉스'
                      ? skshhnix
                      : companyName === '현대차'
                      ? hyundai
                      : '/default-logo.png'
                  }
                  alt={companyName}
                />
                <h3 className="news-company">{companyName}</h3>
              </div>
              <div className="news-row">
                <h4 className={`news-title ${isRead ? 'read' : ''}`}>
                  {article.title}
                </h4>
                <img
                  className="news-thumbnail"
                  src={article.thumbnail_url || '/default-thumbnail.png'}
                  alt={article.title}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsFeed;