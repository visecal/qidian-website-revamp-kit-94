
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import StoryCard from '@/components/StoryCard'
import LoadingSpinner from '@/components/LoadingSpinner'

function Stories() {
  const { data: stories, isLoading } = useQuery({
    queryKey: ['all-stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tất cả truyện</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {stories?.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  )
}

export default Stories
