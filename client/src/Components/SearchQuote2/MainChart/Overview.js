import React from "react";
//Import scss
import "./MainChart.scss";

//Import Axios for API calling
import axios from "axios";

// const data = {
//     summary:
//         "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, HomePod, iPod touch, and other Apple-branded and third-party accessories. It also provides AppleCare support services; cloud services store services; and operates various platforms, including the App Store, that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. In addition, the company offers various services, such as Apple Arcade, a game subscription service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It sells and delivers third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was founded in 1977 and is headquartered in Cupertino, California.",
//     city: "Cupertino",
//     state: "CA",
//     country: "United States",
//     employees: 100000,
//     ceoName: "Mr. Timothy D. Cook",
//     ceoTitle: "CEO & Director",
// };
export default function Overview({ symbol }) {
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `http://localhost:5000/api/searchQuote/getData?symbol=${symbol}&type=overview`
            );
            if (response.data.status !== "fail") {
                setData(response.data.data);
            }
        };
        fetchData();
    }, [symbol]);

    return (
        <div className="Overview">
            {Object.keys(data).length !== 0 ? (
                <>
                    <div className="About">
                        <h1>About</h1>
                        <p>{data.summary}</p>
                    </div>
                    <div className="CompanyInfo">
                        <div className="CEO" text="CEO">
                            {data.ceoName}
                        </div>
                        <div className="HeadQuarter" text="HeadQuarter">
                            {data.city} , {data.state} , {data.country}
                        </div>
                        <div className="Employees" text="Employees">
                            {data.employees}
                        </div>
                    </div>
                </>
            ) : (
                <div className="EmptyData">Currently Unavailable ...</div>
            )}
        </div>
    );
}
