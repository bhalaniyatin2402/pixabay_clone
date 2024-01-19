import { useDispatch, useSelector } from "react-redux";

import ModalDownload from "./ImageDownload";
import ModalInformation from "./ImageInformation";
import ModalFooter from "./ModalFooter";
import Loader from "../ui/Loader";
import { setImageDetailModal } from "../../redux/slices/imageSlice";
import { useGetImageDetailsQuery } from "../../redux/services/pixabayApi";

import "../../styles/components/modal/ImageDetailModal.scss";

const fallbackImage = "./fallback-image.jpg";

function ImageDetailModal() {
  const dispatch = useDispatch();
  const { isOpenModal, imageId } = useSelector((state) => state.image);
  const { isFetching, error, data } = useGetImageDetailsQuery(imageId);

  if (!imageId) return;

  if (error) {
    return;
  }

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
            <h3 className="heading-03">Preview ID: {imageId}</h3>
          </div>
          {isFetching ? (
            <Loader />
          ) : (
            <>
              <div className="modal-content">
                <div className="modal-left-content">
                  <img src={data?.webformatURL} />
                </div>
                <div className="modal-right-content">
                  <ModalDownload data={data} />
                  <ModalInformation data={data} />
                </div>
              </div>
              <ModalFooter data={data} />
            </>
          )}
          <div className="modal-action">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                dispatch(setImageDetailModal(false));
              }}
            >
              <img src="./modal-close-square-btn.svg" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageDetailModal;
