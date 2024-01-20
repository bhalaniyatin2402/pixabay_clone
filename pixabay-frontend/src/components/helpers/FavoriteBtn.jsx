import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import {
  useGetFavoriteListQuery,
  useUpdateFavoriteListMutation,
} from "../../redux/services/authApi";

function FavoriteBtn({ className, id }) {
  const { isLoading: loading, error, data } = useGetFavoriteListQuery();
  const [updateFavoriteList, { isLoading }] = useUpdateFavoriteListMutation();

  if (loading || error) return;

  async function handleUpdateFavoriteList(e) {
    e.stopPropagation();
    await updateFavoriteList({ imageId: id });
  }

  return (
    <>
      <div className={`${className} favorite-btn`}>
        <button disabled={loading} onClick={handleUpdateFavoriteList}>
          {data?.favoriteList.includes(id) ? (
            <FaBookmark
              className={`${
                isLoading && " opacity-50"
              } w-[25px] h-[25px] cursor-pointer my-auto`}
            />
          ) : (
            <FaRegBookmark
              className={`${
                isLoading && " opacity-50"
              } w-[25px] h-[25px] cursor-pointer my-auto`}
            />
          )}
        </button>
      </div>
    </>
  );
}

export default FavoriteBtn;
