
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import StoryCard from '@/components/StoryCard'
import LoadingSpinner from '@/components/LoadingSpinner'

function Home() {
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      console.log('Fetching stories from Supabase...')
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(10)
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      console.log('Stories data:', data)
      return data
    }
  })

  console.log('Home component state:', { stories, isLoading, error })

  if (isLoading) return <LoadingSpinner />
  
  if (error) {
    console.error('Error loading stories:', error)
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Có lỗi xảy ra khi tải dữ liệu</p>
        <p className="text-gray-400 text-sm">Lỗi: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Featured Story Section */}
      <div className="bg-zinc-800 p-4 rounded-lg">
        <div className="flex items-start space-x-4">
          <img 
            src="/tu-luyen-gian-luoc-hoa-cong-phap-bat-dau.jpg" 
            alt="Tu Luyện Gián Lược Hóa Công Pháp Bắt Đầu"
            className="w-20 h-28 object-cover rounded"
          />
          <div className="flex-1">
            <h2 className="text-white font-bold text-lg mb-2">Tu Luyện Gián Lược Hóa Công Pháp Bắt Đầu</h2>
            <p className="text-gray-300 text-sm mb-3">Kẻ yếu giờ thăng lên trời gào thiết, không người hỏi thăm, cướng giả nhẹ giông thi thăm, người khác tật cùng tật kinh.</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>3 giờ trước</span>
              <span>2140 chương</span>
              <span className="text-rose-400">Huyền Huyễn</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Nô Lục Cất Ngư</p>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-white mb-1">Tiên Vực</h1>
        <p className="text-gray-400 text-sm">Tham gia kênh chat 💬 Đạp vào tiên lộ</p>
      </div>

      {/* TIN TỨC MỚI NHẤT Section */}
      <section>
        <div className="bg-rose-600 px-4 py-3 rounded-t-lg flex items-center justify-between">
          <h2 className="text-white font-bold text-sm">TIN TỨC MỚI NHẤT</h2>
          <span className="text-white">≫</span>
        </div>
        <div className="bg-zinc-800 p-4 rounded-b-lg">
          <div className="space-y-3">
            <div>
              <p className="text-white font-medium text-sm mb-1">
                Rì sét phố văn 《Chạy mau, văn minh này mở hack rồi》hoàn kết, 《Tu chân chat group》mobile game online
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Hôm nay văn như cũ, chỉ đơn giản nói qua vài tin tức. 1.《Màu chạy, văn minh này mở hack rồi》đã hoàn thành bản văn minh thử luyện của Tích Tích Phú Văn cùng đã kết thúc vào tối qua, vừa trọn hai triệu chữ. Đây là tác phẩm thành tích cao nhất trong mười bản của các tác giả, nhưng tác phẩm trước đều chỉ dừng lại ở...
              </p>
              <p className="text-gray-500 text-xs mt-2">05/27/2025 22:01</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bấm vào để xem 3 truyện đã đọc gần đây */}
      <section>
        <div className="bg-rose-600 px-4 py-3 rounded-t-lg flex items-center justify-between">
          <h2 className="text-white font-bold text-sm">Bấm vào để xem 3 truyện đã đọc gần đây</h2>
          <span className="text-white">≫</span>
        </div>
        <div className="bg-zinc-800 p-4 rounded-b-lg">
          <p className="text-blue-400 text-sm underline">Bấm vào đây xem toàn bộ các truyện đã đọc ≫≫≫</p>
        </div>
      </section>

      {/* ĐƯỢC CẬP NHẬT BỞI QIDIAN-VP Section */}
      <section>
        <div className="bg-rose-600 px-4 py-3 rounded-t-lg flex items-center justify-between">
          <h2 className="text-white font-bold text-sm">ĐƯỢC CẬP NHẬT BỞI QIDIAN-VP</h2>
          <span className="text-white">≫</span>
        </div>
        <div className="bg-zinc-800 p-4 rounded-b-lg">
          {stories && stories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stories.slice(0, 4).map((story) => (
                <div key={story.id} className="flex items-start space-x-3">
                  <img 
                    src={story.cover_image || '/placeholder-book.png'} 
                    alt={story.title}
                    className="w-16 h-22 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">{story.title}</h3>
                    <p className="text-gray-400 text-xs mb-2 line-clamp-2">{story.description}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <span>4 giờ trước</span>
                      <span>{story.total_chapters || 0} chương</span>
                      <span className="text-rose-400">{story.category}</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">{story.author}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Chưa có truyện nào</p>
            </div>
          )}
        </div>
      </section>

      {/* TOP ĐỀ CỬ và TOP LƯỢT ĐỌC Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* TOP ĐỀ CỬ */}
        <section>
          <div className="bg-rose-600 px-4 py-3 rounded-t-lg flex items-center justify-between">
            <h2 className="text-white font-bold text-sm">TOP ĐỀ CỬ</h2>
            <span className="text-white">≫</span>
          </div>
          <div className="bg-zinc-800 p-4 rounded-b-lg">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <img 
                  src="/xich-tam-tuan-thien-150.jpg" 
                  alt="Xích Tâm Tuần Thiên"
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm mb-1">Xích Tâm Tuần Thiên</h3>
                  <p className="text-gray-400 text-xs mb-1">Thời đại thương cố. Yêu tộc tuyệt tích. Thời đại cần cổ.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TOP LƯỢT ĐỌC */}
        <section>
          <div className="bg-rose-600 px-4 py-3 rounded-t-lg flex items-center justify-between">
            <h2 className="text-white font-bold text-sm">TOP LƯỢT ĐỌC</h2>
            <span className="text-white">≫</span>
          </div>
          <div className="bg-zinc-800 p-4 rounded-b-lg">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <img 
                  src="/mu-loa-troc-dao-nhan-bat-dau-max-cap-cuu-duong-than-cong-150.jpg" 
                  alt="Mù Loa Trốc Đạo Nhân: Bắt Đầu Max Cấp Cửu Dương Thần Công"
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm mb-1">Mù Loa Trốc Đạo Nhân: Bắt Đầu Max Cấp Cửu Dương Thần Công</h3>
                  <p className="text-gray-400 text-xs mb-1">Sau khi xuyên việt vô biểu thế giới, thành một...</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
