
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import LoadingSpinner from '@/components/LoadingSpinner'

function StoryDetail() {
  const { slug } = useParams<{ slug: string }>()

  const { data: story, isLoading } = useQuery({
    queryKey: ['story', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('slug', slug)
        .single()
      
      if (error) throw error
      return data
    },
    enabled: !!slug
  })

  const { data: chapters } = useQuery({
    queryKey: ['chapters', story?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .eq('story_id', story?.id)
        .order('chapter_number', { ascending: true })
      
      if (error) throw error
      return data
    },
    enabled: !!story?.id
  })

  if (isLoading) return <LoadingSpinner />

  if (!story) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Không tìm thấy truyện</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">{story.title}</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <img 
              src={story.cover_image || '/placeholder-book.png'} 
              alt={story.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:col-span-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-300">Tác giả:</h3>
                <p>{story.author}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-300">Mô tả:</h3>
                <p className="text-gray-300 leading-relaxed">{story.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-300">Trạng thái:</h3>
                <p>{story.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Danh sách chương</h2>
        <div className="space-y-2">
          {chapters?.map((chapter) => (
            <div 
              key={chapter.id}
              className="p-3 bg-zinc-700 rounded hover:bg-zinc-600 cursor-pointer"
            >
              <p className="font-medium">Chương {chapter.chapter_number}: {chapter.title}</p>
              <p className="text-sm text-gray-400">{new Date(chapter.created_at).toLocaleDateString('vi-VN')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StoryDetail
