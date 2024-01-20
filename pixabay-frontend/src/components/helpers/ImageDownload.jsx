import { useEffect, useRef, useState } from "react";
import Resizer from "react-image-file-resizer";

import "../../styles/components/helpers/ImageDownload.scss";

function ImageDownload({ data }) {
  const customRef = useRef();
  const [selectedSize, setSelectedSize] = useState("small");
  const [downloading, setDownloading] = useState(false);
  const [imageDetails, setImageDetails] = useState({
    originalWidth: null,
    originalHeight: null,
    smallHeigt: null,
    mediumHeight: null,
    largeHeight: null,
  });
  const [dimension, setDimension] = useState({
    width: "",
    height: "",
  });

  useEffect(() => {
    const ratio = data?.imageWidth / data?.imageHeight;

    setImageDetails({
      originalWidth: data?.imageWidth,
      originalHeight: data?.imageHeight,
      smallHeigt: 640 / ratio,
      mediumHeight: 1280 / ratio,
      largeHeight: 1920 / ratio,
    });
  }, []);

  // fetch image from url and get blob data
  async function getImageFromUrl(url) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();

      if (selectedSize === "small" || selectedSize === "medium") {
        downloadImage(blob);
      } else {
        resizeImageFromBlob(blob);
      }
    } catch (error) {
      console.log("getImageFromUrl error: ", error);
    }
  }

  // resize image blob data using react-image-file-resizer
  function resizeImageFromBlob(blob) {
    try {
      Resizer.imageFileResizer(
        blob,
        dimension.width,
        dimension.height,
        blob?.type.split("/")[1],
        100,
        0,
        (uri) => {
          changeImageDetailsProperty(uri);
        },
        "blob"
      );
    } catch (error) {
      console.log("resizeImageFromUrl error: ", error);
    }
  }

  // change image details of new resize blob data using canvas
  function changeImageDetailsProperty(resizedBlob) {
    try {
      // create a new canvas element and get drewing tools
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // create new image element and assign new blob data to src
      const image = new Image();
      image.src = URL.createObjectURL(resizedBlob);

      image.onload = () => {
        // set width and height of canvas
        canvas.width = dimension.width;
        canvas.height = dimension.height;

        // draw an image on canvas with specifc width
        ctx.drawImage(image, 0, 0, dimension.width, dimension.height);

        // convert canvas into blob data
        canvas.toBlob(
          (blob) => {
            downloadImage(blob);
          },
          resizedBlob.type,
          1
        );
      };
    } catch (error) {
      console.log("change image propert error: ", error);
    }
  }

  // download image from blob data by creating an a tag
  async function downloadImage(blob) {
    const fileName = data?.tags?.split(",")[0];

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download =
      `${fileName}_${Math.round(Math.random() * 1000)}_${selectedSize}` ||
      `resized_image_${selectedSize}`;
    link.click();
    setDownloading(false);
  }

  function handleDownload() {
    setDownloading(true);
    if (selectedSize === "small") {
      getImageFromUrl(data?.webformatURL);
    } else {
      getImageFromUrl(data?.largeImageURL);
    }
  }

  function handleCustomSizeClick() {
    const custElem = customRef.current;
    setDimension({
      width: custElem.childNodes[0].value,
      height: custElem.childNodes[2].value,
    });
  }

  function handleCustomInputChange(e) {
    let inputValue = e.target.value;

    if (inputValue <= 1) {
      inputValue = 1;
    } else if (inputValue >= 7000) {
      inputValue = 7000;
    }
    setDimension((state) => ({
      ...state,
      [e.target.name]: inputValue,
    }));
  }

  return (
    <>
      <div className="modal-download-section">
        <h3 className="heading-03">Download</h3>
        <div className="download-list">
          <div
            className={`download-item ${
              selectedSize === "small" && "download-item-selected"
            } download-item-top border`}
            onClick={() => setSelectedSize("small")}
          >
            <p className="download-name">Small</p>
            <div className="download-select">
              <p>640x{Math.round(imageDetails.smallHeigt)}</p>
              <img
                src={`/checked-${
                  selectedSize === "small" ? "true" : false
                }.svg`}
              />
            </div>
          </div>
          <div
            className={`download-item ${
              selectedSize === "medium" && "download-item-selected"
            } border`}
            onClick={() => setSelectedSize("medium")}
          >
            <p className="download-name">Medium</p>
            <div className="download-select">
              <p>1280x{Math.round(imageDetails.mediumHeight)}</p>
              <img
                src={`/checked-${
                  selectedSize === "medium" ? "true" : false
                }.svg`}
                alt=""
              />
            </div>
          </div>
          <div
            className={`download-item ${
              selectedSize === "big" && "download-item-selected"
            } border`}
            onClick={() => {
              setSelectedSize("big");
              setDimension({ width: 1920, height: imageDetails.largeHeight });
            }}
          >
            <p className="download-name">Big</p>
            <div className="download-select">
              <p>1920x{Math.round(imageDetails.largeHeight)}</p>
              <img
                src={`/checked-${selectedSize === "big" ? "true" : false}.svg`}
                alt=""
              />
            </div>
          </div>
          <div
            className={`download-item ${
              selectedSize === "original" && "download-item-selected"
            } border`}
            onClick={() => {
              setSelectedSize("original");
              setDimension({
                width: imageDetails.originalWidth,
                height: imageDetails.originalHeight,
              });
            }}
          >
            <p className="download-name">Original</p>
            <div className="download-select">
              <p>
                {imageDetails.originalWidth}x{imageDetails.originalHeight}
              </p>
              <img
                src={`/checked-${
                  selectedSize === "original" ? "true" : false
                }.svg`}
                alt=""
              />
            </div>
          </div>
          <div
            className={`download-item ${
              selectedSize === "custom" && "download-item-selected"
            } download-item-bottom border`}
            onClick={() => {
              setSelectedSize("custom");
              handleCustomSizeClick();
            }}
          >
            <p className="download-name">Custom</p>
            <div className="download-select">
              <p ref={customRef}>
                <input
                  type="number"
                  name="width"
                  value={Math.round(dimension.width)}
                  placeholder="eg: 900"
                  onChange={handleCustomInputChange}
                />
                x
                <input
                  type="number"
                  name="height"
                  placeholder="eg: 460"
                  value={Math.round(dimension.height)}
                  onChange={handleCustomInputChange}
                />
              </p>
              <img
                src={`./checked-${
                  selectedSize === "custom" ? "true" : false
                }.svg`}
                alt=""
              />
            </div>
          </div>
        </div>
        <button
          className={`${
            downloading ? "bg-gray-500" : "bg-[#4bc34b]"
          } download-btn`}
          onClick={() => handleDownload()}
          disabled={downloading}
        >
          {downloading && (
            <span className="loading loading-spinner loading-md"></span>
          )}
          Download for free
        </button>
      </div>
    </>
  );
}

export default ImageDownload;
