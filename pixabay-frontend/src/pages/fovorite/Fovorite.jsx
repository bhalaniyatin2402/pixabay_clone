import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import Loader from "../../components/ui/Loader";
import FavoriteCard from "../../components/card/FavoriteCard";
import { useGetFavoriteListQuery } from "../../redux/services/authApi";

import "../../styles/pages/Favorite.scss";

function Favorite() {
  const { isLooggedIn } = useSelector(state => state.auth)
  const { isLoading, error, data } = useGetFavoriteListQuery();

  if(!isLooggedIn) {
    return <Navigate to="/" />
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <h1 className="search-result-section text-center mx-auto py-14 text-3xl font-bold">
        something went wrong!
      </h1>
    );
  }

  return (
    <>
      <Layout>
        <div className="favorite-page">
          <h1>Favorite Items</h1>
          <div className="favorite-list">
            {data.favoriteList.length === 0 ? (
              <h4 className="text-xl font-bold text-center">
                Empty Favorite List.
              </h4>
            ) : (
              data.favoriteList.map((id) => (
                <FavoriteCard
                  favoriteList={data?.favoriteList}
                  id={id}
                  key={id}
                />
              ))
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Favorite;
