import { useDispatch, useSelector } from "react-redux";

import Loader from "../ui/Loader";
import ModalDownload from "../helpers/ImageDownload";
import ModalInformation from "../helpers/ImageInformation";
import ImageTags from "../helpers/ImageTags";
import FavoriteBtn from "../helpers/FavoriteBtn";
import { setImageDetailModal } from "../../redux/slices/imageSlice";
import { useGetImageDetailsQuery } from "../../redux/services/pixabayApi";

import "../../styles/components/modal/ImageDetailModal.scss";

const fallbackImage = "/fallback-image.jpg";

function ImageDetailModal() {
  const dispatch = useDispatch();
  const { isOpenModal, imageId } = useSelector((state) => state.image);
  const { isFetching, error, data } = useGetImageDetailsQuery(imageId);

  if (!imageId) return;

  if (error) {
    dispatch(setImageDetailModal(false));
  }

  return (
    <>
      <input
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
        checked={isOpenModal}
      />
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="modal-header">
            <h3 className="heading-03 hidden sm:block">
              Preview ID: {imageId}
            </h3>
            <h3 className="heading-03 sm:hidden">ID: {imageId}</h3>
            <FavoriteBtn id={imageId} className="absolute right-[55px] top-3" />
          </div>
          {isFetching ? (
            <Loader />
          ) : (
            <>
              <div className="modal-content">
                <div className="modal-left-content">
                  <img src={data?.webformatURL || fallbackImage} />
                </div>
                <div className="modal-right-content">
                  <ModalDownload data={data} />
                  <ModalInformation data={data} />
                </div>
              </div>
              <ImageTags data={data} />
            </>
          )}
          <div className="modal-action">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                dispatch(setImageDetailModal(false));
              }}
            >
              <img src="/modal-close-square-btn.svg" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageDetailModal;
