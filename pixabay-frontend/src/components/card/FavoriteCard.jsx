import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";

import { useUpdateFavoriteListMutation } from "../../redux/services/authApi";
import { setImageDetailModal, setImageId } from "../../redux/slices/imageSlice";

import "../../styles/components/card/FavoriteCard.scss";

function FavoriteCard({ favoriteList, id }) {
  const dispatch = useDispatch();
  const [updateFavoriteList, { isLoading }] = useUpdateFavoriteListMutation();

  async function handleUpdateFavoriteList(e) {
    e.stopPropagation();
    await updateFavoriteList({ imageId: id });
  }

  function handleFavoriteCardClick() {
    dispatch(setImageDetailModal(true));
    dispatch(setImageId(id));
  }

  return (
    <>
      <div className="favorite-card" onClick={handleFavoriteCardClick}>
        <h5>
          Id:
          <span>{id}</span>
        </h5>
        <button disabled={isLoading} onClick={handleUpdateFavoriteList}>
          <MdDelete
            className={`${
              isLoading && " opacity-50"
            } w-[25px] h-[25px] cursor-pointer my-auto`}
          />
        </button>
      </div>
    </>
  );
}

export default FavoriteCard;
