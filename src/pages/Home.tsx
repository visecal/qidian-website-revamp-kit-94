
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
    <div>
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Tiên Vực</h1>
        <p className="text-gray-300">Tham gia kênh chat 💬 Đạp vào tiên lộ</p>
      </div>

      {/* Featured Section */}
      <section className="mb-8">
        <div className="bg-rose-800 p-4 rounded-t-lg">
          <h2 className="text-white font-bold text-lg">TRUYỆN MỚI CẬP NHẬT</h2>
        </div>
        <div className="bg-zinc-700 p-4 rounded-b-lg">
          {stories && stories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {stories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Chưa có truyện nào</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-8">
        <div className="bg-rose-800 p-4 rounded-t-lg">
          <h2 className="text-white font-bold text-lg">DANH MUC TRUYỆN</h2>
        </div>
        <div className="bg-zinc-700 p-4 rounded-b-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-zinc-600 p-4 rounded-lg text-center hover:bg-zinc-500 transition-colors cursor-pointer">
              <h3 className="font-semibold text-white">Tiên Hiệp</h3>
              <p className="text-gray-300 text-sm">Tu tiên, tu chân</p>
            </div>
            <div className="bg-zinc-600 p-4 rounded-lg text-center hover:bg-zinc-500 transition-colors cursor-pointer">
              <h3 className="font-semibold text-white">Huyền Huyễn</h3>
              <p className="text-gray-300 text-sm">Huyền bí, thần thoại</p>
            </div>
            <div className="bg-zinc-600 p-4 rounded-lg text-center hover:bg-zinc-500 transition-colors cursor-pointer">
              <h3 className="font-semibold text-white">Đô Thị</h3>
              <p className="text-gray-300 text-sm">Hiện đại, đời thường</p>
            </div>
            <div className="bg-zinc-600 p-4 rounded-lg text-center hover:bg-zinc-500 transition-colors cursor-pointer">
              <h3 className="font-semibold text-white">Ngôn Tình</h3>
              <p className="text-gray-300 text-sm">Tình cảm, lãng mạn</p>
            </div>
            <div className="bg-zinc-600 p-4 rounded-lg text-center hover:bg-zinc-500 transition-colors cursor-pointer">
              <h3 className="font-semibold text-white">Khoa Huyễn</h3>
              <p className="text-gray-300 text-sm">Khoa học viễn tưởng</p>
            </div>
            <div className="bg-zinc-600 p-4 rounded-lg text-center hover:bg-zinc-500 transition-colors cursor-pointer">
              <h3 className="font-semibold text-white">Lịch Sử</h3>
              <p className="text-gray-300 text-sm">Cổ đại, lịch sử</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-zinc-700 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-rose-500">{stories?.length || 0}</div>
            <div className="text-gray-300 text-sm">Truyện đang có</div>
          </div>
          <div className="bg-zinc-700 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-500">10K+</div>
            <div className="text-gray-300 text-sm">Chương đã đăng</div>
          </div>
          <div className="bg-zinc-700 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-500">1K+</div>
            <div className="text-gray-300 text-sm">Độc giả</div>
          </div>
          <div className="bg-zinc-700 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-500">24/7</div>
            <div className="text-gray-300 text-sm">Cập nhật</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
