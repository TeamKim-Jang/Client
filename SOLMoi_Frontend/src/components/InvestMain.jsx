import React from "react";

export default function InvestMain() {
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="p-4 bg-white">
        <h1 className="text-center text-lg mb-6">로고</h1>

        {/* Portfolio Value */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">123,456원</h2>
          <p className="text-blue-600">-33,467 (6.0%)</p>

          <div className="space-y-1 text-right">
            <div className="flex justify-between text-gray-600">
              <span>투자</span>
              <span>2,434.4원</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>현금</span>
              <span>102,234.4원</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stocks List */}
      <div className="p-4 space-y-4">
        <h3 className="text-lg mb-2">주식</h3>

        <div className="bg-white rounded-lg shadow p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <span className="font-medium">삼성전자</span>
              </div>
              <span className="text-sm text-gray-500">11.25 SSG</span>
            </div>
            <div className="text-right">
              <div>2,4234원</div>
              <div className="text-red-500">-2493.4 (5.7%)</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                  <span>N</span>
                </div>
                <span className="font-medium">네이버</span>
              </div>
              <span className="text-sm text-gray-500">14 NVR</span>
            </div>
            <div className="text-right">
              <div>55512원</div>
              <div className="text-red-500">-23.4 (1.7%)</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">이마트</span>
              </div>
              <span className="text-sm text-gray-500">20 EMT</span>
            </div>
            <div className="text-right">
              <div>19273원</div>
              <div className="text-red-500">-2344 (15.7%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <h3 className="text-lg mb-4">쓸방울 모으기</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center space-y-2">
            <div className="w-6 h-6 border-2 border-gray-600 rounded-full"></div>
            <span className="text-sm">출석체크 하러가기</span>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center space-y-2">
            <div className="w-6 h-6 border-2 border-gray-600"></div>
            <span className="text-sm">오를까? 내릴까?</span>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center space-y-2">
            <div className="w-6 h-6 border-2 border-gray-600"></div>
            <span className="text-sm">금융뉴스 읽기</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around p-4">
          <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
