import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ImageCard from "../../components/card/ImageCard";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/ui/Loader";
import { useGetImageListQuery } from "../../redux/services/pixabayApi";
import { setEmptyImageList } from "../../redux/slices/imageSlice";

import "../../styles/pages/home/SearchResult.scss";

function SearchResult({ searchTerm, setSearchTerm }) {
  const dispatch = useDispatch();
  const [suggestionTagList, setSuggestionTagList] = useState([]);
  const { isFetching, error, data } = useGetImageListQuery(searchTerm || "");

  useEffect(() => {}, [searchTerm]);

  useEffect(() => {
    const tagList = [];
    data?.hits?.slice(0, 5).map((item) => {
      item.tags.split(",").map((tagName) => {
        if (!tagList.includes(tagName.trim())) {
          tagList.push(tagName.trim());
        }
      });
    });
    setSuggestionTagList(tagList);
  }, [data]);

  if (isFetching) {
    return (
      <h1 className="search-result-section">
        <Loader />
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="search-result-section text-center mx-auto py-14 text-3xl font-bold">
        something went wrong!
      </h1>
    );
  }

  if (data?.hits.length <= 0) {
    return (
      <h1 className="search-result-section text-center mx-auto py-14 text-3xl font-bold">
        No Results found!
      </h1>
    );
  }

  return (
    <div className="search-result-section">
      <div className="serach-result-suggestion">
        <Layout className="serach-result-layout">
          <div className="suggestion-btns">
            {suggestionTagList.length >= 1 &&
              suggestionTagList.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSearchTerm(item);
                    dispatch(setEmptyImageList());
                  }}
                >
                  {item}
                </button>
              ))}
          </div>
        </Layout>
      </div>
      <Layout>
        <div className="search-result">
          {data?.hits.map((item, i) => (
            <ImageCard data={item} key={i} />
          ))}
        </div>
      </Layout>
    </div>
  );
}

export default SearchResult;
