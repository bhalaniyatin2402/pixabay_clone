import { useDispatch } from "react-redux";
import { setImageId, setImageDetailModal } from "../../redux/slices/imageSlice";

import "../../styles/components/card/ImageCard.scss";

const fallbackImage = "./fallback-image.jpg";

function ImageCard({ data }) {
  const dispatch = useDispatch();

  return (
    <div
      className="image-card"
      onClick={() => {
        dispatch(setImageId(data?.id));
        dispatch(setImageDetailModal(true));
      }}
    >
      <img src={data.webformatURL || fallbackImage} />
      <div className="image-card-tags">
        {data.tags.split(",").map((tag, i) => (
          <p key={i}>{tag.trim()}</p>
        ))}
      </div>
    </div>
  );
}

export default ImageCard;
