
import { Link } from 'react-router-dom'

interface Story {
  id: string
  title: string
  slug: string
  author?: string
  cover_image?: string
  status?: string
}

interface StoryCardProps {
  story: Story
}

function StoryCard({ story }: StoryCardProps) {
  return (
    <Link to={`/truyen/${story.slug}`} className="block group">
      <div className="bg-zinc-600 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <div className="aspect-[3/4] bg-zinc-500">
          {story.cover_image ? (
            <img 
              src={story.cover_image} 
              alt={story.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-xs">Không có ảnh</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 mb-1">{story.title}</h3>
          {story.author && (
            <p className="text-xs text-gray-400">{story.author}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default StoryCard
