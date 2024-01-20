import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";

import Layout from "../../components/layout/Layout";
import { useGetBgImageQuery } from "../../redux/services/pixabayApi";
import { setEmptyImageList } from "../../redux/slices/imageSlice";

import "../../styles/pages/home/HeroBanner.scss";

function HeroBanner({ searchTerm, setSearchTerm }) {
  const dispatch = useDispatch();
  const [bgImage, setBgImage] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { isLoading, data } = useGetBgImageQuery();

  useEffect(() => {
    if (!isLoading) {
      setBgImage(data);
    }
  }, [isLoading]);

  useEffect(() => {}, [searchTerm]);

  return (
    <div className="hero-banner-section">
      <Layout>
        <div className="hero-banner-background">
          <img src={bgImage && bgImage} />
        </div>
        <div className="hero-banner-opacity-layer"></div>
        <Layout>
          <div className="hero-banner-content">
            <h1>Discover over 2,000,000 free Stock Images</h1>
            <div className="search-box">
              <div className="search-input">
                <CiSearch className="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] ms-1 me-2" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  maxLength={35}
                />
                <button
                  onClick={() => {
                    dispatch(setEmptyImageList());
                    setSearchTerm(searchInput);
                    setSearchInput("");
                  }}
                >
                  GO!
                </button>
              </div>
              {searchTerm.length <= 0 ? (
                <div className="trending">
                  <p>
                    Trending: <span>flowers, love, forest, river</span>
                  </p>
                </div>
              ) : (
                <div className="result-title">Results: {searchTerm}</div>
              )}
            </div>
          </div>
        </Layout>
      </Layout>
    </div>
  );
}

export default HeroBanner;
