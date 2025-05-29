
import { Link } from 'react-router-dom'

interface Story {
  id: string
  title: string
  slug: string
  author?: string
  cover_image?: string
  status?: string
  category?: string
  total_chapters?: number
  description?: string
}

interface StoryCardProps {
  story: Story
}

function StoryCard({ story }: StoryCardProps) {
  return (
    <Link to={`/truyen/${story.slug}`} className="block group">
      <div className="bg-zinc-600 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
        <div className="aspect-[3/4] bg-zinc-500 relative">
          {story.cover_image ? (
            <img 
              src={story.cover_image} 
              alt={story.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-full h-full flex items-center justify-center text-gray-400 ${story.cover_image ? 'hidden' : ''}`}>
            <div className="text-center">
              <div className="text-2xl mb-2">📚</div>
              <span className="text-xs">Không có ảnh</span>
            </div>
          </div>
          
          {/* Status badge */}
          {story.status && (
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                story.status === 'completed' ? 'bg-green-500 text-white' : 
                story.status === 'ongoing' ? 'bg-blue-500 text-white' : 
                'bg-gray-500 text-white'
              }`}>
                {story.status === 'completed' ? 'Hoàn thành' : 
                 story.status === 'ongoing' ? 'Đang ra' : 
                 story.status}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 mb-2 text-white group-hover:text-rose-400 transition-colors">
            {story.title}
          </h3>
          
          {story.author && (
            <p className="text-xs text-gray-400 mb-1">Tác giả: {story.author}</p>
          )}
          
          {story.category && (
            <p className="text-xs text-rose-400 mb-1">Thể loại: {story.category}</p>
          )}
          
          {story.total_chapters && (
            <p className="text-xs text-gray-400">
              {story.total_chapters} chương
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default StoryCard
