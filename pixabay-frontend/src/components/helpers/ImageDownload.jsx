import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";

import { useAddIntoDownloadHistoryMutation } from "../../redux/services/authApi";

import "../../styles/components/helpers/ImageDownload.scss";

function ImageDownload({ data }) {
  const [saveToDownloadHistory, { isLoading }] =
    useAddIntoDownloadHistoryMutation();
  const [selectedSize, setSelectedSize] = useState("small");
  const [downloading, setDownloading] = useState(false);
  const [customSizeError, setCustomSizeError] = useState();
  const [imageDetails, setImageDetails] = useState({
    originalWidth: null,
    originalHeight: null,
    smallHeigt: null,
    mediumHeight: null,
    largeHeight: null,
  });
  const [dimension, setDimension] = useState({
    width: 640,
    height: Math.round(640 / (data?.imageWidth / data?.imageHeight)),
  });
  const [customDimension, setCustomDimension] = useState({
    width: "",
    height: "",
  });

  useEffect(() => {
    const ratio = data?.imageWidth / data?.imageHeight;

    setImageDetails({
      originalWidth: data?.imageWidth,
      originalHeight: data?.imageHeight,
      smallHeigt: Math.round(640 / ratio),
      mediumHeight: Math.round(1280 / ratio),
      largeHeight: Math.round(1920 / ratio),
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
        selectedSize === "custom" ? customDimension.width : dimension.width,
        selectedSize === "custom" ? customDimension.height : dimension.height,
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
        canvas.width =
          selectedSize === "custom" ? customDimension.width : dimension.width;
        canvas.height =
          selectedSize === "custom" ? customDimension.height : dimension.height;

        // draw an image on canvas with specifc width
        ctx.drawImage(
          image,
          0,
          0,
          selectedSize === "custom" ? customDimension.width : dimension.width,
          selectedSize === "custom" ? customDimension.height : dimension.height
        );

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
  // save into the download into history
  async function downloadImage(blob) {
    const fileName = data?.tags?.split(",")[0];
    let custFileName =
      `${fileName}_${Math.round(Math.random() * 1000)}_${selectedSize}` ||
      `resized_image_${selectedSize}`;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = custFileName;
    link.click();
    await saveToDownloadHistory({
      imageId: data?.id,
      width:
        selectedSize === "custom" ? customDimension.width : dimension.width,
      height:
        selectedSize === "custom" ? customDimension.height : dimension.height,
      filename: custFileName,
    });
    setDownloading(false);
  }

  function handleDownload() {
    if (selectedSize === "custom") {
      if (customDimension.width < 10 || customDimension.height < 10) {
        return setCustomSizeError(true);
      } else if (
        customDimension.width > 7000 ||
        customDimension.height > 7000
      ) {
        return setCustomSizeError(true);
      } else {
        setCustomSizeError(false);
      }
    }
    setDownloading(true);
    if (selectedSize === "small") {
      getImageFromUrl(data?.webformatURL);
    } else {
      getImageFromUrl(data?.largeImageURL);
    }
  }

  function handleCustomInputChange(e) {
    let inputValue = e.target.value;

    setCustomDimension((state) => ({
      ...state,
      [e.target.name]: inputValue,
    }));
  }

  return (
    <>
      <div className="modal-download-section relative">
        <h3 className="heading-03">Download</h3>
        <div className="download-list">
          <div
            className={`download-item ${
              selectedSize === "small" && "download-item-selected"
            } download-item-top border`}
            onClick={() => {
              setSelectedSize("small");
              setDimension({ width: 640, height: imageDetails.smallHeigt });
            }}
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
            onClick={() => {
              setSelectedSize("medium");
              setDimension({ width: 1280, height: imageDetails.mediumHeight });
            }}
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
            }}
          >
            <p className="download-name">Custom</p>
            <div className="download-select">
              <p>
                <input
                  type="number"
                  name="width"
                  value={customDimension.width}
                  placeholder="eg: 900"
                  onChange={handleCustomInputChange}
                />
                x
                <input
                  type="number"
                  name="height"
                  placeholder="eg: 460"
                  value={customDimension.height}
                  onChange={handleCustomInputChange}
                />
              </p>
              <img
                src={`/checked-${
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
        {selectedSize === "custom" && customSizeError && (
          <p className="text-red-600 absolute -bottom-[22px]">
            value must in b/w 10 and 7000
          </p>
        )}
      </div>
    </>
  );
}

export default ImageDownload;
