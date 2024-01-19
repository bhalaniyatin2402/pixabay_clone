import "../../styles/components/modal/ModalFooter.scss";

function ModalFooter({ data }) {
  return (
    <>
      <div className="modal-footer">
        <h5>Tags: </h5>
        <div className="modal-tag-list">
          {data?.tags?.split(",").map((tag, i) => (
            <p key={i}>{tag.trim()}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default ModalFooter;
