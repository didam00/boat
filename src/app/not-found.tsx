export default function NotFound() {
  return (
    <div className="m__size">
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        translate: "-50% -50%",
      }}>
        <h1>요청하신 페이지를 찾을 수 없습니다</h1>
        <p>404 Not Found. 주소가 맞는지 다시 한번 확인해보세요.</p>
      </div>
    </div>
  )
}