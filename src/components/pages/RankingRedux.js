import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import * as selectors from "../../store/selectors";
import { getNFTsByFilter } from "../../store/actions/thunks";
import Stats from "./Stats";


const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  #quick_search{
    padding: 4px 11px;
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    font-size: 15px;
    background: rgba(131, 100, 226, 0.1);
    width: 600px;
    height: 40px;
    outline: none;
    margin-right: 10px;
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const customStyles = {
  option: (base, state) => ({
    ...base,
    background: "#fff",
    color: "#727272",
    borderRadius: state.isFocused ? "0" : 0,
    "&:hover": {
      background: "#ddd",
    },
  }),
  menu: (base) => ({
    ...base,
    background: "#fff !important",
    borderRadius: 0,
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  control: (base, state) => ({
    ...base,
    padding: 2,
  }),
};

const options = [
  { value: "7d", label: "Last 7 days" },
  { value: "1d", label: "Last 24 hours" },
  { value: "30d", label: "Last 30 days" },
  { value: "all_time", label: "All time" },
];

const RankingRedux = () => {
  const dispatch = useDispatch();

  const collectionState = useSelector(selectors.collectionState);
  const [collections, setCollections] = useState(null);
  const [searchInputChange, setSearchInputChange] = useState("");
  const [timeRange, setTimeRange] = useState("24h %");
  const [collectionId, setCollectionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTimeRange, setSelectedTimeRange] = useState("oneDayChange");

  const [showCollectionStats, setShowCollectionStats] = useState(false);
  const collectionLoadingState = useSelector(selectors.collectionStateLoading);

  useEffect(() => {
    setCollections(collectionState ? collectionState.data?.data : []);
  }, [collectionState]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchItems(searchInputChange);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInputChange]);

  const searchItems = (searchValue) => {
    if (searchValue !== "") {
      const filteredData = collectionState.data?.data.filter((collection) => {
        return collection.collectionName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setCollections(filteredData);
    } else {
      setCollections(collectionState.data?.data);
    }
  };

  useEffect(() => {
    dispatch(getNFTsByFilter("1d"));
  }, []);
  const handleSelection = (val) => {
    if (val.value === "7d") {
      setTimeRange("7D%");
      setSelectedTimeRange("sevenDayChange");
    } else if (val.value === "1d") {
      setTimeRange("24h%");
      setSelectedTimeRange("oneDayChange");
    } else {
      setTimeRange("30D%");
      setSelectedTimeRange("thirtyDayChange");
    }
    dispatch(getNFTsByFilter(val.value));
  };

  const showStats = (id) => {
    setShowCollectionStats(true);
    setCollectionId(id);
  };

  const handleCloseClick = (val) => { 
    setShowCollectionStats(false);
  }

  const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
  }

  return (
    <div>
      <GlobalStyles />
      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Top NFTs</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter centerEl">
              <div className="dropdownSelect one">
                <Select
                  className="select1"
                  styles={customStyles}
                  menuContainerStyle={{ zIndex: 999 }}
                  defaultValue={options[1]}
                  onChange={handleSelection}
                  options={options}
                />
              </div>
              <input
                id="quick_search"
                className="select1"
                name="quick_search"
                placeholder="search item here..."
                type="text"
                onChange={(e) => setSearchInputChange(e.target.value)}
              />
            </div>
            {showCollectionStats && <Stats handleClose={handleCloseClick} collectionId={collectionId}/>}
            <table
              className={
                showCollectionStats
                  ? "de-table-compressed table-rank-compressed"
                  : "de-table table-rank" 
              }
            >
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Collection</th>
                  <th scope="col">Volume<img src="../../../public/img/arrow-up.webp" alt=""></img><img src="../../../public/img/arrow-up.webp" alt=""></img></th>
                  <th scope="col">{timeRange}</th>
                  <th scope="col">Floor Price</th>
                  <th scope="col">Owners</th>
                  <th scope="col">Supply</th>
                </tr>
                <tr></tr>
              </thead>
              {collectionLoadingState ? (
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="loader">
                    Loading....
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {collections &&
                    collections.map((collection, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <th scope="row">
                          <div
                            className="coll_list_pp"
                            onClick={() => {
                              showStats(collection.id);
                            }}
                          >
                            <img
                              className="lazy"
                              src={
                                collection.awsBucketImageUrl
                                  ? collection.awsBucketImageUrl
                                  : collection.externalImageUrl
                              }
                              alt=""
                            />
                            {collection.safelistRequestStatus ? (
                              <i className="fa fa-check"></i>
                            ) : (
                              ""
                            )}
                          </div>
                          {collection.collectionName}
                        </th>
                        <td>{kFormatter(collection.stats.totalVolume)}</td>
                        <td className={collection.stats.oneDayChange < 0 ? "d-min" : "d-plus"}>{`${collection.stats.oneDayChange < 0 ? '' : '+'}${collection.stats.oneDayChange}%`}</td>
                        <td>{kFormatter(collection.stats.floorPrice)}</td>
                        <td>{kFormatter(collection.stats.numOwners)}</td>
                        <td>{kFormatter(collection.stats.totalSupply)}</td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
            <div className="spacer-double"></div>
            <ul className="pagination justify-content-center">
              <li className="active">
                <span>1 - 100</span>
              </li>
              <li>
                <span className="twenty">21 - 40</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default memo(RankingRedux);
