import React from 'react'

const NewsItem = ({ category, title, source, date, imageUrl }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    padding: '16px',
    marginBottom: '16px'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <p style={{ color: '#2563eb', fontSize: '14px', marginBottom: '4px' }}>{category}</p>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{title}</h3>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>{source} {date}</p>
      </div>
      <img src={imageUrl} alt="" style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '4px', marginLeft: '16px' }} />
    </div>
  </div>
)

const IconPlaceholder = ({ color }) => (
  <div style={{ width: '24px', height: '24px', backgroundColor: color, borderRadius: '50%' }} />
)

export default function NewsFeed() {
  const newsItems = [
    {
      category: "마이크로칩 테크놀로지",
      title: "지속 가능성, 전기 이동성 및 데이터 센터 전반의 애플리케이션에 최적화된 광범위한 IGBT 7 전력 장치 포트폴리오 소개",
      source: "The Motley Fool",
      date: "2024. 11. 12. 오후 10:00",
      imageUrl: "/placeholder.svg?height=64&width=64"
    },
    {
      category: "신타스",
      title: "신타스: 지금이 투자할 때일까?",
      source: "The Motley Fool",
      date: "2024. 11. 12. 오후 9:30",
      imageUrl: "/placeholder.svg?height=64&width=64"
    },
    {
      category: "코카콜라",
      title: "5년 후 코카콜라 주가는 어떻게 될까?",
      source: "The Motley Fool",
      date: "2024. 11. 12. 오후 9:21",
      imageUrl: "/placeholder.svg?height=64&width=64"
    },
  ]

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', paddingBottom: '64px' }}>
      <header style={{
        backgroundColor: 'white',
        padding: '16px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>뉴스</h1>
      </header>
      
      <main style={{ paddingTop: '64px', padding: '16px' }}>
        {newsItems.map((item, index) => (
          <NewsItem key={index} {...item} />
        ))}
        {/* Repeated items for demonstration */}
        {[...Array(3)].map((_, index) => (
          <NewsItem key={`repeat-${index}`} {...newsItems[2]} />
        ))}
      </main>
      
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px'
      }}>
        <IconPlaceholder color="#9ca3af" />
        <IconPlaceholder color="#9ca3af" />
        <IconPlaceholder color="#2563eb" />
        <IconPlaceholder color="#9ca3af" />
      </nav>
    </div>
  )
}