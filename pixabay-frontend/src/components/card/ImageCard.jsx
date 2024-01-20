import { useDispatch } from "react-redux";
import { setImageId, setImageDetailModal } from "../../redux/slices/imageSlice";

import FavoriteBtn from "../helpers/FavoriteBtn";

import "../../styles/components/card/ImageCard.scss";

const fallbackImage = "/fallback-image.jpg";

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
      <FavoriteBtn
        id={data?.id}
        className={`absolute top-3 right-3 z-20 bg-[#ffff] p-1 pb-0 rounded-lg`}
      />
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
