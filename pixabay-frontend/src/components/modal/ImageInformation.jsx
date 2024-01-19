import "../../styles/components/modal/ImageInformation.scss";

function ImageInformation({ data }) {
  return (
    <>
      <div className="modal-information-section">
        <h3 className="heading-03">Information</h3>
        <div className="modal-information-list">
          <div className="modal-information-item">
            <p>User</p>
            <p>{data.user}</p>
          </div>
          <div className="modal-information-item">
            <p>User ID</p>
            <p>{data?.user_id}</p>
          </div>
          <div className="modal-information-item">
            <p>Type</p>
            <p>{data?.type}</p>
          </div>
          <div className="modal-information-item">
            <p>Views</p>
            <p>{data?.views}</p>
          </div>
          <div className="modal-information-item">
            <p>Downloads</p>
            <p>{data?.downloads}</p>
          </div>
          <div className="modal-information-item">
            <p>Likes</p>
            <p>{data?.likes}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageInformation;
