
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import StoryCard from '@/components/StoryCard'
import LoadingSpinner from '@/components/LoadingSpinner'

function Home() {
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .limit(10)
      
      if (error) throw error
      return data
    }
  })

  if (isLoading) return <LoadingSpinner />
  
  if (error) {
    console.error('Error loading stories:', error)
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Có lỗi xảy ra khi tải dữ liệu</p>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Tiên Vực</h1>
        <p className="text-gray-300">Tham gia kênh chat 💬 Đạp vào tiên lộ</p>
      </div>

      <section className="mb-8">
        <div className="bg-rose-800 p-3 rounded-t">
          <h2 className="text-white font-semibold">TRUYỆN MỚI CẬP NHẬT</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 bg-zinc-700 rounded-b">
          {stories?.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {!stories?.length && (
        <div className="text-center py-12">
          <p className="text-gray-400">Chưa có truyện nào</p>
        </div>
      )}
    </div>
  )
}

export default Home
