
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400 text-sm">Đang tải dữ liệu...</p>
    </div>
  )
}

export default LoadingSpinner
