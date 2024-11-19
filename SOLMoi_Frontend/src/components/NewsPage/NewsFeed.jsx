import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import shinhanLogo from '/Users/akrxso/Desktop/신투/중간프로젝트/SolemoiClient/SOLMoi_Frontend/src/assets/images/shinhanlogo.png'
import samsungLogo from '/Users/akrxso/Desktop/신투/중간프로젝트/SolemoiClient/SOLMoi_Frontend/src/assets/images/samsung.png';
import naver from '/Users/akrxso/Desktop/신투/중간프로젝트/SolemoiClient/SOLMoi_Frontend/src/assets/images/naver.jpg';
import hyundai from '/Users/akrxso/Desktop/신투/중간프로젝트/SolemoiClient/SOLMoi_Frontend/src/assets/images/hyundai.jpg';
import skshhnix from '/Users/akrxso/Desktop/신투/중간프로젝트/SolemoiClient/SOLMoi_Frontend/src/assets/images/skhynix.jpg';


const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '9166bb7804ba4d91b0022ba2ee234868'; // 내 API 키
  const USER_ID = 3; // 임의의 사용자 ID

  // 종목 이름과 해당 키워드를 매핑해 제목에서 종목이름 나타냄
  const keywordsToNames = {
    신한지주: ['신한지주'],
    현대차: ['현대차', '현대자동차'],
    네이버: ['네이버'],
    SK하이닉스: ['SK하이닉스', '하이닉스'],
    삼성전자: ['삼성전자', '삼성'],
  };

  // API에서 뉴스 크롤링
  const fetchArticles = async () => {
    try {
      console.log('API 호출 시작. 현재 USER_ID:', USER_ID);
      const allArticles = [];
      let page = 1; // 초기 페이지
      const pageSize = 30; // 한 페이지당 요청할 기사 수
      const maxArticles = 1000; // 총 최대 기사를 제한 (무한 루프 방지)
      let fetchedCount = 0;
      while (allArticles.length < 30 && fetchedCount < maxArticles) {
        const response = await axios.get('/api/deepsearch/v1/articles', {
          params: {
            symbols: 'KRX:055550,KRX:005380,KRX:035420,KRX:000660,KRX:005930',
            order: 'published_at',
            date_from: '2024-01-01',
            date_to: new Date().toISOString(),
            page_size: pageSize,
            page: page,
            api_key: API_KEY,
          },
        });

        const articles = response.data.data;
        fetchedCount += articles.length;
        console.log(articles);

        if (articles.length === 0) break; // 더 이상 데이터가 없으면 종료

        allArticles.push(
          ...articles.filter((article) =>
            Object.values(keywordsToNames).some((keywords) =>
              keywords.some((keyword) =>
                new RegExp(keyword, 'i').test(article.title)
              )
            )
          )
        );

        page += 1; // 다음 페이지로 이동
      }

      console.log('총 가져온 기사 수:', allArticles.length);
      setArticles(allArticles.slice(0, 30)); // 최대 30개만 저장
      setLoading(false);
    } catch (error) {
      console.error('API 호출 오류:', error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  // 뉴스 읽기 기록을 서버에 전송
  const recordNewsRead = async (newsId) => {
    try {
      console.log(`USER_ID: ${USER_ID}, News ID: ${newsId}`);
      const read_date = new Date().toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD 형식)
      const response = await axios.get(
        `/api/invest/solleafcontent/news/${newsId}`,
        {
          params: {
            user_id: USER_ID,
            read_date: read_date,
          },
        }
      );
      console.log('✅ 뉴스 읽기 기록 성공:', response.data);
    } catch (error) {
      console.error('❌ 뉴스 읽기 기록 오류:', error);
    }
  };

  useEffect(() => {
    console.log('현재 USER_ID:', USER_ID);
    fetchArticles();
  }, []);

  // 제목에서 종목 이름 찾기
  const getCompanyNameFromTitle = (title) => {
    for (const [name, keywords] of Object.entries(keywordsToNames)) {
      if (keywords.some((keyword) => new RegExp(keyword, 'i').test(title))) {
        return name;
      }
    }
    return '종목이름 없음';
  };

  if (loading) return <p>로딩중...~</p>;
  if (error) return <p>에러: {error}</p>;

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h1 className="text-2xl font-bold text-blue-500"
      style={{marginBottom:'50px'}}>Sole News</h1>
      {articles.length > 0 ? (
        articles.map((article, index) => {
          const companyName = getCompanyNameFromTitle(article.title);
          return (
            <Card key={index} style={{ width: '50rem', marginBottom: '20px' }}>
              <Card.Body>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    {/* 왼쪽에 표시할 이미지 */}
    <img
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
          ? hyundai :   '/default-logo.png'
      }
      alt={companyName}
      style={{
        width: '40px', // 이미지 너비
        height: '40px', // 이미지 높이
        marginRight: '10px', // 텍스트와의 간격
        borderRadius: '50%', // 동그란 모양
      }}
    />
    {/* 종목 이름 */}
    <Card.Title style={{ marginBottom: '0' }}>{companyName}</Card.Title>
  </div>
                <Card.Img
                  variant="top"
                  src={article.thumbnail_url}
                  style={{
                    width: '20rem',
                    marginBottom: '20px',
                    borderRadius: '10px',
                  }}
                />
                <Card.Subtitle style={{ marginBottom: '10px' }}>
                  {article.title}
                </Card.Subtitle>
                <Card.Text className="mb-2 text-muted text-start">
                  {article.summary}
                </Card.Text>
                <Button
                  variant="outline-primary"
                  href={article.content_url}
                  target="_blank"
                  onClick={() => recordNewsRead(article.id)}
                >
                  ...더보기
                </Button>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <p>기사를 찾을 수 없음</p>
      )}
    </div>
  );
};

export default NewsFeed;
