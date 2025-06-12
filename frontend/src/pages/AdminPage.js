import React, { useState } from 'react';

export default function AdminPage() {
  const [pw, setPw] = useState('');
  const [authed, setAuthed] = useState(false);
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const correctPassword = 'jdx3882'; // 실제 서비스는 환경변수/백엔드 인증 필요

  const handleLogin = async (e) => {
    e.preventDefault();
    if (pw === correctPassword) {
      setAuthed(true);
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          'https://kwy0jqwi63.execute-api.us-west-1.amazonaws.com/dev/estimate'
        );
        const data = await res.json();
        setEstimates(data);
      } catch (err) {
        setError('데이터를 불러오지 못했습니다.');
      }
      setLoading(false);
    } else {
      setError('비밀번호가 틀렸습니다.');
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">관리자 로그인</h1>
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow flex flex-col gap-4">
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 rounded">
            로그인
          </button>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">Free Estimation 신청 내역</h1>
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">이름</th>
                <th className="border px-3 py-2">이메일</th>
                <th className="border px-3 py-2">연락처</th>
                <th className="border px-3 py-2">주소</th>
                <th className="border px-3 py-2">Visiting Day</th>
                <th className="border px-3 py-2">Visiting Hours</th>
                <th className="border px-3 py-2">요청일</th>
              </tr>
            </thead>
            <tbody>
              {estimates.map((e, i) => (
                <tr key={i}>
                  <td className="border px-3 py-2">
                    {e.first_name} {e.last_name}
                  </td>
                  <td className="border px-3 py-2">{e.email}</td>
                  <td className="border px-3 py-2">{e.phone}</td>
                  <td className="border px-3 py-2">{e.address}</td>
                  <td className="border px-3 py-2">{e.visit_day}</td>
                  <td className="border px-3 py-2">{e.visit_hours}</td>
                  <td className="border px-3 py-2">{e.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {estimates.length === 0 && (
            <div className="text-gray-500 mt-4">신청 내역이 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
