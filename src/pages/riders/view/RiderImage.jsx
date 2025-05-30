import { useState } from 'react';
import { FaUser } from 'react-icons/fa';


const RenderImage = ({ imageUrl }) => {
  const [loading, setLoading] = useState(!!imageUrl);
  const [error, setError] = useState(false);

  // If no image URL at all, show fallback immediately
  if (!imageUrl) {
    return (
      <div className="h-20 w-15 flex items-center justify-center rounded-full">
        <FaUser className="flex text-orange-500 h-[60px] w-[90px]" />
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className="h-20 w-15 flex items-center justify-center bg-gray-200 rounded-full text-xs text-gray-500">
          Loading...
        </div>
      )}
      <div className="h-20 w-15 flex items-center justify-center rounded-full">
        <img
          src={imageUrl}
          alt="Rider"
          className="h-20 w-15  object-cover rounded-full"
          style={{ display: loading ? 'none' : 'block' }}
          onLoad={() => setLoading(false)}
          onError={(e) => {
            setError(true);
            setLoading(false);
            e.target.src = userFallbackImage;
          }}
        />
      </div>
    </>
  );
};

export default RenderImage;
