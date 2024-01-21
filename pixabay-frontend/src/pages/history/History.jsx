import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import Layout from "../../components/layout/Layout";
import Loader from "../../components/ui/Loader";
import {
  useGetDownloadHistoryQuery,
  useRemoveFromDownloadHistoryMutation,
} from "../../redux/services/authApi";

function History() {
  const { isLoading, error, data } = useGetDownloadHistoryQuery();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectedHistoryIds, setSelectedHistoryIds] = useState([]);
  const [removeFromDownload, { isLoading: loading }] =
    useRemoveFromDownloadHistoryMutation();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
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

  let columns = [
    { field: "id", headerName: "SR.", width: 70 },
    { field: "filename", headerName: "NAME", width: 200 },
    { field: "imageId", headerName: "PREVIEW ID", width: 150 },
    { field: "width", headerName: "WIDTH", width: 100 },
    { field: "height", headerName: "HEIGHT", width: 100 },
    { field: "date", headerName: "DATE", width: 130 },
    { field: "time", headerName: "TIME", width: 100 },
  ];

  function handleSelectionModeOnChange(selectionModel) {
    setSelectionModel(selectionModel);
    const ids = selectionModel.map((item) => {
      return data.history.find((i) => i.id === item)._id;
    });
    setSelectedHistoryIds(ids);
  }

  async function handleRemoveHistory() {
    await removeFromDownload({
      historyIds: selectedHistoryIds,
    });
    setSelectionModel([]);
  }

  return (
    <Layout>
      <h1 className="text-center text-xl sm:text-2xl font-bold my-3">
        Download History
      </h1>
      {data?.history?.length === 0 ? (
        <h4 className="text-xl font-bold text-center">
          Empty Download History.
        </h4>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <div className="employee-table-btn flex justify-end">
            <button
              className="btn btn-sm btn-error p-2 h-[20px] m-2 font-bold tracking-wider"
              disabled={selectedHistoryIds.length == 0 || loading}
              onClick={handleRemoveHistory}
            >
              Delete
            </button>
          </div>
          <DataGrid
            rows={data.history}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={handleSelectionModeOnChange}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      )}
    </Layout>
  );
}

export default History;
