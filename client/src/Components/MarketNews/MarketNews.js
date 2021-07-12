import React from "react";

//Import scss
import "./MarketNews.scss";
//Import SearchInput
import SearchInput from "../StyledComponents/SearchInput";
//Import Axios for API calling
import axios from "axios";
//Import NewsCard
import NewsCard from "./NewsCard";
//Import Custom Util Components
import Card from "../StyledComponents/Card";
import Snackbar from "../StyledComponents/Snackbar";

export default function MarketNews() {
    const [symbol, setSymbol] = React.useState("AAPL");
    const [news, setNews] = React.useState([]);

    // React.useEffect(() => {
    //     axios
    //         .get(`http://localhost:5000/api/marketNews?symbol=${symbol}`)
    //         .then((response) => setNews(response.data.data));
    // }, [symbol]);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://localhost:5000/api/marketNews?symbol=${symbol}`
            );
            setNews(result.data.data);
        };
        fetchData();
    }, [symbol]);

    const sampleData = [1, 2, 3, 4, 5, 6];

    console.log(news);

    return (
        <div className="Contentpage">
            <Snackbar />
            <SearchInput
                placeholder="Search For Stock Quote (default : AAPL)"
                setSymbol={setSymbol}
                setNews={setNews}
            />
            <div className="NewsCardGrid">
                {news.length === 0
                    ? sampleData.map((d, idx) => {
                          return (
                              <Card key={"card_" + idx}>
                                  <div
                                      className="Skeleton"
                                      style={{ height: "300px", width: "100%" }}
                                  />
                              </Card>
                          );
                      })
                    : news.map((d, idx) => {
                          return <NewsCard key={"newsCard_" + idx} data={d} />;
                      })}
            </div>
        </div>
    );
}
